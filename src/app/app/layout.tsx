import { Toaster } from "@/components/ui/sonner";

export default function AppRootLayout({
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
