/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ContentNoteProps {
  snippet: {
    functionName: string;
    description: string;
    code: string;
    language?: string;
  };
  onClose: () => void;
  onEdit: (snippet: any) => void;
}

const ContentNote = ({ snippet, onClose, onEdit }: ContentNoteProps) => {
  return (
    <div className="relative h-full">
      <button
        onClick={onClose}
        className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 className="text-xl font-bold mb-4">{snippet.functionName}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{snippet.description}</p>

      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={snippet.language || "javascript"}
          style={oneDark}
          customStyle={{
            borderRadius: "0.5rem",
            padding: "1.5rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
          wrapLongLines
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>

      <Button variant="outline" className="mt-4" onClick={() => onEdit(snippet)}>
        Edit Snippet
      </Button>
    </div>
  );
};

export default ContentNote;
