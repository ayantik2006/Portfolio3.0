const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const RECENT_TRACKS_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

type SpotifyTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type SpotifyTrack = {
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  external_urls: {
    spotify: string;
  };
};

type SpotifyRecentTracksResponse = {
  items?: {
    track?: SpotifyTrack;
  }[];
};

async function getAccessToken() {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  const data = (await response.json()) as SpotifyTokenResponse;

  if (!response.ok || !data.access_token) {
    throw new Error(
      data.error_description ?? data.error ?? "Failed to refresh Spotify access token"
    );
  }

  return data.access_token;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    
    const response = await fetch(RECENT_TRACKS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });
    
    const data = (await response.json()) as SpotifyRecentTracksResponse;
    console.log(data)
    const track = data.items?.[0]?.track;

    if (!response.ok || !track) {
      return Response.json(
        {
          success: false,
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      song: track.name,
      artist: track.artists.map((artist) => artist.name).join(", "),
      album: track.album.name,
      image: track.album.images[0]?.url,
      url: track.external_urls.spotify,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Spotify request failed";
    console.log(error)
    return Response.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
