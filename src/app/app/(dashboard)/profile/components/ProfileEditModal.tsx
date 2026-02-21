"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Quote, Shield, Terminal, X, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProfileEditModalProps {
    profile: Record<string, any>;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedProfile: Record<string, any>) => void;
    isSaving: boolean;
}

const FIELDS = [
    {
        id: "gamer_tag",
        label: "Gamer Tag",
        icon: Terminal,
        placeholder: "PHANTOM",
        prefix: "@",
        accent: "var(--primary)",
        ring: "focus-visible:ring-[var(--primary)] focus-visible:border-[var(--primary)]",
        glow: "from-[var(--primary)]/5",
    },
    {
        id: "title",
        label: "Operator Title",
        icon: Shield,
        placeholder: "e.g. Pro Gamer",
        prefix: null,
        accent: "var(--secondary)",
        ring: "focus-visible:ring-[var(--secondary)] focus-visible:border-[var(--secondary)]",
        glow: "from-[var(--secondary)]/5",
    },
    {
        id: "name",
        label: "Full Name",
        icon: User,
        placeholder: "John Doe",
        prefix: null,
        accent: "white",
        ring: "focus-visible:ring-white/30 focus-visible:border-white/30",
        glow: "from-white/5",
    },
];

export function ProfileEditModal({ profile, isOpen, onClose, onSave, isSaving }: ProfileEditModalProps) {
    const [formData, setFormData] = useState({
        gamer_tag: "",
        name: "",
        bio: "",
        title: "",
    });

    // Sync form data when profile changes or modal opens
    useEffect(() => {
        if (isOpen && profile) {
            setFormData({
                gamer_tag: profile.gamer_tag || "",
                name: profile.name || "",
                bio: profile.bio || "",
                title: profile.title || "Active Professional",
            });
        }
    }, [isOpen, profile]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...profile, ...formData });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogPortal>
                <DialogOverlay className="bg-black/70 backdrop-blur-sm" />
                <DialogPrimitive.Content
                    className={cn(
                        "fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] sm:max-w-xl translate-x-[-50%] translate-y-[-50%] outline-none",
                        "data-[state=open]:animate-in data-[state=closed]:animate-out",
                        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                        "duration-200"
                    )}
                >
                    <div className="relative bg-[#0B0E14] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)]">
                        <VisuallyHidden>
                            <DialogPrimitive.Title>Edit Profile</DialogPrimitive.Title>
                        </VisuallyHidden>
                        {/* Ambient glow */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/50 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--secondary)]/5 pointer-events-none" />

                        {/* Header */}
                        <div className="relative z-10 flex items-center justify-between px-7 pt-7 pb-5 border-b border-white/5">
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary)] animate-pulse" />
                                    <p className="text-[9px] font-black text-[var(--primary)] uppercase tracking-[0.3em] font-mono">
                                        Editing Dossier
                                    </p>
                                </div>
                                <h2 className="text-2xl font-black uppercase tracking-tight text-white font-heading italic">
                                    Edit <span className="text-[var(--primary)] drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">Profile</span>
                                </h2>
                            </div>

                            <button
                                onClick={onClose}
                                className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group"
                            >
                                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="relative z-10">
                            <div className="px-7 py-6 space-y-5">
                                {/* Two-column fields */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {FIELDS.slice(0, 2).map((field) => (
                                        <div key={field.id} className="space-y-2">
                                            <Label
                                                htmlFor={field.id}
                                                className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] cursor-pointer"
                                            >
                                                <field.icon className="w-3 h-3" />
                                                {field.label}
                                            </Label>
                                            <div className="relative group">
                                                {field.prefix && (
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                                        <span className="text-slate-500 font-bold text-sm">{field.prefix}</span>
                                                    </div>
                                                )}
                                                <Input
                                                    id={field.id}
                                                    value={(formData as any)[field.id]}
                                                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                                                    className={cn(
                                                        "bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-xl h-11 text-sm font-bold text-white transition-all shadow-inner focus-visible:ring-1 placeholder:text-slate-600",
                                                        field.prefix ? "pl-8 pr-4" : "px-4",
                                                        field.ring
                                                    )}
                                                    placeholder={field.placeholder}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Full-width name */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="name"
                                        className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] cursor-pointer"
                                    >
                                        <User className="w-3 h-3" />
                                        Full Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-xl h-11 text-sm font-bold text-white transition-all shadow-inner focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:border-white/30 px-4 placeholder:text-slate-600 w-full"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Bio */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="bio"
                                        className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] cursor-pointer"
                                    >
                                        <Quote className="w-3 h-3" />
                                        Bio &amp; Operational Details
                                    </Label>
                                    <Textarea
                                        id="bio"
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        className="bg-white/[0.03] border border-white/10 hover:border-white/20 focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:border-white/30 rounded-xl min-h-[110px] py-3.5 text-sm font-bold text-white transition-all shadow-inner px-4 placeholder:text-slate-600 resize-none"
                                        placeholder="Summarize your operational history and tactical preference..."
                                    />
                                    <div className="flex justify-end">
                                        <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                                            {formData.bio.length} / 280 chars
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between gap-3 px-7 py-5 border-t border-white/5 bg-white/[0.01]">
                                <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest hidden sm:block">
                                    Changes sync across the network
                                </p>
                                <div className="flex items-center gap-3 ml-auto">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={onClose}
                                        className="h-10 px-5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSaving}
                                        className="h-10 px-6 rounded-xl bg-[var(--primary)] hover:bg-[#00F0FF]/90 text-[#0B0E14] font-black text-[10px] uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] disabled:opacity-50 cursor-pointer gap-2"
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Check className="w-3.5 h-3.5" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </DialogPrimitive.Content>
            </DialogPortal>
        </Dialog>
    );
}
