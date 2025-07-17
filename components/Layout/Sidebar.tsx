"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
    { href: "/", label: "Feed" },
    { href: "/trending", label: "Trending" },
    { href: "/favorites", label: "Favorites" },
];

export default function Sidebar() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <aside className={`w-64 ${theme === 'dark' ? 'text-white bg bg-gray-800 border-gray-700' : ' bg-slate-300 border-black text-black'}`}>
            <h1 className="text-xl font-bold mb-6">Dashboard</h1>
            <nav className="space-y-2">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-2 py-1 rounded ${pathname === link.href
                            ? "bg-blue-600 text-white"
                            : `${theme === 'dark' ? 'hover:bg-gray-700' : ' hover:bg-gray-100'}`}`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
