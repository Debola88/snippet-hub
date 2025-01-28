"use client";

import React from "react";

interface ContentNoteProps {
  snippet: {
    functionName: string;
    description: string;
    code: string;
  };
}

const ContentNote = ({ snippet }: ContentNoteProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{snippet.functionName}</h2>
      <p className="text-gray-600 dark:text-gray-400">{snippet.description}</p>
      <pre className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm overflow-x-auto font-mono text-gray-800 dark:text-gray-200">
        {snippet.code}
      </pre>
    </div>
  );
};

export default ContentNote;