import React, { useEffect, useState } from "react";

type SpotifyWidgetData = {
  success: boolean;
  song?: string;
  artist?: string;
  album?: string;
  image?: string;
  url?: string;
  error?: string;
};

function SpotifyWidget() {
  const [song, setSong] = useState<SpotifyWidgetData | null>(null);

  useEffect(() => {
    const loadSong = async () => {
      const res = await fetch("/api/spotify");
      const data = (await res.json()) as SpotifyWidgetData;
      setSong(data);
    };

    loadSong();

    const interval = setInterval(loadSong, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!song?.success) return null;

  return <div className="py-2">{song.song}</div>;
}

export default SpotifyWidget;
