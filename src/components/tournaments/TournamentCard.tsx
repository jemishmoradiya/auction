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

    const statusColors: Record<string, string> = {
        DRAFT: "bg-white/10 text-slate-300 border-white/20",
        SETUP: "bg-[var(--secondary)]/10 text-[var(--secondary)] border-[var(--secondary)]/30 shadow-[0_0_10px_rgba(176,38,255,0.2)]",
        LIVE: "bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/30 animate-pulse shadow-[0_0_10px_rgba(0,240,255,0.3)]",
        COMPLETED: "bg-white/5 text-slate-400 border-white/10",
    };

    return (
        <Card className={cn(
            "relative transition-all duration-500 group border rounded-[2rem] p-0 flex flex-col justify-between overflow-hidden backdrop-blur-xl",
            isActive
                ? "bg-white/[0.05] border-[var(--primary)]/40 shadow-[0_0_30px_rgba(0,240,255,0.15)] -translate-y-2"
                : "bg-white/[0.02] border-white/10 shadow-xl hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:-translate-y-1 hover:bg-white/[0.03]"
        )}>
            {isActive && <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent pointer-events-none" />}

            <CardHeader className="p-6 pb-4 border-b border-white/10 flex flex-row items-center justify-between relative z-10">
                <div className="space-y-2">
                    <CardTitle className="text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-3 font-heading leading-none text-white">
                        <Trophy className={cn("w-8 h-8", isActive ? "text-[var(--primary)] drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" : "text-slate-400")} />
                        {tournament.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-[10px] text-[var(--primary)] font-bold uppercase tracking-widest bg-[var(--primary)]/10 border border-[var(--primary)]/30 inline-block px-3 py-1 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                        <span>{tournament.game} Transmission</span>
                    </div>
                </div>
                <Badge variant="outline" className={cn("text-[10px] font-bold tracking-widest px-3 py-1 rounded-full border", statusColors[tournament.status] || "bg-white/5 text-white border-white/20")}>
                    {tournament.status}
                </Badge>
            </CardHeader>

            <CardContent className="p-6 space-y-6 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Accumulated Pool</p>
                        <p className="text-2xl md:text-3xl font-black text-white flex items-center gap-1 tracking-tighter drop-shadow-sm">
                            <IndianRupee className="w-5 h-5 text-[var(--secondary)]" />
                            {tournament.prizePool.toLocaleString()}
                        </p>
                    </div>
                    <div className="space-y-1.5 text-right flex flex-col items-end">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Start Date</p>
                        <p className="text-sm font-bold text-white flex items-center justify-end gap-2 pr-1">
                            <Calendar className="w-4 h-4 text-[var(--primary)]" />
                            {new Date(tournament.startDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center transition-colors group-hover:bg-white/10">
                        <p className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-1">Max Players</p>
                        <p className="text-xl font-black text-white">{tournament.rules.maxPlayers}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center transition-colors group-hover:bg-white/10">
                        <p className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-1">Timer</p>
                        <p className="text-xl font-black text-white">{tournament.rules.auctionTimer}s</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center transition-colors group-hover:bg-white/10">
                        <p className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-1">Increment</p>
                        <p className="text-xl font-black text-white">₹{tournament.rules.bidIncrement}</p>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-6 pt-0 gap-4 flex-col sm:flex-row relative z-10">
                {!isActive ? (
                    <Button
                        onClick={() => setActiveTournament(tournament.id)}
                        className="w-full bg-white/[0.03] border border-white/10 text-white hover:bg-white/10 hover:border-white/30 font-bold uppercase tracking-widest text-xs h-14 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        Establish Uplink
                    </Button>
                ) : (
                    <>
                        <Link href={`/app/auction/${tournament.id}/bid`} className="w-full sm:flex-1">
                            <Button className="w-full bg-[var(--primary)] text-[#0B0E14] hover:bg-[#00F0FF]/90 font-black uppercase tracking-widest text-xs h-14 gap-3 rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all">
                                <Play className="w-5 h-5 fill-current" /> Live Transmission
                            </Button>
                        </Link>
                        <Button variant="outline" className="h-14 w-full sm:w-14 border border-white/10 bg-white/[0.03] hover:bg-white/10 hover:border-white/30 text-white rounded-xl flex items-center justify-center p-0 transition-all flex-shrink-0">
                            <Settings2 className="w-5 h-5" />
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}
