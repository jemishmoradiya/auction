"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, UserCircle, Trophy, Target, Zap, Calendar } from "lucide-react";
import { WizardHeader } from "./WizardHeader";

interface StatsConfigurerProps {
    category: "esports" | "physical";
    ign: string;
    rank: string;
    role: string;
    playingSince?: string;
    onUpdate: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export function StatsConfigurer({ category, ign, rank, role, playingSince, onUpdate, onNext, onBack }: StatsConfigurerProps) {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

    return (
        <div className="space-y-8">
            <WizardHeader
                phase="Phase 03: Performance Calibration"
                title="Tactical"
                accentTitle="Data"
                description="Initialize your unique combat or athletic signature."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest flex items-center gap-2">
                        <UserCircle className="w-3 h-3" />
                        {category === "esports" ? "In-Game Name (IGN)" : "Full Tracking Name"}
                    </label>
                    <Input
                        value={ign}
                        onChange={e => onUpdate({ ign: e.target.value })}
                        className="bg-white/5 border-white/10 rounded-xl h-12 text-sm"
                        placeholder={category === "esports" ? "TenZ#NA1" : "Number 7"}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest flex items-center gap-2">
                        <Trophy className="w-3 h-3" /> Current Tier / Rank
                    </label>
                    <Input
                        value={rank}
                        onChange={e => onUpdate({ rank: e.target.value })}
                        className="bg-white/5 border-white/10 rounded-xl h-12 text-sm uppercase"
                        placeholder="Radiant / Semi-Pro"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest flex items-center gap-2">
                        <Target className="w-3 h-3" /> Tactical Role / Position
                    </label>
                    <Input
                        value={role}
                        onChange={e => onUpdate({ role: e.target.value })}
                        className="bg-white/5 border-white/10 rounded-xl h-12 text-sm"
                        placeholder="Entry / Midfielder"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> Playing Since (Year)
                    </label>
                    <Select value={playingSince} onValueChange={(val) => onUpdate({ playingSince: val })}>
                        <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12 text-sm text-white/60">
                            <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0a0f1e] border-white/10 text-white">
                            {years.map(year => (
                                <SelectItem key={year} value={year}>{year}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
                <Button variant="ghost" onClick={onBack} className="text-white/40 hover:text-white uppercase text-[10px] font-black tracking-[0.2em]">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button onClick={onNext} disabled={!ign} className="bg-primary text-black font-black uppercase text-[10px] tracking-widest h-12 px-8 rounded-xl">
                    Next Phase <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
