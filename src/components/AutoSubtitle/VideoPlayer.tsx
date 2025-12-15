import React from "react";
import { Player } from "@remotion/player";
import { MainVideo } from "../../remotion/MainVideo";
import { Caption } from "@remotion/captions";

interface VideoPlayerProps {
  videoUrl: string;
  captions: Caption[];
  subtitlePosition?: "top" | "center" | "bottom";
  subtitleColor?: string;
  subtitleOutlineColor?: string;
  subtitleBaseColor?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  captions,
  subtitlePosition = "bottom",
  subtitleColor = "white",
  subtitleOutlineColor = "black",
  subtitleBaseColor = "white",
}) => {
  return (
    <div className="aspect-9/16 w-full rounded-lg overflow-hidden border border-gray-200">
      <Player
        component={MainVideo}
        durationInFrames={30 * 15} // Just a default duration properly dynamic later
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
          captions,
          subtitlePosition,
          subtitleColor,
          subtitleOutlineColor,
          subtitleBaseColor,
        }}
      />
    </div>
  );
};
