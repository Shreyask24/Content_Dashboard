import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const fetchNews = createAsyncThunk(
    "news/fetchNews",
    async (categories: string[] = ["technology"]) => {
        const category = categories[0];
        const res = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                category,
                country: "us",
                apiKey: NEWS_API_KEY,
            },
        });
        return res.data.articles;
    }
);

const newsSlice = createSlice({
    name: "news",
    initialState: {
        articles: [],
        loading: false,
        error: null,
    },
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
            });
    },
});

export default newsSlice.reducer;
