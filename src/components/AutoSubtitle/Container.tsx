"use client";

import React, { useState } from "react";
import { InputForm } from "./InputForm";
import { VideoPlayer } from "./VideoPlayer";
import { Caption, parseSrt } from "@remotion/captions";
import { DEMO_SRT } from "./constants";

// Mock function to simulate AI transcription
const mockTranscribe = async (): Promise<Caption[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { captions } = parseSrt({ input: DEMO_SRT });
      resolve(captions);
    }, 1500);
  });
};

export const AutoSubtitleContainer: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [subtitles, setSubtitles] = useState<Caption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subtitlePosition, setSubtitlePosition] = useState<
    "top" | "center" | "bottom"
  >("bottom");
  const [subtitleBaseColor, setSubtitleBaseColor] = useState("#ffffff");
  const [subtitleColor, setSubtitleColor] = useState("#ffff00"); // Highlight
  const [subtitleOutlineColor, setSubtitleOutlineColor] = useState("#000000");
  const [subtitleVariant, setSubtitleVariant] = useState<
    "hormozi" | "karaoke" | "boxed"
  >("hormozi");

  const handleGenerate = async (url: string) => {
    setIsLoading(true);
    setVideoUrl(url);
    try {
      const caps = await mockTranscribe();
      setSubtitles(caps);
    } catch (error) {
      console.error(error);
      alert("Failed to generate subtitles");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 text-gray-900 gap-8">
      {/* ... Header and InputForm ... same code */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Remotion Research 🤖</h1>
        <p className="text-gray-600 mb-8">
          Enter a video URL to automagically add subtitles.
        </p>

        <div className="flex justify-center mb-8">
          <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
        </div>
      </div>

      {videoUrl && subtitles.length > 0 && (
        <div className="w-full max-w-md bg-white p-4 rounded-xl shadow-lg">
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
              <span className="text-sm font-semibold text-gray-700">
                Settings
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Style Variant Selector */}
              <div className="flex flex-col gap-2 col-span-2">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Style Variant
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSubtitleVariant("hormozi")}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                      subtitleVariant === "hormozi"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Hormozi
                  </button>
                  <button
                    onClick={() => setSubtitleVariant("karaoke")}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                      subtitleVariant === "karaoke"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Karaoke
                  </button>
                  <button
                    onClick={() => setSubtitleVariant("boxed")}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                      subtitleVariant === "boxed"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Boxed
                  </button>
                </div>
              </div>

              {/* Position Control */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Position
                </label>
                <select
                  value={subtitlePosition}
                  onChange={(e) =>
                    setSubtitlePosition(
                      e.target.value as "top" | "center" | "bottom",
                    )
                  }
                  className="p-2 border rounded-md text-sm border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none w-full"
                >
                  <option value="top">Top</option>
                  <option value="center">Center</option>
                  <option value="bottom">Bottom</option>
                </select>
              </div>

              {/* Base Color Control */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Base Text Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={subtitleBaseColor}
                    onChange={(e) => setSubtitleBaseColor(e.target.value)}
                    className="h-9 w-full cursor-pointer rounded border border-gray-300 bg-white p-1"
                  />
                </div>
              </div>

              {/* Highlight Color Control */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Highlight Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={subtitleColor}
                    onChange={(e) => setSubtitleColor(e.target.value)}
                    className="h-9 w-full cursor-pointer rounded border border-gray-300 bg-white p-1"
                  />
                </div>
              </div>

              {/* Outline Color Control */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Outline Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={subtitleOutlineColor}
                    onChange={(e) => setSubtitleOutlineColor(e.target.value)}
                    className="h-9 w-full cursor-pointer rounded border border-gray-300 bg-white p-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <VideoPlayer
            videoUrl={videoUrl}
            captions={subtitles}
            subtitlePosition={subtitlePosition}
            subtitleColor={subtitleColor}
            subtitleOutlineColor={subtitleOutlineColor}
            subtitleBaseColor={subtitleBaseColor}
            subtitleVariant={subtitleVariant}
          />

          {/* Render button removed */}
        </div>
      )}
    </div>
  );
};
