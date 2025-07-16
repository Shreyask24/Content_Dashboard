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
}

export default function NewsCard({ article }: NewsCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 flex flex-col h-full">
            {article.urlToImage && (
                <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="rounded-md h-40 object-cover mb-2"
                />
            )}
            <h3 className="font-semibold text-lg mb-1 line-clamp-2">{article.title}</h3>
            {article.description && (
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-3">
                    {article.description}
                </p>
            )}
            <div className="text-xs text-gray-500 mb-2 mt-auto">
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
        </div>
    );
}
