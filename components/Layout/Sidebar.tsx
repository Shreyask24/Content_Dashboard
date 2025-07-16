"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Feed" },
    { href: "/trending", label: "Trending" },
    { href: "/favorites", label: "Favorites" },
];

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <aside className="w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 border-r border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold mb-6">Dashboard</h1>
            <nav className="space-y-2">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-2 py-1 rounded ${pathname === link.href
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
