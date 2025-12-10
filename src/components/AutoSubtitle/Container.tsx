"use client";

import React, { useState } from "react";
import { InputForm } from "./InputForm";
import { VideoPlayer } from "./VideoPlayer";
import { Caption } from "@remotion/captions";

// Mock function to simulate AI transcription
const mockTranscribe = async (url: string): Promise<Caption[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          startMs: 0,
          endMs: 2000,
          text: "Wait...",
          timestampMs: 0,
          confidence: 1,
        },
        {
          startMs: 2000,
          endMs: 4000,
          text: "Parsing video from:",
          timestampMs: 2000,
          confidence: 1,
        },
        {
          startMs: 4000,
          endMs: 8000,
          text: url,
          timestampMs: 4000,
          confidence: 1,
        },
        {
          startMs: 8000,
          endMs: 10000,
          text: "Subtitles generated!",
          timestampMs: 8000,
          confidence: 1,
        },
      ]);
    }, 2000);
  });
};

export const AutoSubtitleContainer: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [subtitles, setSubtitles] = useState<Caption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (url: string) => {
    setIsLoading(true);
    setVideoUrl(url);
    try {
      // Here we would call the real API
      const caps = await mockTranscribe(url);
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
        <div className="w-full max-w-4xl bg-white p-4 rounded-xl shadow-lg">
          <VideoPlayer videoUrl={videoUrl} captions={subtitles} />
        </div>
      )}
    </div>
  );
};
