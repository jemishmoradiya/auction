"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
    LayoutDashboard,
    Users,
    Trophy,
    Gavel,
    Monitor,
    User as UserIcon,
    Component,
    Radio,
    ChevronRight,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";

const NAV_ITEMS = [
    { name: "Dashboard", href: "/app", icon: LayoutDashboard },
    { name: "My Profile", href: "/app/profile", icon: UserIcon },
    { name: "Players", href: "/app/players", icon: Users },
    { name: "Tournaments", href: "/app/tournaments", icon: Trophy },
    { name: "Live Dashboard", href: "/app/auction/tourney1/dashboard", icon: Monitor },
    { name: "Components", href: "/app/components", icon: Component },
];

const QUICK_LINKS = [
    { name: "Bidder Screen", href: "/app/auction/tourney1/bid", icon: Gavel },
    { name: "Stream Overlay", href: "/app/auction/tourney1/stream", icon: Radio },
];

interface NavItemProps {
    item: { name: string; href: string; icon: React.ElementType };
    isActive: boolean;
    expanded: boolean;
}

function NavItem({ item, isActive, expanded }: NavItemProps) {
    return (
        <Link
            href={item.href}
            className={cn(
                "relative group/nav flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer",
                expanded ? "px-3 py-2.5 w-full" : "w-10 h-10 justify-center",
                isActive
                    ? "bg-[var(--primary)]/12 border border-[var(--primary)]/30 shadow-[0_0_12px_rgba(0,240,255,0.12)]"
                    : "border border-transparent hover:bg-white/[0.05] hover:border-white/[0.08]"
            )}
        >
            {/* Active left pip */}
            {isActive && !expanded && (
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2.5 w-0.5 h-4 rounded-full"
                    style={{ background: "var(--primary)", boxShadow: "0 0 8px var(--primary)" }}
                />
            )}

            {/* Icon */}
            <div className="relative shrink-0 flex items-center justify-center w-[18px] h-[18px]">
                <item.icon
                    className={cn(
                        "w-[18px] h-[18px] transition-all duration-200",
                        isActive
                            ? "text-[var(--primary)] drop-shadow-[0_0_6px_rgba(0,240,255,0.5)]"
                            : "text-slate-500 group-hover/nav:text-slate-200"
                    )}
                />
            </div>

            {/* Label — only in expanded mode */}
            <AnimatePresence>
                {expanded && (
                    <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={cn(
                            "text-[11px] font-black uppercase tracking-widest whitespace-nowrap overflow-hidden",
                            isActive ? "text-white" : "text-slate-400 group-hover/nav:text-white"
                        )}
                    >
                        {item.name}
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Active indicator chip in expanded mode */}
            {isActive && expanded && (
                <motion.div
                    layoutId="active-chip"
                    className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "var(--primary)", boxShadow: "0 0 6px var(--primary)" }}
                />
            )}

            {/* Tooltip — only when collapsed */}
            {!expanded && (
                <div className="pointer-events-none absolute left-full ml-3 z-50 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-150">
                    <div className="flex items-center gap-2 bg-[#0D1017] border border-white/10 rounded-lg px-3 py-1.5 whitespace-nowrap shadow-xl">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">
                            {item.name}
                        </span>
                    </div>
                    <div className="absolute left-0 top-1/2 -translate-x-[7px] -translate-y-1/2 border-4 border-transparent border-r-[#0D1017]" />
                </div>
            )}
        </Link>
    );
}

export function Sidebar() {
    const pathname = usePathname();
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            animate={{ width: expanded ? 220 : 64 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative flex flex-col h-full bg-[#08090D] border-r border-white/[0.06] z-20 overflow-hidden shrink-0"
        >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent" />

            {/* Logo + collapse toggle */}
            <div className="flex items-center h-14 border-b border-white/[0.06] px-3 shrink-0 gap-2">
                <Link href="/" className="group flex items-center justify-center w-10 h-10 shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 border border-white/10 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all duration-500">
                        <Trophy className="w-5 h-5 text-[var(--primary)]" />
                    </div>
                </Link>

                <AnimatePresence>
                    {expanded && (
                        <motion.span
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -4 }}
                            transition={{ duration: 0.15 }}
                            className="text-base font-black tracking-tight text-white font-heading whitespace-nowrap overflow-hidden"
                        >
                            NB<span className="text-[var(--primary)]">DASH</span>
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Main nav */}
            <nav className={cn("flex-1 flex flex-col gap-1 py-5 overflow-hidden", expanded ? "px-3" : "px-3 items-center")}>
                {NAV_ITEMS.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                        <NavItem key={item.href} item={item} isActive={isActive} expanded={expanded} />
                    );
                })}
            </nav>

            {/* Divider */}
            <div className="mx-3 h-px bg-white/[0.05]" />

            {/* Quick links */}
            <div className={cn("flex flex-col gap-1 py-4 overflow-hidden", expanded ? "px-3" : "px-3 items-center")}>
                {expanded && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[8px] font-black text-slate-600 uppercase tracking-[0.25em] px-3 pb-1"
                    >
                        Auction Views
                    </motion.p>
                )}
                {QUICK_LINKS.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <NavItem key={item.href} item={item} isActive={isActive} expanded={expanded} />
                    );
                })}
            </div>

            {/* Divider */}
            <div className="mx-3 h-px bg-white/[0.05]" />

            {/* Collapse toggle button */}
            <div className={cn("flex py-4 px-3", expanded ? "justify-end" : "justify-center")}>
                <button
                    onClick={() => setExpanded((e) => !e)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-slate-500 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12] transition-all cursor-pointer group/toggle"
                    title={expanded ? "Collapse sidebar" : "Expand sidebar"}
                >
                    {expanded
                        ? <PanelLeftClose className="w-4 h-4 group-hover/toggle:text-[var(--primary)] transition-colors" />
                        : <PanelLeftOpen className="w-4 h-4 group-hover/toggle:text-[var(--primary)] transition-colors" />
                    }
                </button>
            </div>

            {/* Bottom glow line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        </motion.div>
    );
}
