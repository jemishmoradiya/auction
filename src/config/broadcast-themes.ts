export type BroadcastThemeId = 'cyberpunk' | 'royal-gold' | 'tactical' | 'minimal-pro' | 'arctic';

export interface BroadcastThemeTokens {
    id: BroadcastThemeId;
    name: string;
    primaryAccent: string;
    secondaryAccent: string;
    backgroundGradient: string;
    borderGlow: string;
    highlightColor: string;
    dangerColor: string;
    successColor: string;
    surfaceOpacity: string;
    fontFamily: string;
    ambientTexture: string;
}

export const BROADCAST_THEMES: Record<BroadcastThemeId, BroadcastThemeTokens> = {
    'cyberpunk': {
        id: 'cyberpunk',
        name: 'Cyberpunk Neon',
        primaryAccent: '#ff00ff', // Magenta
        secondaryAccent: '#00ffff', // Cyan
        backgroundGradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        borderGlow: '0 0 20px rgba(255, 0, 255, 0.5)',
        highlightColor: '#ffff00',
        dangerColor: '#ff0000',
        successColor: '#00ff00',
        surfaceOpacity: '0.15',
        fontFamily: 'var(--font-inter)',
        ambientTexture: "url('https://grainy-gradients.vercel.app/noise.svg')"
    },
    'royal-gold': {
        id: 'royal-gold',
        name: 'Royal Gold',
        primaryAccent: '#D4AF37', // Gold
        secondaryAccent: '#1A237E', // Navy
        backgroundGradient: 'linear-gradient(135deg, #000428 0%, #004e92 100%)',
        borderGlow: '0 0 15px rgba(212, 175, 55, 0.4)',
        highlightColor: '#FDF5E6',
        dangerColor: '#B22222',
        successColor: '#228B22',
        surfaceOpacity: '0.1',
        fontFamily: 'var(--font-inter)',
        ambientTexture: "none"
    },
    'tactical': {
        id: 'tactical',
        name: 'Tactical Matte',
        primaryAccent: '#556B2F', // Olive Drab
        secondaryAccent: '#2F4F4F', // Dark Slate Gray
        backgroundGradient: 'linear-gradient(135deg, #121212 0%, #1a1a1a 100%)',
        borderGlow: 'none',
        highlightColor: '#E0E0E0',
        dangerColor: '#8B0000',
        successColor: '#006400',
        surfaceOpacity: '0.2',
        fontFamily: 'var(--font-inter)',
        ambientTexture: "url('https://grainy-gradients.vercel.app/noise.svg')"
    },
    'minimal-pro': {
        id: 'minimal-pro',
        name: 'Minimal Pro',
        primaryAccent: '#FFFFFF',
        secondaryAccent: '#A0A0A0',
        backgroundGradient: 'linear-gradient(135deg, #000000 0%, #121212 100%)',
        borderGlow: '0 0 5px rgba(255, 255, 255, 0.1)',
        highlightColor: '#FFFFFF',
        dangerColor: '#FFFFFF',
        successColor: '#FFFFFF',
        surfaceOpacity: '0.05',
        fontFamily: 'var(--font-inter)',
        ambientTexture: "none"
    },
    'arctic': {
        id: 'arctic',
        name: 'Arctic Frost',
        primaryAccent: '#E0F7FA',
        secondaryAccent: '#80DEEA',
        backgroundGradient: 'linear-gradient(135deg, #B2EBF2 0%, #4DD0E1 100%)',
        borderGlow: '0 0 20px rgba(224, 247, 250, 0.6)',
        highlightColor: '#FFFFFF',
        dangerColor: '#FF5252',
        successColor: '#69F0AE',
        surfaceOpacity: '0.2',
        fontFamily: 'var(--font-inter)',
        ambientTexture: "none"
    }
};
