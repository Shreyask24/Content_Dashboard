import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSocialPosts = createAsyncThunk(
    "social/fetchSocialPosts",
    async () => {
        const res = await axios.get("https://dummyjson.com/posts?limit=10");
        return res.data.posts;
    }
);

const socialSlice = createSlice({
    name: "social",
    initialState: {
        posts: [],
        loading: false,
        error: null,
    },
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
            });
    },
});

export default socialSlice.reducer;
