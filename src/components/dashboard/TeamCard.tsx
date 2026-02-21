import React from "react";
import { Team } from "@/types";

interface TeamCardProps {
    team: Team;
}

export const TeamCard = React.memo(({ team }: TeamCardProps) => (
    <div key={team.id} className="p-5 bg-white/[0.02] border border-white/10 group rounded-2xl backdrop-blur-xl shadow-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:-translate-y-1 hover:bg-white/[0.04] hover:border-[var(--primary)]/30 transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="space-y-1">
                <h4 className="font-bold text-white uppercase text-sm tracking-widest truncate max-w-[120px] group-hover:text-[var(--primary)] transition-colors">
                    {team.name}
                </h4>
                <div className="flex gap-1.5 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={`w-3 h-1.5 rounded-full transition-all duration-500 ${i < team.roster.length ? 'bg-[var(--primary)] shadow-[0_0_5px_rgba(0,240,255,0.6)]' : 'bg-white/10'}`} />
                    ))}
                </div>
            </div>
            <div className="text-right flex flex-col items-end">
                <p className={`text-xl font-black tabular-nums transition-colors ${team.budget - team.spent < 2000000 ? 'text-[var(--destructive)] drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'text-white'}`}>
                    ₹{(team.budget - team.spent).toLocaleString()}
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Available</p>
            </div>
        </div>
        <div className="w-full h-1.5 bg-white/10 overflow-hidden rounded-full relative mt-2">
            <div
                className="absolute top-0 bottom-0 left-0 bg-[var(--primary)] transition-all duration-1000 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
                style={{ width: `${(team.spent / team.budget) * 100}%` }}
            />
        </div>
    </div>
));

TeamCard.displayName = "TeamCard";
