"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuctionStore } from "@/store/useAuctionStore";
import { Trophy, Gamepad2, Calendar, IndianRupee, Timer, TrendingUp, Users } from "lucide-react";

interface CreateTournamentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateTournamentModal({ isOpen, onClose }: CreateTournamentModalProps) {
    const { createTournament } = useAuctionStore();
    const [formData, setFormData] = useState({
        name: "",
        game: "",
        prizePool: 50000,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        rules: {
            minPlayers: 5,
            maxPlayers: 7,
            auctionTimer: 30,
            bidIncrement: 50,
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createTournament({
            ...formData,
            prizePool: Number(formData.prizePool),
            rules: {
                ...formData.rules,
                minPlayers: Number(formData.rules.minPlayers),
                maxPlayers: Number(formData.rules.maxPlayers),
                auctionTimer: Number(formData.rules.auctionTimer),
                bidIncrement: Number(formData.rules.bidIncrement),
            }
        });
        onClose();
        setFormData({
            name: "",
            game: "",
            prizePool: 50000,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            rules: {
                minPlayers: 5,
                maxPlayers: 7,
                auctionTimer: 30,
                bidIncrement: 50,
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] bg-[var(--background)] border-white/10 text-white p-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-transparent pointer-events-none" />

                <DialogHeader className="p-8 pb-0 relative">
                    <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter flex items-center gap-3 font-heading">
                        <Trophy className="w-8 h-8 text-[var(--primary)]" />
                        Create Tournament
                    </DialogTitle>
                    <DialogDescription className="text-white/40 font-bold uppercase tracking-widest text-[10px]">
                        Initialize a new theatre of competitive operations
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="p-8 pt-6 space-y-6 relative">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[10px] uppercase font-black tracking-widest text-white/40 font-heading flex items-center gap-2">
                                Tournament Name
                            </Label>
                            <Input
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-white/5 border-white/10 focus:border-[var(--primary)]/50 text-white font-heading italic uppercase tracking-tight"
                                placeholder="E.G. CHAMPIONS CUP"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="game" className="text-[10px] uppercase font-black tracking-widest text-white/40 font-heading flex items-center gap-2">
                                Target Game
                            </Label>
                            <Input
                                id="game"
                                required
                                value={formData.game}
                                onChange={(e) => setFormData({ ...formData, game: e.target.value })}
                                className="bg-white/5 border-white/10 focus:border-[var(--primary)]/50 text-white"
                                placeholder="E.G. CALL OF DUTY: MOBILE"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="prizePool" className="text-[10px] uppercase font-black tracking-widest text-white/40 font-heading">
                                Prize Pool (₹)
                            </Label>
                            <div className="relative">
                                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30" />
                                <Input
                                    id="prizePool"
                                    type="number"
                                    value={formData.prizePool}
                                    onChange={(e) => setFormData({ ...formData, prizePool: Number(e.target.value) })}
                                    className="bg-white/5 border-white/10 focus:border-[var(--primary)]/50 text-white pl-8 font-mono"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="startDate" className="text-[10px] uppercase font-black tracking-widest text-white/40 font-heading">
                                Launch Date
                            </Label>
                            <Input
                                id="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                className="bg-white/5 border-white/10 focus:border-[var(--primary)]/50 text-white font-mono"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate" className="text-[10px] uppercase font-black tracking-widest text-white/40 font-heading">
                                Conclusion
                            </Label>
                            <Input
                                id="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                className="bg-white/5 border-white/10 focus:border-[var(--primary)]/50 text-white font-mono"
                            />
                        </div>
                    </div>

                    <div className="pt-4 space-y-4">
                        <h4 className="text-[10px] uppercase font-black tracking-[0.3em] text-[var(--primary)] font-heading">Operational Rules</h4>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[8px] uppercase font-bold text-white/30">Min Squad</Label>
                                <Input
                                    type="number"
                                    value={formData.rules.minPlayers}
                                    onChange={(e) => setFormData({ ...formData, rules: { ...formData.rules, minPlayers: Number(e.target.value) } })}
                                    className="h-8 bg-white/5 border-white/10 text-xs font-mono"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[8px] uppercase font-bold text-white/30">Max Squad</Label>
                                <Input
                                    type="number"
                                    value={formData.rules.maxPlayers}
                                    onChange={(e) => setFormData({ ...formData, rules: { ...formData.rules, maxPlayers: Number(e.target.value) } })}
                                    className="h-8 bg-white/5 border-white/10 text-xs font-mono"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[8px] uppercase font-bold text-white/30">Timer (S)</Label>
                                <Input
                                    type="number"
                                    value={formData.rules.auctionTimer}
                                    onChange={(e) => setFormData({ ...formData, rules: { ...formData.rules, auctionTimer: Number(e.target.value) } })}
                                    className="h-8 bg-white/5 border-white/10 text-xs font-mono"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[8px] uppercase font-bold text-white/30">Incr (CR)</Label>
                                <Input
                                    type="number"
                                    value={formData.rules.bidIncrement}
                                    onChange={(e) => setFormData({ ...formData, rules: { ...formData.rules, bidIncrement: Number(e.target.value) } })}
                                    className="h-8 bg-white/5 border-white/10 text-xs font-mono"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="pt-6">
                        <Button type="button" variant="ghost" onClick={onClose} className="text-white/40 hover:text-white hover:bg-white/5 uppercase font-black tracking-widest text-[10px]">
                            Abort Mission
                        </Button>
                        <Button type="submit" className="bg-[var(--primary)] text-[#0B0E14] hover:bg-[#00F0FF]/90 font-black uppercase tracking-widest px-8 shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all">
                            Launch Tournament
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
