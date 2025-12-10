import { AbsoluteFill, Sequence, Html5Video } from "remotion";
import { Caption } from "@remotion/captions";
import { Subtitle } from "./Subtitle";

interface MainVideoProps {
  videoUrl?: string; // Optional because initially it might be empty in Studio
  captions?: Caption[];
}

export const MainVideo: React.FC<MainVideoProps> = ({
  videoUrl,
  captions = [],
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Sequence durationInFrames={30 * 20}>
        {videoUrl ? (
          <Html5Video
            src={videoUrl}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <AbsoluteFill
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <h1 style={{ color: "gray" }}>No Video Source</h1>
          </AbsoluteFill>
        )}
        <Subtitle captions={captions} />
      </Sequence>
    </AbsoluteFill>
  );
};
