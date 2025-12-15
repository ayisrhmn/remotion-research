import React, { useState } from "react";

interface InputFormProps {
  onSubmit: (url: string, url2?: string) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [url, setUrl] = useState(
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  );
  const [url2, setUrl2] = useState(
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url, url2.trim() || undefined);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-xl bg-white p-6 rounded-xl shadow-sm"
    >
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">
          Video 1 URL (Primary)
        </label>
        <input
          type="url"
          placeholder="Enter Video URL (e.g. mp4)..."
          className="flex-1 p-3 border rounded text-black"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">
          Video 2 URL (Optional - for Transition)
        </label>
        <input
          type="url"
          placeholder="Enter Second Video URL..."
          className="flex-1 p-3 border rounded text-black"
          value={url2}
          onChange={(e) => setUrl2(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-6 py-3 rounded disabled:opacity-50 hover:bg-blue-700 transition w-full font-bold"
      >
        {isLoading ? "Generating..." : "Generate Research Preview"}
      </button>
    </form>
  );
};
