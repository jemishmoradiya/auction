"use client";

import { useAuctionStore } from "@/store/useAuctionStore";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import {
    Trophy,
    Play,
    Pause,
    Gavel,
    History,
    Users,
    TrendingUp,
    Clock,
    Activity,
    Shield,
    Target,
    Zap,
    Monitor,
    User,
    Swords,
    Flag,
    Settings,
    ChevronRight,
    Search,
    UserCheck,
    Briefcase
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ProDashboardPage() {
    const params = useParams();
    const id = params?.id as string;
    const {
        auctionState,
        players,
        teams,
        tournaments,
        activeTournamentId,
        setAuctionStatus,
        tickTimer,
        markSold,
        markUnsold,
        nextPlayer,
        placeBid
    } = useAuctionStore();

    const tournament = tournaments.find(t => t.id === id) || tournaments.find(t => t.id === activeTournamentId) || tournaments[0];

    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState("Live Auction");

    useEffect(() => {
        setMounted(true);
    }, []);

    // Timer interval logic (sharing the logic from Host page)
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

    if (!mounted) return null;

    const timerPercentage = (auctionState.timer / tournament.rules.auctionTimer) * 100;
    const isCrisis = auctionState.timer <= 10;
    const isImminent = auctionState.timer <= 5;

    return (
        <div className="min-h-screen bg-[#05070A] text-slate-200 font-sans selection:bg-[var(--primary)]/30 relative overflow-hidden">
            {/* Background Decorations (Softened for Earthen Clay) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--primary)]/5 rounded-full blur-[150px] -mr-96 -mt-96 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--secondary)]/5 rounded-full blur-[120px] -ml-40 -mb-40 animate-pulse delay-1000" />
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            </div>

            {/* HEADER */}
            <header className="sticky top-0 z-50 border-b border-white/5 bg-white/[0.01] backdrop-blur-xl px-8 h-20 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[var(--primary)] flex items-center justify-center rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                            <Trophy className="w-6 h-6 text-[#0B0E14]" />
                        </div>
                        <div>
                            <span className="text-xl font-black tracking-tighter italic uppercase flex items-center gap-2 text-white">
                                AUCTION<span className="text-[var(--primary)] italic">NEXT</span>
                            </span>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">{tournament.name}</p>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                        {["Bidding", "Live Auction", "Teams", "Players"].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all",
                                    activeTab === tab ? "bg-[var(--primary)] text-[#0B0E14] shadow-[0_0_10px_rgba(0,240,255,0.3)]" : "text-white/40 hover:text-white"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <p className="text-[9px] font-black uppercase text-white/40 tracking-widest">Operator Status</p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                            <span className="text-xs font-bold uppercase tracking-tight text-white">Viper_Main_Admin</span>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                        <Settings className="w-5 h-5 text-white/40" />
                    </div>
                </div>
            </header>

            {/* MAIN DASHBOARD GRID */}
            <main className="grid grid-cols-12 gap-6 p-8 relative z-10 max-w-[1600px] mx-auto">

                {/* LEFT COLUMN (4 cols): Manager Hub */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Host Card */}
                    <Card className="bg-white/[0.02] border-white/10 backdrop-blur-xl rounded-[2rem] overflow-hidden group shadow-2xl">
                        <div className="aspect-video bg-white/5 relative flex items-center justify-center overflow-hidden">
                            {/* Host Image */}
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                                alt="Host"
                                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4 z-20">
                                <Badge className="bg-[#FF2E63] text-white animate-pulse text-[10px] font-black tracking-[0.2em] border-none shadow-[0_0_10px_rgba(255,46,99,0.5)]">LIVE FEED</Badge>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 text-left relative z-10">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--primary)] mb-1">Moderator Presence</p>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Alex "Kaze" Chen</h3>
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-4">Transmission Protocol</p>
                            <div className="flex gap-3">
                                <Button variant="secondary" className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-[10px] uppercase font-black italic tracking-widest h-10">Toggle Camera</Button>
                                <Button variant="secondary" className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-[10px] uppercase font-black italic tracking-widest h-10">Mute Audio</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Team Owner Grid */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic flex items-center gap-2">
                                <Briefcase className="w-3 h-3" /> Stakeholder Terminals
                            </h3>
                            <span className="text-[10px] font-black text-[var(--primary)] italic uppercase tracking-widest px-3 py-1 bg-[var(--primary)]/10 rounded-full border border-[var(--primary)]/20 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                                {teams.length} Partners Online
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {teams.map(team => {
                                const isLeading = auctionState.leadingTeamId === team.id;
                                return (
                                    <div key={team.id} className={cn(
                                        "bg-white/[0.02] border rounded-[1.5rem] p-4 transition-all duration-500 relative overflow-hidden group hover:scale-[1.02] backdrop-blur-xl",
                                        isLeading ? "border-[var(--primary)] shadow-[0_0_15px_rgba(0,240,255,0.2)] bg-[var(--primary)]/5" : "border-white/10 hover:border-[var(--primary)]/30"
                                    )}>
                                        <div className="flex items-center gap-3 relative z-10">
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl overflow-hidden shadow-sm transition-colors border",
                                                isLeading ? "border-[var(--primary)]" : "border-white/10"
                                            )}>
                                                {team.logo ? (
                                                    <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-white/5 flex items-center justify-center text-white font-black">{team.name[0]}</div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-black uppercase italic tracking-tighter truncate leading-none mb-1 text-white">{team.name}</p>
                                                <div className="flex items-center gap-2">
                                                    <div className={cn("w-1.5 h-1.5 rounded-full", isLeading ? "bg-[var(--primary)] animate-pulse shadow-[0_0_8px_rgba(0,240,255,0.5)]" : "bg-white/20")} />
                                                    <p className="text-[9px] font-bold text-white/40 truncate leading-none">{team.ownerName}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between relative z-10">
                                            <div className="text-left">
                                                <p className="text-[8px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">BUDGET</p>
                                                <p className={cn("text-xs font-black tabular-nums italic", isLeading ? "text-[var(--primary)]" : "text-white")}>
                                                    ₹{(team.budget - team.spent).toLocaleString()}
                                                </p>
                                            </div>
                                            <Badge className={cn(
                                                "text-[8px] font-black border-none uppercase tracking-widest h-5 px-2 italic",
                                                isLeading ? "bg-[var(--primary)] text-[#0B0E14]" : "bg-white/5 text-white/40"
                                            )}>
                                                {isLeading ? "LEADING" : "ACTIVE"}
                                            </Badge>
                                        </div>
                                        {isLeading && <div className="absolute bottom-0 right-0 w-12 h-12 bg-primary/10 blur-xl rounded-full" />}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* CENTER COLUMN (5 cols): Player Spotlight */}
                <div className="col-span-12 lg:col-span-5 space-y-6">
                    {/* Hero Player Card */}
                    <Card className="bg-gradient-to-b from-white/[0.05] to-[#0B0E14] border-white/10 rounded-[2.5rem] p-0 relative overflow-hidden shadow-2xl min-h-[500px] flex flex-col justify-between group backdrop-blur-3xl">

                        {currentPlayer ? (
                            <>
                                {/* Dynamic Background Image */}
                                {currentPlayer.image && (
                                    <>
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                            style={{ backgroundImage: `url(${currentPlayer.image})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/80 to-transparent" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E14]/90 to-transparent" />
                                    </>
                                )}

                                <div className="relative z-10 p-10 flex flex-col h-full justify-between animate-fade-in-up">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-4">
                                            <div className="flex gap-2">
                                                <Badge className="bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20 text-[10px] font-black uppercase tracking-widest px-3 h-6">
                                                    {currentPlayer.role}
                                                </Badge>
                                                <Badge variant="outline" className="border-white/5 text-white/20 text-[10px] font-black uppercase tracking-widest h-6 gap-2">
                                                    <Flag className="w-3 h-3" /> IN
                                                </Badge>
                                            </div>
                                            <h2 className="text-6xl font-black italic uppercase tracking-tighter leading-none drop-shadow-2xl text-white">
                                                {currentPlayer.ign}
                                            </h2>
                                            <p className="text-lg text-white/60 font-bold uppercase tracking-[0.4em] italic">{currentPlayer.name}</p>
                                        </div>

                                        {/* Stylized Rank Icon instead of Avatar box */}
                                        <div className="w-20 h-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                                            <Trophy className="w-10 h-10 text-[var(--primary)] animate-pulse" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 mt-auto mb-10">
                                        <div className="space-y-3">
                                            {[
                                                { label: "K/D RATIO", value: currentPlayer.stats.kd, icon: Target },
                                                { label: "WIN RATE", value: `${currentPlayer.stats.winRate}%`, icon: Zap },
                                                { label: "COMBAT TIER", value: currentPlayer.stats.rank, icon: Shield }
                                            ].map((stat, i) => (
                                                <div key={i} className="flex items-center gap-3 bg-black/40 border border-white/5 p-3 rounded-xl hover:bg-white/5 transition-colors backdrop-blur-md">
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[var(--primary)]/60">
                                                        <stat.icon className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-0.5">{stat.label}</p>
                                                        <p className="text-base font-black italic text-white">{stat.value}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center backdrop-blur-md">
                                            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-3">VALUATION Chip</p>
                                            <p className="text-4xl font-black italic tabular-nums text-[#FF2E63] drop-shadow-[0_0_15px_rgba(255,46,99,0.5)]">₹{currentPlayer.basePrice.toLocaleString()}</p>
                                            <div className="mt-4 flex items-center gap-2">
                                                <div className="h-1 w-8 bg-[var(--primary)] rounded-full" />
                                                <span className="text-[9px] font-black text-[var(--primary)]/60 uppercase tracking-widest italic">BASE PRICE</span>
                                                <div className="h-1 w-8 bg-[var(--primary)] rounded-full opacity-30" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center space-y-8 opacity-20 p-10">
                                <Monitor className="w-32 h-32 animate-pulse" />
                                <div>
                                    <h3 className="text-3xl font-black uppercase tracking-[0.4em] italic text-center">Protocol Standby</h3>
                                    <p className="text-xs font-bold uppercase tracking-[0.8em] text-white/40 mt-3 text-center">Awaiting System Deployment</p>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 relative z-10 p-6 pt-0">
                            {auctionState.status === 'IDLE' ? (
                                <Button
                                    className="flex-1 h-16 bg-[#FF2E63] text-white hover:bg-[#FF2E63]/90 font-black italic uppercase tracking-tighter text-xl rounded-2xl shadow-[0_15px_40px_-10px_rgba(255,46,99,0.4)]"
                                    onClick={() => setAuctionStatus('BIDDING')}
                                    disabled={!currentPlayer}
                                >
                                    <Play className="w-6 h-6 mr-3 fill-current" /> Start Auction
                                </Button>
                            ) : auctionState.status === 'BIDDING' ? (
                                <div className="flex gap-3 w-full">
                                    <Button
                                        className="flex-1 h-16 bg-[var(--secondary)] text-white hover:bg-[var(--secondary)]/90 font-black italic uppercase tracking-tighter text-xl rounded-2xl shadow-[0_15px_40px_-10px_rgba(176,38,255,0.3)]"
                                        onClick={() => markSold()}
                                    >
                                        <UserCheck className="w-6 h-6 mr-3" /> Hammer Down (SOLD)
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-16 h-16 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10"
                                        onClick={() => setAuctionStatus('PAUSED')}
                                    >
                                        <Pause className="w-6 h-6" />
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    className="flex-1 h-16 bg-white/10 overflow-hidden text-white hover:bg-white/20 border border-white/20 font-black italic uppercase tracking-tighter text-xl rounded-2xl animate-in zoom-in-95"
                                    onClick={() => nextPlayer()}
                                >
                                    Initiate Next Unit <ChevronRight className="w-8 h-8 ml-2" />
                                </Button>
                            )}
                        </div>
                    </Card>

                    {/* Next Queue strip */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 italic flex items-center gap-2">
                                <TrendingUp className="w-3 h-3" /> Command Queue
                            </h3>
                        </div>
                        <div className="flex gap-4 overflow-x-hidden p-1">
                            {auctionState.queue.slice(0, 5).map((id, i) => {
                                const p = players.find(x => x.id === id);
                                return (
                                    <div key={id} className="min-w-[160px] flex-1 bg-white/[0.03] border border-white/5 rounded-2xl p-3 group hover:bg-white/[0.06] hover:border-white/10 transition-all cursor-pointer flex items-center gap-3 hover:animate-glitch">
                                        <div className="w-10 h-10 rounded-lg bg-black/40 overflow-hidden border border-white/10">
                                            {p?.image && <img src={p.image} alt={p.ign} className="w-full h-full object-cover" />}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">0{i + 1}</p>
                                            <p className="text-xs font-black italic uppercase truncate text-white/80 group-hover:text-[var(--primary)] transition-colors">{p?.ign}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN (3 cols): Action Center */}
                <div className="col-span-12 lg:col-span-3 space-y-6">
                    {/* Current Bid Action Card */}
                    <Card className="bg-white/[0.03] border-white/5 backdrop-blur-3xl rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-2 h-full bg-[var(--primary)]/20" />

                        <div className="space-y-8 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] italic">Transmitted Bid</p>
                                    <p key={auctionState.currentBid} className="text-5xl font-black italic tabular-nums text-[#FF2E63] drop-shadow-[0_0_20px_rgba(255,46,99,0.5)] animate-bounce-short">₹{auctionState.currentBid.toLocaleString()}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-[9px] font-black text-white/30 tracking-[0.3em] uppercase mb-1">Clock</p>
                                    <p className={cn(
                                        "text-4xl font-black italic font-mono tabular-nums leading-none",
                                        isImminent ? "text-[#FF2E63] animate-pulse drop-shadow-[0_0_15px_rgba(255,46,99,0.8)]" : "text-white"
                                    )}>
                                        {auctionState.timer}
                                    </p>
                                </div>
                            </div>

                            {leadingTeam ? (
                                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl group-hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[var(--primary)]/20 rounded-xl overflow-hidden border border-[var(--primary)]/20 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                                            {leadingTeam.logo ? (
                                                <img src={leadingTeam.logo} alt={leadingTeam.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[var(--primary)] font-black italic">{leadingTeam.name[0]}</div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Active Leader</p>
                                            <p className="text-sm font-black italic uppercase tracking-tighter text-white/90">{leadingTeam.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-center gap-3 text-white/20 italic">
                                    <Gavel className="w-4 h-4" />
                                    <span className="text-[10px] uppercase font-black">Awaiting Engagement</span>
                                </div>
                            )}

                            {/* Rapid Bidding Emulator for Host */}
                            <div className="space-y-3 pt-4 border-t border-white/5">
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] text-center mb-4">Manual Integration</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {[10, 25, 50, 100].map(inc => (
                                        <Button
                                            key={inc}
                                            variant="secondary"
                                            className="h-10 bg-white/5 border border-white/5 hover:bg-[var(--primary)] hover:text-[#0B0E14] hover:border-[var(--primary)] text-[10px] font-black italic rounded-xl transition-all"
                                            onClick={() => {
                                                if (leadingTeam && currentPlayer) {
                                                    placeBid(leadingTeam.id, auctionState.currentBid + (inc * 100));
                                                    toast.success(`Manual correction: +₹${(inc * 100).toLocaleString()}`);
                                                }
                                            }}
                                        >
                                            BID +{(inc).toLocaleString()}k
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Timer Progress */}
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-4">
                                <div
                                    className={cn(
                                        "h-full transition-all duration-1000",
                                        auctionState.timer > 10 ? "bg-[var(--primary)]" :
                                            auctionState.timer > 5 ? "bg-[var(--secondary)]" : "bg-[#FF2E63] shadow-[0_0_15px_rgba(255,46,99,0.5)]"
                                    )}
                                    style={{ width: `${timerPercentage}%` }}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Bid History Feed */}
                    <Card className="bg-white/[0.02] border-white/5 backdrop-blur-3xl rounded-[2rem] flex-1 flex flex-col overflow-hidden max-h-[350px]">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic flex items-center gap-2 font-black">
                                <History className="w-3 h-3" /> Acquisition Pulse
                            </h3>
                            <span className="text-[9px] font-black text-[var(--primary)] italic px-2 py-0.5 bg-[var(--primary)]/10 rounded-full">{auctionState.bidHistory.length}</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                            {auctionState.bidHistory.slice(0, 10).map((bid, i) => {
                                const team = teams.find(t => t.id === bid.teamId);
                                return (
                                    <div key={bid.id} className={cn(
                                        "flex items-center justify-between p-3 rounded-xl border transition-all animate-in slide-in-from-right",
                                        i === 0 ? "bg-[var(--primary)]/10 border-[var(--primary)]/20" : "bg-white/5 border-transparent opacity-60 hover:opacity-100"
                                    )}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 overflow-hidden border border-white/10 flex items-center justify-center text-[10px] font-black italic">
                                                {team?.logo ? <img src={team.logo} alt={team.name} className="w-full h-full object-cover" /> : team?.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase italic tracking-tighter leading-none mb-1">{team?.name}</p>
                                                <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{new Date(bid.timestamp).toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-black italic text-[var(--primary)] tabular-nums">₹{bid.amount.toLocaleString()}</p>
                                            <div className="flex justify-end mt-1">
                                                <ChevronRight className="w-2 h-2 text-white/20" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>

                {/* BOTTOM SECTION: Team Stats Summary */}
                <div className="col-span-12">
                    <Card className="bg-white/[0.03] border-white/5 backdrop-blur-3xl rounded-[2rem] p-8 shadow-2xl relative overflow-hidden overflow-x-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 italic flex items-center gap-2">
                                <Users className="w-4 h-4" /> Comprehensive Partner Roster Intelligence
                            </h3>
                            <div className="flex gap-4">
                                <Search className="w-4 h-4 text-white/20 hover:text-[var(--primary)] transition-colors cursor-pointer" />
                                <Badge variant="outline" className="border-white/10 text-[9px] uppercase tracking-widest font-black italic py-1 px-4">Standard Operational Protocol</Badge>
                            </div>
                        </div>
                        <table className="w-full text-left">
                            <thead className="border-b border-white/5">
                                <tr className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                                    <th className="pb-4 pl-4 font-black">Strategic Partner</th>
                                    <th className="pb-4 font-black">Contract Capacity</th>
                                    <th className="pb-4 font-black">Reserves (Remaining)</th>
                                    <th className="pb-4 font-black">Slayer</th>
                                    <th className="pb-4 font-black">Anchor</th>
                                    <th className="pb-4 font-black">Support</th>
                                    <th className="pb-4 font-black">Flex</th>
                                    <th className="pb-4 pr-4 font-black text-right">Completion</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {teams.map(t => {
                                    const rosterCount = t.roster.length;
                                    const percentage = (rosterCount / tournament.rules.maxPlayers) * 100;
                                    // Calculate roles (fake for now based on mock logic)
                                    const getRoleCount = (role: string) => {
                                        return t.roster.map(id => players.find(p => p.id === id)).filter(p => p?.role === role).length;
                                    };

                                    return (
                                        <tr key={t.id} className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="py-5 pl-4 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white/5 overflow-hidden border border-white/10 flex items-center justify-center text-[10px] font-black italic group-hover:bg-[var(--primary)] group-hover:text-[#0B0E14] transition-colors">
                                                    {t.logo ? <img src={t.logo} alt={t.name} className="w-full h-full object-cover" /> : t.name[0]}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-black uppercase italic tracking-tighter text-white/90 truncate">{t.name}</p>
                                                    <p className="text-[9px] text-white/20 tracking-widest font-bold">{t.ownerName}</p>
                                                </div>
                                            </td>
                                            <td className="py-5 font-black text-xs italic text-white/60">{rosterCount} / {tournament.rules.maxPlayers}</td>
                                            <td className="py-5 font-black text-xs italic text-[var(--primary)] tabular-nums">₹{(t.budget - t.spent).toLocaleString()}</td>
                                            <td className="py-5 font-black text-xs italic text-white/40">{getRoleCount('Slayer')}</td>
                                            <td className="py-5 font-black text-xs italic text-white/40">{getRoleCount('Anchor')}</td>
                                            <td className="py-5 font-black text-xs italic text-white/40">{getRoleCount('Support')}</td>
                                            <td className="py-5 font-black text-xs italic text-white/40">{getRoleCount('Flex')}</td>
                                            <td className="py-5 pr-4 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <div className="w-20 h-1 hidden sm:block bg-white/5 rounded-full overflow-hidden">
                                                        <div className="h-full bg-[var(--primary)] transition-all duration-700" style={{ width: `${percentage}%` }} />
                                                    </div>
                                                    <span className="text-[10px] font-black italic text-[var(--primary)]">{Math.round(percentage)}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </Card>
                </div>

            </main>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                    height: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(var(--primary), 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(var(--primary), 0.2);
                }
            `}</style>
        </div>
    );
}
