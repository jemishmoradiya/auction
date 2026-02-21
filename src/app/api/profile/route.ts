import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/backend/supabase';
import { withAuth } from '@/lib/backend/middleware';
import { z } from 'zod';

const updateProfileSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    bio: z.string().optional(),
    gamerTag: z.string().optional(),
    privacySettings: z.object({
        mode: z.enum(['off', 'ghost', 'classified'])
    }).optional(),
});

// GET /api/profile - Get current user profile
export async function GET(req: NextRequest) {
    return withAuth(async (req, user) => {
        const supabase = getSupabaseClient(req.headers.get('authorization') || undefined);

        const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();

        if (error) {
            console.error('[Profile API] Error fetching profile:', error);
            return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
        }

        return NextResponse.json({ data });
    })(req);
}

// PUT /api/profile - Update user profile
export async function PUT(req: NextRequest) {
    return withAuth(async (req, user) => {
        const supabase = getSupabaseClient(req.headers.get('authorization') || undefined);
        const body = await req.json();
        const result = updateProfileSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: result.error.issues }, { status: 400 });
        }

        const updateData: any = {
            name: result.data.name,
            bio: result.data.bio,
        };

        if (result.data.privacySettings) {
            updateData.privacy_settings = result.data.privacySettings;
        }

        if (result.data.gamerTag) {
            updateData.gamer_tag = result.data.gamerTag.toLowerCase().replace(/\s+/g, '_');
        }

        const { error } = await supabase.from('profiles').update(updateData).eq('id', user.id);

        if (error) {
            if (error.code === '23505') {
                return NextResponse.json(
                    {
                        error: 'Gamer Tag already claimed by another operative. Choose a unique signature.',
                    },
                    { status: 409 }
                );
            }
            console.error('[Profile API] Error updating profile:', error);
            return NextResponse.json(
                { error: 'Failed to synchronize operative identity. System failure.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    })(req);
}
