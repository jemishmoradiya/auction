
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
    User as UserIcon
} from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/app", icon: LayoutDashboard },
    { name: "My Profile", href: "/app/profile", icon: UserIcon },
    { name: "Players", href: "/app/players", icon: Users },
    { name: "Tournaments", href: "/app/tournaments", icon: Trophy },
    { name: "Live Dashboard", href: "/app/auction/tourney1/dashboard", icon: Monitor },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full w-64 bg-card border-r border-border">
            <div className="p-4 border-b border-border/50">
                <Link href="/" className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-primary" />
                    <h1 className="text-xl font-bold tracking-tight text-white uppercase font-heading">
                        AuctioNext
                    </h1>
                </Link>
            </div>

            <nav className="flex-1 px-2 py-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border space-y-2">
                <h2 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Auction Views
                </h2>
                <Link
                    href="/app/auction/tourney1/bid"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    <Gavel className="w-5 h-5" />
                    <span className="text-sm">Bidder Screen</span>
                </Link>
                <Link
                    href="/app/auction/tourney1/stream"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="text-sm">Stream Overlay</span>
                </Link>
            </div>
        </div>
    );
}
