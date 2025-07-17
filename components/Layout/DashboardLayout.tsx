import { useTheme } from "next-themes";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import Topbar from "./TopBar";

interface DashboardLayoutProps {
    children: React.ReactNode;
    onSearchChange?: (value: string) => void;
    searchQuery?: string;
}

export default function DashboardLayout({
    children,
    onSearchChange,
    searchQuery = '',
}: DashboardLayoutProps) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [internalSearchQuery, setInternalSearchQuery] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleSearchChange = (value: string) => {
        setInternalSearchQuery(value);
        onSearchChange?.(value);
    };

    return (
        <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-800' : 'bg-slate-200'}`}>
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar onSearchChange={handleSearchChange} />
                <main className="flex-1 p-4 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
