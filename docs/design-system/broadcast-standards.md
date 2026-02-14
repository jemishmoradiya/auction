# Broadcast Display Standards: Cinematic Engine v5

This document outlines the UI/UX standards, design tokens, and components used in the high-fidelity broadcast stream. All future modules should adhere to these principles to maintain visual consistency.

## 1. Core Color Palette (Cinematic Transmission)

| Role | Color | Hex | Tailwind/CSS Variable |
| :--- | :--- | :--- | :--- |
| **Base Background** | Onyx Black | `#05070A` | `--theme-bg` / `bg-[#05070A]` |
| **Primary Accent** | Electric Cyan | `#00E5FF` | `--theme-primary` |
| **Secondary Accent** | Toxic Lemon | `#CCFF00` | `--theme-secondary` |
| **Alert/Warning** | Cyber Pink | `#FF2E63` | `--theme-accent` |
| **Surface (Glass)** | Muted Navy | `rgba(13,17,26,0.8)` | `--theme-surface` |
| **Main Text** | Off-White | `#E7EBFF` | `text-[#E7EBFF]` |

## 2. Typography Standards

### **E-Sports Display (IGNs)**
- **Font**: `Inter` or `Rajdhani` (suggested)
- **Weight**: `font-black` (900+)
- **Tracking**: `tracking-[-0.04em]` (Aggressive negative tracking)
- **Transform**: `uppercase`
- **Effect**: Subtle neon glow (`drop-shadow-[0_0_30px_...]`)

### **Technical HUD Labels**
- **Sizing**: `text-[9px]` to `text-[11px]`
- **Weight**: `font-black` (900)
- **Tracking**: `tracking-[0.4em]` to `horizontal-[0.6em]`
- **Opacity**: `opacity-40` to `opacity-60`
- **Purpose**: Secondary metadata, status indicators, and grid labels.

### **Financial Data (Bids)**
- **Color**: Toxic Lemon (`--theme-secondary`)
- **Weight**: `font-black`
- **Style**: `italic` prefix (₹) and suffix (K) to imply speed/momentum.

## 3. Layout Principles

### **"Grid-Locked" 2-Row Architecture**
1. **Row 1: Header HUD**: Fixed height, top-aligned, tournament metadata only.
2. **Row 2: Main Arena**: 1fr (flexible), contains all primary content (Spotlight + Data).
3. **Side Rails**: Full-height vertical branding rails that consume "dead space" on ultra-wide displays.

### **Glassmorphism Strategy**
- Cards use `backdrop-blur-xl` and `bg-white/5`.
- Borders are always `border-white/10` or themed `border-[var(--theme-primary)]/15`.

## 4. Component Inventory

| Component | Description | Location |
| :--- | :--- | :--- |
| `PlayerCard` | High-impact spotlight for active players. | `@/components/overlay/PlayerCard` |
| `CurrentBidCard` | Pulsing bid tracker with Digital Scramble animation. | `@/components/overlay/CurrentBidCard` |
| `TransmissionLog` | High-density horizontal bid history. | `@/components/overlay/BidHistoryList` |
| `BrandingRail` | Vertical rotating tournament/social stickers. | `@/components/overlay/BrandingRail` |
| `CinematicGateway` | Startup optimization prompt (Fullscreen). | `app/auction/[id]/stream/page.tsx` |
| `MobileRestriction` | Device protection gate (Desktop-only). | `app/auction/[id]/stream/page.tsx` |

## 5. Animation Philosophy

- **Physical Impact**: Every data change triggers a corresponding scale/glow pulse (e.g., Bid Flash).
- **Digital Noise**: Transitions should feel technical (e.g., Digital Scramble effect).
- **Atmospheric**: Low-opacity ambient glows should pulse at a slow frequency (10s+).

---
*Created by Antigravity v5.0 - System Standard*
