import axios from "axios";

export async function getSpotifyToken() {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
    const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;
    const credentials = btoa(`${clientId}:${clientSecret}`);

    const res = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({ grant_type: "client_credentials" }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${credentials}`,
            },
        }
    );

    return res.data.access_token;
}
