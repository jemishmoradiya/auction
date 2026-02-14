"use client";

import { User } from "@supabase/supabase-js";
import { Check, Edit3, Twitter, Twitch, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileHeroProps {
    user: User | null;
    profile: any;
    onEditClick: () => void;
}

export function ProfileHero({ user, profile, onEditClick }: ProfileHeroProps) {
    const isVerified = profile?.verification_status === "verified";

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-white/10 backdrop-blur-xl">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-shift" />

            <div className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                    <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest">
                        Operative Profile
                    </h2>
                    <Button
                        onClick={onEditClick}
                        variant="ghost"
                        className="h-9 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all"
                    >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                </div>

                <div className="flex items-start gap-6">
                    {/* Avatar */}
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                            <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center overflow-hidden">
                                {profile?.avatar_url ? (
                                    <img
                                        src={profile.avatar_url}
                                        alt={profile.name || "Avatar"}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-4xl font-black text-white/20">
                                        {profile?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "?"}
                                    </div>
                                )}
                            </div>
                        </div>
                        {isVerified && (
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-green-500 border-2 border-gray-900 flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                            </div>
                        )}
                    </div>

                    {/* Identity */}
                    <div className="flex-1">
                        {/* Gamer Tag */}
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-black uppercase tracking-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                                {profile?.gamer_tag || user?.email?.split('@')[0] || "OPERATIVE"}
                            </h1>
                            {isVerified && (
                                <div className="px-2 py-0.5 rounded bg-green-500/20 border border-green-500/30 flex items-center gap-1">
                                    <Check className="w-3 h-3 text-green-400" />
                                    <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">
                                        Verified
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Real Name */}
                        <p className="text-lg text-white/60 mb-3">
                            {profile?.name || "Unidentified Operative"}
                        </p>

                        {/* Bio */}
                        {profile?.bio && (
                            <p className="text-sm text-white/40 leading-relaxed mb-4 max-w-2xl">
                                {profile.bio}
                            </p>
                        )}

                        {/* Socials */}
                        {profile?.socials && Object.keys(profile.socials).length > 0 && (
                            <div className="flex items-center gap-2">
                                {profile.socials.twitter && (
                                    <a
                                        href={profile.socials.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/40 hover:text-blue-400 transition-all"
                                    >
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                )}
                                {profile.socials.twitch && (
                                    <a
                                        href={profile.socials.twitch}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/40 hover:text-purple-400 transition-all"
                                    >
                                        <Twitch className="w-4 h-4" />
                                    </a>
                                )}
                                {profile.socials.instagram && (
                                    <a
                                        href={profile.socials.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/40 hover:text-pink-400 transition-all"
                                    >
                                        <Instagram className="w-4 h-4" />
                                    </a>
                                )}
                                {profile.socials.youtube && (
                                    <a
                                        href={profile.socials.youtube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 transition-all"
                                    >
                                        <Youtube className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
