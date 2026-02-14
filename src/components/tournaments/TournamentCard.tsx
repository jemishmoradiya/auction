"use client";

import { Tournament } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Users, IndianRupee, Play, Settings2 } from "lucide-react";
import { useAuctionStore } from "@/store/useAuctionStore";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TournamentCardProps {
    tournament: Tournament;
}

export function TournamentCard({ tournament }: TournamentCardProps) {
    const { activeTournamentId, setActiveTournament } = useAuctionStore();
    const isActive = activeTournamentId === tournament.id;

    const statusColors = {
        DRAFT: "bg-slate-500/10 text-slate-400 border-slate-500/20",
        SETUP: "bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border-[var(--theme-primary)]/20",
        LIVE: "bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] border-[var(--theme-accent)]/40 animate-pulse",
        COMPLETED: "bg-[var(--theme-secondary)]/10 text-[var(--theme-secondary)] border-[var(--theme-secondary)]/20",
    };

    return (
        <Card className={cn(
            "relative overflow-hidden transition-all duration-700 group border-white/10",
            isActive ? "bg-[var(--theme-primary)]/[0.03] border-[var(--theme-primary)]/40 ring-1 ring-[var(--theme-primary)]/20 rounded-[2rem]" : "bg-white/[0.03] border-white/5 hover:border-white/20 backdrop-blur-3xl rounded-[2rem]"
        )}>
            {/* Background Glow */}
            <div className={cn(
                "absolute -right-20 -top-20 w-40 h-40 blur-[100px] transition-all duration-700",
                isActive ? "bg-primary/20" : "bg-white/5 opacity-0 group-hover:opacity-100"
            )} />

            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-3 font-heading leading-none">
                        <Trophy className={cn("w-6 h-6", isActive ? "text-[var(--theme-primary)]" : "text-white/20")} />
                        {tournament.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-[9px] text-white/20 font-black uppercase tracking-[0.4em] font-heading">
                        <span>{tournament.game} Transmission</span>
                    </div>
                </div>
                <Badge variant="outline" className={cn("text-[10px] font-black tracking-widest", statusColors[tournament.status])}>
                    {tournament.status}
                </Badge>
            </CardHeader>

            <CardContent className="relative space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-[9px] uppercase font-black tracking-[0.3em] text-white/20 font-heading">Accumulated Pool</p>
                        <p className="text-2xl font-black font-mono text-white flex items-center gap-1 italic tracking-tighter">
                            <IndianRupee className="w-4 h-4 text-[var(--theme-primary)]" />
                            {tournament.prizePool.toLocaleString()}
                        </p>
                    </div>
                    <div className="space-y-1 text-right">
                        <p className="text-[10px] uppercase font-black tracking-widest text-white/30 font-heading">Start Date</p>
                        <p className="text-sm font-bold text-white flex items-center justify-end gap-2">
                            <Calendar className="w-3 h-3 text-white/40" />
                            {new Date(tournament.startDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/5 border border-white/5 rounded-lg p-2 text-center">
                        <p className="text-[8px] font-bold uppercase text-white/40 font-heading">Max Players</p>
                        <p className="text-sm font-black text-white font-mono">{tournament.rules.maxPlayers}</p>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-lg p-2 text-center">
                        <p className="text-[8px] font-bold uppercase text-white/40 font-heading">Timer</p>
                        <p className="text-sm font-black text-white font-mono">{tournament.rules.auctionTimer}s</p>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-lg p-2 text-center">
                        <p className="text-[8px] font-bold uppercase text-white/40 font-heading">Increment</p>
                        <p className="text-sm font-black text-white font-mono">{tournament.rules.bidIncrement} CR</p>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="relative pt-2 gap-2">
                {!isActive ? (
                    <Button
                        onClick={() => setActiveTournament(tournament.id)}
                        className="w-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 font-black uppercase tracking-[0.2em] text-[10px] h-12 rounded-xl"
                    >
                        Establish Uplink
                    </Button>
                ) : (
                    <>
                        <Link href={`/auction/${tournament.id}/bid`} className="flex-1">
                            <Button className="w-full bg-[var(--theme-primary)] text-black hover:bg-[var(--theme-primary)]/90 font-black uppercase tracking-[0.2em] text-[10px] h-12 gap-3 rounded-xl shadow-[0_5px_20px_-5px_rgba(0,229,255,0.4)]">
                                <Play className="w-3 h-3 fill-current" /> Live Transmission
                            </Button>
                        </Link>
                        <Button variant="outline" className="h-12 w-12 border-white/10 hover:bg-white/5 text-white/40 hover:text-white rounded-xl flex items-center justify-center p-0">
                            <Settings2 className="w-5 h-5" />
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}
