"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import { GameProfile } from "@/types";
import { toast } from "sonner";
import { upsertGameProfile } from "@/actions/profile-actions";

// Sub-components
import { PhaseSelector } from "./wizard-steps/PhaseSelector";
import { GameSelector } from "./wizard-steps/GameSelector";
import { StatsConfigurer } from "./wizard-steps/StatsConfigurer";
import { TraitSelector } from "./wizard-steps/TraitSelector";

interface BattenWizardProps {
    onClose: () => void;
    onComplete: (gp: GameProfile) => void;
    initialData?: Partial<GameProfile> | null;
}

const STEP_VARIANTS = {
    enter: (direction: number) => ({
        x: direction > 0 ? 100 : -100,
        opacity: 0
    }),
    center: {
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 100 : -100,
        opacity: 0
    })
};

export function BattenWizard({ onClose, onComplete, initialData }: BattenWizardProps) {
    const [step, setStep] = useState(initialData ? 3 : 1); // Skip to stats if editing
    const [direction, setDirection] = useState(0);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState<"esports" | "physical" | null>(initialData ? "esports" : null);

    const [formData, setFormData] = useState<Partial<GameProfile>>(initialData || {
        gameName: "",
        ign: "",
        rank: "",
        role: "",
        stats: {},
        playstyle: []
    });

    const nextStep = () => {
        setDirection(1);
        setStep(s => s + 1);
    };

    const prevStep = () => {
        setDirection(-1);
        setStep(s => s - 1);
    };

    const handlePhaseSelect = (cat: "esports" | "physical") => {
        setCategory(cat);
        nextStep();
    };

    const handleGameSelect = (game: string) => {
        setFormData({ ...formData, gameName: game });
        nextStep();
    };

    const handleStatsUpdate = (data: any) => {
        setFormData({ ...formData, ...data });
    };

    const togglePlaystyle = (tag: string) => {
        const current = formData.playstyle || [];
        if (current.includes(tag)) {
            setFormData({ ...formData, playstyle: current.filter(t => t !== tag) });
        } else {
            setFormData({ ...formData, playstyle: [...current, tag] });
        }
    };

    const handleFinish = async () => {
        setLoading(true);
        const result = await upsertGameProfile(formData);
        if (result.success) {
            toast.success("Battle Module Initialized");
            // @ts-ignore
            onComplete(formData as GameProfile);
            onClose();
        } else {
            toast.error(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-2xl bg-[#0a0f1e] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative"
            >
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
                    <motion.div
                        className="h-full bg-primary shadow-[0_0_10px_rgba(37,99,235,0.8)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>

                <div className="p-12 space-y-8">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={step}
                            custom={direction}
                            variants={STEP_VARIANTS}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="space-y-8"
                        >
                            {step === 1 && (
                                <PhaseSelector onSelect={handlePhaseSelect} />
                            )}

                            {step === 2 && category && (
                                <GameSelector
                                    category={category}
                                    selectedGame={formData.gameName || ""}
                                    onSelect={handleGameSelect}
                                    onBack={prevStep}
                                />
                            )}

                            {step === 3 && category && (
                                <StatsConfigurer
                                    category={category}
                                    ign={formData.ign || ""}
                                    rank={formData.rank || ""}
                                    role={formData.role || ""}
                                    playingSince={formData.playingSince}
                                    onUpdate={handleStatsUpdate}
                                    onNext={nextStep}
                                    onBack={prevStep}
                                />
                            )}

                            {step === 4 && (
                                <TraitSelector
                                    selectedTraits={formData.playstyle || []}
                                    onToggle={togglePlaystyle}
                                    onFinish={handleFinish}
                                    onBack={prevStep}
                                    loading={loading}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"
                >
                    <Zap className="w-6 h-6 rotate-45" />
                </button>
            </motion.div>
        </div>
    );
}
