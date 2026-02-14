"use client";

import { Gamepad2, Activity } from "lucide-react";
import { WizardHeader } from "./WizardHeader";

interface PhaseSelectorProps {
    onSelect: (category: "esports" | "physical") => void;
}

export function PhaseSelector({ onSelect }: PhaseSelectorProps) {
    return (
        <div className="space-y-8">
            <WizardHeader
                phase="Phase 01: Theatre Selection"
                title="Choose your"
                accentTitle="Arena"
                description="Select the domain of your tactical expertise."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={() => onSelect("esports")}
                    className="group p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all text-left space-y-4"
                >
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:scale-110 transition-transform">
                        <Gamepad2 className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-xl font-black uppercase italic tracking-tight">Digital Warfare</h3>
                        <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Esports & Virtual Combat</p>
                    </div>
                </button>

                <button
                    onClick={() => onSelect("physical")}
                    className="group p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-secondary/50 hover:bg-secondary/5 transition-all text-left space-y-4"
                >
                    <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center border border-secondary/30 group-hover:scale-110 transition-transform">
                        <Activity className="w-8 h-8 text-secondary" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-xl font-black uppercase italic tracking-tight">Physical Arena</h3>
                        <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">On-field Athletics & Sports</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
