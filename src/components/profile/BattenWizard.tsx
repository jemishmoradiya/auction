"use client";

import { Gamepad2, Trophy, Check, Terminal, X, ChevronRight, ChevronLeft, Loader2, Swords, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameProfile } from "@/types";
import { toast } from "sonner";
import { upsertGameProfile } from "@/actions/profile-actions";

interface BattenWizardProps {
    onClose: () => void;
    onComplete: (gp: GameProfile) => void;
    initialData?: Partial<GameProfile> | null;
}

const SLIDE = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? 60 : -60, opacity: 0 }),
};

const CATEGORIES = [
    {
        id: "esports",
        name: "Digital",
        sub: "PC / Console / Mobile",
        icon: Gamepad2,
        accent: "var(--primary)",
        glow: "rgba(0,240,255,0.15)",
    },
    {
        id: "physical",
        name: "Physical",
        sub: "Field / Court / Stadium",
        icon: Trophy,
        accent: "var(--secondary)",
        glow: "rgba(176,38,255,0.15)",
    },
];

const STEPS = [
    { id: 1, label: "Category" },
    { id: 2, label: "Identity" },
    { id: 3, label: "Confirm" },
];

const GAME_MODES = [
    "Ranked", "Casual", "Competitive", "Tournament", "Co-op", "Solo", "Team Play", "Training",
];

