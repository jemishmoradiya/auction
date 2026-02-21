
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Trophy,
    Settings,
    Gavel,
    Play,
    Monitor,
    User as UserIcon,
    Component
} from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/app", icon: LayoutDashboard },
    { name: "My Profile", href: "/app/profile", icon: UserIcon },
    { name: "Players", href: "/app/players", icon: Users },
    { name: "Tournaments", href: "/app/tournaments", icon: Trophy },
    { name: "Live Dashboard", href: "/app/auction/tourney1/dashboard", icon: Monitor },
    { name: "Components", href: "/app/components", icon: Component },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full w-64 md:w-72 bg-white/[0.02] border-r border-white/10 backdrop-blur-xl">
            <div className="p-4 md:p-6 border-b border-white/10">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 border border-white/10 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-500">
                        <Trophy className="w-5 h-5 text-[var(--primary)]" />
                    </div>
                    <h1 className="text-2xl font-black tracking-tight text-white font-heading">
                        NB<span className="text-[var(--primary)] text-shadow-[0_0_10px_rgba(0,240,255,0.5)]">DASH</span>
                    </h1>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 transition-all duration-300 group rounded-xl",
                                isActive
                                    ? "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                                    : "text-slate-400 border border-transparent hover:text-white hover:bg-white/5 hover:border-white/10"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 transition-transform duration-300", isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)] text-[var(--primary)]" : "group-hover:scale-110")} />
                            <span className="font-semibold text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 md:p-6 border-t border-white/10 space-y-3 bg-white/[0.01]">
                <h2 className="px-2 text-[10px] font-bold text-slate-500 tracking-widest mb-2 uppercase">
                    Auction Views
                </h2>
                <Link
                    href="/app/auction/tourney1/bid"
                    className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-lg transition-all"
                >
                    <Gavel className="w-4 h-4" />
                    <span className="text-sm font-medium">Bidder Screen</span>
                </Link>
                <Link
                    href="/app/auction/tourney1/stream"
                    className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-lg transition-all"
                >
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="text-sm font-medium">Stream Overlay</span>
                </Link>
            </div>
        </div>
    );
}
