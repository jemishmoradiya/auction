"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch by only rendering after mount
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-white/5 border border-white/5">
                <Sun className="h-5 w-5 text-muted-foreground opacity-0" />
            </Button>
        );
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-10 rounded-full bg-background/50 hover:bg-accent border border-border/50 transition-all duration-300"
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5 text-primary transition-all" />
            ) : (
                <Moon className="h-5 w-5 text-primary transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
