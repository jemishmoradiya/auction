"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type OverlayTheme = "default" | "cyberpunk" | "tactical" | "arctic" | "inferno" | "royal";

interface ThemeContextType {
    theme: OverlayTheme;
    setTheme: (theme: OverlayTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, initialTheme = "default" }: { children: React.ReactNode; initialTheme?: OverlayTheme }) {
    const [theme, setTheme] = useState<OverlayTheme>(initialTheme);

    // Apply theme class to the body or a wrapper
    useEffect(() => {
        const root = document.documentElement;
        // Remove all theme classes
        const themeClasses = ["theme-cyberpunk", "theme-tactical", "theme-arctic", "theme-inferno", "theme-royal"];
        root.classList.remove(...themeClasses);

        if (theme !== "default") {
            root.classList.add(`theme-${theme}`);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useOverlayTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useOverlayTheme must be used within a ThemeProvider");
    }
    return context;
}
