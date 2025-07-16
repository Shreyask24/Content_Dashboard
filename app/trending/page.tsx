'use client';
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import NewsCard from "@/components/NewCard";
import SocialPostCard from "@/components/SocialPostCard";
import { fetchTrendingSocialPosts } from "@/features/content/socialSlice";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { fetchTrendingNews } from "@/features/content/newSlice";

export default function TrendingPage() {

    const dispatch = useDispatch()

    const { articles: trendingNews } = useAppSelector((s) => s.news);
    const { posts: trendingPosts } = useAppSelector((s) => s.social);


    const loadContent = (prefs: string[]) => {
        dispatch(fetchTrendingNews(prefs));
        dispatch(fetchTrendingSocialPosts());
    };


    useEffect(() => {
        const userPrefs = JSON.parse(localStorage.getItem("userPreferences") || `["technology"]`);
        loadContent(userPrefs);
    }, []);

    return (
        <DashboardLayout>
            <>
                <section className="mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {trendingNews.map((item, i) => (
                            <NewsCard key={i} article={item} />
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Most Liked Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {trendingPosts.map((post, i) => (
                            <SocialPostCard key={i} post={post} />
                        ))}
                    </div>
                </section>
            </>

        </DashboardLayout>
    );
}
