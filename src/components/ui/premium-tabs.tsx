"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const PremiumTabs = TabsPrimitive.Root

const PremiumTabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            "inline-flex items-center rounded-2xl bg-white/5 p-1 text-muted-foreground border border-white/5 relative",
            className
        )}
        {...props}
    />
))
PremiumTabsList.displayName = TabsPrimitive.List.displayName

const PremiumTabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
        activeTab?: string
        layoutId?: string
        indicatorClassName?: string
    }
>(({ className, children, activeTab, layoutId = "premiumTabActiveBg", indicatorClassName, ...props }, ref) => {
    const isActive = activeTab === props.value

    return (
        <TabsPrimitive.Trigger
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-xl px-6 py-2 text-[10px] font-black uppercase tracking-[0.15em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative z-10 cursor-pointer",
                isActive ? "text-[var(--primary)] font-black" : "text-white/50 font-bold hover:text-white hover:bg-white/10",
                className
            )}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
            {isActive && (
                <motion.div
                    layoutId={layoutId}
                    className={cn(
                        "absolute inset-0 bg-[#0B0E14] rounded-[10px] shadow-[0_2px_15px_rgba(0,0,0,0.3)] border border-white/10 z-0",
                        indicatorClassName
                    )}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
            )}
        </TabsPrimitive.Trigger>
    )
})
PremiumTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const PremiumTabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
        )}
        {...props}
    />
))
PremiumTabsContent.displayName = TabsPrimitive.Content.displayName

export { PremiumTabs, PremiumTabsList, PremiumTabsTrigger, PremiumTabsContent }
