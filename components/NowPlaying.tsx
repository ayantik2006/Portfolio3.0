"use client";

import React, { useEffect, useState } from "react";

type NowPlayingData = {
  success: boolean;
  isPlaying?: boolean;
  song?: string;
  artist?: string;
  album?: string;
  image?: string;
  url?: string;
  error?: string;
};

const SPOTIFY_GREEN = "#1DB954";

function SpotifyGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      className="shrink-0"
      fill={SPOTIFY_GREEN}
      aria-hidden="true"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.24 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.42.18.6.78.24 1.2zm.12-3.36C16.68 8.4 10.2 8.16 6.48 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.32-1.32 11.4-1.02 15.9 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z" />
    </svg>
  );
}

function Equalizer() {
  const bar = {
    width: 3,
    height: "100%",
    borderRadius: 9999,
    backgroundColor: SPOTIFY_GREEN,
  } as const;

  return (
    <span
      data-playing="true"
      aria-hidden="true"
      className="shrink-0"
      style={{
        display: "inline-flex",
        alignItems: "flex-end",
        gap: 2,
        width: 16,
        height: 14,
      }}
    >
      <span className="eq-bar" style={bar} />
      <span className="eq-bar" style={bar} />
      <span className="eq-bar" style={bar} />
    </span>
  );
}

function NowPlaying({ className = "" }: { className?: string }) {
  const [track, setTrack] = useState<NowPlayingData | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/now-playing");
        const data = (await res.json()) as NowPlayingData;
        if (!cancelled) setTrack(data);
      } catch {
        if (!cancelled) setTrack({ success: false });
      }
    };

    load();
    const interval = setInterval(load, 30000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (!track?.success) return null;

  const isPlaying = Boolean(track.isPlaying);

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${track.song ?? ""}${track.artist ? ` — ${track.artist}` : ""} · open in Spotify`}
      className={`group inline-flex max-w-full items-center gap-2 font-mono text-sm text-neutral-500 transition-colors hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 ${className}`}
    >
      {isPlaying ? <Equalizer /> : <SpotifyGlyph />}

      <span className="shrink-0 text-neutral-400 dark:text-neutral-500">
        {isPlaying ? "Now playing" : "Last played"}
      </span>

      <span
        aria-hidden="true"
        className="shrink-0 text-neutral-300 dark:text-neutral-600"
      >
        —
      </span>

      <span className="min-w-0 truncate">
        <span className="font-medium text-neutral-700 group-hover:underline dark:text-neutral-200">
          {track.song}
        </span>
        {track.artist ? (
          <span className="text-neutral-400 dark:text-neutral-500">
            {" · "}
            {track.artist}
          </span>
        ) : null}
      </span>
    </a>
  );
}

export default NowPlaying;
