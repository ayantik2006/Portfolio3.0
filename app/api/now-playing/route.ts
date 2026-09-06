const RECENT_TRACKS_ENDPOINT = "https://ws.audioscrobbler.com/2.0/";

type LastfmImage = {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge";
};

type LastfmTrack = {
  name: string;
  url: string;
  artist: { "#text": string };
  album: { "#text": string };
  image: LastfmImage[];
  "@attr"?: { nowplaying?: "true" };
};

type LastfmRecentTracksResponse = {
  recenttracks?: { track?: LastfmTrack[] | LastfmTrack };
  error?: number;
  message?: string;
};

function pickImage(images: LastfmImage[]) {
  const preferred =
    images.find((img) => img.size === "extralarge") ??
    images.find((img) => img.size === "large") ??
    images[images.length - 1];

  const url = preferred?.["#text"]?.trim();
  return url ? url : undefined;
}

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY;
  const user = process.env.LASTFM_USER;

  if (!apiKey || !user) {
    return Response.json(
      { success: false, error: "Last.fm env vars are not configured" },
      { status: 500 }
    );
  }

  try {
    const url = new URL(RECENT_TRACKS_ENDPOINT);
    url.search = new URLSearchParams({
      method: "user.getrecenttracks",
      user,
      api_key: apiKey,
      format: "json",
      limit: "1",
    }).toString();

    const response = await fetch(url, {
      headers: { "User-Agent": "portfolio-now-playing" },
      cache: "no-store",
    });

    const data = (await response.json()) as LastfmRecentTracksResponse;

    if (!response.ok || data.error) {
      return Response.json(
        { success: false, error: data.message ?? "Last.fm request failed" },
        { status: response.status || 502 }
      );
    }

    const raw = data.recenttracks?.track;
    const track = Array.isArray(raw) ? raw[0] : raw;

    if (!track?.name) {
      return Response.json({ success: false }, { status: 404 });
    }

    return Response.json({
      success: true,
      isPlaying: track["@attr"]?.nowplaying === "true",
      song: track.name,
      artist: track.artist?.["#text"] || undefined,
      album: track.album?.["#text"] || undefined,
      image: pickImage(track.image ?? []),
      url: track.url,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Last.fm request failed";
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