export function BattenWizard({ onClose, onComplete, initialData }: BattenWizardProps) {
    const isEditing = !!initialData;
    const [step, setStep] = useState(isEditing ? 2 : 1);
    const [dir, setDir] = useState(0);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState<"esports" | "physical" | null>(
        (initialData?.category as "esports" | "physical" | null) || null
    );
    const [form, setForm] = useState<Partial<GameProfile>>(
        initialData || { gameName: "", ign: "", rank: "", role: "", stats: {}, playstyle: [], category: null }
    );

    const [selectedModes, setSelectedModes] = useState<string[]>(initialData?.playstyle || []);

    const toggleMode = (mode: string) =>
        setSelectedModes((prev) =>
            prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
        );

    const go = (next: number) => {
        setDir(next > step ? 1 : -1);
        setStep(next);
    };

    const handleSave = async () => {
        setLoading(true);
        const payload = { ...form, category, playstyle: selectedModes };
        const result = await upsertGameProfile(payload);
        if (result.success) {
            toast.success(isEditing ? "Profile Updated" : "Battle Module Initialized");
            onComplete(payload as GameProfile);
            onClose();
        } else {
            toast.error(result.error);
        }
        setLoading(false);
    };

    const selectedCat = CATEGORIES.find((c) => c.id === category);

    return (
        <Dialog open onOpenChange={onClose}>
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
                    <VisuallyHidden>
                        <DialogPrimitive.Title>
                            {isEditing ? "Edit Game Profile" : "Add Game Profile"}
                        </DialogPrimitive.Title>
                    </VisuallyHidden>

                    <div className="relative bg-[#0B0E14] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)]">
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--secondary)]/5 pointer-events-none" />

                        {/* Header */}
                        <div className="relative z-10 flex items-center justify-between px-7 pt-7 pb-5 border-b border-white/5">
                            <div className="space-y-0.5">
                                <p className="text-[9px] font-black text-[var(--primary)] uppercase tracking-[0.3em] font-mono flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary)] animate-pulse inline-block" />
                                    {isEditing ? "Updating Profile" : "New Battle Module"}
                                </p>
                                <h2 className="text-2xl font-black uppercase tracking-tight text-white font-heading italic">
                                    {isEditing ? "Edit" : "Add"}{" "}
                                    <span className="text-[var(--primary)] drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
                                        Game Profile
                                    </span>
                                </h2>
                            </div>

                            <button
                                onClick={onClose}
                                className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group"
                            >
                                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Step indicator */}
                        <div className="relative z-10 flex items-center gap-0 px-7 py-4 border-b border-white/5 bg-white/[0.01]">
                            {STEPS.map((s, i) => {
                                const done = step > s.id;
                                const active = step === s.id;
                                return (
                                    <div key={s.id} className="flex items-center flex-1 last:flex-none">
                                        <div className="flex items-center gap-2.5">
                                            <div
                                                className={cn(
                                                    "w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black border transition-all duration-300",
                                                    done
                                                        ? "bg-[var(--primary)] border-[var(--primary)] text-[#0B0E14] shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                                                        : active
                                                            ? "bg-white/10 border-white/30 text-white"
                                                            : "bg-white/[0.03] border-white/5 text-slate-600"
                                                )}
                                            >
                                                {done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.id}
                                            </div>
                                            <span
                                                className={cn(
                                                    "text-[9px] font-black uppercase tracking-widest hidden sm:block transition-colors duration-300",
                                                    active ? "text-white" : done ? "text-[var(--primary)]" : "text-slate-600"
                                                )}
                                            >
                                                {s.label}
                                            </span>
                                        </div>
                                        {i < STEPS.length - 1 && (
                                            <div className="flex-1 mx-3">
                                                <div
                                                    className={cn(
                                                        "h-px transition-all duration-500",
                                                        done ? "bg-[var(--primary)]/50" : "bg-white/5"
                                                    )}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Content */}
                        <div className="relative z-10 min-h-[280px] overflow-hidden">
                            <AnimatePresence custom={dir} mode="wait">
                                {/* Step 1 — Category */}
                                {step === 1 && (
                                    <motion.div
                                        key="s1"
                                        custom={dir}
                                        variants={SLIDE}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className="p-7 space-y-6"
                                    >
                                        <div>
                                            <h3 className="text-base font-black uppercase italic tracking-tight text-white">
                                                Select Gaming Sector
                                            </h3>
                                            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">
                                                Choose the type of game you&apos;re adding a profile for.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            {CATEGORIES.map((cat) => {
                                                const isActive = category === cat.id;
                                                return (
                                                    <button
                                                        key={cat.id}
                                                        onClick={() => setCategory(cat.id as "esports" | "physical")}
                                                        className={cn(
                                                            "relative flex flex-col gap-3 p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer group overflow-hidden",
                                                            isActive
                                                                ? "border-white/20 bg-white/5 shadow-lg"
                                                                : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                                                        )}
                                                        style={
                                                            isActive
                                                                ? { borderColor: `${cat.accent}60`, boxShadow: `0 0 25px ${cat.glow}` }
                                                                : {}
                                                        }
                                                    >
                                                        <div
                                                            className={cn(
                                                                "w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300",
                                                                isActive ? "border-opacity-30" : "bg-white/5 border-white/10"
                                                            )}
                                                            style={isActive ? { background: `${cat.accent}15`, borderColor: `${cat.accent}40`, color: cat.accent } : {}}
                                                        >
                                                            <cat.icon className={cn("w-6 h-6", !isActive && "text-slate-500 group-hover:text-slate-300")} />
                                                        </div>
                                                        <div>
                                                            <p
                                                                className={cn(
                                                                    "text-sm font-black uppercase italic tracking-tight transition-colors duration-300",
                                                                    isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                                                                )}
                                                            >
                                                                {cat.name}
                                                            </p>
                                                            <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mt-0.5">
                                                                {cat.sub}
                                                            </p>
                                                        </div>
                                                        {isActive && (
                                                            <div
                                                                className="absolute top-3 right-3 w-5 h-5 rounded-md flex items-center justify-center"
                                                                style={{ background: `${cat.accent}20`, color: cat.accent }}
                                                            >
                                                                <Check className="w-3 h-3 stroke-[3]" />
                                                            </div>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                                                <Swords className="w-3 h-3" />
                                                Game Name
                                            </Label>
                                            <Input
                                                value={form.gameName}
                                                onChange={(e) => setForm({ ...form, gameName: e.target.value })}
                                                placeholder="e.g. Valorant, Football, Chess"
                                                className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-xl h-11 px-4 text-sm font-bold text-white focus-visible:ring-1 focus-visible:ring-[var(--primary)] focus-visible:border-[var(--primary)] transition-all placeholder:text-slate-600 uppercase tracking-wider"
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2 — Identity */}
                                {step === 2 && (
                                    <motion.div
                                        key="s2"
                                        custom={dir}
                                        variants={SLIDE}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className="p-7 space-y-6"
                                    >
                                        <div>
                                            <h3 className="text-base font-black uppercase italic tracking-tight text-white">
                                                Operative Identity
                                            </h3>
                                            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">
                                                Enter your in-game details for{" "}
                                                <span className="text-white font-bold">{form.gameName || "this game"}</span>.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                                    In-Game Name (IGN)
                                                </Label>
                                                <Input
                                                    value={form.ign}
                                                    onChange={(e) => setForm({ ...form, ign: e.target.value })}
                                                    placeholder="e.g. Phantom#001"
                                                    className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-xl h-11 px-4 text-sm font-bold text-white focus-visible:ring-1 focus-visible:ring-[var(--primary)] focus-visible:border-[var(--primary)] transition-all placeholder:text-slate-600"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                                                        <Star className="w-3 h-3" />
                                                        Rank / Level
                                                    </Label>
                                                    <Input
                                                        value={form.rank}
                                                        onChange={(e) => setForm({ ...form, rank: e.target.value })}
                                                        placeholder="e.g. Diamond 2"
                                                        className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-xl h-11 px-4 text-sm font-bold text-white focus-visible:ring-1 focus-visible:ring-[var(--secondary)] focus-visible:border-[var(--secondary)] transition-all placeholder:text-slate-600 uppercase"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                                        Role / Position
                                                    </Label>
                                                    <Input
                                                        value={form.role}
                                                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                                                        placeholder="e.g. Captain"
                                                        className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-xl h-11 px-4 text-sm font-bold text-white focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:border-white/30 transition-all placeholder:text-slate-600 uppercase"
                                                    />
                                                </div>
                                            </div>

                                            {/* Game Modes */}
                                            <div className="space-y-3 pt-2">
                                                <Label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                                                    <Zap className="w-3 h-3 text-[var(--primary)]" />
                                                    Game Modes Played
                                                </Label>
                                                <div className="flex flex-wrap gap-2">
                                                    {GAME_MODES.map((mode) => {
                                                        const active = selectedModes.includes(mode);
                                                        return (
                                                            <button
                                                                key={mode}
                                                                type="button"
                                                                onClick={() => toggleMode(mode)}
                                                                className={cn(
                                                                    "px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all duration-200 cursor-pointer",
                                                                    active
                                                                        ? "bg-[var(--primary)]/15 border-[var(--primary)]/40 text-[var(--primary)] shadow-[0_0_10px_rgba(0,240,255,0.1)]"
                                                                        : "bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/15 hover:text-slate-300"
                                                                )}
                                                            >
                                                                {active && <Check className="w-2.5 h-2.5 inline mr-1 stroke-[3]" />}
                                                                {mode}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                {selectedModes.length === 0 && (
                                                    <p className="text-[9px] text-slate-600 font-mono uppercase tracking-widest">Optional — select how you typically play.</p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3 — Review & Deploy (Card Preview) */}
                                {step === 3 && (
                                    <motion.div
                                        key="s3"
                                        custom={dir}
                                        variants={SLIDE}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className="p-7 space-y-5"
                                    >
                                        <div>
                                            <h3 className="text-base font-black uppercase italic tracking-tight text-white">
                                                Profile Preview
                                            </h3>
                                            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">
                                                This is how your profile will look. Hit Deploy to go live.
                                            </p>
                                        </div>

                                        {/* Visual Card Preview */}
                                        <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                                            {/* Category color strip */}
                                            <div
                                                className="absolute top-0 left-0 right-0 h-0.5"
                                                style={{ background: `linear-gradient(to right, transparent, ${selectedCat?.accent || 'var(--primary)'}, transparent)` }}
                                            />

                                            <div className="p-5 space-y-4">
                                                {/* Game + category */}
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="space-y-0.5">
                                                        <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em] font-mono">
                                                            {selectedCat?.name || "Unknown"} Sector
                                                        </p>
                                                        <h4 className="text-xl font-black uppercase italic tracking-tight text-white leading-none">
                                                            {form.gameName || "—"}
                                                        </h4>
                                                    </div>
                                                    <div
                                                        className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0"
                                                        style={{
                                                            background: `${selectedCat?.accent || 'var(--primary)'}15`,
                                                            borderColor: `${selectedCat?.accent || 'var(--primary)'}30`,
                                                            color: selectedCat?.accent || 'var(--primary)',
                                                        }}
                                                    >
                                                        {selectedCat?.id === 'physical' ? <Trophy className="w-5 h-5" /> : <Gamepad2 className="w-5 h-5" />}
                                                    </div>
                                                </div>

                                                {/* IGN + Rank row */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="p-3 bg-[#0B0E14] rounded-xl border border-white/5 space-y-0.5">
                                                        <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">IGN</p>
                                                        <p className="text-xs font-black text-[var(--primary)] uppercase truncate">{form.ign || "—"}</p>
                                                    </div>
                                                    <div className="p-3 bg-[#0B0E14] rounded-xl border border-white/5 space-y-0.5">
                                                        <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Rank</p>
                                                        <p className="text-xs font-black text-white uppercase truncate">{form.rank || "Unranked"}</p>
                                                    </div>
                                                </div>

                                                {/* Role */}
                                                {form.role && (
                                                    <div className="flex items-center gap-2">
                                                        <Swords className="w-3 h-3 text-slate-600" />
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{form.role}</span>
                                                    </div>
                                                )}

                                                {/* Mode pills */}
                                                {selectedModes.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/5">
                                                        {selectedModes.map((m) => (
                                                            <span
                                                                key={m}
                                                                className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest"
                                                                style={{
                                                                    background: `${selectedCat?.accent || 'var(--primary)'}15`,
                                                                    borderWidth: 1,
                                                                    borderStyle: 'solid',
                                                                    borderColor: `${selectedCat?.accent || 'var(--primary)'}30`,
                                                                    color: selectedCat?.accent || 'var(--primary)',
                                                                }}
                                                            >
                                                                {m}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Ready-to-deploy glow */}
                                            <div className="px-5 pb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                                                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest font-mono">Ready to Deploy</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer nav */}
                        <div className="relative z-10 flex items-center justify-between gap-3 px-7 py-5 border-t border-white/5 bg-white/[0.01]">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                                <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest hidden sm:block">
                                    Secure Channel Active
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                {step > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => go(step - 1)}
                                        className="h-10 px-4 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 font-bold text-[10px] uppercase tracking-widest cursor-pointer gap-1.5"
                                    >
                                        <ChevronLeft className="w-3.5 h-3.5" />
                                        Back
                                    </Button>
                                )}
                                <Button
                                    type="button"
                                    onClick={step === 3 ? handleSave : () => go(step + 1)}
                                    disabled={
                                        loading ||
                                        (step === 1 && (!form.gameName || !category)) ||
                                        (step === 2 && !form.ign)
                                    }
                                    className="h-10 px-6 rounded-xl bg-[var(--primary)] hover:bg-[#00F0FF]/90 text-[#0B0E14] font-black text-[10px] uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] disabled:opacity-40 cursor-pointer gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            Saving...
                                        </>
                                    ) : step === 3 ? (
                                        <>
                                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                                            Deploy Profile
                                        </>
                                    ) : (
                                        <>
                                            Continue
                                            <ChevronRight className="w-3.5 h-3.5" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogPrimitive.Content>
            </DialogPortal>
        </Dialog>
    );
}
