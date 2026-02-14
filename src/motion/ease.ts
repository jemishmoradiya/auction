// Broadcast-grade easing curves for OBS stream overlay
export const ease = {
    out: [0.16, 1, 0.3, 1] as [number, number, number, number],      // smooth, premium
    in: [0.7, 0, 0.84, 0] as [number, number, number, number],      // rare, use for exit
    inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],   // controlled, broadcast feel
    snap: [0.2, 0.8, 0.2, 1] as [number, number, number, number],    // for counters/pop
};
