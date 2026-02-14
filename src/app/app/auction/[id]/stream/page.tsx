"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useAuctionStore } from "@/store/useAuctionStore";
import { BROADCAST_THEMES, BroadcastThemeId } from "@/config/broadcast-themes";

// Components
import { PlayerCard } from "@/components/overlay/PlayerCard";
import { CurrentBidCard } from "@/components/overlay/CurrentBidCard";
import { BidHistoryList } from "@/components/overlay/BidHistoryList";
import { NextInQueue } from "@/components/overlay/NextInQueue";
import { TeamStatsTable } from "@/components/overlay/TeamStatsTable";
import { ThemeProvider } from "@/components/theme-provider";
import { RotatingModule } from "@/components/overlay/RotatingModule";
import { BrandingRail, BrandingItem } from "@/components/overlay/BrandingRail";
import { Trophy, Share2, Youtube, Hash, Maximize2, Minimize2, MonitorPlay } from "lucide-react";

function MobileRestrictionGateway() {
    return (
        <div className="fixed inset-0 z-[20000] bg-[#05070A] flex items-center justify-center p-8 text-center overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--theme-primary)]/20 blur-[100px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 max-w-sm w-full space-y-8"
            >
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto backdrop-blur-xl relative z-10">
                        <MonitorPlay className="w-10 h-10 text-white opacity-40" />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center shadow-lg">
                            <span className="text-white font-black text-[10px]">!</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-black uppercase tracking-tight text-white italic">Desktop Only</h2>
                    <p className="text-xs font-medium text-white/40 tracking-wider leading-relaxed">
                        The broadcast control center is optimized for hyper-density transmission on desktop and laptop displays.
                        <br /><br />
                        Mobile access is currently restricted to preserve UI integrity.
                    </p>
                </div>

                <div className="pt-8 border-t border-white/5">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--theme-primary)] animate-pulse">
                        Waiting for Authorized Workstation...
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

function CinematicGateway({ onEnter, onSkip }: { onEnter: () => void, onSkip: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6 text-center"
        >
            <div className="max-w-md w-full space-y-8">
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-[var(--theme-primary)]/20 blur-2xl rounded-full animate-pulse" />
                    <MonitorPlay className="w-16 h-16 text-[var(--theme-primary)] relative z-10 mx-auto" />
                </div>

                <div className="space-y-3">
                    <h2 className="text-3xl font-black uppercase tracking-tight text-white italic">Optimization Required</h2>
                    <p className="text-sm font-medium text-white/50 tracking-wide">
                        For the highest transmission quality and immersive broadcast framing, please enter Cinematic Mode.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={onEnter}
                        className="w-full bg-[var(--theme-primary)] text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,229,255,0.4)]"
                    >
                        Enter Cinematic Mode
                    </button>
                    <button
                        onClick={onSkip}
                        className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white/40 transition-colors"
                    >
                        Continue with browser bars
                    </button>
                </div>

                <div className="pt-8 border-t border-white/5">
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">Broadcast Engine v5.0.2 • Active Stream</p>
                </div>
            </div>
        </motion.div>
    );
}

function StreamViewport({ children }: { children: React.ReactNode }) {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const calculateScale = () => {
            const width = window.innerWidth;
            const height = window.innerHeight - 40; // Minimal safety margin
            const targetWidth = 1600;
            const targetHeight = 950;

            const scaleX = width / targetWidth;
            const scaleY = height / targetHeight;

            // Critical: Always fit to the smaller dimension
            setScale(Math.min(scaleX, scaleY, 1));
        };

        calculateScale();
        window.addEventListener('resize', calculateScale);
        return () => window.removeEventListener('resize', calculateScale);
    }, []);

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden pointer-events-none">
            <div
                style={{
                    transform: `scale(${scale})`,
                    width: '1400px',
                    height: '850px',
                    transformOrigin: 'center center',
                }}
                className="relative shrink-0 pointer-events-auto"
            >
                {children}
            </div>
        </div>
    );
}

