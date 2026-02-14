"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { WizardHeader } from "./WizardHeader";

interface TraitSelectorProps {
    selectedTraits: string[];
    onToggle: (tag: string) => void;
    onFinish: () => void;
    onBack: () => void;
    loading: boolean;
}

const TRAITS = ["Aggressive", "Tactician", "Closer", "Playmaker", "Shotcaller", "Utility God", "Supportive", "Executioner", "Anchor", "Entry"];

export function TraitSelector({ selectedTraits, onToggle, onFinish, onBack, loading }: TraitSelectorProps) {
    return (
        <div className="space-y-8">
            <WizardHeader
                phase="Phase 04: Playstyle Analysis"
                title="Deploy"
                accentTitle="Traits"
                description="Tag your unique engagement style for potential scouts."
            />

            <div className="flex flex-wrap gap-3">
                {TRAITS.map(tag => (
                    <button
                        key={tag}
                        onClick={() => onToggle(tag)}
                        className={`px-6 py-3 rounded-2xl border text-[10px] font-extrabold uppercase tracking-widest transition-all ${selectedTraits.includes(tag)
                                ? 'bg-primary border-primary text-black scale-105'
                                : 'bg-white/5 border-white/10 text-white/30 hover:border-white/30 hover:text-white'
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className="pt-8 flex items-center justify-between">
                <Button variant="ghost" onClick={onBack} disabled={loading} className="text-white/40 hover:text-white uppercase text-[10px] font-black tracking-[0.2em]">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button
                    onClick={onFinish}
                    disabled={loading}
                    className="bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] h-14 px-12 rounded-2xl shadow-[0_10px_40px_rgba(255,255,255,0.1)] hover:scale-105 transition-all"
                >
                    {loading ? "Initializing..." : "Engage Module"}
                </Button>
            </div>
        </div>
    );
}
