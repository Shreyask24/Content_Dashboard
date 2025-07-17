import { NewsArticle } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;


export type NewsState = {
    articles: NewsArticle[];
    loading: boolean;
    error: string | null;
};

const initialState: NewsState = {
    articles: [],
    loading: false,
    error: null,
};

export const fetchNews = createAsyncThunk(
    "news/fetchNews",
    async (categories: string[] = ["technology"]) => {
        const query = categories.join(" OR ");

        const res = await axios.get("https://newsapi.org/v2/everything", {
            params: {
                q: query,
                apiKey: NEWS_API_KEY,
            },
        });

        return res.data.articles;
    }
);


export const fetchTrendingNews = createAsyncThunk(
    "news/fetchTrendingNews",
    async (categories: string[]) => {
        const query = categories.join(" OR ");

        const res = await axios.get("https://newsapi.org/v2/everything", {
            params: {
                q: query,
                sortBy: "popularity",
                apiKey: NEWS_API_KEY,
            },
        });

        return res.data.articles.slice(0, 12);
    }
);



const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch news";
            })
            .addCase(fetchTrendingNews.fulfilled, (state, action) => {
                state.articles = action.payload;
            });
    }
});

export default newsSlice.reducer;
