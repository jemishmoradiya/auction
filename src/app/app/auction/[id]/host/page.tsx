
"use client";

import { useAuctionStore } from "@/store/useAuctionStore";
import { useEffect, useState, useCallback } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Play,
    Pause,
    ChevronRight,
    Gavel,
    UserPlus,
    UserMinus,
    RotateCcw,
    Keyboard,
    Timer,
    Trophy
} from "lucide-react";
import { toast } from "sonner";
import { Player, Team } from "@/types";
import { cn } from "@/lib/utils";

export default function AuctionHostPage() {
    const {
        auctionState,
        players,
        teams,
        tournaments,
        activeTournamentId,
        setAuctionStatus,
        setCurrentPlayer,
        tickTimer,
        markSold,
        markUnsold,
        nextPlayer,
        resetDemo,
        placeBid
    } = useAuctionStore();

    const tournament = tournaments.find(t => t.id === activeTournamentId)!;

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Timer interval
    useEffect(() => {
        if (auctionState.status === 'BIDDING') {
            const interval = setInterval(() => {
                tickTimer();
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [auctionState.status, tickTimer]);

    const currentPlayer = players.find(p => p.id === auctionState.currentPlayerId);
    const leadingTeam = teams.find(t => t.id === auctionState.leadingTeamId);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            const key = e.key.toLowerCase();

            switch (key) {
                case 'n':
                    nextPlayer();
                    toast.info("Moved to next player");
                    break;
                case 'b':
                    if (auctionState.status === 'IDLE' && auctionState.currentPlayerId) {
                        setAuctionStatus('BIDDING');
                        toast.success("Bidding started!");
                    }
                    break;
                case ' ':
                    e.preventDefault();
                    if (auctionState.status === 'BIDDING') {
                        setAuctionStatus('PAUSED');
                        toast.info("Auction paused");
                    } else if (auctionState.status === 'PAUSED') {
                        setAuctionStatus('BIDDING');
                        toast.success("Auction resumed");
                    }
                    break;
                case 's':
                    if (auctionState.leadingTeamId) {
                        markSold();
                        toast.success("Player SOLD!");
                    } else {
                        toast.warning("No leading team to sell to!");
                    }
                    break;
                case 'u':
                    if (auctionState.currentPlayerId) {
                        markUnsold();
                        toast.info("Player marked as UNSOLD");
                    }
                    break;
                case 'r':
                    if (confirm("Reset demo data? All progress will be lost.")) {
                        resetDemo();
                        toast.error("Demo reset to seed data");
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [auctionState, setAuctionStatus, nextPlayer, markSold, markUnsold, resetDemo]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#05070A] text-slate-200 relative overflow-hidden">
            {/* Background Cinematic Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--primary)]/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF2E63]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
            </div>

            <div className="max-w-[1600px] mx-auto p-8 lg:p-12 space-y-12 relative z-10 flex flex-col h-screen">
                <div className="flex items-center justify-between border-b border-white/5 pb-10">
                    <div className="flex items-center gap-6">
                        <div className="space-y-1">
                            <h1 className="text-5xl font-black uppercase tracking-tighter text-white italic leading-none">
                                Strategic <span className="text-[var(--primary)] drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">Command</span>
                            </h1>
                            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">
                                Central Operations • Host Interference Mode
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                            <div className="flex items-center gap-2">
                                <Keyboard className="w-4 h-4 text-[var(--primary)]" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">Shortcuts Optimized</span>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => resetDemo()}
                            className="h-12 px-6 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white font-black uppercase tracking-widest text-[10px] gap-3"
                        >
                            <RotateCcw className="w-4 h-4" /> Reset Environment
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 overflow-hidden">
                    {/* Left: Current Player Control */}
                    <div className="lg:col-span-2 space-y-6 flex flex-col overflow-hidden">
                        <Card className="border-white/10 bg-white/[0.02] shadow-2xl flex-1 flex flex-col overflow-hidden min-h-[500px] relative backdrop-blur-3xl rounded-[2.5rem]">
                            {/* Progress Bar Overlay */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                                <div
                                    className={cn(
                                        "h-full transition-all duration-1000",
                                        auctionState.timer > 10 ? "bg-[var(--primary)] shadow-[0_0_10px_rgba(0,240,255,0.5)]" :
                                            auctionState.timer > 5 ? "bg-[var(--secondary)] shadow-[0_0_10px_rgba(176,38,255,0.5)]" : "bg-[#FF2E63] shadow-[0_0_10px_rgba(255,46,99,0.5)]"
                                    )}
                                    style={{ width: `${(auctionState.timer / tournament.rules.auctionTimer) * 100}%` }}
                                />
                            </div>
                            <CardHeader className="border-b border-white/5 bg-white/[0.01] py-8 px-10">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 italic">
                                        <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse shadow-[0_0_10px_rgba(0,240,255,1)]" />
                                        Live Transmission Stream
                                    </CardTitle>
                                    <div className="flex items-center gap-10">
                                        <div className="flex flex-col items-center">
                                            <span className="text-[9px] uppercase font-black text-white/20 tracking-[0.3em] mb-1">Hammer Timing</span>
                                            <div className={cn(
                                                "text-5xl font-mono font-black italic tracking-tighter",
                                                auctionState.timer < 5 ? "text-[#FF2E63] animate-pulse drop-shadow-[0_0_10px_rgba(255,46,99,0.8)]" : "text-[var(--primary)]"
                                            )}>
                                                {auctionState.timer}S
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] italic transform border transition-all",
                                            auctionState.status === 'BIDDING'
                                                ? "bg-[var(--secondary)]/10 text-[var(--secondary)] border-[var(--secondary)]/30 shadow-[0_0_15px_rgba(176,38,255,0.3)]"
                                                : "bg-white/5 text-white/30 border-white/10"
                                        )}>
                                            STATUS: {auctionState.status}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 p-10 flex flex-col items-center justify-center relative">
                                {currentPlayer ? (
                                    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                        <div className="relative group">
                                            <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-[var(--primary)]/10 to-transparent border border-[var(--primary)]/20 flex items-center justify-center text-9xl font-black text-[var(--primary)]/30 shadow-[0_0_30px_rgba(0,240,255,0.1)] relative overflow-hidden backdrop-blur-md">
                                                <span className="absolute -bottom-10 -right-10 text-[15rem] opacity-10 select-none text-[var(--primary)] uppercase mix-blend-overlay">{currentPlayer.ign[0]}</span>
                                                {currentPlayer.ign[0].toUpperCase()}
                                            </div>
                                            <Badge className="absolute -top-3 -right-3 bg-[var(--primary)] text-[#0B0E14] border-none px-6 py-2 text-lg shadow-[0_0_20px_rgba(0,240,255,0.4)] uppercase font-black transform -skew-x-12">
                                                {currentPlayer.role}
                                            </Badge>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="space-y-2">
                                                <p className="text-[var(--primary)] font-black uppercase tracking-[0.4em] text-[10px] italic mb-4">Transmission Focus</p>
                                                <h2 className="text-8xl font-black tracking-tighter uppercase italic leading-none text-white">{currentPlayer.ign}</h2>
                                                <p className="text-xl text-white/20 font-black uppercase tracking-[0.3em] mt-4">{currentPlayer.name}</p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-8 bg-white/[0.03] p-8 rounded-[2rem] border border-white/5 backdrop-blur-sm">
                                                <div>
                                                    <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-2 italic">Active Signature</p>
                                                    <p className="text-6xl font-black text-[var(--primary)] tabular-nums italic tracking-tighter drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">₹{auctionState.currentBid}K</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-2 italic">Lead Entity</p>
                                                    <p className="text-2xl font-black italic uppercase truncate text-white/60 tracking-tighter">{leadingTeam?.name || "Initializing..."}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-5 pt-6">
                                                {auctionState.status === 'IDLE' && (
                                                    <Button size="lg" className="flex-1 h-24 text-3xl font-black italic uppercase tracking-tighter bg-[var(--primary)] text-[#0B0E14] hover:bg-[#00F0FF]/90 shadow-[0_0_30px_rgba(0,240,255,0.4)] rounded-2xl transition-all hover:scale-[1.02]" onClick={() => setAuctionStatus('BIDDING')}>
                                                        <Gavel className="w-10 h-10 mr-4" /> INITIATE (B)
                                                    </Button>
                                                )}
                                                {auctionState.status === 'BIDDING' && (
                                                    <>
                                                        <Button size="lg" className="flex-1 h-24 text-3xl font-black italic uppercase tracking-tighter bg-[var(--secondary)] hover:bg-[#B026FF]/90 text-white shadow-[0_0_30px_rgba(176,38,255,0.4)] rounded-2xl transition-all hover:scale-[1.02]" onClick={() => markSold()}>
                                                            <UserPlus className="w-10 h-10 mr-4" /> SELL (S)
                                                        </Button>
                                                        <Button size="lg" variant="outline" className="h-24 w-24 text-xl font-black italic uppercase border-white/10 bg-white/5 hover:bg-white/10 rounded-2xl" onClick={() => setAuctionStatus('PAUSED')}>
                                                            <Pause className="w-8 h-8 text-white" />
                                                        </Button>
                                                    </>
                                                )}
                                                {auctionState.status === 'PAUSED' && (
                                                    <Button size="lg" className="flex-1 h-24 text-3xl font-black italic uppercase tracking-tighter bg-[var(--primary)] text-[#0B0E14] hover:bg-[#00F0FF]/90 shadow-[0_0_30px_rgba(0,240,255,0.4)] rounded-2xl transition-all" onClick={() => setAuctionStatus('BIDDING')}>
                                                        <Play className="w-10 h-10 mr-4" /> RESUME
                                                    </Button>
                                                )}
                                                {(auctionState.status === 'SOLD' || auctionState.status === 'UNSOLD' || auctionState.status === 'IDLE') && (
                                                    <Button size="lg" variant="outline" className="flex-1 h-24 text-3xl font-black italic uppercase tracking-tighter border-white/10 bg-white/5 hover:bg-white/10 rounded-2xl" onClick={() => nextPlayer()}>
                                                        NEXT SIGNAL (N) <ChevronRight className="w-10 h-10 ml-4" />
                                                    </Button>
                                                )}
                                                {auctionState.status === 'IDLE' && (
                                                    <Button size="lg" variant="outline" className="h-24 px-10 text-2xl font-black italic uppercase border-[#FF2E63]/30 text-[#FF2E63] hover:bg-[#FF2E63]/10 hover:text-[#FF2E63] rounded-2xl transition-all" onClick={() => markUnsold()}>
                                                        <UserMinus className="w-8 h-8" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-8 opacity-40">
                                        <Trophy className="w-32 h-32 mx-auto" />
                                        <div>
                                            <h3 className="text-4xl font-black uppercase tracking-[0.3em] italic">Floor Empty</h3>
                                            <Button className="mt-6 font-black uppercase italic h-14 px-8 text-lg" onClick={() => nextPlayer()} disabled={auctionState.queue.length === 0}>
                                                Bring to Floor
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Queue & History */}
                    <div className="space-y-6 flex flex-col overflow-hidden">
                        <Card className="bg-white/[0.02] border border-white/10 backdrop-blur-xl flex-1 flex flex-col overflow-hidden rounded-[2rem] shadow-xl">
                            <CardHeader className="py-6 border-b border-white/5">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-white">
                                    <Timer className="w-4 h-4 text-[var(--primary)]" />
                                    Up Next ({auctionState.queue.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 overflow-y-auto flex-1">
                                <div className="divide-y divide-white/5">
                                    {auctionState.queue.slice(0, 5).map((id, i) => {
                                        const player = players.find(p => p.id === id);
                                        return (
                                            <div key={id} className="flex items-center gap-4 p-5 hover:bg-white/[0.04] transition-colors">
                                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-white/50 border border-white/10">
                                                    #{i + 1}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold truncate text-white uppercase tracking-tight">{player?.ign}</p>
                                                    <p className="text-[10px] text-[var(--primary)] font-bold uppercase tracking-widest">
                                                        {player?.role} • ₹{player?.basePrice}K
                                                    </p>
                                                </div>
                                                <Badge variant="outline" className="text-[10px] whitespace-nowrap bg-white/5 border-white/10 text-white/60 font-mono tracking-widest">
                                                    KD {player?.stats.kd}
                                                </Badge>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/[0.02] border border-white/10 backdrop-blur-xl h-1/3 flex flex-col overflow-hidden rounded-[2rem] shadow-xl">
                            <CardHeader className="py-6 border-b border-white/5 bg-[var(--primary)]/5">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-white">
                                    <Gavel className="w-4 h-4 text-[var(--primary)]" />
                                    Live Bid Feed
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 overflow-y-auto flex-1">
                                {auctionState.bidHistory.length > 0 ? (
                                    <div className="divide-y divide-white/5">
                                        {auctionState.bidHistory.map((bid) => {
                                            const team = teams.find(t => t.id === bid.teamId);
                                            return (
                                                <div key={bid.id} className="p-5 flex items-center justify-between group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                                                        <p className="font-bold text-sm tracking-widest uppercase text-white/80">{team?.name}</p>
                                                    </div>
                                                    <p className="text-xl font-black text-[var(--primary)] italic tracking-tighter">₹{bid.amount.toLocaleString()}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="h-full flex items-center justify-center p-8 text-center">
                                        <p className="text-xs text-white/30 uppercase font-black tracking-[0.3em]">Waiting for bids...</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div >
    );
}
