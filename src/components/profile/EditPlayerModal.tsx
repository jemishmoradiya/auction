"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuctionStore } from "@/store/useAuctionStore";
import { Player, PlayerRole } from "@/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Edit3, User, Image as ImageIcon, Briefcase, IndianRupee } from "lucide-react";

interface EditPlayerModalProps {
    player: Player;
    isOpen: boolean;
    onClose: () => void;
}

export function EditPlayerModal({ player, isOpen, onClose }: EditPlayerModalProps) {
    const { updatePlayer } = useAuctionStore();
    const [formData, setFormData] = useState({
        ign: player.ign,
        name: player.name,
        bio: player.bio || "",
        image: player.image || "",
        role: player.role,
        basePrice: player.basePrice,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updatePlayer(player.id, {
            ...formData,
            basePrice: Number(formData.basePrice)
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-[#020617] border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-2 font-heading">
                        <Edit3 className="w-5 h-5 text-primary" />
                        Edit Profile Profile
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="ign" className="text-[10px] uppercase font-black tracking-widest text-white/40 font-heading flex items-center gap-2">
                                <User className="w-3 h-3" /> In-Game Name
                            </Label>
                            <Input
                                id="ign"
                                value={formData.ign}
                                onChange={(e) => setFormData({ ...formData, ign: e.target.value })}
                                className="bg-white/5 border-white/10 focus:border-primary/50 text-white font-mono"
                                placeholder="PHANTOM"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[10px] uppercase font-black tracking-widest text-white/40 font-heading">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-white/5 border-white/10 focus:border-primary/50 text-white"
                                placeholder="Jake Morrison"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio" className="text-[10px] uppercase font-black tracking-widest text-white/40 font-heading">
                            Operative Bio
                        </Label>
                        <Textarea
                            id="bio"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="bg-white/5 border-white/10 focus:border-primary/50 text-white resize-none h-24"
                            placeholder="Tell your story..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image" className="text-[10px] uppercase font-black tracking-widest text-white/40 font-heading flex items-center gap-2">
                            <ImageIcon className="w-3 h-3" /> Avatar URL
                        </Label>
                        <Input
                            id="image"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="bg-white/5 border-white/10 focus:border-primary/50 text-white font-mono"
                            placeholder="https://..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-[10px] uppercase font-black tracking-widest text-white/40 font-heading flex items-center gap-2">
                                <Briefcase className="w-3 h-3" /> Tactical Role
                            </Label>
                            <Select
                                value={formData.role}
                                onValueChange={(value: PlayerRole) => setFormData({ ...formData, role: value })}
                            >
                                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                    <SelectItem value="IGL">IGL</SelectItem>
                                    <SelectItem value="Support">Support</SelectItem>
                                    <SelectItem value="Flex">Flex</SelectItem>
                                    <SelectItem value="OG">OG</SelectItem>
                                    <SelectItem value="GENZ">GENZ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="basePrice" className="text-[10px] uppercase font-black tracking-widest text-white/40 font-heading flex items-center gap-2">
                                <IndianRupee className="w-3 h-3" /> Base Price (CR)
                            </Label>
                            <Input
                                id="basePrice"
                                type="number"
                                value={formData.basePrice}
                                onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                                className="bg-white/5 border-white/10 focus:border-primary/50 text-white font-mono"
                            />
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="ghost" onClick={onClose} className="text-white/40 hover:text-white hover:bg-white/5">
                            Abort
                        </Button>
                        <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 font-black uppercase tracking-widest px-8">
                            Update Profile
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
