
"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { Toaster } from "@/components/ui/sonner";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuctionPage = pathname.startsWith("/auction");

    if (isAuctionPage) {
        return (
            <div className="h-screen overflow-hidden bg-background">
                {children}
                <Toaster position="top-right" richColors />
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto bg-background/50">
                    {children}
                </main>
            </div>
            <Toaster position="top-right" richColors />
        </div>
    );
}
