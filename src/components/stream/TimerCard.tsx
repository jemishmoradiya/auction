import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion as motionPresets, duration } from "@/motion/presets";
import { ease } from "@/motion/ease";

interface TimerCardProps {
    timeRemaining: number;
}

export function TimerCard({ timeRemaining }: TimerCardProps) {
    const isCritical = timeRemaining <= 5;
    const isWarning = timeRemaining <= 10;

    return (
        <motion.div
            className={cn(
                "relative bg-white/5 border backdrop-blur-xl rounded-3xl p-8 overflow-hidden",
                isCritical ? "border-[#FF4D5E]/50" : "border-white/10"
            )}
            {...(isCritical ? motionPresets.timerPulse : {})}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2">
                    <motion.div
                        animate={isCritical ? { rotate: 360 } : {}}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                        <Clock className={cn("w-5 h-5", isCritical ? "text-[#FF4D5E]" : "text-[#4C6FFF]")} />
                    </motion.div>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-[#E7EBFF]/50">
                        Auction Timer
                    </span>
                </div>
                {isCritical && (
                    <motion.span
                        className="text-[#FF4D5E] text-xs font-black uppercase tracking-widest"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        CLOSING SOON
                    </motion.span>
                )}
            </div>

            {/* Timer Display */}
            <div className="relative z-10">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={timeRemaining}
                        className={cn(
                            "text-8xl font-black italic tabular-nums leading-none tracking-tighter block",
                            isCritical ? "text-[#FF4D5E]" : "text-[#E7EBFF]"
                        )}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: duration.panel, ease: ease.out }}
                        style={{
                            filter: isCritical ? "drop-shadow(0 0 20px rgba(255,77,94,0.6))" : "none"
                        }}
                    >
                        {timeRemaining}
                        <span className="text-3xl text-[#E7EBFF]/20 ml-1">s</span>
                    </motion.span>
                </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-2 bg-white/10 w-full">
                <motion.div
                    className={cn("h-full", isCritical ? "bg-[#FF4D5E]" : "bg-[#4C6FFF]")}
                    style={{ width: `${(timeRemaining / 30) * 100}%` }}
                    transition={{ duration: 1, ease: ease.inOut }}
                />
            </div>
        </motion.div>
    );
}
