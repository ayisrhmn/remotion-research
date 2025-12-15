/* eslint-disable @remotion/slow-css-property */
import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { Caption } from "@remotion/captions";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

interface SubtitleProps {
  captions: Caption[];
  position?: "top" | "center" | "bottom";
  subtitleColor?: string; // This is the highlight color
  subtitleOutlineColor?: string;
  subtitleBaseColor?: string; // New prop for base text color
}

export const Subtitle: React.FC<SubtitleProps> = ({
  captions,
  position = "center",
  subtitleColor = "yellow",
  subtitleOutlineColor = "black",
  subtitleBaseColor = "white",
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

  // 1. SPLIT TEXT INTO WORDS
  const words = activeCaption.text.trim().split(/\s+/);

  // 2. CALCULATE TIMING PER WORD (Simple Interpolation)
  const captionStartFrame = (activeCaption.startMs / 1000) * fps;
  const captionEndFrame = (activeCaption.endMs / 1000) * fps;
  const captionDurationInFrames = captionEndFrame - captionStartFrame;
  const framesPerWord = captionDurationInFrames / words.length;

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
        alignItems:
          position === "top"
            ? "flex-start"
            : position === "bottom"
              ? "flex-end"
              : "center",
        paddingTop: position === "top" ? 360 : 0,
        paddingBottom: position === "bottom" ? 360 : 0,
        pointerEvents: "none",
        paddingLeft: 60,
        paddingRight: 60,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px", // Space between words
          maxWidth: "80%",
        }}
      >
        {words.map((word, index) => {
          // Calculate start frame for THIS specific word
          const wordStartFrame = captionStartFrame + index * framesPerWord;
          const wordEndFrame = wordStartFrame + framesPerWord;

          // Animation: Spring Pop-in
          const timeSinceWordStart = frame - wordStartFrame;
          const scale = spring({
            frame: timeSinceWordStart,
            fps,
            config: {
              damping: 12,
              stiffness: 200,
              mass: 0.5,
            },
          });

          // Logic: Is this word currently being spoken?
          const isWordActive = frame >= wordStartFrame && frame < wordEndFrame;

          return (
            <span
              key={`${activeCaption.startMs}-${index}`}
              style={{
                fontFamily,
                fontSize: 50,
                fontWeight: 900,
                textAlign: "center",
                textTransform: "uppercase",
                lineHeight: 1.2,
                display: "inline-block",

                // Dynamic Styling
                transform: `scale(${scale})`,
                color: isWordActive ? subtitleColor : subtitleBaseColor, // Use base color for inactive words
                opacity: frame < wordStartFrame ? 0 : 1, // Hide future words in the same sentence

                // Outline Effect
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
                `, // Added slight drop shadow for depth
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
