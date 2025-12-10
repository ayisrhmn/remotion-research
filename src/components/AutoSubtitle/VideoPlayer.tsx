import React from "react";
import { Player } from "@remotion/player";
import { MainVideo } from "../../remotion/MainVideo";
import { Caption } from "@remotion/captions";

interface VideoPlayerProps {
  videoUrl: string;
  captions: Caption[];
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  captions,
}) => {
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-200">
      <Player
        component={MainVideo}
        durationInFrames={30 * 20} // Just a default duration properly dynamic later
        fps={30}
        compositionWidth={1920}
        compositionHeight={1080}
        style={{
          width: "100%",
          height: "100%",
        }}
        controls
        inputProps={{
          videoUrl,
          captions,
        }}
      />
    </div>
  );
};
