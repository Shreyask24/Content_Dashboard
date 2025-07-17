import { SocialPost } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type SocialState = {
    posts: SocialPost[];
    loading: boolean;
    error: string | null;
};

const initialState: SocialState = {
    posts: [],
    loading: false,
    error: null,
}


export const fetchSocialPosts = createAsyncThunk(
    "social/fetchSocialPosts",
    async () => {
        const res = await axios.get("https://dummyjson.com/posts?limit=10");
        return res.data.posts;
    }
);

export const fetchTrendingSocialPosts = createAsyncThunk(
    "social/fetchTrendingSocialPosts",
    async () => {
        const res = await axios.get("https://dummyjson.com/posts?limit=12");

        const trending = res.data.posts
            .sort((a: any, b: any) => b.reactions.likes - a.reactions.likes)
            .slice(0, 12);

        return trending;
    }
);


const socialSlice = createSlice({
    name: "social",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchSocialPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSocialPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchSocialPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch social posts";
            })
            .addCase(fetchTrendingSocialPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
            });
    }

});

export default socialSlice.reducer;
