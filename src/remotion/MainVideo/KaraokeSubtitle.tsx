/* eslint-disable @remotion/non-pure-animation */
/* eslint-disable @remotion/slow-css-property */
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Caption } from "@remotion/captions";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["800"] as const,
  subsets: ["latin"] as const,
});

interface Props {
  caption: Caption;
  subtitleColor: string;
  subtitleBaseColor: string;
  subtitleOutlineColor: string;
}

export const KaraokeSubtitle: React.FC<Props> = ({
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
        gap: "12px",
        maxWidth: "90%",
      }}
    >
      {words.map((word, index) => {
        const wordStartFrame = captionStartFrame + index * framesPerWord;
        const wordEndFrame = wordStartFrame + framesPerWord;

        // Active word logic
        const isWordActive = frame >= wordStartFrame && frame < wordEndFrame;
        const isWordPast = frame >= wordEndFrame;

        // Color logic
        const currentColor = isWordActive ? subtitleColor : subtitleBaseColor;

        // Opacity logic: Past words fade out slightly, future words visible but dim
        const opacity = isWordActive ? 1 : isWordPast ? 1 : 0.6;

        return (
          <span
            key={index}
            style={{
              fontFamily,
              fontSize: 45,
              fontWeight: 800,
              textTransform: "uppercase",
              textAlign: "center",
              lineHeight: 1.2,

              color: currentColor,
              opacity,
              transition: "color 0.1s ease-in, opacity 0.2s", // Smooth color transition

              // Outline using text-shadow for consistency
              textShadow: `
                -1px -1px 0 ${subtitleOutlineColor},
                1px -1px 0 ${subtitleOutlineColor},
                -1px  1px 0 ${subtitleOutlineColor},
                1px  1px 0 ${subtitleOutlineColor},
                2px  2px 0 rgba(0,0,0,0.5)
              `,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
