"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

interface DigitalScrambleProps {
    value: number | string;
    className?: string;
}

export const DigitalScramble = React.memo(({ value, className }: DigitalScrambleProps) => {
    const [display, setDisplay] = useState(value.toString());
    const [isScrambling, setIsScrambling] = useState(false);
    const frameRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);
    const lastUpdateRef = useRef<number>(0);

    useEffect(() => {
        const finalValue = value.toString();
        const length = finalValue.length;
        setIsScrambling(true);
        startTimeRef.current = performance.now();
        lastUpdateRef.current = 0;

        const animate = (now: number) => {
            const elapsed = now - startTimeRef.current;

            if (elapsed >= 350) {
                setDisplay(finalValue);
                setIsScrambling(false);
                return;
            }

            // Update every ~40ms
            if (now - lastUpdateRef.current >= 40) {
                let result = "";
                for (let i = 0; i < length; i++) {
                    result += Math.floor(Math.random() * 10).toString();
                }
                setDisplay(result);
                lastUpdateRef.current = now;
            }

            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [value]);

    return (
        <motion.span
            className={className}
            animate={isScrambling ? {
                opacity: [1, 0.8, 1],
                filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
            } : {}}
            transition={{ duration: 0.1, repeat: isScrambling ? Infinity : 0 }}
        >
            {display}
        </motion.span>
    );
});
DigitalScramble.displayName = "DigitalScramble";
