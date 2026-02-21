"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Download, Copy, Check } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface GamingCardProps {
    player: any;
    game: any;
    trigger?: React.ReactNode;
}

export function GamingCard({ player, game, trigger }: GamingCardProps) {
    const [copied, setCopied] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        // In a real implementation, we would use html-to-image here.
        // For now, we'll just simulate a download or show a toast.
        // Since we can't easily add new dependencies, we'll just log it.
        console.log("Download requested for", game.name);
        alert("Image generation would happen here (requires html-to-image package)");
    };

    // Game-specific themes (mock logic)
    const getTheme = (gameName: string) => {
        if (gameName.includes("Valorant")) return "from-rose-500 to-orange-500";
        if (gameName.includes("Call of Duty")) return "from-emerald-500 to-teal-900";
        if (gameName.includes("League")) return "from-blue-600 to-cyan-400";
        if (gameName.includes("CS")) return "from-yellow-500 to-amber-700";
        return "from-primary to-purple-600";
    };

    const gradient = getTheme(game.name);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="sm" className="gap-2 border-white/10 bg-white/5 hover:bg-white/10 text-white">
                        <Share2 className="w-4 h-4" /> Share Card
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#020617] border-white/10 text-white p-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle>Share Your Legend</DialogTitle>
                </DialogHeader>

                <div className="p-6 pt-2 flex flex-col items-center gap-6">
                    {/* The Card Itself */}
                    <div
                        ref={cardRef}
                        className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-500 group"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 bg-black">
                            <img
                                src={player.image}
                                alt={player.ign}
                                className="w-full h-full object-cover opacity-80 mix-blend-overlay"
                            />
                            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60 mix-blend-color", gradient)} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white uppercase tracking-widest font-bold font-heading">
                                        {game.name}
                                    </Badge>
                                    {player.verificationStatus === 'verified' && (
                                        <Badge className="bg-green-500/80 backdrop-blur-md border-none text-white px-1.5 py-0.5">
                                            <CheckCircle2 className="w-3 h-3" />
                                        </Badge>
                                    )}
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold uppercase text-white/60 font-heading">Rank</p>
                                    <p className="text-xl font-black uppercase italic tracking-tighter text-white drop-shadow-lg font-heading">
                                        {game.rank}
                                    </p>
                                </div>
                            </div>

                            {/* Middle (Player) */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white/10 rotate-[-15deg] whitespace-nowrap select-none font-heading">
                                    {player.ign}
                                </h1>
                            </div>

                            {/* Footer (Stats) */}
                            <div className="space-y-4 relative z-10">
                                <div>
                                    <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white drop-shadow-md font-heading">
                                        {game.ign}
                                    </h2>
                                    <p className="text-sm font-bold uppercase tracking-widest text-primary font-mono">
                                        {game.roles.join(' / ')}
                                    </p>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    {game.stats.slice(0, 3).map((stat: any, i: number) => (
                                        <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-2 text-center">
                                            <p className="text-[8px] font-bold uppercase text-white/50 font-heading">{stat.label}</p>
                                            <p className="text-lg font-black text-white font-mono">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Holo Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 w-full">
                        <Button
                            className="flex-1 gap-2 bg-[var(--primary)] text-[#0B0E14] hover:bg-[#00F0FF]/90 font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                            onClick={handleDownload}
                        >
                            <Download className="w-4 h-4" /> Download
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1 gap-2 border-white/10 hover:bg-white/5 hover:text-white text-white/80"
                            onClick={handleCopyLink}
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? "Copied" : "Copy Link"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
