import { AbsoluteFill, Sequence, Video } from "remotion";
import { Caption } from "@remotion/captions";
import { Subtitle } from "./Subtitle";

interface MainVideoProps {
  videoUrl?: string; // Optional because initially it might be empty in Studio
  captions?: Caption[];
  subtitlePosition?: "top" | "center" | "bottom";
  subtitleColor?: string;
  subtitleOutlineColor?: string;
  subtitleBaseColor?: string;
  subtitleVariant?: "hormozi" | "karaoke" | "boxed";
}

export const MainVideo: React.FC<MainVideoProps> = ({
  videoUrl,
  captions = [],
  // Default if no prop is provided
  subtitlePosition = "bottom",
  subtitleColor = "yellow",
  subtitleOutlineColor = "black",
  subtitleBaseColor = "white",
  subtitleVariant = "hormozi",
}) => {
  return (
    <AbsoluteFill
      style={{ background: "linear-gradient(to bottom, #2c3e50, #000000)" }}
    >
      <Sequence durationInFrames={30 * 20}>
        {videoUrl ? (
          <Video
            src={videoUrl}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <AbsoluteFill
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <h1 style={{ color: "gray", fontSize: 60 }}>No Video Source</h1>
          </AbsoluteFill>
        )}
        <Subtitle
          captions={captions}
          position={subtitlePosition}
          subtitleColor={subtitleColor}
          subtitleOutlineColor={subtitleOutlineColor}
          subtitleBaseColor={subtitleBaseColor}
          variant={subtitleVariant}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
