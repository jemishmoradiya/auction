
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Player, Team, Tournament, AuctionPool, AuctionState, BidEvent, AuctionStatus } from '../types';
import { MOCK_PLAYERS, MOCK_TEAMS, MOCK_TOURNAMENT } from '../mock/seed';

interface AuctionStore {
    players: Player[];
    teams: Team[];
    tournaments: Tournament[];
    activeTournamentId: string | null;
    auctionState: AuctionState;

    // Actions
    setAuctionStatus: (status: AuctionStatus) => void;
    setCurrentPlayer: (playerId: string | null) => void;
    placeBid: (teamId: string, amount: number) => void;
    tickTimer: () => void;
    resetTimer: () => void;
    markSold: () => void;
    markUnsold: () => void;
    nextPlayer: () => void;
    resetDemo: () => void;
    updateFromSync: (newState: Partial<AuctionStore>) => void;
    updatePlayer: (playerId: string, updates: Partial<Player>) => void;

    // Tournament Actions
    createTournament: (tournament: Omit<Tournament, 'id' | 'status'>) => void;
    updateTournament: (id: string, updates: Partial<Tournament>) => void;
    deleteTournament: (id: string) => void;
    setActiveTournament: (id: string) => void;
}

const INITIAL_AUCTION_STATE: AuctionState = {
    tournamentId: MOCK_TOURNAMENT.id,
    status: 'IDLE',
    currentPlayerId: null,
    currentBid: 0,
    leadingTeamId: null,
    timer: MOCK_TOURNAMENT.rules.auctionTimer,
    queue: MOCK_PLAYERS.map(p => p.id),
    unsold: [],
    bidHistory: [],
    lastUpdate: Date.now(),
};

