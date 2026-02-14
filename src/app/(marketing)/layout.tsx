import { Toaster } from "@/components/ui/sonner";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen overflow-hidden bg-background">
            {children}
            <Toaster position="top-right" richColors />
        </div>
    );
}
