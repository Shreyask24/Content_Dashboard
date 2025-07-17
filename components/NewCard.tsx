import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// components/NewsCard.tsx
interface NewsCardProps {
    article: {
        title: string;
        description?: string;
        url: string;
        urlToImage?: string;
        publishedAt?: string;
        source?: { name: string };
    };
    onRemove?: () => void;
}

export default function NewsCard({ article, onRemove }: NewsCardProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleFavorites = () => {
        const existing = JSON.parse(localStorage.getItem("favorites") || "[]");
        const alreadySaved = existing.some((item: any) => item.url === article.url);
        if (!alreadySaved) {
            localStorage.setItem("favorites", JSON.stringify([...existing, article]));
            alert("Saved to Favorites!");
        } else {
            alert("Already in favorites.");
        }

    }

    if (!mounted) return null;


    return (
        <div className={`${theme === 'dark' ? 'bg-gray-800 border border-white' : 'bg-white border border-black text-black'} shadow rounded-xl p-4 flex flex-col h-full`}>
            {article.urlToImage && (
                <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="rounded-md h-40 object-cover mb-2"
                />
            )}
            <h3 className="font-semibold text-lg mb-1 line-clamp-2">{article.title}</h3>
            {article.description && (
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} text-sm mb-2 line-clamp-3`}>
                    {article.description}
                </p>
            )}
            <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-black'} mb-2 mt-auto`}>
                {article.source?.name} • {new Date(article.publishedAt || "").toLocaleDateString()}
            </div>
            <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
            >
                Read more →
            </a>

            {onRemove ? (
                <button
                    onClick={onRemove}
                    className="text-xs text-red-500 mt-1 hover:underline cursor-pointer"
                >
                    ❌ Remove from Favorites
                </button>
            ) : (
                <button
                    onClick={handleFavorites}
                    className="text-xs text-blue-500 mt-1 hover:underline cursor-pointer"
                >
                    ⭐ Save to Favorites
                </button>
            )}


        </div>
    );
}
