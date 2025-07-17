'use client';

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import NewsCard from "@/components/NewCard";
import SocialPostCard from "@/components/SocialPostCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchNews } from "@/features/content/newSlice";
import { fetchSocialPosts } from "@/features/content/socialSlice";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const { articles: news, loading: newsLoading } = useAppSelector((s) => s.news);
  const { posts, loading: postsLoading } = useAppSelector((s) => s.social);

  useEffect(() => {
    const userPrefs = JSON.parse(localStorage.getItem("userPreferences") || `["technology"]`);
    dispatch(fetchNews(userPrefs));
    dispatch(fetchSocialPosts());
  }, []);

  const loading = newsLoading || postsLoading;


  const query = useAppSelector((s) => s.search.query.toLowerCase());

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.description?.toLowerCase().includes(query)
  );

  const filteredPosts = posts.filter(post =>
    post?.title?.toLowerCase().includes(query) ||
    post?.body?.toLowerCase().includes(query)
  );


  return (
    <DashboardLayout onSearchChange={setSearchQuery}>
      {loading ? (
        <p className="flex justify-center items-center">Loading content...</p>
      ) : (
        <>
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNews.map((item, i) => (
                <NewsCard key={i} article={item} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">Social Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPosts.map((post, i) => (
                <SocialPostCard key={i} post={post} />
              ))}
            </div>
          </section>
        </>
      )}
    </DashboardLayout>
  );
}
