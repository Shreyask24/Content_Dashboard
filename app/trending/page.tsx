'use client';
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import NewsCard from "@/components/NewCard";
import SocialPostCard from "@/components/SocialPostCard";
import { fetchTrendingSocialPosts, SocialState } from "@/features/content/socialSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { fetchTrendingNews, NewsState } from "@/features/content/newSlice";
import { SocialPost } from "@/types";

export default function TrendingPage() {

    const dispatch = useAppDispatch()

    const { articles: trendingNews } = useAppSelector((s) => s.news) as NewsState;
    const { posts: trendingPosts } = useAppSelector((s) => s.social) as SocialState;


    const loadContent = (prefs: string[]) => {
        dispatch(fetchTrendingNews(prefs));
        dispatch(fetchTrendingSocialPosts());
    };


    useEffect(() => {
        const userPrefs = JSON.parse(localStorage.getItem("userPreferences") || `["technology"]`);
        loadContent(userPrefs);
    }, []);

    const query = useAppSelector((s) => s.search.query.toLowerCase());

    const filteredNews = trendingNews.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
    );

    const filteredPosts = trendingPosts.filter(post =>
        post?.content?.toLowerCase().includes(query) ||
        post?.author?.toLowerCase().includes(query)
    );


    return (
        <DashboardLayout>
            <>
                <section className="mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredNews.map((item, i) => (
                            <NewsCard key={i} article={item} />
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Most Liked Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredPosts.map((post, i) => (
                            <SocialPostCard key={i} post={post as Required<SocialPost>} />
                        ))}
                    </div>
                </section>
            </>

        </DashboardLayout>
    );
}
