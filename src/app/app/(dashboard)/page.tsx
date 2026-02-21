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
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-10 min-h-screen bg-[var(--background)] text-white font-sans selection:bg-[var(--primary)] selection:text-black overflow-x-hidden">
      {/* Header / Hero Section */}
      <section className="relative space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10 border-b border-white/10 pb-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-heading leading-none text-shadow-sm">
              Auction<span className="text-[var(--primary)] drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">Control</span>
            </h1>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse shadow-[0_0_5px_rgba(0,240,255,0.8)]" />
              Strategic Command Center
            </div>
          </div>

          <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
            <div className="px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-xl flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest inline-block">Active Tournament</p>
                <p className="text-sm font-bold text-white uppercase">{activeTournament?.name}</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest inline-block">System Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-2.5 h-2.5 rounded-full ${auctionStatus === 'BIDDING' ? 'bg-[#FF2E63] animate-pulse shadow-[0_0_8px_rgba(255,46,99,0.8)]' : 'bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.8)]'}`} />
                  <span className={`text-sm font-bold uppercase tracking-widest ${auctionStatus === 'BIDDING' ? 'text-[#FF2E63]' : 'text-white'}`}>
                    {auctionStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Module: Bidder Console */}
        <Link href={`/app/auction/${activeTournament?.id}/bid`} className="group">
          <div className="h-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:-translate-y-2 hover:bg-white/[0.04] hover:border-[var(--primary)]/30 backdrop-blur-xl flex flex-col justify-between overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Play className="w-8 h-8 text-[var(--primary)] fill-current drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white uppercase tracking-tight font-heading">War Room</h3>
                <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest bg-[var(--primary)]/10 inline-block px-3 py-1 rounded-full">Bidder Transmission Ready</p>
              </div>
              <div className="pt-6 flex items-center gap-2 text-slate-300 font-bold text-sm uppercase tracking-widest group-hover:text-[var(--primary)] group-hover:gap-4 transition-all border-t border-white/10 pt-4">
                Access Node
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>
        </Link>

        {/* Module: Host Dashboard */}
        <Link href={`/app/auction/${activeTournament?.id}/host`} className="group">
          <div className="h-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 transition-all duration-500 hover:shadow-[0_0_30px_rgba(176,38,255,0.15)] hover:-translate-y-2 hover:bg-white/[0.04] hover:border-[var(--secondary)]/30 backdrop-blur-xl flex flex-col justify-between overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/30 flex items-center justify-center group-hover:rotate-90 group-hover:scale-110 transition-all duration-500">
                <Settings className="w-8 h-8 text-[var(--secondary)] drop-shadow-[0_0_10px_rgba(176,38,255,0.8)]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white uppercase tracking-tight font-heading">Command</h3>
                <p className="text-xs font-semibold text-[var(--secondary)] uppercase tracking-widest bg-[var(--secondary)]/10 inline-block px-3 py-1 rounded-full">System Moderator Interface</p>
              </div>
              <div className="pt-6 flex items-center gap-2 text-slate-300 font-bold text-sm uppercase tracking-widest group-hover:text-[var(--secondary)] group-hover:gap-4 transition-all border-t border-white/10 pt-4">
                Initialize Command
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>
        </Link>

        {/* Module: OBS Overlay */}
        <Link href={`/app/auction/${activeTournament?.id}/stream`} className="group">
          <div className="h-full bg-[#0B0E14] border border-white/10 rounded-[2rem] p-8 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,46,99,0.15)] hover:-translate-y-2 hover:border-[#FF2E63]/40 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF2E63]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-[#FF2E63]/10 border border-[#FF2E63]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Monitor className="w-8 h-8 text-[#FF2E63] drop-shadow-[0_0_10px_rgba(255,46,99,0.8)]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white uppercase tracking-tight font-heading">Broadcast</h3>
                <p className="text-xs font-semibold text-[#FF2E63] uppercase tracking-widest bg-[#FF2E63]/10 inline-block px-3 py-1 rounded-full">High-Fidelity Overlay</p>
              </div>
              <div className="pt-6 flex items-center gap-2 text-slate-400 font-bold text-sm uppercase tracking-widest group-hover:text-[#FF2E63] group-hover:gap-4 transition-all border-t border-white/10 pt-4">
                Deploy Signal
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Intelligence Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 mt-8">
        {/* Analytics Summary */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Card className="bg-white/[0.02] border-white/10 rounded-[2rem] backdrop-blur-xl overflow-hidden shadow-2xl">
            <CardHeader className="p-8 pb-6 border-b border-white/5 bg-white/[0.01]">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <CardTitle className="text-2xl font-black uppercase text-white tracking-tight flex items-center gap-4 font-heading">
                  <div className="p-3 bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-[var(--primary)] drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                  </div>
                  Financial Intelligence
                </CardTitle>
                <div className="bg-[var(--secondary)]/10 border border-[var(--secondary)]/30 text-[var(--secondary)] px-4 py-1.5 font-bold text-xs uppercase tracking-widest rounded-full">
                  Global Purse Tracking
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
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
          <Card className="flex-1 bg-white/[0.02] border-white/10 rounded-[2rem] backdrop-blur-xl overflow-hidden shadow-2xl">
            <CardHeader className="p-8 pb-6 border-b border-white/5 bg-white/[0.01]">
              <CardTitle className="text-2xl font-black uppercase text-white tracking-tight flex items-center gap-4 font-heading">
                <div className="p-3 bg-[#0B0E14] border border-white/10 rounded-xl shadow-inner">
                  <Play className="w-6 h-6 text-[#00F0FF] fill-current drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                </div>
                Live Technical Signal
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 flex flex-col items-center justify-center text-center min-h-[300px] relative">
              {/* Background gradient for live signal */}
              {auctionStatus === 'BIDDING' && (
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--primary)]/5 via-transparent to-transparent animate-pulse" />
              )}
              {auctionStatus === 'BIDDING' ? (
                <div className="space-y-6 w-full relative z-10">
                  <div className="relative inline-block w-full bg-[#0B0E14]/80 border border-[var(--primary)]/30 p-8 rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.15)] backdrop-blur-md">
                    <div className="relative text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                      ₹{currentBid}k
                    </div>
                  </div>
                  <div className="space-y-2 bg-white/[0.02] border border-white/10 p-5 rounded-xl backdrop-blur-sm">
                    <p className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest inline-block">Active Component</p>
                    <p className="text-2xl font-black text-white uppercase truncate drop-shadow-sm">
                      {teams.find(t => t.id === leadingTeamId)?.name}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 w-full opacity-50 relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                    <Monitor className="w-10 h-10 text-slate-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-slate-300 uppercase tracking-widest">No Active Signal</p>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-2 block">Awaiting Initialization Sequence</p>
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
