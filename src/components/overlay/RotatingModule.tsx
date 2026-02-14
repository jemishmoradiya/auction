"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface RotatingModuleProps {
    title: string;
    children: ReactNode;
    active: boolean;
    moduleId: string;
}

export function RotatingModule({ title, children, active, moduleId }: RotatingModuleProps) {
    return (
        <AnimatePresence mode="wait">
            {active && (
                <motion.div
                    key={moduleId}
                    initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="p-6 h-full flex flex-col"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 leading-none">
                            {title}
                        </h3>
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] animate-pulse" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        {children}
                    </div>

                    {/* Professional HUD Accent */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
