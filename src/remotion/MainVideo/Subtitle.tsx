import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Caption } from "@remotion/captions";

interface SubtitleProps {
  captions: Caption[];
  position?: "top" | "center" | "bottom";
  subtitleColor?: string; // This is the highlight color
  subtitleOutlineColor?: string;
  subtitleBaseColor?: string; // New prop for base text color
}

import { WordLevelSubtitle } from "./WordLevelSubtitle";
import { KaraokeSubtitle } from "./KaraokeSubtitle";
import { BoxedSubtitle } from "./BoxedSubtitle";

interface SubtitleProps {
  captions: Caption[];
  position?: "top" | "center" | "bottom";
  subtitleColor?: string; // Highlight Color
  subtitleOutlineColor?: string;
  subtitleBaseColor?: string;
  variant?: "hormozi" | "karaoke" | "boxed";
}

export const Subtitle: React.FC<SubtitleProps> = ({
  captions,
  position = "center",
  subtitleColor = "yellow",
  subtitleOutlineColor = "black",
  subtitleBaseColor = "white",
  variant = "hormozi",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Find the active caption
  const activeCaption = captions.find((caption) => {
    const startFrame = (caption.startMs / 1000) * fps;
    const endFrame = (caption.endMs / 1000) * fps;
    return frame >= startFrame && frame < endFrame;
  });

  if (!activeCaption) {
    return null;
  }

  // Position Styling Container
  const containerStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    pointerEvents: "none",
    paddingLeft: 60,
    paddingRight: 60,
    alignItems:
      position === "top"
        ? "flex-start"
        : position === "bottom"
          ? "flex-end"
          : "center",
    paddingTop: position === "top" ? 360 : 0,
    paddingBottom: position === "bottom" ? 360 : 0,
  };

  return (
    <div style={containerStyle}>
      {variant === "hormozi" && (
        <WordLevelSubtitle
          caption={activeCaption}
          subtitleColor={subtitleColor}
          subtitleBaseColor={subtitleBaseColor}
          subtitleOutlineColor={subtitleOutlineColor}
        />
      )}
      {variant === "karaoke" && (
        <KaraokeSubtitle
          caption={activeCaption}
          subtitleColor={subtitleColor}
          subtitleBaseColor={subtitleBaseColor}
          subtitleOutlineColor={subtitleOutlineColor}
        />
      )}
      {variant === "boxed" && (
        <BoxedSubtitle
          caption={activeCaption}
          subtitleColor={subtitleColor} // Highlight Bg
          subtitleBaseColor={subtitleBaseColor} // Text Color
          subtitleOutlineColor={subtitleOutlineColor} // Inactive/Box Bg
        />
      )}
    </div>
  );
};
