import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Caption } from "@remotion/captions";

interface SubtitleProps {
  captions: Caption[];
}

export const Subtitle: React.FC<SubtitleProps> = ({ captions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Find the active subtitle
  const activeCaption = captions.find((caption) => {
    if (!caption) {
      return false;
    }
    const startFrame = (caption.startMs / 1000) * fps;
    const endFrame = (caption.endMs / 1000) * fps;
    return frame >= startFrame && frame < endFrame;
  });

  if (!activeCaption) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: 100,
        width: "100%",
        textAlign: "center",
        fontSize: 50,
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      {activeCaption.text}
    </div>
  );
};
