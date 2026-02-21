"use client";

import { Bell, Search, ChevronRight, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AuthButton } from "@/components/auth/AuthButton";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map path segments to readable labels
const ROUTE_LABELS: Record<string, string> = {
    app: "Command",
    profile: "Profile",
    players: "Players",
    tournaments: "Tournaments",
    auction: "Auction",
    dashboard: "Dashboard",
    bid: "Bidder",
    stream: "Stream",
    components: "Components",
    host: "Host",
};

function Breadcrumb() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    // Build crumb chain — skip IDs (non-label segments)
    const crumbs = segments
        .filter((seg) => ROUTE_LABELS[seg])
        .map((seg) => ROUTE_LABELS[seg]);

    if (crumbs.length === 0) return null;

    return (
        <div className="flex items-center gap-1.5">
            {crumbs.map((label, i) => (
                <div key={i} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="w-3 h-3 text-slate-600" />}
                    <span
                        className={
                            i === crumbs.length - 1
                                ? "text-sm font-black uppercase tracking-wide text-white"
                                : "text-sm font-bold uppercase tracking-wide text-slate-500"
                        }
                    >
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );
}

export function Header() {
    return (
        <header className="h-14 border-b border-white/[0.06] bg-[#08090D]/80 backdrop-blur-xl sticky top-0 z-10 flex items-center justify-between gap-4 px-5">

            {/* Left: Breadcrumb + status */}
            <div className="flex items-center gap-4 min-w-0">
                {/* Live system status pill */}
                <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-lg shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] font-mono">
                        Systems Online
                    </span>
                </div>

                <Breadcrumb />
            </div>

            {/* Center: Search */}
            <div className="relative w-full max-w-xs group hidden md:block">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600 group-focus-within:text-[var(--primary)] transition-colors" />
                <Input
                    placeholder="Search..."
                    className="pl-9 pr-4 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] rounded-xl h-9 focus-visible:ring-1 focus-visible:ring-[var(--primary)]/40 focus-visible:border-[var(--primary)]/40 text-white placeholder:text-slate-600 font-medium text-xs transition-all"
                />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 shrink-0">
                <ThemeToggle />

                {/* Notification bell */}
                <button className="relative w-9 h-9 bg-white/[0.03] border border-white/[0.07] rounded-xl flex items-center justify-center hover:bg-white/[0.06] hover:border-[var(--primary)]/30 hover:shadow-[0_0_12px_rgba(0,240,255,0.15)] transition-all duration-300 group cursor-pointer">
                    <Bell className="w-4 h-4 text-slate-500 group-hover:text-[var(--primary)] transition-colors" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF2E63] rounded-full border border-[#08090D] shadow-[0_0_6px_rgba(255,46,99,0.8)]" />
                </button>

                {/* Divider */}
                <div className="w-px h-6 bg-white/[0.08] mx-1" />

                {/* Auth */}
                <div className="[&>*]:!rounded-xl [&>*]:!border-white/[0.08] [&>*]:!text-sm [&>*]:!h-9">
                    <AuthButton />
                </div>
            </div>
        </header>
    );
}
