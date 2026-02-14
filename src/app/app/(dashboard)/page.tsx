"use client";

import { createClient } from "@/lib/supabase/client";
import { useAuctionStore } from "@/store/useAuctionStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Users,
  Gavel,
  TrendingUp,
  Play,
  Monitor,
  Settings
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TeamCard } from "@/components/dashboard/TeamCard";

export default function DashboardPage() {
  const supabase = createClient();
  const tournaments = useAuctionStore(state => state.tournaments);
  const activeTournamentId = useAuctionStore(state => state.activeTournamentId);
  const teams = useAuctionStore(state => state.teams);
  const auctionStatus = useAuctionStore(state => state.auctionState.status);
  const currentBid = useAuctionStore(state => state.auctionState.currentBid);
  const leadingTeamId = useAuctionStore(state => state.auctionState.leadingTeamId);

  const activeTournament = tournaments.find(t => t.id === activeTournamentId) || tournaments[0];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex-1 space-y-8 p-8 relative overflow-hidden min-h-screen bg-[#020617]">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--theme-primary)]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--theme-secondary)]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Header / Hero Section */}
      <section className="relative space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/20 text-[var(--theme-primary)] text-[9px] font-black uppercase tracking-[0.4em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] animate-pulse" />
              Strategic Command
            </div>
            <h1 className="text-6xl font-black uppercase tracking-tighter text-white italic">
              Auction <span className="text-[var(--theme-primary)]">Control</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Active Tournament</p>
                <p className="text-sm font-bold text-white uppercase">{activeTournament?.name}</p>
              </div>
              <div className="h-10 w-[1px] bg-white/10" />
              <div className="space-y-1">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">System Status</p>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${auctionStatus === 'BIDDING' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                  <span className={`text-sm font-black uppercase tracking-wider ${auctionStatus === 'BIDDING' ? 'text-red-400' : 'text-emerald-400'}`}>
                    {auctionStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Module: Bidder Console */}
        <Link href={`/app/auction/${activeTournament?.id}/bid`} className="group">
          <div className="h-full bg-white/5 border border-white/10 rounded-[2rem] p-10 backdrop-blur-3xl relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-[var(--theme-accent)]/50 hover:bg-[var(--theme-accent)]/[0.03]">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
              <Gavel className="w-20 h-20 text-[var(--theme-accent)]" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-[var(--theme-accent)] flex items-center justify-center shadow-[0_0_30px_rgba(255,46,99,0.3)]">
                <Play className="w-7 h-7 text-white fill-current" />
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">War Room</h3>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Bidder Transmission Ready</p>
              </div>
              <div className="pt-4 flex items-center gap-3 text-[var(--theme-accent)] font-black text-[10px] uppercase tracking-widest group-hover:gap-5 transition-all">
                Access Node
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>

        {/* Module: Host Dashboard */}
        <Link href={`/app/auction/${activeTournament?.id}/host`} className="group">
          <div className="h-full bg-white/5 border border-white/10 rounded-[2rem] p-10 backdrop-blur-3xl relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-[var(--theme-primary)]/50 hover:bg-[var(--theme-primary)]/[0.03]">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
              <Users className="w-20 h-20 text-[var(--theme-primary)]" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-[var(--theme-primary)] flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.3)]">
                <Settings className="w-7 h-7 text-black stroke-[3px]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Command</h3>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">System Moderator Interface</p>
              </div>
              <div className="pt-4 flex items-center gap-3 text-[var(--theme-primary)] font-black text-[10px] uppercase tracking-widest group-hover:gap-5 transition-all">
                Initialize Command
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>

        {/* Module: OBS Overlay */}
        <Link href={`/app/auction/${activeTournament?.id}/stream`} className="group">
          <div className="h-full bg-white/5 border border-white/10 rounded-[2rem] p-10 backdrop-blur-3xl relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-[var(--theme-secondary)]/50 hover:bg-[var(--theme-secondary)]/[0.03]">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
              <Monitor className="w-20 h-20 text-[var(--theme-secondary)]" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-[var(--theme-secondary)] flex items-center justify-center shadow-[0_0_30px_rgba(204,255,0,0.3)]">
                <Trophy className="w-7 h-7 text-black stroke-[3px]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Broadcast</h3>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">High-Fidelity Overlay v5.2</p>
              </div>
              <div className="pt-4 flex items-center gap-3 text-[var(--theme-secondary)] font-black text-[10px] uppercase tracking-widest group-hover:gap-5 transition-all">
                Deploy Signal
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Intelligence Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        {/* Analytics Summary */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Card className="bg-white/[0.02] border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
            <CardHeader className="p-8 pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-black uppercase text-white tracking-tight flex items-center gap-3 italic">
                  <div className="p-2 rounded-lg bg-white/5">
                    <TrendingUp className="w-5 h-5 text-[var(--theme-primary)]" />
                  </div>
                  Financial Intelligence
                </CardTitle>
                <Badge variant="outline" className="border-white/10 text-white/60">
                  Global Purse Tracking
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map(team => (
                  <TeamCard key={team.id} team={team} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Feed Panel */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="flex-1 bg-white/[0.02] border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black uppercase text-white tracking-tight flex items-center gap-3 italic">
                <div className="p-2 rounded-lg bg-white/5">
                  <Play className="w-5 h-5 text-[var(--theme-accent)] transition-all animate-pulse" />
                </div>
                Live Technical Signal
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 flex flex-col items-center justify-center text-center h-[300px]">
              {auctionStatus === 'BIDDING' ? (
                <div className="space-y-6">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-[var(--theme-accent)] blur-3xl animate-pulse opacity-10" />
                    <div className="relative text-7xl font-black text-white tracking-tighter italic">
                      ₹{currentBid}k
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Active Leads</p>
                    <p className="text-xl font-black text-[var(--theme-accent)] uppercase italic">
                      {teams.find(t => t.id === leadingTeamId)?.name}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 opacity-40">
                  <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                    <Monitor className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white uppercase tracking-widest">No Active Signal</p>
                    <p className="text-xs text-white/60">Awaiting Auction Initialization</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
