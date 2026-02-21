"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Users,
  Gavel,
  ShieldCheck,
  Youtube,
  ChevronRight,
  Globe,
  Layout,
  Activity,
  Star
} from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { AuthButton } from "@/components/auth/AuthButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    checkUser();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative overflow-hidden">
      {/* Background Polish (Softened for Earthen Clay) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
            <Trophy className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-black italic tracking-tighter uppercase font-heading text-foreground">
            Auction<span className="text-primary">Next</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#profiles" className="hover:text-foreground transition-colors">Portfolios</a>
          <a href="#stats" className="hover:text-foreground transition-colors">Global Stats</a>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <Button
              asChild
              variant="outline"
              className="hidden md:flex gap-2 border border-white/10 bg-white/[0.03] hover:bg-white/10 text-white font-black uppercase tracking-widest text-[10px] h-10 px-6 rounded-full transition-all"
            >
              <Link href="/app">Enter Command Center</Link>
            </Button>
          ) : null}
          <AuthButton />
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-12"
        >
          <motion.div variants={itemVariants}>
            <Badge className="px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm">
              <Star className="w-3 h-3 animate-spin-slow mr-2" /> The Elite Gamer Network
            </Badge>
            <h1 className="text-[clamp(3rem,10vw,7rem)] font-black uppercase tracking-tighter italic leading-[0.85] mb-8 text-foreground">
              Showcase Your <br />
              <span className="text-primary">Legendary</span> Skill
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              The professional grade portfolio for competitive gamers. Verify your achievements, showcase your setup, and get recruited by top organizations.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-6">
            {user ? (
              <Button asChild size="lg" className="h-16 px-10 rounded-[1.5rem] bg-[var(--primary)] text-[#0B0E14] hover:bg-[#00F0FF]/90 hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] text-sm font-black uppercase tracking-widest group shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                <Link href="/app" className="flex items-center gap-3">
                  Command Center <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="h-16 px-10 rounded-[1.5rem] bg-[var(--primary)] text-[#0B0E14] hover:bg-[#00F0FF]/90 hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] text-sm font-black uppercase tracking-widest group shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                <Link href="/login" className="flex items-center gap-3">
                  Initialize Profile <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            )}
            <Button asChild size="lg" variant="outline" className="h-16 px-10 rounded-[1.5rem] border border-white/10 bg-white/[0.03] text-white hover:bg-white/10 hover:border-[var(--primary)]/40 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] text-sm font-black uppercase tracking-widest transition-all">
              <Link href="/players" className="flex items-center gap-3">
                <Layout className="w-5 h-5" /> Explore Roster
              </Link>
            </Button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-24"
          >
            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-[var(--primary)]/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all text-left space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-black uppercase italic tracking-tighter text-foreground">Verified Status</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">Manual vetting system for professional players and vetted organizations.</p>
            </div>

            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-[var(--secondary)]/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(176,38,255,0.15)] transition-all text-left space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)] group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(176,38,255,0.8)] transition-all">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-black uppercase italic tracking-tighter text-foreground">Multi-Game Roles</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">Manage distinct roles and stats across multiple game titles in one unified profile.</p>
            </div>

            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-[var(--primary)]/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all text-left space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all">
                <Youtube className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-black uppercase italic tracking-tighter text-foreground">Media Gallery</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">Integrated YouTube highlight system to showcase your best plays and tournament wins.</p>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Stats Bar */}
      <div className="border-y border-white/10 bg-white/[0.01] backdrop-blur-lg py-12">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <p className="text-3xl font-black italic tracking-tighter text-foreground">2.4k+</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Active Operatives</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black italic tracking-tighter text-foreground">450+</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Verified Clans</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black italic tracking-tighter text-foreground">₹12.5M</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Prize Pool Managed</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black italic tracking-tighter text-foreground">12</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Supported Titles</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-8 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground mb-8">Authorized Personal Only</p>
        <div className="flex items-center justify-center gap-8 text-muted-foreground opacity-60">
          <Trophy className="w-6 h-6" />
          <Users className="w-6 h-6" />
          <Gavel className="w-6 h-6" />
          <Activity className="w-6 h-6" />
        </div>
        <p className="mt-12 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
          &copy; 2024 AuctionNext Command. Developed for the High-Fidelity Frontlines.
        </p>
      </footer>
    </div>
  );
}
