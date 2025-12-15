import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { Caption } from "@remotion/captions";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

interface SubtitleProps {
  captions: Caption[];
  position?: "top" | "center" | "bottom";
  subtitleColor?: string;
}

export const Subtitle: React.FC<SubtitleProps> = ({
  captions,
  position = "center",
  subtitleColor = "yellow",
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

  // Calculate entry animation
  const startFrame = (activeCaption.startMs / 1000) * fps;
  const timeSinceStart = frame - startFrame;

  const scale = spring({
    frame: timeSinceStart,
    fps,
    config: {
      damping: 10,
      stiffness: 100,
    },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        // -------------------------------------------------------------------------
        // POSITIONING LOGIC
        // -------------------------------------------------------------------------
        // This is where we control the vertical position of the subtitle (top, center, bottom).
        // Change the padding value (360) below to adjust the distance from the edge.
        alignItems:
          position === "top"
            ? "flex-start"
            : position === "bottom"
              ? "flex-end"
              : "center",
        paddingTop: position === "top" ? 360 : 0,
        paddingBottom: position === "bottom" ? 360 : 0,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          // -----------------------------------------------------------------------
          // TEXT STYLING
          // -----------------------------------------------------------------------
          // This is where you can change font, color, size, and text style.
          // - fontFamily: Change the font used
          // - fontSize: Change the text size
          // - fontWeight: Text weight (e.g., 400 normal, 700 bold, 900 extra bold)
          // - color: Main text color
          fontFamily,
          fontSize: 42,
          fontWeight: 900,
          textAlign: "center",
          color: subtitleColor,
          textTransform: "uppercase",
          transform: `scale(${scale})`,
          padding: "0 40px",
          lineHeight: 1.2,
        }}
      >
        {activeCaption.text}
      </div>
    </div>
  );
};
