import React, { useState } from "react";

interface InputFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl">
      <input
        type="url"
        placeholder="Enter Video URL (e.g. mp4)..."
        className="flex-1 p-3 border rounded text-black"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-6 py-3 rounded disabled:opacity-50 hover:bg-blue-700 transition"
      >
        {isLoading ? "Generating..." : "Generate Subtitles"}
      </button>
    </form>
  );
};
