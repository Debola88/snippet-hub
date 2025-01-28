/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import CodeSnippetCard from "./codesnippet";

interface CodeSnippetsGridProps {
  snippets: any[];
  onSnippetSelect: (snippet: any) => void;
}

const CodeSnippetsGrid = ({ snippets, onSnippetSelect }: CodeSnippetsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
      {snippets.map((snippet, index) => (
        <CodeSnippetCard
          key={index}
          {...snippet}
          onSnippetSelect={onSnippetSelect}
        />
      ))}
    </div>
  );
};

export default CodeSnippetsGrid;