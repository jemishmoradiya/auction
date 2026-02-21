
"use client";

import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/auth/AuthButton";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

export function Header() {
    return (
        <header className="h-16 border-b border-white/10 bg-white/[0.02] backdrop-blur-xl sticky top-0 z-10 flex items-center justify-between px-4 md:px-8 shadow-sm">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-full max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
                    <Input
                        placeholder="SEARCH LOGS & PROTOCOLS..."
                        className="pl-11 bg-white/[0.03] border border-white/10 rounded-xl h-10 focus-visible:ring-1 focus-visible:ring-[var(--primary)]/50 focus-visible:border-[var(--primary)]/50 text-white placeholder:text-slate-500 font-medium text-sm transition-all focus:bg-white/[0.05]"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
                <ThemeToggle />

                <button className="relative w-10 h-10 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 hover:border-[var(--primary)]/40 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300 group">
                    <Bell className="w-4 h-4 text-slate-300 group-hover:text-[var(--primary)] transition-colors" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FF2E63] rounded-full border-2 border-[#0B0E14] shadow-[0_0_8px_rgba(255,46,99,0.8)]"></span>
                </button>

                <div className="w-px bg-white/10 h-8 mx-1 hidden sm:block"></div>

                <div className="[&>*]:!rounded-xl [&>*]:!border-white/10 [&>*]:!text-sm">
                    <AuthButton />
                </div>
            </div>
        </header>
    );
}
