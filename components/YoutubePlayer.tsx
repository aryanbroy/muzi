import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function YoutubePlayerWithVideoEnd({
  videoId,
  onVideoEnd,
}: {
  videoId: string;
  onVideoEnd: () => void;
}) {
  const playerRef = useRef<YT.Player | null>(null);

  useEffect(() => {
    // Load the YouTube IFrame Player API script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Create the player when the API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "360",
        width: "640",
        videoId: videoId,
        events: {
          onReady: (event: YT.PlayerEvent) => {
            event.target.playVideo();
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              onVideoEnd();
            }
          },
        },
      });
    };

    // Cleanup function
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, onVideoEnd]);

  return <div id="youtube-player"></div>;
}
