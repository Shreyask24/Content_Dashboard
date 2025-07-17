"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const links = [
    { href: "/", label: "Feed" },
    { href: "/trending", label: "Trending" },
    { href: "/favorites", label: "Favorites" },
];

export default function Sidebar() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 mt-4 border rounded bg-white text-black w-fit h-fit"
            >
                {isSidebarOpen ? <RxCross2 /> : <MdOutlineMenu />}
            </button>

            <aside
                className={`
          ${theme === "dark"
                        ? "text-white bg-gray-800 border-gray-700"
                        : "bg-slate-300 border-black text-black"}
          ${isSidebarOpen ? "block" : "hidden"}
          md:block
          w-64 border h-full fixed md:static top-0 left-0 z-50 p-4
        `}
            >
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="md:hidden p-2 border rounded bg-white text-black w-fit h-fit"
                >
                    {isSidebarOpen ? <RxCross2 /> : <MdOutlineMenu />}
                </button>
                <h1 className="text-xl font-bold flex justify-center items-center mt-4 mb-6">
                    Dashboard
                </h1>

                <nav className="space-y-2">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`block px-2 py-1 rounded ${pathname === link.href
                                ? "bg-blue-600 text-white"
                                : theme === "dark"
                                    ? "hover:bg-gray-700"
                                    : "hover:bg-gray-100"
                                }`}
                            onClick={() => setIsSidebarOpen(false)} // Close on link click (optional)
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
}
