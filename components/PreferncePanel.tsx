// components/PreferencesPanel.tsx
'use client';
import { useState, useEffect } from 'react';

const ALL_CATEGORIES = [
    "technology", "business", "sports", "health", "science", "entertainment", "general"
];

export default function PreferencesPanel({
    onSave,
}: {
    onSave: (prefs: string[]) => void;
}) {
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("userPreferences") || `["technology"]`);
        setSelected(saved);
    }, []);

    const toggleCategory = (cat: string) => {
        setSelected((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    };

    const savePreferences = () => {
        localStorage.setItem("userPreferences", JSON.stringify(selected));
        onSave(selected);
    };

    const resetPreferences = () => {
        const defaults = [""];
        localStorage.setItem("userPreferences", JSON.stringify(defaults));
        setSelected(defaults);
        onSave(defaults);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6 flex justify-between">
            <div className="flex flex-wrap gap-2 mb-4 items-center">
                {ALL_CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`px-3 py-1 text-sm rounded-full border transition uppercase ${selected.includes(cat)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-gray-100 dark:bg-gray-700 dark:text-white border-gray-300'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="flex gap-3">
                <button
                    onClick={savePreferences}
                    className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Save Preferences
                </button>
                <button
                    onClick={resetPreferences}
                    className="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                    Reset to Default
                </button>
            </div>
        </div>
    );
}
