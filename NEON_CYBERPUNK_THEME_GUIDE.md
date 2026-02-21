# Neon Cyberpunk Glass Theme Guide

A comprehensive guide for styling components in the sleek, futuristic SaaS dashboard interface (Neon Cyberpunk Glass) for the AuctioNext application.

## Core Philosophy
The Neon Cyberpunk Glass theme is built upon the following principles:
1.  **Deep Dark Mode**: Utilizing very dark blue/slate backgrounds (`#0B0E14`) to evoke a high-tech, futuristic feel.
2.  **Neon Glow Highlights**: Employing vibrant, luminous colors (Neon Cyan and Neon Violet) for emphasis, active states, and borders, simulating physical LEDs or holograms.
3.  **Professional Glassmorphism**: Using deep, subtle translucency (`bg-white/[0.02]`), aggressive background blurring (`backdrop-blur-xl`), and crisp, thin white borders (`border-white/10`) to create floating, futuristic glass panels.
4.  **Holographic Geometry**: Incorporating crisp lines, tech-inspired iconography, and glowing drop shadows to enhance the overarching sci-fi "Dashboard" motif.
5.  **High Contrast Typography**: Bright white primary text against dark backgrounds, supported by muted slate text for secondary metadata.

---

## 🎨 Color Palette & Variables

We use customized Tailwind variables mapped in `globals.css` applied globally.

| Element | Color Value / Class | Description / Usage |
| :--- | :--- | :--- |
| **Main Background** | `bg-[#0B0E14]` / `bg-[var(--background)]` | The deepest background layer of the application. |
| **Container Background** | `bg-white/[0.02]` to `bg-white/[0.05]` | The primary background for cards, modulas, and floating panels. |
| **Glass Backdrop** | `backdrop-blur-xl`, `backdrop-blur-md` | Softens the background immediately behind panels to simulate frosted glass. |
| **Primary Accent** | `var(--primary)` / `text-[#00F0FF]` | **Neon Cyan** - Used for primary actions, active states, glowing borders, and major data points. |
| **Secondary Accent** | `var(--secondary)` / `text-[#B026FF]` | **Neon Violet** - Used for secondary highlights, alternative visual breaks, and complementary glows. |
| **Alert/Destructive** | `var(--destructive)` / `text-[#EF4444]` | Error states, critical warnings, or negative numbers. |
| **Borders (General)** | `border-white/10` to `border-white/20` | Thin, crisp borders defining the edges of glass panels. |
| **Borders (Active)** | `border-[var(--primary)]/30` | Luminous borders indicating focus or active selection. |

---

## 🔤 Typography & Text Colors

-   **Primary Headings (`h1`, `h2`, `h3`)**:
    -   Classes: `text-white font-black font-heading tracking-tight text-shadow-sm`
    -   Example: `Auction Control`, `Player Profile`
-   **Neon Highlights inside Headings**:
    -   Classes: `text-[var(--primary)] drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]`
    -   Example: `<span className="text-[var(--primary)] drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">Control</span>`
-   **Primary Body Text**:
    -   Classes: `text-white` or `text-slate-200`
-   **Secondary / Metadata Text**:
    -   Classes: `text-slate-400` or `text-slate-500`
    -   Usage: Subtitle text, "Last seen", "Base Price" labels.
-   **Micro-Labels / Tags**:
    -   Classes: `text-[10px] uppercase font-bold tracking-widest text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded-full`

---

## 🔲 Component Styling Patterns

### 1. Base Glass Panel (Cards, Modals)
The fundamental container for all content.
```tsx
className="bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl overflow-hidden"
```

### 2. Interactive Glass Panel (Hoverable Cards)
Elements that users can click or interact with. Includes a soft glowing hover.
```tsx
className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:-translate-y-2 hover:bg-white/[0.04] hover:border-[var(--primary)]/30 backdrop-blur-xl relative overflow-hidden group"
```

### 3. Primary Button (Action)
Vibrant, glowing elements for main calls to action.
```tsx
className="bg-[var(--primary)] text-[#0B0E14] font-black uppercase tracking-wider rounded-xl px-6 py-3 shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:bg-[#00F0FF]/90 transition-all"
```

### 4. Secondary/Ghost Button
Subtle interactive elements.
```tsx
className="bg-white/[0.03] text-white border border-white/10 rounded-xl px-6 py-3 font-semibold hover:bg-white/10 hover:border-white/20 transition-all font-sans"
```

### 5. Input Fields
Dark, inset glass elements for typing.
```tsx
className="bg-white/[0.03] border border-white/10 text-white rounded-xl placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-[var(--primary)]/50 focus-visible:border-[var(--primary)]/50 transition-all"
```

### 6. Neon Gradient Underlays
Used specifically inside group-hover cards to create a directional glow effect.
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
```

---

## 🚫 What to Avoid (Anti-Patterns)

-   **NO Hard Black Borders:** Ensure no component uses `border-4 border-black`. Everything must be a thin `border-white/10` or a colored accent border (`border-[var(--primary)]/30`).
-   **NO Solid Flat Backgrounds:** Avoid `bg-white`, `bg-[#FAFAFA]`, or `bg-black`. Use the glass variables `bg-white/[0.02]` or `bg-[var(--background)]`.
-   **NO Brutalist Shadows:** Do not use `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`. Shadows should be soft, blurred dropshadows `shadow-xl` or glowing colored shadows `shadow-[0_0_15px_rgba(0,240,255,0.3)]`.
-   **NO Square Corners:** Avoid `rounded-none`. The cyber glass aesthetic favors smooth organic curves like `rounded-xl`, `rounded-2xl`, or `rounded-[2rem]`.
