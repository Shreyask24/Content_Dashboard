'use client';
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import SocialPostCard from "@/components/SocialPostCard";
import NewsCard from "@/components/NewCard";
import { useAppSelector } from "@/store/hooks";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<any[]>([]);
    const query = useAppSelector((s) => s.search.query.toLowerCase());

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(data);
    }, []);

    const isNews = (item: any) => item.source && item.url;
    const isPost = (item: any) => item.body && item.tags;

    const handleRemove = (itemToRemove: any) => {
        const updated = favorites.filter((item) => {
            if (item.url) return item.url !== itemToRemove.url;
            if (item.id) return item.id !== itemToRemove.id;
            return true;
        });
        localStorage.setItem("favorites", JSON.stringify(updated));
        setFavorites(updated);
    };

    const filteredFavorites = favorites.filter((item) => {

        if (isNews(item)) {
            return (
                item.title?.toLowerCase().includes(query) ||
                item.source?.name?.toLowerCase().includes(query)
            );
        } else if (isPost(item)) {
            return (
                item.body?.toLowerCase().includes(query) ||
                item.tags?.join(" ").toLowerCase().includes(query)
            );
        }

        return false;
    });

    return (
        <DashboardLayout>
            {filteredFavorites.length === 0 ? (
                <p className="flex justify-center items-center">No matching favorites found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredFavorites.map((item, i) =>
                        isNews(item) ? (
                            <NewsCard key={i} article={item} onRemove={() => handleRemove(item)} />
                        ) : isPost(item) ? (
                            <SocialPostCard key={i} post={item} onRemove={() => handleRemove(item)} />
                        ) : null
                    )}
                </div>
            )}
        </DashboardLayout>
    );
}