export const useAuctionStore = create<AuctionStore>()(
    persist(
        (set, get) => ({
            players: MOCK_PLAYERS,
            teams: MOCK_TEAMS,
            tournaments: [MOCK_TOURNAMENT],
            activeTournamentId: MOCK_TOURNAMENT.id,
            auctionState: INITIAL_AUCTION_STATE,

            setAuctionStatus: (status) => set((state) => ({
                auctionState: { ...state.auctionState, status, lastUpdate: Date.now() }
            })),

            setCurrentPlayer: (playerId) => set((state) => {
                const player = state.players.find(p => p.id === playerId);
                const activeTourney = state.tournaments.find(t => t.id === state.activeTournamentId);
                return {
                    auctionState: {
                        ...state.auctionState,
                        currentPlayerId: playerId,
                        currentBid: player?.basePrice || 0,
                        leadingTeamId: null,
                        timer: activeTourney?.rules.auctionTimer || 30,
                        status: playerId ? 'IDLE' : 'IDLE',
                        lastUpdate: Date.now()
                    }
                };
            }),

            placeBid: (teamId, amount) => set((state) => {
                const newBidEvent: BidEvent = {
                    id: Math.random().toString(36).substr(2, 9),
                    playerId: state.auctionState.currentPlayerId!,
                    teamId,
                    amount,
                    timestamp: Date.now(),
                };

                return {
                    auctionState: {
                        ...state.auctionState,
                        currentBid: amount,
                        leadingTeamId: teamId,
                        status: 'BIDDING',
                        // Auto-extend +5s
                        timer: state.auctionState.timer + 5,
                        bidHistory: [newBidEvent, ...state.auctionState.bidHistory],
                        lastUpdate: Date.now(),
                    }
                };
            }),

            tickTimer: () => set((state) => {
                if (state.auctionState.status !== 'BIDDING' && state.auctionState.status !== 'IDLE') return state;

                // Debounce to prevent multiple tabs from speeding up the timer
                const now = Date.now();
                if (now - state.auctionState.lastUpdate < 900) {
                    return state;
                }

                if (state.auctionState.timer <= 0) {
                    return { auctionState: { ...state.auctionState, timer: 0, lastUpdate: now } };
                }
                return {
                    auctionState: {
                        ...state.auctionState,
                        timer: state.auctionState.timer - 1,
                        lastUpdate: now
                    }
                };
            }),

            resetTimer: () => set((state) => {
                const activeTourney = state.tournaments.find(t => t.id === state.activeTournamentId);
                return {
                    auctionState: {
                        ...state.auctionState,
                        timer: activeTourney?.rules.auctionTimer || 30,
                        lastUpdate: Date.now()
                    }
                };
            }),

            markSold: () => set((state) => {
                const { currentPlayerId, leadingTeamId, currentBid } = state.auctionState;
                if (!currentPlayerId || !leadingTeamId) return state;

                const newTeams = state.teams.map(t => {
                    if (t.id === leadingTeamId) {
                        return {
                            ...t,
                            spent: t.spent + currentBid,
                            roster: [...t.roster, currentPlayerId]
                        };
                    }
                    return t;
                });

                const newQueue = state.auctionState.queue.filter(id => id !== currentPlayerId);

                return {
                    teams: newTeams,
                    auctionState: {
                        ...state.auctionState,
                        status: 'SOLD',
                        queue: newQueue,
                        lastUpdate: Date.now()
                    }
                };
            }),

            markUnsold: () => set((state) => {
                const { currentPlayerId } = state.auctionState;
                if (!currentPlayerId) return state;

                const newQueue = state.auctionState.queue.filter(id => id !== currentPlayerId);
                const newUnsold = [...state.auctionState.unsold, currentPlayerId];

                return {
                    auctionState: {
                        ...state.auctionState,
                        status: 'UNSOLD',
                        queue: newQueue,
                        unsold: newUnsold,
                        lastUpdate: Date.now()
                    }
                };
            }),

            nextPlayer: () => {
                const { queue } = get().auctionState;
                if (queue.length > 0) {
                    get().setCurrentPlayer(queue[0]);
                } else {
                    get().setCurrentPlayer(null);
                }
            },

            resetDemo: () => set({
                players: MOCK_PLAYERS,
                teams: MOCK_TEAMS,
                tournaments: [MOCK_TOURNAMENT],
                activeTournamentId: MOCK_TOURNAMENT.id,
                auctionState: INITIAL_AUCTION_STATE,
            }),

            updateFromSync: (newState) => set((state) => ({ ...state, ...newState })),
            updatePlayer: (playerId, updates) => set((state) => ({
                players: state.players.map(p => p.id === playerId ? { ...p, ...updates } : p)
            })),

            createTournament: (tournament) => set((state) => {
                const newTourney: Tournament = {
                    ...tournament,
                    id: Math.random().toString(36).substr(2, 9),
                    status: 'SETUP'
                };
                return {
                    tournaments: [...state.tournaments, newTourney]
                };
            }),

            updateTournament: (id, updates) => set((state) => ({
                tournaments: state.tournaments.map(t => t.id === id ? { ...t, ...updates } : t)
            })),

            deleteTournament: (id) => set((state) => ({
                tournaments: state.tournaments.filter(t => t.id !== id),
                activeTournamentId: state.activeTournamentId === id ? null : state.activeTournamentId
            })),

            setActiveTournament: (id) => set((state) => ({
                activeTournamentId: id,
                auctionState: {
                    ...state.auctionState,
                    tournamentId: id,
                    status: 'IDLE',
                    currentPlayerId: null,
                    currentBid: 0,
                    leadingTeamId: null,
                    timer: state.tournaments.find(t => t.id === id)?.rules.auctionTimer || 30,
                    bidHistory: [],
                    lastUpdate: Date.now()
                }
            })),
        }),
        {
            name: 'auction-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

// Cross-tab sync listener
if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
        if (event.key === 'auction-storage') {
            useAuctionStore.persist.rehydrate();
        }
    });
}