function ThemeSwitcher({
    currentThemeId,
    onThemeChange,
    isFullscreen,
    toggleFullscreen
}: {
    currentThemeId: BroadcastThemeId,
    onThemeChange: () => void,
    isFullscreen: boolean,
    toggleFullscreen: () => void
}) {
    return (
        <div className="fixed bottom-6 left-6 z-[9999] bg-black/90 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-2xl opacity-0 hover:opacity-100 transition-all duration-300 pointer-events-auto flex items-center gap-2">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onThemeChange();
                }}
                className="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white/5 text-white hover:bg-white/20 transition-all"
            >
                Theme: <span className="text-[var(--theme-primary)] ml-2">{BROADCAST_THEMES[currentThemeId].name}</span>
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                }}
                className="p-2.5 rounded-xl bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/30 transition-all"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
        </div>
    );
}

// Mock Data
const mockHost = {
    name: "Alex Rivers",
    role: "Auction Host & Tournament Organizer",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
};

const ALL_OWNERS = Array.from({ length: 24 }, (_, i) => ({
    name: [
        "Jonathan 'Ice' Wells", "Angelica Rose", "Christopher 'Viper' Vance",
        "Maxwell Lewis", "Zenith Paul", "Alexander Drake", "Sarah 'Sage' Miller",
        "David 'Reaper' Stone", "Elena 'Nova' Vance", "Marcus 'Titan' Grey",
        "Sienna 'Phoenix' Bell", "Jax 'Shadow' Reid", "Lila 'Aura' Thorne",
        "Kael 'Phantom' Cross", "Rhea 'Vex' Mori", "Talon 'Storm' Frost",
        "Ivy 'Venom' Clarke", "Rocco 'Tank' Russo", "Luna 'Eclipse' Moon",
        "Finn 'Archer' Apex", "Zane 'Zero' Quinn", "Mia 'Mystic' Vale",
        "Gage 'Ghost' Black", "Cora 'Comet' Star"
    ][i % 24],
    team: [
        "ALPHA SQUAD", "BETA WARRIORS", "GAMMA GAMING", "DELTA FORCE", "STORM LEGION", "PHOENIX RISING"
    ][i % 6],
    teamBadge: `https://api.dicebear.com/7.x/identicon/svg?seed=team${i % 6}`,
    imageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=owner${i}`,
    role: "Team Owner"
}));

const mockPlayers = [
    {
        id: "player1",
        name: "Jake 'Phantom' Morrison",
        ign: "PHANTOM",
        imageUrl: "/players/phantom.png",
        role: "IGL",
        stats: { kd: 1.42, winRate: 67, avgDamage: 1850, rank: "Immortal 3" },
        basePrice: 100,
    },
    {
        id: "player2",
        name: "Emma Chen",
        ign: "NOVA",
        imageUrl: "/players/nova.png",
        role: "Duelist",
        stats: { kd: 1.89, winRate: 72, avgDamage: 2150, rank: "Radiant" },
        basePrice: 150,
    },
    {
        id: "player3",
        name: "Marcus Johnson",
        ign: "VIPER",
        imageUrl: "/players/viper.png",
        role: "Controller",
        stats: { kd: 1.34, winRate: 64, avgDamage: 1620, rank: "Immortal 2" },
        basePrice: 120,
    },
    {
        id: "player4",
        name: "Sarah Williams",
        ign: "SAGE",
        imageUrl: "/players/sage.png",
        role: "Sentinel",
        stats: { kd: 1.51, winRate: 69, avgDamage: 1720, rank: "Immortal 3" },
        basePrice: 110,
    },
    {
        id: "player5",
        name: "David Lee",
        ign: "REYNA",
        imageUrl: "/players/reyna.png",
        role: "Duelist",
        stats: { kd: 1.67, winRate: 71, avgDamage: 1950, rank: "Radiant" },
        basePrice: 140,
    },
];

const mockPreviousPlayers = [
    { id: "p1", name: "ACE", status: "Sold for", soldPrice: 300 },
    { id: "p2", name: "SHADOW", status: "Sold to Alpha Squad", soldPrice: 200 },
];

const mockTeamStats = [
    { teamName: "Alpha Squad", players: 3, budget: 1000, spent: 640 },
    { teamName: "Beta Warriors", players: 2, budget: 1000, spent: 340 },
    { teamName: "Gamma Gaming", players: 1, budget: 1000, spent: 240 },
    { teamName: "Delta Force", players: 2, budget: 1000, spent: 290 },
    { teamName: "Storm Legion", players: 1, budget: 1000, spent: 150 },
];

const mockTeams = ["Alpha Squad", "Beta Warriors", "Gamma Gaming", "Delta Force", "Storm Legion"];

function StreamOverlayContent() {
    const params = useParams();
    const id = params?.id as string;
    const {
        tournaments,
        activeTournamentId
    } = useAuctionStore();

    const tournament = tournaments.find(t => t.id === id) || tournaments.find(t => t.id === activeTournamentId) || tournaments[0];

    // --- BROADCAST ENGINE STATES ---
    const [currentThemeId, setCurrentThemeId] = useState<BroadcastThemeId>('cyberpunk');
    const theme = BROADCAST_THEMES[currentThemeId];

    const [demoState, setDemoState] = useState({
        playerIndex: 0,
        status: 'ACTIVE' as 'ACTIVE' | 'SOLD' | 'CRITICAL' | 'WAITING',
        currentBid: mockPlayers[0].basePrice,
        timer: 30,
        bids: [] as any[],
        leadingTeam: null as any
    });

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showGateway, setShowGateway] = useState(true);
    const [skipGateway, setSkipGateway] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const ua = navigator.userAgent;
            const width = window.innerWidth;
            const mobileKeywords = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
            setIsMobile(mobileKeywords.test(ua) || width < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const enterCinematicMode = () => {
        toggleFullscreen();
        setShowGateway(false);
    };

    const skipToBroadcast = () => {
        setSkipGateway(true);
    };

    const [activePanel, setActivePanel] = useState(0);

    // Auto-Flip Data Panels
    useEffect(() => {
        const interval = setInterval(() => {
            setActivePanel((prev) => (prev + 1) % 3);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    // Master Rotation / Auction Simulation (Broadcast Engine Logic)
    useEffect(() => {
        let timerInterval: NodeJS.Timeout;
        let bidInterval: NodeJS.Timeout;

        if (demoState.status === 'ACTIVE' || demoState.status === 'CRITICAL') {
            timerInterval = setInterval(() => {
                setDemoState(prev => {
                    const newTimer = Math.max(0, prev.timer - 1);
                    const newStatus = newTimer <= 0 ? 'SOLD' : (newTimer <= 5 ? 'CRITICAL' : 'ACTIVE');
                    return { ...prev, timer: newTimer, status: newStatus as any };
                });
            }, 1000);

            // Random bid simulation for hype
            bidInterval = setInterval(() => {
                if (Math.random() > 0.4 && demoState.timer > 2) {
                    const randomOwner = ALL_OWNERS[Math.floor(Math.random() * ALL_OWNERS.length)];
                    const bidIncrement = Math.floor(Math.random() * 5 + 1) * 10;

                    setDemoState(prev => {
                        const newBid = prev.currentBid + bidIncrement;
                        const newBidEntry = {
                            id: Math.random().toString(),
                            teamId: randomOwner.team,
                            teamName: randomOwner.team,
                            teamLogo: randomOwner.teamBadge,
                            amount: newBid,
                            timestamp: new Date().toISOString()
                        };
                        return {
                            ...prev,
                            currentBid: newBid,
                            leadingTeam: { name: randomOwner.team, logo: randomOwner.teamBadge },
                            bids: [newBidEntry, ...prev.bids].slice(0, 5),
                            timer: Math.min(prev.timer + 8, 30),
                            status: Math.min(prev.timer + 8, 30) <= 5 ? 'CRITICAL' : 'ACTIVE'
                        };
                    });
                }
            }, 4000);
        } else if (demoState.status === 'SOLD') {
            const resetTimeout = setTimeout(() => {
                setDemoState(prev => ({
                    playerIndex: (prev.playerIndex + 1) % mockPlayers.length,
                    status: 'ACTIVE',
                    currentBid: mockPlayers[(prev.playerIndex + 1) % mockPlayers.length].basePrice,
                    timer: 30,
                    bids: [],
                    leadingTeam: null
                }));
            }, 6000); // SOLD Freeze Frame for 6s
            return () => clearTimeout(resetTimeout);
        }

        return () => {
            clearInterval(timerInterval);
            clearInterval(bidInterval);
        };
    }, [demoState.status]);

    const activePlayer = mockPlayers[demoState.playerIndex];

    if (isMobile) {
        return <MobileRestrictionGateway />;
    }

    const cycleTheme = () => {
        const themes: BroadcastThemeId[] = ['cyberpunk', 'royal-gold', 'tactical', 'minimal-pro', 'arctic'];
        const currentPos = themes.indexOf(currentThemeId);
        const nextPos = (currentPos + 1) % themes.length;
        setCurrentThemeId(themes[nextPos]);
    };

    // Rotational Owner Ribbon
    const [ownerOffset, setOwnerOffset] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setOwnerOffset((prev) => (prev + 1) % ALL_OWNERS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const ownerRibbon = [...ALL_OWNERS, ...ALL_OWNERS].slice(ownerOffset, ownerOffset + 8);

    return (
        <motion.div
            style={{
                // @ts-ignore
                '--theme-primary': theme.primaryAccent,
                '--theme-secondary': theme.secondaryAccent,
                '--theme-border': theme.primaryAccent + '33',
                '--theme-glow': theme.borderGlow,
                '--theme-bg': theme.backgroundGradient,
                '--theme-surface-op': theme.surfaceOpacity,
                fontFamily: theme.fontFamily,
                color: 'white',
            }}
            className={`min-h-screen bg-black text-white select-none overflow-hidden transition-all duration-1000 relative
                ${demoState.status === 'CRITICAL' ? 'shadow-[inset_0_0_200px_rgba(239,68,68,0.3)]' : ''}
                ${demoState.status === 'SOLD' ? 'shadow-[inset_0_0_250px_rgba(34,197,94,0.4)]' : ''}
            `}
            animate={demoState.status === 'CRITICAL' ? {
                x: [-1, 1, -1, 1, 0],
                transition: { duration: 0.1, repeat: Infinity }
            } : { x: 0 }}
        >
            {/* Cinematic Background Layer */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0"
                    style={{ background: theme.backgroundGradient }}
                />

                {/* SOLD Flash Effect */}
                <AnimatePresence>
                    {demoState.status === 'SOLD' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 bg-white z-[100] pointer-events-none"
                        />
                    )}
                </AnimatePresence>
                <div
                    className="absolute inset-0 opacity-[0.03] bg-repeat mix-blend-overlay"
                    style={{ backgroundImage: theme.ambientTexture }}
                />

                {/* Dynamic Ambient Glows */}
                <motion.div
                    animate={{
                        opacity: [0.05, 0.15, 0.05],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[150px]"
                    style={{ backgroundColor: theme.primaryAccent }}
                />
            </div>

            <AnimatePresence>
                {showGateway && !isFullscreen && !skipGateway && (
                    <CinematicGateway onEnter={enterCinematicMode} onSkip={skipToBroadcast} />
                )}
            </AnimatePresence>

            <ThemeSwitcher
                currentThemeId={currentThemeId}
                onThemeChange={cycleTheme}
                isFullscreen={isFullscreen}
                toggleFullscreen={toggleFullscreen}
            />

            {/* BROADCAST GRID: Vertical Side Rails */}
            <BrandingRail
                side="left"
                items={[
                    { id: 't1', content: <BrandingItem title="CODM" sub="Championship" icon={Trophy} /> },
                    { id: 't2', content: <BrandingItem title="LIVE" sub="Production" icon={Share2} /> }
                ]}
            />
            <BrandingRail
                side="right"
                items={[
                    { id: 's1', content: <BrandingItem title="YOUTUBE" sub="AuctionLive" icon={Youtube} /> },
                    { id: 's2', content: <BrandingItem title="#AUCTION26" sub="Join the Chat" icon={Hash} /> }
                ]}
            />

            <StreamViewport>
                <div className="w-full h-full relative z-10 flex flex-col">
                    {/* ZONE 1 + 2: HEADER & MAIN (Hero + Data) */}
                    <div className="flex-1 flex flex-col px-32 py-10 overflow-hidden">
                        {/* 1. Integrated Header HUD */}
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="flex justify-between items-start mb-6"
                        >
                            <div className="flex gap-6">
                                <div className="bg-[var(--theme-primary)] w-1 h-14" />
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[var(--theme-primary)] mb-2 block leading-none">Auction Championship Series</span>
                                    <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">{tournament.name}</h1>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="text-right flex flex-col justify-center">
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-1">Transmission Status</span>
                                    <div className="flex items-center gap-3 justify-end">
                                        <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${demoState.status === 'SOLD' ? 'text-green-500 bg-current' : demoState.status === 'CRITICAL' ? 'text-red-500 bg-current animate-ping' : 'text-blue-500 bg-current animate-pulse'}`} />
                                        <span className={`text-2xl font-black uppercase italic tracking-widest ${demoState.status === 'CRITICAL' ? 'text-red-500' : 'text-white'}`}>{demoState.status}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 2. Massive Hero Area (Bleeding edge-to-edge content area) */}
                        <div className="flex-1 relative mb-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activePlayer.id}
                                    initial={{ opacity: 0, x: 100, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -100, scale: 1.1 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full h-full"
                                >
                                    <PlayerCard
                                        player={activePlayer as any}
                                        status={demoState.status === 'SOLD' ? 'sold' : 'bidding'}
                                        soldTo={demoState.leadingTeam}
                                        finalPrice={demoState.currentBid}
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Bid & Timer Overlays (Floating) */}
                            <div className="absolute right-0 bottom-24 w-96 space-y-4">
                                <motion.div
                                    animate={demoState.status === 'CRITICAL' ? { scale: [1, 1.02, 1] } : {}}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                >
                                    <CurrentBidCard
                                        amount={demoState.currentBid}
                                        teamName={demoState.leadingTeam?.name || "RESERVE PRICE"}
                                        teamLogo={demoState.leadingTeam?.logo}
                                        timeRemaining={demoState.timer}
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* 3. Bottom Data Rail - Automated Broadcast Cycling */}
                        <div className="h-[260px] shrink-0 grid grid-cols-12 gap-10">
                            {/* LEFT MODULE SLOT (4 cols) */}
                            <div className="col-span-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden relative">
                                <RotatingModule
                                    active={activePanel === 0}
                                    moduleId="metrics"
                                    title="Team Acquisition Metrics"
                                >
                                    <TeamStatsTable stats={mockTeamStats.slice(0, 4)} />
                                </RotatingModule>

                                <RotatingModule
                                    active={activePanel === 1}
                                    moduleId="roster-chunks"
                                    title="Team Ownership Roster"
                                >
                                    <div className="grid grid-cols-2 gap-3 h-full overflow-hidden p-2">
                                        {ALL_OWNERS.slice(activePanel * 2, activePanel * 2 + 4).map(o => (
                                            <div key={o.name} className="flex flex-col bg-white/5 p-3 rounded-xl border border-white/5">
                                                <span className="text-[9px] font-black text-[var(--theme-primary)] mb-1 uppercase tracking-widest">{o.team}</span>
                                                <span className="text-sm font-bold truncate">{o.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </RotatingModule>

                                <RotatingModule
                                    active={activePanel === 2}
                                    moduleId="leaderboard"
                                    title="Financial Standings"
                                >
                                    <div className="space-y-2 pr-2">
                                        {mockTeamStats.sort((a, b) => b.budget - a.budget).slice(0, 5).map((t, idx) => (
                                            <div key={t.teamName} className="flex justify-between items-center bg-black/40 p-2.5 rounded-xl border border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-black text-white/20">#{idx + 1}</span>
                                                    <span className="text-xs font-bold">{t.teamName}</span>
                                                </div>
                                                <span className="text-xs font-black text-[var(--theme-primary)]">₹{t.budget - t.spent}k</span>
                                            </div>
                                        ))}
                                    </div>
                                </RotatingModule>
                            </div>

                            {/* RIGHT MODULE SLOT (8 cols) - Main Transmission Log */}
                            <div className="col-span-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 overflow-hidden relative">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Transmission Log</h3>
                                    <div className="bg-white/10 px-3 py-1 rounded text-[8px] font-bold uppercase tracking-widest">Live Updates</div>
                                </div>

                                <BidHistoryList
                                    bids={demoState.bids.slice(0, 10).map(b => ({
                                        ...b,
                                        timestamp: new Date(b.timestamp).toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })
                                    }))}
                                    playerName={activePlayer.ign}
                                    basePrice={activePlayer.basePrice}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </StreamViewport>
        </motion.div>
    );
}

export default function StreamOverlayPage() {
    return (
        <ThemeProvider>
            <StreamOverlayContent />
        </ThemeProvider>
    );
}
