"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { LogOut, Globe, User as UserIcon, LogIn } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const supabase = createClient();

export function AuthButton() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user: authUser } } = await supabase.auth.getUser();
            if (authUser) {
                setUser(authUser);
                const { data: profileData } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", authUser.id)
                    .single();
                setProfile(profileData);
            }
            setLoading(false);
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    if (loading) return <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />;

    if (!user) {
        return (
            <Button
                onClick={() => router.push("/login")}
                variant="outline"
                className="gap-2 border-white/10 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-[10px] px-6"
            >
                <div className="w-4 h-4 rounded-full bg-[var(--primary)] flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.4)]">
                    <LogIn className="w-2.5 h-2.5 text-[#0B0E14]" />
                </div>
                Login
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                    <Avatar className="h-10 w-10 border border-white/10">
                        <AvatarImage src={user.user_metadata.avatar_url} />
                        <AvatarFallback className="bg-[var(--primary)] text-[#0B0E14] font-black">
                            {user.email?.[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#0B0E14]/90 backdrop-blur-xl border border-white/10 text-white shadow-2xl rounded-2xl" align="end" forceMount>
                <DropdownMenuLabel className="font-normal font-heading">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-black leading-none uppercase tracking-tighter">
                            {user.user_metadata.full_name}
                        </p>
                        <p className="text-xs leading-none text-white/40 font-mono">
                            {user.email}
                        </p>
                        {profile?.role && (
                            <div className="pt-2">
                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${profile.role === 'admin'
                                    ? 'bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/30 shadow-inner'
                                    : 'bg-white/10 text-white/40 border border-white/10'
                                    }`}>
                                    {profile.role}
                                </span>
                            </div>
                        )}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer gap-2" onClick={() => router.push(`/app/profile`)}>
                    <UserIcon className="w-4 h-4" /> My Portfolio
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem
                    className="focus:bg-destructive focus:text-destructive-foreground cursor-pointer text-destructive gap-2"
                    onClick={signOut}
                >
                    <LogOut className="w-4 h-4" /> Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
