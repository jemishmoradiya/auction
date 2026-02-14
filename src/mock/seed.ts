
import { Player, Team, Tournament, AuctionPool } from '../types';

const PLAYER_IMAGES = [
    "/players/phantom.png",
    "/players/nova.png",
    "/players/viper.png",
    "/players/sage.png",
    "/players/reyna.png",
    "https://images.unsplash.com/photo-1566492031773-4fbc717f5fff?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop",
];

export const MOCK_PLAYERS: Player[] = Array.from({ length: 30 }, (_, i) => {
    const roles = ['IGL', 'OG', 'GENZ', 'Flex', 'Support'];
    const role = roles[i % 5] as any;
    const games = [
        {
            name: "Call of Duty: Mobile",
            ign: `Player${i + 1}`,
            role: role,
            rank: ['Legendary', 'Grandmaster', 'Master'][Math.floor(Math.random() * 3)],
            stats: [
                { label: "K/D Ratio", value: (Math.random() * 2 + 0.5).toFixed(2) },
                { label: "Win Rate", value: `${Math.floor(Math.random() * 40 + 40)}%` },
                { label: "Avg Score", value: Math.floor(Math.random() * 2000 + 1000) }
            ]
        },
        {
            name: "Valorant",
            ign: `V_Player${i + 1}`,
            role: "Duelist",
            rank: "Radiant",
            stats: [
                { label: "ACS", value: Math.floor(Math.random() * 100 + 200) },
                { label: "K/D", value: (Math.random() * 1.5 + 0.8).toFixed(2) }
            ]
        }
    ];

    return {
        id: `p${i + 1}`,
        ign: i === 0 ? "PHANTOM" : `Player${i + 1}`,
        name: i === 0 ? "Jake Morrison" : `Name ${i + 1}`,
        role: role,
        stats: {
            kd: parseFloat((Math.random() * 2 + 0.5).toFixed(2)),
            winRate: Math.floor(Math.random() * 40 + 40),
            matchesPlayed: Math.floor(Math.random() * 500 + 100),
            rank: ['Legendary', 'Grandmaster', 'Master'][Math.floor(Math.random() * 3)],
        },
        previousTeam: i % 4 === 0 ? `Clan ${i}` : undefined,
        achievements: ['https://placehold.co/400x300?text=Achievement'],
        basePrice: [100, 150, 200][Math.floor(Math.random() * 3)],
        image: i === 0 ? "/players/phantom.png" : PLAYER_IMAGES[i % PLAYER_IMAGES.length],
        // New Profile Data
        bio: i === 0 ? "Legendary IGL with a history of tactical dominance in high-pressure tournaments." : `Professional CODM player with over ${Math.floor(Math.random() * 4 + 1)} years of competitive experience. Known for clutch plays and strategic calling.`,
        socials: {
            twitter: "https://twitter.com",
            twitch: "https://twitch.tv",
            instagram: "https://instagram.com",
            discord: "user#1234"
        },
        games: games,
        setup: {
            mouse: "Logitech G Pro X Superlight",
            keyboard: "Wooting 60HE",
            headset: "HyperX Cloud II",
            mousepad: "Artisan Hayate Otsu",
            monitor: "BenQ ZOWIE XL2546K"
        }
    };
});

export const MOCK_TEAMS: Team[] = [
    { id: 't1', name: 'Alpha Squad', ownerName: 'John Doe', budget: 1000, spent: 0, roster: [], logo: "https://api.dicebear.com/7.x/identicon/svg?seed=Alpha" },
    { id: 't2', name: 'Beta Warriors', ownerName: 'Jane Smith', budget: 1000, spent: 0, roster: [], logo: "https://api.dicebear.com/7.x/identicon/svg?seed=Beta" },
    { id: 't3', name: 'Gamma Gamers', ownerName: 'Mike Ross', budget: 1000, spent: 0, roster: [], logo: "https://api.dicebear.com/7.x/identicon/svg?seed=Gamma" },
    { id: 't4', name: 'Delta Force', ownerName: 'Harvey Specter', budget: 1000, spent: 0, roster: [], logo: "https://api.dicebear.com/7.x/identicon/svg?seed=Delta" },
    { id: 't5', name: 'Epsilon Elite', ownerName: 'Rachel Zane', budget: 1000, spent: 0, roster: [], logo: "https://api.dicebear.com/7.x/identicon/svg?seed=Epsilon" },
    { id: 't6', name: 'Zeta Zealots', ownerName: 'Louis Litt', budget: 1000, spent: 0, roster: [], logo: "https://api.dicebear.com/7.x/identicon/svg?seed=Zeta" },
];

export const MOCK_POOLS: AuctionPool[] = [
    { id: 'pool1', name: 'IGL', minBasePrice: 200, maxBasePrice: 500, minPerTeam: 1 },
    { id: 'pool2', name: 'OG Player', minBasePrice: 150, maxBasePrice: 400, minPerTeam: 2 },
    { id: 'pool3', name: 'GENZ Player', minBasePrice: 100, maxBasePrice: 300, minPerTeam: 1 },
];

export const MOCK_TOURNAMENT: Tournament = {
    id: 'tourney1',
    name: 'CODM Championship 2024',
    game: 'Call of Duty: Mobile',
    prizePool: 50000,
    startDate: '2024-03-01',
    endDate: '2024-03-10',
    status: 'SETUP',
    rules: {
        minPlayers: 5,
        maxPlayers: 7,
        auctionTimer: 20,
        bidIncrement: 10,
    },
};
