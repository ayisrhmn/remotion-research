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
        width={1920}
        height={1080}
        defaultProps={{
          videoUrl: undefined,
          captions: parseSrt({ input: sampleSubs }).captions,
        }}
      />
    </>
  );
};
