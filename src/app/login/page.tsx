"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Globe, ChevronRight, Gavel } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                router.push("/app");
            }
        };
        checkUser();
    }, [router]);

    const handleGoogleLogin = async () => {
        setLoading(true);
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Polish (Softened for Earthen Clay) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center space-y-8">
                    {/* Logo */}
                    <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-transform group-hover:scale-110">
                            <Trophy className="w-7 h-7 text-[#0B0E14]" />
                        </div>
                        <span className="text-3xl font-black italic tracking-tighter uppercase font-heading text-foreground">
                            Auction<span className="text-[var(--primary)] drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">Next</span>
                        </span>
                    </Link>

                    <Card className="bg-white/[0.02] border border-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl space-y-8">
                        <div className="space-y-2">
                            <Badge variant="outline" className="border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] shadow-[0_0_10px_rgba(0,240,255,0.2)] text-[10px] font-black uppercase tracking-widest px-4 py-1">
                                Secure Access Point
                            </Badge>
                            <h2 className="text-4xl font-black uppercase italic tracking-tighter font-heading text-foreground">
                                Initialize <br />
                                <span className="text-[var(--primary)] drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">Session</span>
                            </h2>
                            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                                Authorization required for Command Center access
                            </p>
                        </div>

                        <div className="space-y-4 pt-4">
                            <Button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                size="lg"
                                className="w-full h-16 rounded-[1.5rem] bg-[var(--primary)] text-[#0B0E14] hover:bg-[#00F0FF]/90 hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] text-xs font-black uppercase tracking-[0.2em] gap-4 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
                            >
                                <div className="w-6 h-6 rounded-full bg-[#0B0E14]/20 border border-[#0B0E14]/30 flex items-center justify-center p-1">
                                    <Globe className="w-4 h-4 text-[#0B0E14]" />
                                </div>
                                {loading ? "Establishing Link..." : "Continue with Google"}
                            </Button>

                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] text-center px-8 leading-relaxed">
                                By connecting, you agree to the Tactical Engagement Protocols and Terms of Service.
                            </p>
                        </div>
                    </Card>

                    <Link
                        href="/"
                        className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2 pt-4"
                    >
                        <ChevronRight className="w-3 h-3 rotate-180" /> Back to Global Intel
                    </Link>
                </div>
            </motion.div>

            {/* Bottom Credits */}
            <div className="absolute bottom-10 left-0 right-0 text-center text-muted-foreground flex items-center justify-center gap-6">
                <Gavel className="w-5 h-5" />
                <span className="w-1 h-1 rounded-full bg-border" />
                <p className="text-[10px] font-black uppercase tracking-[0.5em]">Command Node v5.2</p>
            </div>
        </div>
    );
}

// Redefining a simple Card locally to avoid dependency issues if it's not exported correctly
function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}
