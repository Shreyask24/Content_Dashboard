import { SocialPostCardProps } from "./components/SocialPostCard";

export type NewsArticle = {
    title: string;
    description?: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
};

export interface SocialPost {
    id: number;
    title: string;
    body: string;
    tags?: string[];
    reactions?: {
        likes: number;
        dislikes: number;
    };
    views?: number;
    userId?: number;
}

