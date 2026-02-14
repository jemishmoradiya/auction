# Stream Module PRD (Product Requirements Document)

## Overview
The Stream Module is designed to provide a high-fidelity, real-time auction overlay for tournament broadcasts. It features a cinematic layout optimized for 1080p streaming, with dynamic components for player spotlights, bidding history, team statistics, and theme customization.

## Key Components

### 1. Viewport & Layout
- **Container**: `StreamViewport` handles responsive scaling, maintaining a 1400x850 aspect ratio to ensure consistent layout across different screen sizes.
- **Theme Support**: Integrated with `ThemeProvider`, supporting multiple aesthetic presets (Cyberpunk, Tactical, Arctic, etc.).

### 2. Header Layer
- **`OverlayHeader`**: Displays the active tournament name and the current leading team or status message (e.g., "WAITING FOR BID").

### 3. Left Panel: Personnel Info
- **`HostCard`**: Persistent display for the auctioneer/host information.
- **`OwnerCard` (Rotating Grid)**: A dynamic grid showing team owners. It rotates through all participants every 5 seconds to ensure all teams get screen time.

### 4. Center Panel: Core Auction Data
- **`PlayerCard`**: The focal point of the auction.
  - Displays Player AGN/Name, Role, and Key Stats (KD, Win Rate, Rank).
  - Shows "SOLD" state with animation when the timer hits zero or a hammer is dropped.
  - Displays the winning team and final price.
- **`PreviouslyAuctionedList`**: A horizontal ticker showing recent auction results.
- **`NextInQueue`**: A preview section showing the next three upcoming players to build anticipation.

### 5. Right Panel: Bidding & Real-time Stats
- **`CurrentBidCard`**: Highlights the highest current bid, the leading team's logo, and the remaining time for the current player.
- **`BidHistoryList` (Auction Trail)**: A scrollable list of recent bids, showing team logos, amounts, and precise timestamps.
- **`TeamStatsTable`**: Provides a summary of all teams' progress, including:
  - Team Name
  - Players acquired
  - Remaining Budget
  - Total Spent

## Dynamic Features
- **Theme Switcher**: An interactive floating panel (visible on hover) allowing the production team to switch visual themes on the fly.
- **Demo Mode Logic**: Includes a simulated bidding engine that generates random bids, resets the timer on new bids, and handles transitions between "BIDDING" and "SOLD" states for demonstration purposes.
- **Motion Orchestration**: Uses `framer-motion` for smooth transitions between players and status changes.

## Final Cinematic Features
- **Hero Spotlight**: Massive 70% screen area for player reveals and status.
- **Auto-Flip Panels**: Bids, Stats, and Leaderboards rotate every 8s to maximize information without clutter.
- **Sliding Ribbon**: Continuous motion for team owner visibility.
- **Emotional HUD**: Screen-wide ambient glows and pulsing timers that react to auction phases (Critical, Sold).
- **Pro Typography**: Ultra-bold condensed headline fonts for maximum broadcast impact.
