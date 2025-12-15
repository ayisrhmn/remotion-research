import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
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
          videoUrl: undefined,
          captions: parseSrt({ input: sampleSubs }).captions,
          // Change 'bottom', 'center', or 'top' to change the initial default position
          subtitlePosition: "bottom" as const,
        }}
      />
    </>
  );
};
