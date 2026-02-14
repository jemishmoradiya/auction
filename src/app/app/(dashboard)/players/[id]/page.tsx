"use client";

import { useAuctionStore } from "@/store/useAuctionStore";
import { useParams, useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    Trophy,
    Target,
    Zap,
    Shield,
    Medal,
    ExternalLink,
    Monitor,
    Mouse,
    Keyboard,
    Headphones,
    Twitter,
    Instagram,
    Youtube,
    Gamepad2,
    Share2,
    Edit3,
    CheckCircle2,
    Video
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GamingCard } from "@/components/profile/gaming-card";
import { EditPlayerModal } from "@/components/profile/EditPlayerModal";
import { motion, AnimatePresence } from "framer-motion";

export default function PlayerDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { players } = useAuctionStore();
    const [mounted, setMounted] = useState(false);
    const [activeGameIndex, setActiveGameIndex] = useState(0);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const player = players.find((p) => p.id === id);

    if (!mounted) return null;
    if (!player) return <div className="p-8 text-center text-muted-foreground">Player not found or classified.</div>;

    const activeGame = player.games?.[activeGameIndex] || {
        name: "Main Title",
        ign: player.ign,
        roles: [player.role],
        rank: player.stats.rank,
        stats: [
            { label: "K/D", value: player.stats.kd },
            { label: "Win Rate", value: `${player.stats.winRate}%` },
            { label: "Matches", value: player.stats.matchesPlayed }
        ]
    };

    return (
        <div className="min-h-screen bg-[var(--bg-main)] text-white pb-20 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/10 to-[var(--bg-main)] -z-10" />

            {/* Decorative Orbs */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10 animate-pulse" />
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-fade-in-up">
                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        className="gap-2 text-muted-foreground hover:text-white hover:bg-white/10"
                        onClick={() => router.back()}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Directory
                    </Button>
                    <div className="flex gap-2">
                        <GamingCard
                            player={player}
                            game={activeGame}
                            trigger={
                                <Button variant="outline" size="sm" className="gap-2 border-white/10 bg-white/5 hover:bg-white/10 text-white">
                                    <Share2 className="w-4 h-4" /> Share Card
                                </Button>
                            }
                        />
                        <Button
                            variant="default"
                            size="sm"
                            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={() => setIsEditModalOpen(true)}
                        >
                            <Edit3 className="w-4 h-4" /> Edit Profile
                        </Button>
                    </div>
                </div>

                <EditPlayerModal
                    player={player}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                />

                {/* Hero Section */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <Card className="relative bg-[var(--bg-card)] border-[var(--border)] overflow-hidden">
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                                {/* Avatar / Image Side */}
                                <div className="w-full md:w-1/3 lg:w-1/4 relative min-h-[350px] md:min-h-[450px] group/avatar">
                                    <div className="absolute inset-0">
                                        <img
                                            src={player.image || "https://placehold.co/400x400/1a1a1a/ffffff?text=NO+IMG"}
                                            alt={player.ign}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/avatar:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-90" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-card)]/80 via-[var(--bg-card)]/20 to-transparent" />

                                        {/* Scanner Line Effect */}
                                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                            <div className="w-full h-[2px] bg-primary/40 shadow-[0_0_15px_rgba(59,130,246,0.5)] absolute top-0 animate-scanline" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-8 left-8 z-10">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground border-none text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 font-heading shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                                    {player.role}
                                                </Badge>
                                                {player.verificationStatus === 'verified' && (
                                                    <Badge className="bg-green-500/90 hover:bg-green-500 text-white border-none text-[9px] font-black uppercase tracking-widest px-2 py-0.5 flex gap-1 items-center">
                                                        <CheckCircle2 className="w-3 h-3" /> Verified
                                                    </Badge>
                                                )}
                                            </div>
                                            <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white drop-shadow-2xl font-heading leading-none flex items-center gap-4">
                                                {player.ign}
                                            </h1>
                                            <p className="text-white/40 font-bold text-sm tracking-widest mt-2 font-mono uppercase">
                                                // {player.name}
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Info Side */}
                                <div className="flex-1 p-8 md:p-10 flex flex-col justify-between bg-gradient-to-br from-white/[0.02] to-transparent">
                                    <div className="space-y-8">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-3 max-w-2xl">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary font-heading">Personnel Bio Protocol</h3>
                                                </div>
                                                <p className="text-xl text-white/90 leading-relaxed font-sans font-medium">
                                                    {player.bio || "No bio data available. This operative is keeping a low profile."}
                                                </p>
                                            </div>
                                            <div className="hidden lg:flex flex-col gap-2">
                                                <p className="text-[9px] font-black text-right text-white/20 uppercase tracking-[0.2em] mb-1">Network Links</p>
                                                <div className="flex gap-2">
                                                    {[
                                                        { icon: Twitter, link: player.socials?.twitter, color: '#1DA1F2' },
                                                        { icon: Monitor, link: player.socials?.twitch, color: '#9146FF' },
                                                        { icon: Youtube, link: player.socials?.youtube, color: '#FF0000' }
                                                    ].filter(s => s.link).map((social, i) => (
                                                        <a
                                                            key={i}
                                                            href={social.link}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:scale-110 active:scale-95"
                                                        >
                                                            <social.icon className="w-5 h-5 text-white/60" />
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/5">
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase font-bold text-white/40">Base Price</p>
                                                <p className="text-2xl font-black text-[var(--accent)] tabular-nums tracking-tight">
                                                    {player.basePrice} <span className="text-xs font-normal text-white/40">CR</span>
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase font-bold text-white/40">Total Earnings</p>
                                                <p className="text-2xl font-black text-[var(--accent)] tabular-nums tracking-tight">
                                                    $45.2k
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase font-bold text-white/40">Tournaments</p>
                                                <p className="text-2xl font-black text-white tabular-nums tracking-tight">
                                                    {player.stats.matchesPlayed}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase font-bold text-white/40">Status</p>
                                                <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10 shadow-[0_0_10px_rgba(74,222,128,0.5)]">Active</Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex items-center justify-between text-xs text-white/30 uppercase tracking-widest font-mono">
                                        <span>ID: {player.id}</span>
                                        <span>Last Sync: {new Date().toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Games & Stats (8 cols) */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Game Selector */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 font-heading flex items-center gap-2">
                                    <Gamepad2 className="w-4 h-4" /> Loaded Title Profiles
                                </h3>
                                <div className="flex gap-1">
                                    <div className="w-8 h-1 bg-primary/40 rounded-full" />
                                    <div className="w-4 h-1 bg-white/10 rounded-full" />
                                </div>
                            </div>
                            <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {player.games?.map((game, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveGameIndex(i)}
                                        className={cn(
                                            "group relative flex items-center gap-4 px-8 py-5 rounded-2xl border transition-all duration-500 min-w-[220px] overflow-hidden",
                                            activeGameIndex === i
                                                ? "bg-primary/10 border-primary/50 text-white shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]"
                                                : "bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/5 hover:border-white/20"
                                        )}
                                    >
                                        {activeGameIndex === i && (
                                            <motion.div
                                                layoutId="game-glow"
                                                className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent"
                                            />
                                        )}
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center border transition-colors duration-500",
                                            activeGameIndex === i ? "bg-primary/20 border-primary/30" : "bg-black/20 border-white/5 group-hover:border-white/10"
                                        )}>
                                            <Gamepad2 className={cn("w-6 h-6", activeGameIndex === i ? "text-primary" : "text-white/20")} />
                                        </div>
                                        <div className="text-left relative z-10">
                                            <p className="text-xs font-black uppercase leading-none font-heading tracking-wider">{game.name}</p>
                                            <p className="text-[10px] font-bold opacity-60 mt-1.5 font-mono text-primary/80 uppercase tracking-tighter">
                                                {game.rank} • {game.roles.join(' / ')}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Active Game Stats Dashboard */}
                        <div className="relative group/stats">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-[2rem] blur opacity-0 group-hover/stats:opacity-100 transition duration-1000" />
                            <Card className="relative bg-[#17191F]/80 backdrop-blur-xl border-white/5 rounded-[2rem] overflow-hidden">
                                <CardHeader className="flex flex-col md:flex-row items-center justify-between border-b border-white/5 p-8">
                                    <div className="space-y-2">
                                        <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 font-mono text-[9px] font-bold tracking-widest uppercase px-2">
                                            System Integrated Record
                                        </Badge>
                                        <CardTitle className="text-3xl font-black italic uppercase tracking-tighter flex items-center gap-4 font-heading text-white">
                                            {activeGame.name}
                                            <span className="text-white/10 text-xl font-black not-italic">//</span>
                                            <span className="text-primary text-xl font-black uppercase tracking-widest px-4 py-1 bg-primary/10 rounded-lg border border-primary/20">{activeGame.rank}</span>
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">
                                        <div className="text-right">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 font-heading mb-1">Authenticated ID</p>
                                            <code className="text-base font-black text-white bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                                                {activeGame.ign}
                                            </code>
                                        </div>
                                        <GamingCard player={player} game={activeGame} />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {activeGame.stats.map((stat, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all group/stat relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover/stat:opacity-100 transition-opacity">
                                                    <Target className="w-3 h-3 text-primary/40" />
                                                </div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2 group-hover/stat:text-primary transition-colors font-heading">{stat.label}</p>
                                                <p className="text-4xl font-black text-white tracking-tighter font-mono group-hover/stat:scale-110 transition-transform origin-left">{stat.value}</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Action Visualizer */}
                                    <div className="mt-8 space-y-4">
                                        <div className="flex justify-between items-center px-2">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Operational Efficiency</span>
                                            <span className="text-[10px] font-black uppercase text-primary font-mono tracking-widest">Optimal Range</span>
                                        </div>
                                        <div className="h-[120px] w-full bg-black/40 rounded-2xl border border-white/5 flex items-end justify-between p-4 px-8 relative overflow-hidden group/viz">
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
                                            {[...Array(12)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-4 bg-primary/20 rounded-t-sm"
                                                    initial={{ height: 10 }}
                                                    animate={{
                                                        height: [20, 50, 30, 70, 40, 60, 20][i % 7] + Math.random() * 20,
                                                        backgroundColor: i % 3 === 0 ? "rgba(59,130,246,0.4)" : "rgba(59,130,246,0.2)"
                                                    }}
                                                    transition={{
                                                        duration: 0.8,
                                                        repeat: Infinity,
                                                        repeatType: "reverse",
                                                        delay: i * 0.05
                                                    }}
                                                />
                                            ))}
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <div className="text-center">
                                                    <Zap className="w-6 h-6 text-primary mx-auto mb-1 opacity-40 animate-pulse" />
                                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/60">Live Performance Feed</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                    </div>

                    {/* Right Column: Setup & Achievements (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Battle Station */}
                        <Card className="bg-[#17191F]/80 backdrop-blur-xl border-white/5 rounded-[2rem] overflow-hidden">
                            <CardHeader className="p-8 pb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <CardTitle className="text-lg font-black uppercase italic tracking-tighter flex items-center gap-2 text-white font-heading">
                                        <Monitor className="w-5 h-5 text-primary" />
                                        Battle Station
                                    </CardTitle>
                                    <Badge className="bg-green-500/20 text-green-400 border-none text-[8px] font-black uppercase tracking-widest">Verified Specs</Badge>
                                </div>
                                <CardDescription className="text-white/20 text-[10px] font-black uppercase tracking-widest font-heading">Hardware Configuration Profile</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 pt-0 space-y-3">
                                {player.setup ? (
                                    <>
                                        {[
                                            { icon: Mouse, label: 'Mouse', value: player.setup.mouse },
                                            { icon: Keyboard, label: 'Keyboard', value: player.setup.keyboard },
                                            { icon: Headphones, label: 'Headset', value: player.setup.headset },
                                            { icon: Monitor, label: 'Monitor', value: player.setup.monitor }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group/hw">
                                                <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center group-hover/hw:bg-primary/10 group-hover/hw:border-primary/20 transition-all">
                                                    <item.icon className="w-6 h-6 text-white/40 group-hover/hw:text-primary transition-colors" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-1 font-heading">{item.label}</p>
                                                    <p className="text-xs font-black text-white/80 group-hover/hw:text-white transition-colors font-mono">{item.value}</p>
                                                </div>
                                                <ExternalLink className="w-3 h-3 text-white/10 opacity-0 group-hover/hw:opacity-100 transition-opacity" />
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className="text-center py-10">
                                        <div className="w-16 h-16 rounded-full bg-white/5 border border-dashed border-white/10 flex items-center justify-center mx-auto mb-4">
                                            <Zap className="w-8 h-8 text-white/10" />
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Hardware Data Unavailable</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                    </div>
                </div>

                {/* Video Gallery */}
                {player.videos && player.videos.length > 0 && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-3 text-white font-heading">
                                <Video className="w-6 h-6 text-primary" />
                                Highlight Gallery
                            </h3>
                            <Badge variant="outline" className="border-white/10 text-white/40 uppercase text-[9px] tracking-widest px-3">
                                {player.videos.length} VIDEOS LOADED
                            </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {player.videos.map((video, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="group relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-black/40 hover:border-primary/30 transition-all shadow-2xl"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                                    {/* Mock Video Thumbnail */}
                                    <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                                <Video className="w-8 h-8 text-primary" />
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Click to Play Broadcast</p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6 z-20">
                                        <Badge className="mb-2 bg-primary/20 text-primary border-primary/30 backdrop-blur-sm text-[8px] font-black uppercase tracking-widest">
                                            {video.category}
                                        </Badge>
                                        <h4 className="text-lg font-black italic uppercase tracking-tighter text-white group-hover:text-primary transition-colors leading-tight">
                                            {video.title}
                                        </h4>
                                        <p className="text-white/40 text-[10px] font-bold mt-1 font-mono uppercase tracking-widest flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-primary" />
                                            YOUTUBE.COM/WATCH?V=...
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30">
                                        <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform shadow-2xl">
                                            <ExternalLink className="w-6 h-6" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Achievements Gallery */}
                <div>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-yellow-500" />
                        Trophy Cabinet
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {player.achievements.map((url, i) => (
                            <div key={i} className="group relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
                                <img
                                    src={url}
                                    alt={`Achievement ${i + 1}`}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                    <p className="text-white font-bold text-sm">Championship Win</p>
                                    <p className="text-white/60 text-xs">2023 Season</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

function TrendingUp({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </svg>
    )
}
