"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DigitalScrambleProps {
    value: number | string;
    className?: string;
}

export function DigitalScramble({ value, className }: DigitalScrambleProps) {
    const [display, setDisplay] = useState(value.toString());
    const [isScrambling, setIsScrambling] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let timeout: NodeJS.Timeout;

        setIsScrambling(true);
        const finalValue = value.toString();
        const length = finalValue.length;

        // Rapid scramble
        interval = setInterval(() => {
            let result = "";
            for (let i = 0; i < length; i++) {
                // Use random numbers for numeric values, random chars for strings if needed
                result += Math.floor(Math.random() * 10).toString();
            }
            setDisplay(result);
        }, 40);

        // Lock in after 350ms
        timeout = setTimeout(() => {
            clearInterval(interval);
            setDisplay(finalValue);
            setIsScrambling(false);
        }, 350);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
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
}
