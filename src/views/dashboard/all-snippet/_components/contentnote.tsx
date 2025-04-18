/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

interface ContentNoteProps {
  snippet: {
    _id: string;
    functionName: string;
    description: string;
    code: string;
    language?: string;
    userId: string;
  };
  onClose: () => void;
  onEdit: (snippet: any) => void;
}

const ContentNote: React.FC<ContentNoteProps> = ({
  snippet,
  onClose,
  onEdit,
}) => {
  const [localSnippet, setLocalSnippet] = useState(snippet);

  const getLanguageExtension = () => {
    switch ((snippet.language || "javascript").toLowerCase()) {
      case "javascript":
      case "js":
        return javascript();
      default:
        return javascript();
    }
  };

  return (
    <div className="relative h-full">
      <button
        onClick={onClose}
        className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h2 className="text-xl font-bold mb-4">{snippet.functionName}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {snippet.description}
      </p>

      <div className="overflow-x-auto">
        <CodeMirror
          value={localSnippet.code}
          height="full"
          theme={oneDark}
          extensions={[getLanguageExtension()]}
          onChange={(value) => {
            console.log("Snippet Value:", value);
            setLocalSnippet({ ...localSnippet, code: value });
          }}
          className="rounded-md"
        />
      </div>
      <div className="mt-4 flex gap-2">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={() => onEdit({ ...localSnippet })}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ContentNote;
