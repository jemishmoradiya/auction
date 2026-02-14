
"use client";

import { useAuctionStore } from "@/store/useAuctionStore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Gavel,
    User,
    Wallet,
    AlertTriangle,
    History,
    CheckCircle2,
    Trophy,
    Target,
    Zap
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DigitalScramble } from "@/components/ui/DigitalScramble";

// Role slot types for visual representation
const ROLE_SLOTS = {
    Slayer: 2,
    Anchor: 1,
    OBJ: 2
};

export default function BidderPage() {
    const params = useParams();
    const id = params?.id as string;
    const {
        auctionState,
        players,
        teams,
        tournaments,
        activeTournamentId,
        placeBid
    } = useAuctionStore();

    const tournament = tournaments.find(t => t.id === id) || tournaments.find(t => t.id === activeTournamentId) || tournaments[0];

    const [mounted, setMounted] = useState(false);
    const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
    const [bidAdjustment, setBidAdjustment] = useState(0);

    // Reset adjustment when player changes
    useEffect(() => {
        setBidAdjustment(0);
    }, [auctionState.currentPlayerId]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentPlayer = players.find(p => p.id === auctionState.currentPlayerId);
    const myTeam = teams.find(t => t.id === selectedTeamId);
    const leadingTeam = teams.find(t => t.id === auctionState.leadingTeamId);

    if (!mounted) return null;

    if (!selectedTeamId || !myTeam) {
        return (
            <div className="p-8 max-w-2xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-tight">Select Your Team</h1>
                    <p className="text-muted-foreground">Identify as a team owner to start bidding.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teams.map(team => (
                        <Button
                            key={team.id}
                            variant="outline"
                            className="h-24 text-lg font-bold flex flex-col gap-1 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all"
                            onClick={() => setSelectedTeamId(team.id)}
                        >
                            {team.name}
                            <span className="text-xs font-normal text-muted-foreground">Owner: {team.ownerName}</span>
                        </Button>
                    ))}
                </div>
            </div>
        );
    }

    const isLeading = auctionState.leadingTeamId === selectedTeamId;
    const baseNextBid = auctionState.leadingTeamId
        ? auctionState.currentBid + tournament.rules.bidIncrement
        : currentPlayer?.basePrice || 0;

    const nextBidAmount = baseNextBid + bidAdjustment;


    const handleBid = () => {
        if (!myTeam || !currentPlayer) return;

        if (myTeam.budget - myTeam.spent < nextBidAmount) {
            toast.error("Insufficient budget!");
            return;
        }

        if (myTeam.roster.length >= tournament.rules.maxPlayers) {
            toast.error("Maximum roster size reached!");
            return;
        }

        placeBid(myTeam.id, nextBidAmount);
        toast.success(`Bid placed: ₹${nextBidAmount.toLocaleString()}`);
        setBidAdjustment(0);
    };

    const timerPercentage = (auctionState.timer / tournament.rules.auctionTimer) * 100;
    const isCrisis = auctionState.timer <= 5;
    return (
        <div className="min-h-screen bg-[#05070A] text-slate-200 relative overflow-hidden">
            {/* Background Cinematic Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--theme-primary)]/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--theme-accent)]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-[var(--theme-secondary)]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
            </div>

            <div className="max-w-[1600px] mx-auto p-8 lg:p-12 space-y-12 relative z-10 pb-32">
                {/* Header: Team Identity */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/5 pb-10">
                    <div className="flex items-center gap-8">
                        <div className="w-24 h-24 rounded-[2rem] bg-white/[0.03] border border-white/10 flex items-center justify-center text-[var(--theme-primary)] relative overflow-hidden backdrop-blur-3xl group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Trophy className="w-10 h-10 drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white flex items-center gap-4 leading-none">
                                {myTeam.name}
                                {isLeading && (
                                    <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--theme-secondary)]/10 border border-[var(--theme-secondary)]/20 text-[var(--theme-secondary)] text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-secondary)]" />
                                        Leading Offer
                                    </div>
                                )}
                            </h1>
                            <div className="flex items-center gap-6 pt-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Operational Fuel</span>
                                    <span className="text-xl font-black text-[var(--theme-secondary)] tabular-nums italic tracking-tighter">₹{(myTeam.budget - myTeam.spent).toLocaleString()}</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-white/10" />
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Owner ID</span>
                                    <span className="text-xs font-black text-white/60 uppercase tracking-widest">{myTeam.ownerName}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                        <div className="w-2 h-2 rounded-full bg-[var(--theme-primary)] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">War Room Node Active</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content: Spotlight & Bidding */}
                    <div className="lg:col-span-8 space-y-8">
                        {currentPlayer ? (
                            <div className="space-y-6">
                                {/* Player Spotlight Card */}
                                <Card className={cn(
                                    "border-white/10 bg-white/[0.02] shadow-2xl overflow-hidden relative backdrop-blur-3xl rounded-[2.5rem]",
                                    isCrisis && "ring-2 ring-[var(--theme-accent)]/50 ring-offset-4 ring-offset-[#05070A] animate-pulse"
                                )}>
                                    {/* Progress Bar Overlay */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                                        <div
                                            className={cn(
                                                "h-full transition-all duration-1000",
                                                auctionState.timer > 10 ? "bg-[var(--theme-primary)]" :
                                                    auctionState.timer > 5 ? "bg-[var(--theme-secondary)]" : "bg-[var(--theme-accent)]"
                                            )}
                                            style={{ width: `${timerPercentage}%` }}
                                        />
                                    </div>

                                    <CardContent className="p-0">
                                        <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                                            <div className="md:col-span-2 relative h-full min-h-[350px] bg-white/[0.02] flex items-center justify-center border-r border-white/5 overflow-hidden">
                                                {/* Glow behind avatar */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                                                <div className="w-56 h-56 rounded-[3rem] bg-white/5 border-2 border-white/10 flex items-center justify-center text-9xl font-black text-white/5 relative group">
                                                    <span className="absolute inset-0 flex items-center justify-center opacity-30 select-none">{currentPlayer.ign[0]}</span>
                                                    <div className="absolute inset-0 bg-[var(--theme-primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl" />
                                                </div>
                                                <div className="absolute bottom-10 left-10 z-20">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Badge className="bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20 uppercase font-black text-[9px] tracking-[0.2em] px-3 py-1 rounded-lg">
                                                            {currentPlayer.role} SIGNAL
                                                        </Badge>
                                                    </div>
                                                    <h2 className="text-6xl font-black italic uppercase tracking-tighter text-white leading-none">{currentPlayer.ign}</h2>
                                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mt-2">{currentPlayer.name}</p>
                                                </div>
                                            </div>

                                            <div className="md:col-span-3 p-12 flex flex-col justify-between space-y-12">
                                                <div className="grid grid-cols-2 gap-8">
                                                    <div className="space-y-2">
                                                        <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">Current Lead Transmission</p>
                                                        <div className="flex items-baseline gap-2">
                                                            <span className="text-2xl font-black text-[var(--theme-secondary)] italic">₹</span>
                                                            <DigitalScramble value={auctionState.currentBid} className="text-7xl font-black text-white tracking-tighter italic" />
                                                            <span className="text-2xl font-black text-white/20 uppercase italic pb-1">K</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 pt-1">
                                                            <div className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-pulse" />
                                                            <p className="text-[10px] font-black italic text-white/60 uppercase tracking-widest">{leadingTeam?.name || "Establishing Connection..."}</p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2 text-right">
                                                        <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Base Valuation</p>
                                                        <p className="text-3xl font-black text-white/10 tracking-tighter italic">₹{currentPlayer.basePrice}K</p>
                                                    </div>
                                                </div>

                                                {/* Tactical Command Center */}
                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-between gap-6 bg-white/[0.03] p-6 rounded-3xl border border-white/10 backdrop-blur-xl">
                                                        <div className="flex items-center gap-5">
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 w-12 h-12 text-white/60 hover:text-white transition-all"
                                                                onClick={() => setBidAdjustment(Math.max(0, bidAdjustment - tournament.rules.bidIncrement))}
                                                                disabled={bidAdjustment <= 0}
                                                            >
                                                                -
                                                            </Button>
                                                            <div className="text-center min-w-[140px]">
                                                                <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mb-1">Strategic Offer</p>
                                                                <p className="text-3xl font-black text-white tabular-nums italic tracking-tighter">₹{nextBidAmount}K</p>
                                                            </div>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 w-12 h-12 text-white/60 hover:text-white transition-all"
                                                                onClick={() => setBidAdjustment(bidAdjustment + tournament.rules.bidIncrement)}
                                                            >
                                                                +
                                                            </Button>
                                                        </div>
                                                        <div className="h-12 w-px bg-white/10" />
                                                        <div className="text-center">
                                                            <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mb-1">Impact Lock</p>
                                                            <p className={cn(
                                                                "text-3xl font-black tabular-nums italic tracking-tighter",
                                                                isCrisis ? "text-[var(--theme-accent)] animate-pulse" : "text-white"
                                                            )}>{auctionState.timer}S</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-4">
                                                        <Button
                                                            size="lg"
                                                            className="flex-1 h-24 text-4xl font-black italic uppercase tracking-tighter shadow-[0_20px_50px_-10px_rgba(255,46,99,0.3)] group relative overflow-hidden rounded-[2rem] transition-all duration-500"
                                                            disabled={isLeading || auctionState.status !== 'BIDDING' || (myTeam.budget - myTeam.spent < nextBidAmount)}
                                                            onClick={handleBid}
                                                        >
                                                            <div className={cn(
                                                                "absolute inset-0 transition-colors duration-500",
                                                                isCrisis ? "bg-[var(--theme-accent)]" : "bg-white/10 group-hover:bg-white/15"
                                                            )} />
                                                            <div className="absolute bottom-0 left-0 h-1 bg-white opacity-20" style={{ width: `${timerPercentage}%` }} />

                                                            <span className={cn(
                                                                "relative flex items-center justify-center gap-6 z-10 transition-transform group-hover:scale-[1.05]",
                                                                isCrisis ? "text-white" : "text-[var(--theme-accent)]"
                                                            )}>
                                                                <Zap className="w-10 h-10 fill-current" />
                                                                DEPLOY BID ₹{nextBidAmount}K
                                                            </span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Hammer Warning Overlay for extreme urgency */}
                                {isCrisis && (
                                    <div className="bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 p-6 rounded-[2rem] flex items-center justify-center gap-6 animate-bounce shadow-[0_10px_40px_-10px_rgba(255,46,99,0.3)]">
                                        <AlertTriangle className="w-6 h-6 text-[var(--theme-accent)]" />
                                        <span className="text-sm font-black uppercase tracking-[0.6em] text-[var(--theme-accent)] italic">Impact Imminent: {auctionState.timer}s Remaining</span>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {teams.map(t => {
                                        const teamIsLeading = auctionState.leadingTeamId === t.id;
                                        return (
                                            <Card key={t.id} className={cn(
                                                "bg-white/[0.03] border-white/10 overflow-hidden backdrop-blur-2xl rounded-3xl transition-all duration-500",
                                                teamIsLeading && "border-[var(--theme-primary)]/40 bg-[var(--theme-primary)]/[0.05] ring-1 ring-[var(--theme-primary)]/20 shadow-[0_10px_30px_-5px_rgba(0,229,255,0.2)]"
                                            )}>
                                                <CardHeader className="p-5 space-y-0 pb-3">
                                                    <div className="flex items-center justify-between">
                                                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 italic">
                                                            <div className={cn("w-1.5 h-1.5 rounded-full", teamIsLeading ? "bg-[var(--theme-primary)] animate-pulse" : "bg-white/10")} />
                                                            {t.name}
                                                        </CardTitle>
                                                        <span className="text-[10px] font-black tabular-nums text-white/40 italic">₹{(t.budget - t.spent).toLocaleString()}</span>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="p-5 pt-0">
                                                    <div className="flex gap-1.5">
                                                        {[...Array(tournament.rules.maxPlayers)].map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className={cn(
                                                                    "h-1.5 flex-1 rounded-full border border-white/5",
                                                                    i < t.roster.length
                                                                        ? "bg-[var(--theme-primary)] shadow-[0_0_8px_rgba(0,229,255,0.4)]"
                                                                        : "bg-white/5"
                                                                )}
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="mt-3 flex justify-between items-center">
                                                        <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Roster</p>
                                                        <p className="text-[10px] font-black italic uppercase text-[var(--theme-primary)] opacity-60 tracking-tighter">{t.roster.length} / {tournament.rules.maxPlayers}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <Card className="h-[400px] flex items-center justify-center border-dashed border-2 py-20 bg-card/20 border-border">
                                <div className="text-center space-y-6 opacity-40">
                                    <div className="w-24 h-24 rounded-full bg-muted mx-auto flex items-center justify-center">
                                        <Gavel className="w-12 h-12" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black uppercase tracking-[0.3em]">Standby</h3>
                                        <p className="text-sm font-bold uppercase tracking-widest mt-2">Waiting for Moderator to start next session</p>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar: My Roster & History */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="bg-white/[0.02] border-white/10 shadow-2xl overflow-hidden backdrop-blur-3xl rounded-[2rem] border-l-2 border-l-[var(--theme-primary)]/20">
                            <CardHeader className="py-6 bg-white/5 border-b border-white/10">
                                <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 italic">
                                    <History className="w-4 h-4 text-[var(--theme-primary)]" />
                                    Transmission Feed
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                                    {auctionState.bidHistory.length > 0 ? (
                                        <div className="divide-y divide-white/5">
                                            {auctionState.bidHistory.map((bid, i) => {
                                                const team = teams.find(t => t.id === bid.teamId);
                                                const player = players.find(p => p.id === bid.playerId);
                                                return (
                                                    <div key={bid.id} className={cn(
                                                        "p-6 flex items-center justify-between group transition-all duration-300",
                                                        i === 0 ? "bg-[var(--theme-primary)]/[0.05]" : "hover:bg-white/5"
                                                    )}>
                                                        <div className="flex items-center gap-5">
                                                            <div className={cn(
                                                                "w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-black italic border transition-all",
                                                                bid.teamId === selectedTeamId
                                                                    ? "bg-[var(--theme-primary)] text-black border-[var(--theme-primary)]/50"
                                                                    : "bg-white/5 text-white/40 border-white/10"
                                                            )}>
                                                                {team?.name[0]}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-black uppercase tracking-tight italic text-white leading-none">{team?.name}</p>
                                                                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mt-1.5">{player?.ign}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-black italic text-[var(--theme-primary)] tracking-tighter">₹{bid.amount}K</p>
                                                            <p className="text-[8px] font-black text-white/10 uppercase tracking-[0.2em] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                {new Date(bid.timestamp).toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="p-24 text-center space-y-4">
                                            <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10">
                                                <History className="w-8 h-8 opacity-20 text-[var(--theme-primary)]" />
                                            </div>
                                            <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.4em]">Standby for signal...</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
