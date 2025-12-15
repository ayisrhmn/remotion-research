import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { TransitionVideo } from "./TransitionVideo";
import { parseSrt } from "@remotion/captions";
import { sampleSubs } from "./MainVideo/sample_subs";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={30 * 15}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          videoUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          captions: parseSrt({ input: sampleSubs }).captions,
          // Change 'bottom', 'center', or 'top' to change the initial default position
          subtitlePosition: "bottom" as const,
        }}
      />
      <Composition
        id="TransitionVideo"
        component={TransitionVideo}
        durationInFrames={570}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          video1Url:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          video2Url:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          transitionType: "slide" as const,
          captions: parseSrt({ input: sampleSubs }).captions,
        }}
      />
    </>
  );
};
