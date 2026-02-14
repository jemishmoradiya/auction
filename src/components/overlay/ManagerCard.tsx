import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface OwnerCardProps {
    name: string;
    role: string;
    team: string;
    teamBadge?: string;
    imageUrl?: string;
    index: number;
}

export function OwnerCard({ name, role, team, teamBadge, imageUrl, index }: OwnerCardProps) {
    return (
        <div className="perspective-1000 w-full h-full">
            <AnimatePresence mode="wait">
                <motion.div
                    key={name}
                    className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl p-3 flex flex-col items-center text-center relative h-full w-full transition-all duration-500 shadow-[var(--theme-glow)]"
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -90 }}
                    transition={{
                        duration: 0.6,
                        ease: [0.23, 1, 0.32, 1],
                        delay: index * 0.05
                    }}
                    style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                >
                    {/* Avatar */}
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-black/20 to-black/40 mb-2 border border-white/5 shadow-[var(--theme-glow)]">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={name}
                                fill
                                sizes="64px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-black text-[var(--theme-primary)] opacity-40">
                                    {name[0]}
                                </span>
                            </div>
                        )}
                        {/* Team Badge */}
                        {teamBadge && (
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-black border border-white/10 flex items-center justify-center overflow-hidden z-10 shadow-[var(--theme-glow)]">
                                <Image
                                    src={teamBadge}
                                    alt={team}
                                    fill
                                    sizes="24px"
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <h4 className="font-bold text-white/90 text-[10px] leading-tight truncate w-full px-1 mb-0.5">{name}</h4>
                    <p className="text-[7px] font-black uppercase tracking-[0.15em] text-[var(--theme-primary)]">
                        {team}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
