/* eslint-disable @remotion/slow-css-property */
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Caption } from "@remotion/captions";
import { loadFont } from "@remotion/google-fonts/Roboto";

const { fontFamily } = loadFont("normal", {
  weights: ["700"] as const,
  subsets: ["latin"] as const,
});

interface Props {
  caption: Caption;
  subtitleColor: string; // Used as Highlight Background
  subtitleBaseColor: string; // Used as Text Color
  subtitleOutlineColor: string; // Used as Inactive Background
}

export const BoxedSubtitle: React.FC<Props> = ({
  caption,
  subtitleColor,
  subtitleBaseColor,
  subtitleOutlineColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = caption.text.trim().split(/\s+/);
  const captionStartFrame = (caption.startMs / 1000) * fps;
  const captionEndFrame = (caption.endMs / 1000) * fps;
  const captionDurationInFrames = captionEndFrame - captionStartFrame;
  const framesPerWord = captionDurationInFrames / words.length;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "8px",
        maxWidth: "80%",
      }}
    >
      {words.map((word, index) => {
        const wordStartFrame = captionStartFrame + index * framesPerWord;
        const wordEndFrame = wordStartFrame + framesPerWord;
        const isWordActive = frame >= wordStartFrame && frame < wordEndFrame;
        const isWordFuture = frame < wordStartFrame;

        // Colors
        // Active: Bg = HighlightColor, Text = BaseColor
        // Inactive: Bg = OutlineColor (as fallback bg), Text = BaseColor
        const backgroundColor = isWordActive
          ? subtitleColor
          : subtitleOutlineColor;

        // Scale effect for active word
        const scale = isWordActive ? 1.05 : 1;

        if (isWordFuture) return null; // Hide future words completely like Hormozi style, or keep them?
        // Let's hide them for cleaner look usually associated with this style.

        return (
          <span
            key={index}
            style={{
              fontFamily,
              fontSize: 40,
              fontWeight: 700,
              textTransform: "uppercase",
              textAlign: "center",
              lineHeight: 1,

              padding: "4px 10px",
              borderRadius: "4px",

              backgroundColor: backgroundColor,
              // Active: text color becomes OutlineColor (usually dark) to contrast with HighlightBG
              // Inactive: text color stays BaseColor (usually white)
              color: isWordActive ? subtitleOutlineColor : subtitleBaseColor,

              transform: `scale(${scale})`,
              boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
