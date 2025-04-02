/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CodeSnippetCard from "./codesnippet";

interface CodeSnippetsGridProps {
  snippets: any[];
  onSnippetSelect: (snippet: any) => void;
  onDelete: (id: string) => void;
}

const CodeSnippetsGrid = ({ snippets, onSnippetSelect, onDelete }: CodeSnippetsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {snippets.map((snippet) => (
        <CodeSnippetCard
          key={snippet._id} // Use _id instead of index
          {...snippet}
          onSnippetSelect={onSnippetSelect}
          onDelete={() => onDelete(snippet._id)} // Pass only the _id
        />
      ))}
    </div>
  );
};

export default CodeSnippetsGrid;
