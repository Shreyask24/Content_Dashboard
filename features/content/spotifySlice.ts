import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSpotifyToken } from "@/utils/getSpotifyToken";
import axios from "axios";

interface Track {
    name: string;
    artists: { name: string }[];
    album: { images: { url: string }[] };
    external_urls: { spotify: string };
}

interface SpotifyState {
    tracks: Track[];
    loading: boolean;
    error: string | null;
}

const initialState: SpotifyState = {
    tracks: [],
    loading: false,
    error: null,
};

export const fetchSpotifyTracks = createAsyncThunk(
    "spotify/fetchSpotifyTracks",
    async () => {
        const token = await getSpotifyToken();

        const res = await axios.get(
            `https://api.spotify.com/v1/tracks`,
            {
                params: {
                    ids: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(res.data.tracks)
        return res.data.tracks;
    }
);


const spotifySlice = createSlice({
    name: "spotify",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpotifyTracks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSpotifyTracks.fulfilled, (state, action) => {
                state.tracks = action.payload;
                state.loading = false;
            })
            .addCase(fetchSpotifyTracks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch tracks";
            });
    },
});

export default spotifySlice.reducer;
