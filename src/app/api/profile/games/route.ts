import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/backend/supabase';
import { withAuth } from '@/lib/backend/middleware';
import { z } from 'zod';

const gameProfileSchema = z.object({
    gameName: z.string().min(1, 'Game name is required'),
    ign: z.string().optional(),
    rank: z.string().optional(),
    role: z.string().optional(),
    roles: z.array(z.string()).optional(), // Keep roles array for compatibility
    stats: z.record(z.string(), z.any()).optional(),
    playstyle: z.array(z.string()).optional(),
    playingSince: z.string().optional(),
});

// GET /api/profile/games - List user's game profiles
export async function GET(req: NextRequest) {
    return withAuth(async (req, user) => {
        const supabase = getSupabaseClient(req.headers.get('authorization') || undefined);

        const { data, error } = await supabase
            .from('game_profiles')
            .select('*')
            .eq('profile_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('[Game Profiles API] Error fetching profiles:', error);
            return NextResponse.json({ error: 'Failed to fetch game profiles' }, { status: 500 });
        }

        return NextResponse.json({ data });
    })(req);
}

// POST /api/profile/games - Create or update game profile
export async function POST(req: NextRequest) {
    return withAuth(async (req, user) => {
        const supabase = getSupabaseClient(req.headers.get('authorization') || undefined);
        const body = await req.json();
        const result = gameProfileSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: result.error.issues }, { status: 400 });
        }

        // Upsert game profile - creates new or updates existing for this game
        const { data, error } = await supabase.from('game_profiles').upsert(
            {
                profile_id: user.id,
                game_id: result.data.gameName,
                game_name: result.data.gameName,
                ign: result.data.ign,
                rank: result.data.rank,
                role: result.data.role,
                roles: result.data.roles || [],
                stats: result.data.stats || {},
                playstyle: result.data.playstyle || [],
                playing_since: result.data.playingSince,
            },
            {
                onConflict: 'profile_id,game_name',
            }
        ).select().single();

        if (error) {
            console.error('[Game Profiles API] Error upserting profile:', error);
            return NextResponse.json(
                { error: 'Failed to calibrate game module. System integrity error.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data }, { status: 201 });
    })(req);
}

// DELETE /api/profile/games?gameName=xxx - Delete game profile by game name
export async function DELETE(req: NextRequest) {
    return withAuth(async (req, user) => {
        const supabase = getSupabaseClient(req.headers.get('authorization') || undefined);
        const { searchParams } = new URL(req.url);
        const gameName = searchParams.get('gameName');

        if (!gameName) {
            return NextResponse.json({ error: 'gameName query parameter is required' }, { status: 400 });
        }

        const { error } = await supabase
            .from('game_profiles')
            .delete()
            .eq('profile_id', user.id)
            .eq('game_name', gameName);

        if (error) {
            console.error('[Game Profiles API] Error deleting profile:', error);
            return NextResponse.json({ error: 'Failed to decommission game module.' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    })(req);
}
