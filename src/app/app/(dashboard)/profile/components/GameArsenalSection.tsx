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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">
                        Game Arsenal
                    </h2>
                    <p className="text-sm text-white/40 mt-1">
                        Your tactical credentials across battlefields
                    </p>
                </div>
                <Button
                    onClick={onAddGame}
                    className="h-11 px-6 rounded-xl bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-wider text-xs gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Game
                </Button>
            </div>

            {/* Game Cards Grid */}
            {games.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/10 rounded-2xl">
                    <Gamepad2 className="w-16 h-16 text-white/20 mb-4" />
                    <p className="text-white/40 text-sm">No game profiles yet</p>
                    <p className="text-white/20 text-xs mt-1">Add your first tactical module</p>
                </div>
            )}
        </div>
    );
}
