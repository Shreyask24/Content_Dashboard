'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSocialPosts } from '@/features/content/socialSlice';
import { fetchNews } from '@/features/content/newSlice';

import DashboardLayout from '@/components/Layout/DashboardLayout';
import SocialPostCard from '@/components/SocialPostCard';
import NewsCard from '@/components/NewCard';
import PreferencesPanel from '@/components/PreferncePanel';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { articles: news, loading: newsLoading } = useAppSelector((s) => s.news);
  const { posts, loading: postsLoading } = useAppSelector((s) => s.social);

  const loadContent = (prefs: string[]) => {
    dispatch(fetchNews(prefs));
    dispatch(fetchSocialPosts());
  };

  useEffect(() => {
    const userPrefs = JSON.parse(localStorage.getItem("userPreferences") || `["technology"]`);
    loadContent(userPrefs);
  }, []);

  const loading = newsLoading || postsLoading;

  return (
    <DashboardLayout>
      <PreferencesPanel onSave={loadContent} />

      {loading ? (
        <p className='flex justify-center items-center'>Loading content...</p>
      ) : (
        <>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-2">Trending News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {news.map((item, i) => (
                <NewsCard key={i} article={item} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">Social Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.map((post, i) => (
                <SocialPostCard key={i} post={post} />
              ))}
            </div>
          </section>
        </>
      )}
    </DashboardLayout>
  );
}
