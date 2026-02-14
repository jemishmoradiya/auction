import React from "react";
import { Team } from "@/types";

interface TeamCardProps {
    team: Team;
}

export const TeamCard = React.memo(({ team }: TeamCardProps) => (
    <div key={team.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
        <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
                <h4 className="font-bold text-white group-hover:text-[var(--theme-primary)] transition-colors uppercase text-xs tracking-tight truncate max-w-[120px]">
                    {team.name}
                </h4>
                <div className="flex gap-1.5 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={`w-3.5 h-1 rounded-full ${i < team.roster.length ? 'bg-[var(--theme-primary)] shadow-[0_0_8px_rgba(0,229,255,0.5)]' : 'bg-white/10'}`} />
                    ))}
                </div>
            </div>
            <div className="text-right">
                <p className={`text-base font-black tabular-nums transition-colors ${team.budget - team.spent < 2000000 ? 'text-[var(--theme-accent)]' : 'text-[var(--theme-secondary)]'}`}>
                    ₹{(team.budget - team.spent).toLocaleString()}
                </p>
                <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Available</p>
            </div>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
                className="h-full bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] transition-all duration-1000 shadow-[0_0_10px_rgba(0,229,255,0.3)]"
                style={{ width: `${(team.spent / team.budget) * 100}%` }}
            />
        </div>
    </div>
));

TeamCard.displayName = "TeamCard";
