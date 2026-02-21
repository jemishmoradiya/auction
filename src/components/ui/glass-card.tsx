import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface GlassCardProps extends React.ComponentProps<typeof Card> {
    children: React.ReactNode
    className?: string
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
    return (
        <Card
            className={cn(
                "backdrop-blur-xl border border-white/10 shadow-2xl transition-all animate-in fade-in duration-500",
                "bg-white/[0.02] hover:bg-white/[0.04]",
                "relative overflow-hidden group/glass",
                // Noise texture overlay
                "after:absolute after:inset-0 after:opacity-[0.03] after:pointer-events-none after:bg-[url('https://grainy-gradients.vercel.app/noise.svg')]",
                // Glossy inner border
                "before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-br before:from-white/10 before:to-transparent before:rounded-[inherit] before:pointer-events-none before:-z-10",
                className
            )}
            {...props}
        >
            {/* Inner secondary stroke for hardware feel */}
            <div className="absolute inset-[1px] rounded-[inherit] border border-white/[0.02] pointer-events-none z-0" />
            <div className="relative z-10">
                {children}
            </div>
        </Card>
    )
}

export { CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
