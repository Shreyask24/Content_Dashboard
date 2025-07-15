import { motion } from "framer-motion";

interface Props {
    article: {
        title: string;
        description: string;
        urlToImage: string;
        url: string;
        source: { name: string };
    };
}

export default function ContentCard({ article }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col space-y-2 transition hover:scale-[1.01]">
            {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="rounded h-48 object-cover w-full" />
            )}
            <h3 className="font-semibold text-lg">{article.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{article.description}</p>
            <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-gray-500">Source: {article.source.name}</span>
                <a
                    href={article.url}
                    target="_blank"
                    className="text-blue-600 hover:underline font-medium"
                    rel="noopener noreferrer"
                >
                    Read More →
                </a>
            </div>
        </motion.div>
    );
}
