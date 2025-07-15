interface MusicCardProps {
    track: {
        name: string;
        artists: { name: string }[];
        album: { images: { url: string }[] };
        external_urls: { spotify: string };
    };
}

export default function MusicCard({ track }: MusicCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 space-y-2">
            {track.album?.images?.[0]?.url && (
                <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="rounded h-48 w-full object-cover"
                />
            )}
            <h3 className="font-semibold text-lg">{track.name}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
                Artist: {track.artists.map((a) => a.name).join(", ")}
            </p>
            <a
                href={track.external_urls.spotify}
                target="_blank"
                className="text-blue-600 text-sm"
                rel="noopener noreferrer"
            >
                Listen on Spotify →
            </a>
        </div>
    );
}
