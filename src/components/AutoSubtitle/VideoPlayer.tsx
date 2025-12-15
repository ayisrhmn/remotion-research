import React from "react";
import { Player } from "@remotion/player";
import { MainVideo } from "../../remotion/MainVideo";
import { TransitionVideo } from "../../remotion/TransitionVideo";
import { Caption } from "@remotion/captions";

interface VideoPlayerProps {
  videoUrl: string;
  video2Url?: string | null;
  transitionType?: "none" | "fade" | "slide";
  captions: Caption[];
  subtitlePosition?: "top" | "center" | "bottom";
  subtitleColor?: string;
  subtitleOutlineColor?: string;
  subtitleBaseColor?: string;
  subtitleVariant?: "hormozi" | "karaoke" | "boxed";
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  video2Url,
  transitionType = "slide",
  captions,
  subtitlePosition = "bottom",
  subtitleColor = "white",
  subtitleOutlineColor = "black",
  subtitleBaseColor = "white",
  subtitleVariant = "hormozi",
}) => {
  // Determine if we are in "Transition Mode" (2 videos) or "Single Video Mode"
  const isTransitionMode = !!video2Url;

  const styleProps = {
    captions,
    subtitlePosition,
    subtitleColor,
    subtitleOutlineColor,
    subtitleBaseColor,
    subtitleVariant,
  };

  // Sync with composition logic in Root.tsx
  const durationInFrames = isTransitionMode ? 30 * 19 : 30 * 15;

  if (isTransitionMode) {
    return (
      <div className="aspect-9/16 w-full rounded-lg overflow-hidden border border-gray-200">
        <Player
          component={TransitionVideo}
          durationInFrames={durationInFrames}
          fps={30}
          compositionWidth={1080}
          compositionHeight={1920}
          style={{ width: "100%", height: "100%" }}
          controls
          autoPlay
          inputProps={{
            ...styleProps,
            video1Url: videoUrl,
            video2Url: video2Url!,
            transitionType: transitionType || "slide",
          }}
        />
      </div>
    );
  }

  return (
    <div className="aspect-9/16 w-full rounded-lg overflow-hidden border border-gray-200">
      <Player
        component={MainVideo}
        durationInFrames={30 * 20} // 30fps * 20s (approx)
        fps={30}
        compositionWidth={1080}
        compositionHeight={1920}
        style={{
          width: "100%",
          height: "100%",
        }}
        controls
        autoPlay
        inputProps={{
          videoUrl,
          ...styleProps,
        }}
      />
    </div>
  );
};
