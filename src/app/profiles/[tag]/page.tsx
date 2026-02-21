import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Gamepad2, User, Globe, Share2, Award, Zap, ShieldCheck } from "lucide-react";
import { GameProfile } from "@/types";

export default async function PublicProfilePage({
    params,
}: {
    params: { tag: string };
}) {
    const supabase = await createClient();
    const { tag } = params;

    // Fetch profile
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("gamer_tag", tag)
        .single();

    if (profileError || !profile) {
        notFound();
    }

    // Fetch game profiles
    const { data: gameProfiles } = await supabase
        .from("game_profiles")
        .select("*")
        .eq("profile_id", profile.id);

    return (
        <div className="min-h-screen bg-[#0B0E14] text-white selection:bg-[var(--primary)]/30">
            {/* Cinematic Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24">
                {/* Hero section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-4 space-y-8 sticky top-24">
                        {/* Identity Card */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-b from-primary/50 to-transparent rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <Card className="relative bg-white/[0.03] border-white/10 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden">
                                <CardContent className="p-8 space-y-8">
                                    <div className="flex justify-center">
                                        <div className="relative">
                                            <div className="w-32 h-32 rounded-3xl bg-[var(--primary)]/20 flex items-center justify-center border border-[var(--primary)]/30 overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                                                {profile.avatar_url ? (
                                                    <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <User className="w-16 h-16 text-[var(--primary)]/40" />
                                                )}
                                            </div>
                                            {profile.role === 'admin' && (
                                                <div className="absolute -bottom-2 -right-2 bg-[var(--primary)] text-[#0B0E14] p-1.5 rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                                                    <ShieldCheck className="w-5 h-5" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-center space-y-2">
                                        <Badge variant="outline" className="border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-black uppercase tracking-widest px-4 py-1">
                                            Verified Operative
                                        </Badge>
                                        <h1 className="text-4xl font-black uppercase tracking-tighter italic leading-none">
                                            {profile.name}
                                        </h1>
                                        <p className="text-white/40 font-mono text-xs uppercase tracking-widest">
                                            @{profile.gamer_tag}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-white/5 space-y-4">
                                        <p className="text-sm text-white/60 leading-relaxed italic text-center px-4">
                                            "{profile.bio || 'This operative has not yet initialized a tactical summary.'}"
                                        </p>
                                    </div>

                                    <div className="flex justify-center gap-4 pt-4">
                                        <div className="flex flex-col items-center">
                                            <span className="text-xl font-black italic">{gameProfiles?.length || 0}</span>
                                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Modules</span>
                                        </div>
                                        <div className="w-px h-8 bg-white/10" />
                                        <div className="flex flex-col items-center">
                                            <span className="text-xl font-black italic">0</span>
                                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Victories</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Modules Header */}
                        <div className="space-y-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 text-[var(--secondary)] text-[9px] font-black uppercase tracking-[0.4em]">
                                Combat Records
                            </div>
                            <h2 className="text-5xl font-black uppercase tracking-tighter italic">
                                Active <span className="text-[var(--secondary)] drop-shadow-[0_0_10px_rgba(176,38,255,0.8)]">Modules</span>
                            </h2>
                        </div>

                        {/* Game Profile Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {gameProfiles?.map((gp: GameProfile) => (
                                <Card key={gp.id} className="group bg-white/[0.02] border border-white/10 hover:border-[var(--secondary)]/30 transition-all rounded-[2rem] overflow-hidden backdrop-blur-sm shadow-xl hover:shadow-[0_0_30px_rgba(176,38,255,0.1)]">
                                    <div className="p-8 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
                                                <Gamepad2 className="w-6 h-6 text-[var(--secondary)]/80" />
                                            </div>
                                            <Badge className="bg-[var(--secondary)] text-white font-black italic uppercase text-[10px] rounded-lg shadow-[0_0_10px_rgba(176,38,255,0.4)] border border-[var(--secondary)]/50">
                                                {gp.rank || 'UNRANKED'}
                                            </Badge>
                                        </div>

                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black uppercase italic tracking-tight">
                                                {gp.gameName}
                                            </h3>
                                            <p className="text-primary font-mono text-sm font-bold">
                                                {gp.ign}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Main Role</p>
                                                <p className="text-xs font-bold uppercase">{gp.role || 'Flex'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Experience</p>
                                                <p className="text-xs font-bold uppercase">
                                                    {gp.playingSince ? `${new Date().getFullYear() - parseInt(gp.playingSince)}Y+` : 'NEW'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}

                            {(!gameProfiles || gameProfiles.length === 0) && (
                                <div className="col-span-full py-24 text-center border border-dashed border-white/10 rounded-[3rem] bg-white/[0.01]">
                                    <Zap className="w-12 h-12 text-white/10 mx-auto mb-4" />
                                    <h3 className="text-xl font-black uppercase italic text-white/40 tracking-tight">System Idle</h3>
                                    <p className="text-white/20 text-sm mt-2 font-medium">No combat modules initialized by this profile.</p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-1 pt-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-[9px] font-black uppercase tracking-[0.4em]">
                                Tactical Accomplishments
                            </div>
                            <h2 className="text-5xl font-black uppercase tracking-tighter italic">
                                Accolades <span className="text-[var(--primary)] drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">& Trophies</span>
                            </h2>
                        </div>

                        <div className="p-12 text-center bg-white/[0.01] border border-white/5 rounded-[3rem]">
                            <Award className="w-16 h-16 text-white/5 mx-auto mb-6" />
                            <p className="text-white/20 font-black uppercase tracking-[0.3em] text-xs">
                                Trophy case encryption sequence pending...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
