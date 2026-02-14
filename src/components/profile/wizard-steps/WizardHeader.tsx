"use client";

import { Badge } from "@/components/ui/badge";

interface WizardHeaderProps {
    phase: string;
    title: string;
    accentTitle: string;
    description: string;
}

export function WizardHeader({ phase, title, accentTitle, description }: WizardHeaderProps) {
    return (
        <div className="space-y-2">
            <Badge className="bg-primary/20 text-primary border-primary/30 uppercase text-[9px] font-black tracking-widest px-4 py-1">
                {phase}
            </Badge>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">
                {title} <span className="text-primary">{accentTitle}</span>
            </h2>
            <p className="text-white/40 text-xs font-medium italic">{description}</p>
        </div>
    );
}
