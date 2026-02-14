
# AuctioNext | Esports Tournament Auction Platform

A high-fidelity, real-time esports tournament auction platform built with Next.js 15. Designed for live broadcasts and intense "War Room" bidding experiences.

## 🚀 Key Features

- **Live Auction Suite**: Three distinct interfaces (Host, Bidder, Stream Overlay) synchronized in real-time.
- **War Room Aesthetic**: Premium dark mode design with glassmorphism and high-density information displays.
- **Zustand State Engine**: Robust state management with localStorage persistence and automatic cross-tab synchronization.
- **Stream-Ready Overlay**: Clean 16:9 layout designed for OBS/vMix integration with animated tickers and queue previews.
- **Fast Bidding**: Team-specific bidding consoles with budget validation and roster tracking.
- **Host Controls**: Full-featured host screen with keyboard shortcuts for rapid auction management.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: Zustand (with Persist middleware)
- **Forms/Validation**: React Hook Form + Zod
- **Notifications**: Sonner

## 📖 Demo Guide

### 1. Setup
- Open the application in two or more browser windows.
- In Window A: Navigate to `/auction/1/host` (Host Perspective).
- In Window B: Navigate to `/auction/1/bid` (Bidder Perspective).
- In Window C (Optional): Navigate to `/auction/1/stream` (Stream Overlay).

### 2. The Auction Flow
1. **Identify**: On the Bidder screen, select a team (e.g., "Team Vitality").
2. **Setup**: On the Host screen, ensure the queue is ready.
3. **Control**: Use the Host screen (or keyboard shortcuts) to bring up the first player.
   - `Space`: Start/Resume Timer
   - `Enter`: Mark as SOLD
   - `N`: Next Player
4. **Bid**: Switch to the Bidder screen. Place bids or pass. Watch the timer auto-extend on every bid!
5. **Finalize**: Once the timer hits 0 or you decide to end, mark the player as Sold or Unsold on the Host screen.
6. **Persistence**: Refresh any tab anytime; your auction state is preserved via localStorage.

### 3. Resetting
- Click the "Reset Demo" button on the Host screen (bottom right) to clear all rosters and reset calculations to the initial seed state.

## ⌨️ Host Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play / Pause Timer |
| `S` | Start Bidding |
| `N` | Next Player (Queue) |
| `Enter` | Mark Sold |
| `U` | Mark Unsold |
| `R` | Reset Timer (15s) |

---
Built with ❤️ by Antigravity
