'use client';

import { setSearchQuery } from "@/features/search/searchSlice";
import { RootState } from "@/store";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Topbar({ onSearchChange }: { onSearchChange: (value: string) => void }) {
    const { theme, setTheme } = useTheme();
    const dispatch = useDispatch();
    const query = useSelector((state: RootState) => state.search.query);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    if (!mounted) return null;



    return (
        <header className={`w-full p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-slate-300'} flex items-center justify-between`}>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className={`w-1/2 px-3 py-2 rounded ${theme === 'dark' ? 'bg-gray-800 border border-white' : 'bg-slate-300 border border-gray-700 text-black'} text-sm`}
            />

            <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="px-3 py-2 bg-blue-600 text-white text-sm rounded"
            >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
        </header>
    );
}
