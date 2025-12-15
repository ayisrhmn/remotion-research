import React from "react";
import {
  AbsoluteFill,
  Sequence,
  Html5Video,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { Caption } from "@remotion/captions";
import { Subtitle } from "../MainVideo/Subtitle";

export const transitionVideoSchema = z.object({
  video1Url: z.string(),
  video2Url: z.string(),
  transitionType: z.enum(["none", "fade", "slide"]),
  captions: z.array(z.any()), // Assuming Caption type, but Zod needs shape or any
  // Style props
  subtitlePosition: z.enum(["top", "center", "bottom"]).optional(),
  subtitleColor: z.string().optional(),
  subtitleOutlineColor: z.string().optional(),
  subtitleBaseColor: z.string().optional(),
  subtitleVariant: z.enum(["hormozi", "karaoke", "boxed"]).optional(),
});

type TransitionVideoProps = {
  video1Url: string;
  video2Url: string;
  transitionType: "none" | "fade" | "slide";
  captions?: Caption[]; // Made optional
  subtitlePosition?: "top" | "center" | "bottom";
  subtitleColor?: string;
  subtitleOutlineColor?: string;
  subtitleBaseColor?: string;
  subtitleVariant?: "hormozi" | "karaoke" | "boxed";
};

// ...

export const TransitionVideo: React.FC<TransitionVideoProps> = ({
  video1Url,
  video2Url,
  transitionType,
  captions,
  subtitlePosition = "bottom",
  subtitleColor = "yellow",
  subtitleOutlineColor = "black",
  subtitleBaseColor = "white",
  subtitleVariant = "hormozi",
}) => {
  const { fps } = useVideoConfig();

  // Hardcode durations for now or calculate?
  const video1DurationInSeconds = 10;
  const video2DurationInSeconds = 10;
  const transitionDurationInSeconds = 1;

  const video1Frames = video1DurationInSeconds * fps;
  const video2Frames = video2DurationInSeconds * fps;
  const transitionFrames =
    transitionType === "none" ? 0 : transitionDurationInSeconds * fps;

  const v2StartTime = video1Frames - transitionFrames;

  // We will simply display the SAME captions for both videos for this demo/research purpose.
  // In a real app, you would pass `captions1` and `captions2` and apply logic.
  const captionsToUse = captions || [];

  const subtitleProps = {
    captions: captionsToUse,
    position: subtitlePosition,
    subtitleColor,
    subtitleOutlineColor,
    subtitleBaseColor,
    variant: subtitleVariant,
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Sequence durationInFrames={video1Frames}>
        {transitionType === "slide" ? (
          <SlideOutTransition
            duration={video1Frames}
            transitionFrames={transitionFrames}
          >
            <AbsoluteFill>
              <Html5Video
                src={video1Url}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
              <Subtitle {...subtitleProps} />
            </AbsoluteFill>
          </SlideOutTransition>
        ) : (
          <AbsoluteFill>
            <Html5Video
              src={video1Url}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
            <Subtitle {...subtitleProps} />
          </AbsoluteFill>
        )}
      </Sequence>

      <Sequence from={v2StartTime} durationInFrames={video2Frames}>
        {transitionType === "fade" ? (
          <FadeInTransition transitionFrames={transitionFrames}>
            <AbsoluteFill>
              <Html5Video
                src={video2Url}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
              <Subtitle {...subtitleProps} />
            </AbsoluteFill>
          </FadeInTransition>
        ) : transitionType === "slide" ? (
          <SlideInTransition transitionFrames={transitionFrames}>
            <AbsoluteFill>
              <Html5Video
                src={video2Url}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
              <Subtitle {...subtitleProps} />
            </AbsoluteFill>
          </SlideInTransition>
        ) : (
          <AbsoluteFill>
            <Html5Video
              src={video2Url}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
            <Subtitle {...subtitleProps} />
          </AbsoluteFill>
        )}
      </Sequence>
    </AbsoluteFill>
  );
};

// Helpers for effects

const FadeInTransition: React.FC<{
  children: React.ReactNode;
  transitionFrames: number;
}> = ({ children, transitionFrames }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, transitionFrames], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const SlideOutTransition: React.FC<{
  children: React.ReactNode;
  duration: number;
  transitionFrames: number;
}> = ({ children, duration, transitionFrames }) => {
  const frame = useCurrentFrame();
  const width = useVideoConfig().width;
  // We want to slide out ONLY during the last 'transitionFrames' of the video duration.
  // The sequence length is video1Frames.
  // The transition starts at (duration - transitionFrames).

  const startTransitionFrame = duration - transitionFrames;

  const translateX = interpolate(
    frame,
    [startTransitionFrame, duration],
    [0, -width],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );

  return (
    <AbsoluteFill style={{ transform: `translateX(${translateX}px)` }}>
      {children}
    </AbsoluteFill>
  );
};

const SlideInTransition: React.FC<{
  children: React.ReactNode;
  transitionFrames: number;
}> = ({ children, transitionFrames }) => {
  const frame = useCurrentFrame();
  const width = useVideoConfig().width;
  const translateX = interpolate(frame, [0, transitionFrames], [width, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  return (
    <AbsoluteFill style={{ transform: `translateX(${translateX}px)` }}>
      {children}
    </AbsoluteFill>
  );
};
