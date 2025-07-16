import { SlLike } from "react-icons/sl";

interface SocialPostCardProps {
    post: {
        id: number;
        title: string;
        body: string;
        tags: string[];
        reactions: {
            likes: number;
            dislikes: number;
        };
        views: number;
        userId: number;
    };
}

export default function SocialPostCard({ post }: SocialPostCardProps) {
    const fakeTimestamp = new Date(Date.now() - post.id * 100000000).toISOString(); // simulate varied timestamps

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-3">
                <img
                    src={`https://i.pravatar.cc/150?u=${post.userId}`}
                    alt={`User #${post.userId}`}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold">User #{post.userId}</p>
                    <p className="text-xs text-gray-500">
                        {new Date(fakeTimestamp).toLocaleString()}
                    </p>
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-base">{post.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{post.body}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600 dark:text-gray-400">
                {post.tags.map((tag) => (
                    <span
                        key={tag}
                        className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="text-xs text-gray-500 mt-2 flex justify-between">
                <span>👍 {post.reactions.likes} • 👎 {post.reactions.dislikes}</span>
                <span>{post.views} views</span>
            </div>
        </div>
    );
}
