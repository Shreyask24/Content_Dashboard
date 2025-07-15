'use client';

import DashboardLayout from '@/components/Layout/DashboardLayout';
import MusicCard from '@/components/MusicCard';
import { fetchSpotifyTracks } from '@/features/content/spotifySlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { tracks, loading: spotifyLoading } = useAppSelector((s) => s.spotify);

  useEffect(() => {
    dispatch(fetchSpotifyTracks());
  }, []);

  return (
    <DashboardLayout>
      <section>
        {spotifyLoading ? <p>Loading music...</p> : null}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tracks.map((track, i) => (
            <MusicCard key={i} track={track} />
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
