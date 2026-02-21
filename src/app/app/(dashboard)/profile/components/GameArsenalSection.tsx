"use client";

import { GameProfile } from "@/types";
import { Plus, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameProfileCard } from "./GameProfileCard";

interface GameArsenalSectionProps {
    games: GameProfile[];
    onAddGame: () => void;
    onEditGame: (game: GameProfile) => void;
    onDeleteGame: (gameName: string) => void;
}

export function GameArsenalSection({
    games,
    onAddGame,
    onEditGame,
    onDeleteGame,
}: GameArsenalSectionProps) {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between gap-6 pb-2 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[var(--primary)]/10 rounded-lg border border-[var(--primary)]/20">
                        <Gamepad2 className="w-4 h-4 text-[var(--primary)]" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white">Game Profiles</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Saved Games & Settings</p>
                    </div>
                </div>
                <Button
                    onClick={onAddGame}
                    size="sm"
                    className="h-10 px-6 bg-[var(--primary)] hover:bg-[#00F0FF]/90 text-[#0B0E14] shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all font-bold uppercase tracking-widest text-[11px] rounded-xl cursor-pointer"
                >
                    <Plus className="w-4 h-4 mr-2 stroke-[3]" />
                    ADD PROFILE
                </Button>
            </div>

            {/* Game Cards Grid */}
            {games.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {games.map((game) => (
                        <GameProfileCard
                            key={game.id}
                            game={game}
                            onEdit={onEditGame}
                            onDelete={onDeleteGame}
                        />
                    ))}
                </div>
            ) : (
                <div
                    onClick={onAddGame}
                    className="flex flex-col items-center justify-center py-20 px-4 text-center border border-white/10 border-dashed bg-white/[0.01] rounded-3xl relative overflow-hidden group cursor-pointer hover:bg-white/[0.03] hover:border-[var(--primary)]/30 transition-all duration-500"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/5 to-transparent opacity-50" />
                    <div className="w-20 h-20 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,240,255,0.2)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-500 relative z-10">
                        <Gamepad2 className="w-10 h-10 text-[var(--primary)] drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]" />
                    </div>
                    <p className="text-white font-black uppercase tracking-widest text-base md:text-xl relative z-10 text-shadow-sm group-hover:text-[var(--primary)] transition-colors italic">No Game Profiles</p>
                    <p className="text-[var(--primary)] text-xs md:text-sm font-mono font-bold uppercase tracking-widest mt-4 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 inline-block shadow-[0_0_10px_rgba(0,240,255,0.1)] relative z-10 group-hover:bg-[var(--primary)] group-hover:text-[0B0E14] transition-all">
                        [ ADD_YOUR_FIRST_GAME ]
                    </p>
                </div>
            )}
        </div>
    );
}
