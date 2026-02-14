import { ease } from "./ease";

// Broadcast-grade motion presets for OBS stream overlay
// Standard durations: 80ms, 160ms, 240ms, 360ms, 520ms, 900ms

export const motion = {
    fadeUp: {
        initial: { opacity: 0, y: 14, filter: "blur(6px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -10, filter: "blur(6px)" },
        transition: { duration: 0.36, ease: ease.out },
    },

    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.24, ease: ease.out },
    },

    slideRightIn: {
        initial: { opacity: 0, x: 24, filter: "blur(6px)" },
        animate: { opacity: 1, x: 0, filter: "blur(0px)" },
        exit: { opacity: 0, x: -16, filter: "blur(6px)" },
        transition: { duration: 0.24, ease: ease.out },
    },

    heroSwap: {
        initial: { opacity: 0, y: 22, scale: 0.985, filter: "blur(10px)" },
        animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, y: -16, scale: 0.99, filter: "blur(10px)" },
        transition: { duration: 0.52, ease: ease.out },
    },

    softEmphasis: {
        animate: { scale: [1, 1.01, 1] },
        transition: { duration: 0.36, ease: ease.inOut },
    },

    glowPing: {
        animate: { opacity: [0, 1, 0] },
        transition: { duration: 0.16, ease: ease.snap },
    },

    bidCountUp: {
        transition: { duration: 0.36, ease: ease.snap },
    },

    timerPulse: {
        animate: {
            boxShadow: [
                "0 0 0 rgba(255,77,94,0)",
                "0 0 50px rgba(255,77,94,0.3)",
                "0 0 0 rgba(255,77,94,0)"
            ]
        },
        transition: { duration: 2, ease: ease.inOut, repeat: Infinity },
    },
};

// Standard durations (use these consistently)
export const duration = {
    micro: 0.08,      // 80ms - micro feedback
    small: 0.16,      // 160ms - small UI state change
    list: 0.24,       // 240ms - list item enter/exit
    panel: 0.36,      // 360ms - panel/card emphasis
    hero: 0.52,       // 520ms - hero/player transition
    special: 0.9,     // 900ms - special moment
};
