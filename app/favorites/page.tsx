'use client';
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import SocialPostCard from "@/components/SocialPostCard";
import NewsCard from "@/components/NewCard";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<any[]>([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(data);
    }, []);

    const isNews = (item: any) => item.source && item.url;
    const isPost = (item: any) => item.body && item.tags;

    const handleRemove = (itemToRemove: any) => {
        const updated = favorites.filter((item) => {
            if (item.url) return item.url !== itemToRemove.url; // News
            if (item.id) return item.id !== itemToRemove.id;    // Post
            return true;
        });
        localStorage.setItem("favorites", JSON.stringify(updated));
        setFavorites(updated);
    };


    return (
        <DashboardLayout>
            {favorites.length === 0 ? (
                <p className="flex justify-center items-center">You haven’t saved any favorites yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favorites.map((item, i) =>
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
