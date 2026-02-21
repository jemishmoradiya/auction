"use client";

import { GameProfile } from "@/types";
import { Trash2, Trophy, Gamepad2, Pencil, Zap, Star, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GameProfileCardProps {
    game: GameProfile;
    onEdit: (game: GameProfile) => void;
    onDelete: (gameName: string) => void;
}

function MiniRadarChart({ stats }: { stats: Record<string, any> }) {
    const entries = Object.entries(stats).slice(0, 5);
    if (entries.length < 3) return null;

    const size = 100;
    const center = size / 2;
    const radius = size * 0.38;
    const angleStep = (Math.PI * 2) / entries.length;

    const getCoords = (value: number, index: number, max: number = 100) => {
        const r = (value / max) * radius;
        const angle = index * angleStep - Math.PI / 2;
        return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
    };

    const points = entries.map(([, val], i) => {
        const v = typeof val === 'number' ? val : parseFloat(val) || 50;
        const { x, y } = getCoords(v, i);
        return `${x},${y}`;
    }).join(" ");

    return (
        <svg width={size} height={size} className="overflow-visible drop-shadow-[0_0_8px_rgba(0,240,255,0.3)] shrink-0">
            {[0.4, 0.7, 1].map((scale) => (
                <polygon
                    key={scale}
                    points={entries.map((_, i) => {
                        const { x, y } = getCoords(100 * scale, i);
                        return `${x},${y}`;
                    }).join(" ")}
                    className="fill-[var(--primary)]/5 stroke-[var(--primary)]/15 stroke-[0.5]"
                />
            ))}
            {entries.map((_, i) => {
                const { x, y } = getCoords(100, i);
                return <line key={i} x1={center} y1={center} x2={x} y2={y} className="stroke-[var(--primary)]/15 stroke-[0.5]" />;
            })}
            <motion.polygon
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 15 }}
                points={points}
                className="fill-[var(--primary)]/25 stroke-[var(--primary)] stroke-[1.5px]"
                style={{ filter: "drop-shadow(0 0 3px var(--primary))" }}
            />
            {entries.map(([, val], i) => {
                const v = typeof val === 'number' ? val : parseFloat(val) || 50;
                const { x, y } = getCoords(v, i);
                return <circle key={i} cx={x} cy={y} r="2.5" className="fill-white stroke-[var(--primary)] stroke-[1.5]" />;
            })}
        </svg>
    );
}

export function GameProfileCard({ game, onEdit, onDelete }: GameProfileCardProps) {
    const stats = game.stats || {};
    const hasStats = Object.keys(stats).length >= 3;
    const hasModes = game.playstyle && game.playstyle.length > 0;
    const isPhysical = game.category === 'physical';
    const accent = isPhysical ? 'var(--secondary)' : 'var(--primary)';
    const accentHex = isPhysical ? 'rgba(176,38,255,' : 'rgba(0,240,255,';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }}
            className="group relative cursor-pointer"
            onClick={() => onEdit(game)}
        >
            {/* Outer glow */}
            <div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                style={{ background: `linear-gradient(135deg, ${accentHex}0.15) 0%, transparent 60%)` }}
            />

            <div
                className={cn(
                    "relative bg-[#0B0E14] border border-white/[0.07] rounded-2xl overflow-hidden transition-all duration-300",
                    "group-hover:border-white/[0.12]",
                )}
                style={{ boxShadow: `0 4px 30px rgba(0,0,0,0.5)` }}
            >
                {/* Top colour bar */}
                <div
                    className="h-0.5 w-full"
                    style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
                />

                <div className="p-5 space-y-4">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3">
                        {/* Left: icon + game name */}
                        <div className="flex items-center gap-3 min-w-0">
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
                                style={{
                                    background: `${accentHex}0.12)`,
                                    borderColor: `${accentHex}0.25)`,
                                    color: accent,
                                }}
                            >
                                {isPhysical
                                    ? <Trophy className="w-5 h-5" />
                                    : <Gamepad2 className="w-5 h-5" />
                                }
                            </div>
                            <div className="min-w-0">
                                <p className="text-[8px] font-black uppercase tracking-[0.25em] font-mono" style={{ color: accent }}>
                                    {game.category || 'General'} · Active
                                </p>
                                <h3 className="text-base font-black uppercase italic tracking-tight text-white truncate leading-tight">
                                    {game.gameName || "New Profile"}
                                </h3>
                            </div>
                        </div>

                        {/* Actions — show on hover */}
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <button
                                onClick={(e) => { e.stopPropagation(); onEdit(game); }}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                            >
                                <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onDelete(game.gameName); }}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-500 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all cursor-pointer"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* IGN + Rank */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                            <p className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-0.5">IGN</p>
                            <p className="text-[11px] font-black uppercase truncate" style={{ color: accent }}>
                                {game.ign || "—"}
                            </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                            <p className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-0.5">Rank</p>
                            <p className="text-[11px] font-black text-white uppercase truncate">
                                {game.rank || "Unranked"}
                            </p>
                        </div>
                    </div>

                    {/* Radar chart OR Mode pills OR empty */}
                    {hasStats ? (
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center justify-center">
                                <MiniRadarChart stats={stats} />
                            </div>
                            <div className="flex-1 space-y-1.5">
                                {Object.entries(stats).slice(0, 4).map(([k, v]) => (
                                    <div key={k} className="flex items-center justify-between">
                                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest truncate pr-2">{k}</span>
                                        <span className="text-[9px] font-black tabular-nums" style={{ color: accent }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : hasModes ? (
                        <div className="space-y-1.5">
                            <p className="text-[7px] font-black text-slate-600 uppercase tracking-[0.3em]">
                                <Zap className="w-2.5 h-2.5 inline mr-1" style={{ color: accent }} />
                                Modes
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {game.playstyle!.map((mode) => (
                                    <span
                                        key={mode}
                                        className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest"
                                        style={{
                                            background: `${accentHex}0.1)`,
                                            border: `1px solid ${accentHex}0.2)`,
                                            color: accent,
                                        }}
                                    >
                                        {mode}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 py-3 border border-white/[0.04] border-dashed rounded-xl justify-center">
                            <Activity className="w-3.5 h-3.5 text-slate-700" />
                            <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">No data yet — click to edit</span>
                        </div>
                    )}
                </div>

                {/* Bottom edit hint */}
                <div
                    className="px-5 py-3 border-t border-white/[0.04] flex items-center justify-between transition-all duration-300"
                    style={{ background: `${accentHex}0.02)` }}
                >
                    <span
                        className="text-[8px] font-black uppercase tracking-[0.25em] font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: accent }}
                    >
                        Click to edit profile
                    </span>
                    <div className="flex items-center gap-1.5 ml-auto">
                        <div
                            className="w-1 h-1 rounded-full"
                            style={{ background: accent, boxShadow: `0 0 5px ${accent}` }}
                        />
                        <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest font-mono">Live</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
