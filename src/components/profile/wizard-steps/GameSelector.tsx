"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { WizardHeader } from "./WizardHeader";

interface GameSelectorProps {
    category: "esports" | "physical";
    selectedGame: string;
    onSelect: (game: string) => void;
    onBack: () => void;
}

const ESPORTS_GAMES = ["Valorant", "Counter-Strike 2", "League of Legends", "Dota 2", "Rocket League", "Apex Legends", "Rainbow Six Siege"];
const PHYSICAL_SPORTS = ["Football", "Cricket", "Basketball", "Tennis", "Badminton", "Table Tennis"];

export function GameSelector({ category, selectedGame, onSelect, onBack }: GameSelectorProps) {
    const games = category === "esports" ? ESPORTS_GAMES : PHYSICAL_SPORTS;

    return (
        <div className="space-y-8">
            <WizardHeader
                phase="Phase 02: Objective Identification"
                title="Select"
                accentTitle="Engagement"
                description="Identify the specific game or sport module."
            />

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {games.map(game => (
                    <button
                        key={game}
                        onClick={() => onSelect(game)}
                        className={`p-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${selectedGame === game
                                ? 'bg-primary border-primary text-black'
                                : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'
                            }`}
                    >
                        {game}
                    </button>
                ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
                <Button variant="ghost" onClick={onBack} className="text-white/40 hover:text-white uppercase text-[10px] font-black tracking-[0.2em]">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Back
                </Button>
            </div>
        </div>
    );
}
