
export type PlayerRole = 'IGL' | 'OG' | 'GENZ' | 'Flex' | 'Support';

export interface PlayerStats {
  kd: number;
  winRate: number;
  matchesPlayed: number;
  rank: string;
}

export interface Player {
  id: string;
  ign: string;
  name: string;
  role: PlayerRole;
  stats: PlayerStats;
  previousTeam?: string;
  achievements: string[]; // URLs to screenshots/images
  basePrice: number;
  image?: string; // New: Player photo URL
  status?: AuctionStatus; // New: Auction status for this player
  price?: number; // New: Final sold price
  // New Profile Fields
  bio?: string;
  socials?: {
    twitter?: string;
    twitch?: string;
    instagram?: string;
    youtube?: string;
    discord?: string;
  };
  games?: {
    name: string;
    ign: string;
    role: string;
    rank: string;
    stats: { label: string; value: string | number }[];
  }[];
  setup?: {
    mouse?: string;
    keyboard?: string;
    headset?: string;
    mousepad?: string;
    monitor?: string;
  };
}

export interface Team {
  id: string;
  name: string;
  ownerName: string;
  budget: number;
  spent: number;
  roster: string[]; // Player IDs
  logo?: string; // New: Team logo URL
}

export interface AuctionPool {
  id: string;
  name: string;
  minBasePrice: number;
  maxBasePrice: number;
  minPerTeam: number;
}

export type TournamentStatus = 'DRAFT' | 'SETUP' | 'LIVE' | 'COMPLETED';

export interface Tournament {
  id: string;
  name: string;
  game: string;
  prizePool: number;
  startDate: string;
  endDate: string;
  status: TournamentStatus;
  rules: {
    minPlayers: number;
    maxPlayers: number;
    auctionTimer: number;
    bidIncrement: number;
  };
}

export interface BidEvent {
  id: string;
  playerId: string;
  teamId: string;
  amount: number;
  timestamp: number;
}

export type AuctionStatus = 'IDLE' | 'BIDDING' | 'PAUSED' | 'SOLD' | 'UNSOLD';

export interface AuctionState {
  tournamentId: string;
  status: AuctionStatus;
  currentPlayerId: string | null;
  currentBid: number;
  leadingTeamId: string | null;
  timer: number;
  queue: string[]; // Player IDs
  unsold: string[]; // Player IDs
  bidHistory: BidEvent[];
  lastUpdate: number;
}
