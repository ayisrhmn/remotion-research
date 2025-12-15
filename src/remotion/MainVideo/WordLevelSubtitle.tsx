/* eslint-disable @remotion/slow-css-property */
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption } from "@remotion/captions";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["900"],
  subsets: ["latin"],
});

interface Props {
  caption: Caption;
  subtitleColor: string;
  subtitleBaseColor: string;
  subtitleOutlineColor: string;
}

export const WordLevelSubtitle: React.FC<Props> = ({
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
        maxWidth: "80%",
      }}
    >
      {words.map((word, index) => {
        const wordStartFrame = captionStartFrame + index * framesPerWord;
        const wordEndFrame = wordStartFrame + framesPerWord;
        const timeSinceWordStart = frame - wordStartFrame;

        const scale = spring({
          frame: timeSinceWordStart,
          fps,
          config: { damping: 12, stiffness: 200, mass: 0.5 },
        });

        const isWordActive = frame >= wordStartFrame && frame < wordEndFrame;

        return (
          <span
            key={`${caption.startMs}-${index}`}
            style={{
              fontFamily,
              fontSize: 50,
              fontWeight: 900,
              textAlign: "center",
              textTransform: "uppercase",
              lineHeight: 1.2,
              display: "inline-block",
              transform: `scale(${scale})`,
              color: isWordActive ? subtitleColor : subtitleBaseColor,
              opacity: frame < wordStartFrame ? 0 : 1,
              textShadow: `
                -2px -2px 0 ${subtitleOutlineColor},
                 2px -2px 0 ${subtitleOutlineColor},
                -2px  2px 0 ${subtitleOutlineColor},
                 2px  2px 0 ${subtitleOutlineColor},
                -2px  0   0 ${subtitleOutlineColor},
                 2px  0   0 ${subtitleOutlineColor},
                 0   -2px 0 ${subtitleOutlineColor},
                 0    2px 0 ${subtitleOutlineColor},
                 4px  4px 0 rgba(0,0,0,0.5) 
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
