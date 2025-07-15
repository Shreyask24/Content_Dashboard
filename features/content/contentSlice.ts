import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

interface Article {
    title: string;
    description: string;
    urlToImage: string;
    url: string;
    source: { name: string };
}

interface ContentState {
    news: Article[];
    loading: boolean;
    error: string | null;
}

const initialState: ContentState = {
    news: [],
    loading: false,
    error: null,
};

export const fetchNewsByCategories = createAsyncThunk(
    "content/fetchNewsByCategories",
    async (categories: string[]) => {
        const query = categories.join(" OR ");
        const response = await axios.get(
            `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${NEWS_API_KEY}`
        );
        return response.data.articles;
    }
);

const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsByCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewsByCategories.fulfilled, (state, action) => {
                state.news = action.payload;
                state.loading = false;
            })
            .addCase(fetchNewsByCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch news";
            });
    },
});

export default contentSlice.reducer;
