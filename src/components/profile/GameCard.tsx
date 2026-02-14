"use client";

import { GameProfile } from "@/types";
import { Edit2, Trash2, Trophy, User, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface GameCardProps {
    profile: GameProfile;
    onEdit: (profile: GameProfile) => void;
    onDelete: (gameName: string) => void;
}

const RANK_COLORS: Record<string, { from: string; to: string; glow: string }> = {
    radiant: { from: "#FFD700", to: "#FF6B6B", glow: "rgba(255, 215, 0, 0.3)" },
    immortal: { from: "#FF6B9D", to: "#C44569", glow: "rgba(255, 107, 157, 0.3)" },
    ascendant: { from: "#A29BFE", to: "#6C5CE7", glow: "rgba(162, 155, 254, 0.3)" },
    diamond: { from: "#74B9FF", to: "#0984E3", glow: "rgba(116, 185, 255, 0.3)" },
    platinum: { from: "#81ECEC", to: "#00B894", glow: "rgba(129, 236, 236, 0.3)" },
    global: { from: "#FFD700", to: "#FFA500", glow: "rgba(255, 215, 0, 0.3)" },
    predator: { from: "#FF0000", to: "#8B0000", glow: "rgba(255, 0, 0, 0.3)" },
    // Default
    default: { from: "#A0AEC0", to: "#718096", glow: "rgba(160, 174, 192, 0.2)" }
};

function getRankColor(rank?: string) {
    if (!rank) return RANK_COLORS.default;
    const rankLower = rank.toLowerCase();

    for (const [key, value] of Object.entries(RANK_COLORS)) {
        if (rankLower.includes(key)) return value;
    }

    return RANK_COLORS.default;
}

export function GameCard({ profile, onEdit, onDelete }: GameCardProps) {
    const rankColor = getRankColor(profile.rank);
    const stats = profile.stats || {};
    const statEntries = Object.entries(stats).slice(0, 2); // Show max 2 stats

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -4 }}
            className="group relative"
        >
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:shadow-xl group-hover:shadow-blue-500/10">
                {/* Rank glow effect */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                    style={{
                        background: `radial-gradient(circle at 50% 0%, ${rankColor.glow} 0%, transparent 70%)`
                    }}
                />

                <div className="relative p-5">
                    {/* Game Name */}
                    <h3 className="text-xl font-black uppercase tracking-tight text-white mb-3">
                        {profile.gameName}
                    </h3>

                    {/* Rank Badge */}
                    {profile.rank && (
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-4"
                            style={{
                                background: `linear-gradient(135deg, ${rankColor.from}20, ${rankColor.to}20)`,
                                border: `1px solid ${rankColor.from}40`
                            }}
                        >
                            <Trophy
                                className="w-4 h-4"
                                style={{ color: rankColor.from }}
                            />
                            <span
                                className="text-sm font-bold uppercase tracking-wide"
                                style={{
                                    background: `linear-gradient(135deg, ${rankColor.from}, ${rankColor.to})`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }}
                            >
                                {profile.rank}
                            </span>
                        </div>
                    )}

                    {/* IGN */}
                    <div className="flex items-center gap-2 mb-4">
                        <User className="w-4 h-4 text-white/40" />
                        <span className="text-sm font-mono text-white/60">
                            {profile.ign || "No IGN"}
                        </span>
                    </div>

                    {/* Stats */}
                    {statEntries.length > 0 && (
                        <div className="space-y-2 mb-4">
                            {statEntries.map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between text-xs">
                                    <span className="text-white/40 uppercase tracking-wider">
                                        {key.replace(/_/g, ' ')}
                                    </span>
                                    <span className="text-white/80 font-bold font-mono">
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Role */}
                    {profile.role && (
                        <div className="text-xs text-white/30 mb-4">
                            Role: <span className="text-white/50">{profile.role}</span>
                        </div>
                    )}

                    {/* Actions - Show on hover */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                            onClick={() => onEdit(profile)}
                            variant="ghost"
                            size="sm"
                            className="flex-1 h-9 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white rounded-lg"
                        >
                            <Edit2 className="w-3.5 h-3.5 mr-1.5" />
                            Edit
                        </Button>
                        <Button
                            onClick={() => onDelete(profile.gameName)}
                            variant="ghost"
                            size="sm"
                            className="h-9 px-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 rounded-lg"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
