/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import SnippetSearchBar from "./_components/searchbar";
import Tags from "./_components/tags";
import ContentNote from "./_components/contentnote";
import CodeSnippetsGrid from "./_components/codesnippetgrid";
import { SiJavascript, SiPython, SiTypescript } from "react-icons/si";
import { IconType } from "react-icons/lib";

interface Snippet {
  language: string;
  icon: IconType;
  functionName: string;
  description: string;
  code: string;
  dateCreated: string;
}

const DashboardAllSnippetsView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const snippets: Snippet[] = [
    {
      language: "Javascript",
      icon: SiJavascript,
      functionName: "filterArray",
      description: "Filters an array based on a callback function.",
      code: `const filterArray = (arr, fn) => arr.filter(fn);`,
      dateCreated: "Jan 24, 2025",
    },
    {
      language: "Python",
      icon: SiPython,
      functionName: "sum_list",
      description: "Calculates the sum of all elements in a list.",
      code: `def sum_list(lst):\n    return sum(lst)`,
      dateCreated: "Jan 10, 2025",
    },
    {
      language: "TypeScript",
      icon: SiTypescript,
      functionName: "sortArray",
      description: "Sorts an array of numbers in ascending order.",
      code: `const sortArray = (arr: number[]): number[] => \n  arr.sort((a, b) => a - b);`,
      dateCreated: "Jan 20, 2025",
    },
  ];

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch = snippet.functionName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag =
      selectedTag === "All" || snippet.language === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="p-6">
      <SnippetSearchBar onSearch={setSearchQuery} />
      <div className="mt-6">
        <div className="bg-muted/50 rounded-xl p-5 flex gap-2">
          <Tags onSelectTag={setSelectedTag} />
        </div>
        {/* Split-screen layout */}
        <div
          className={`grid ${
            selectedSnippet ? "grid-cols-2" : "grid-cols-1"
          } gap-6 mt-6`}
        >
          {/* Left side: Tags and Snippets Grid */}
          <div>
            <CodeSnippetsGrid
              snippets={filteredSnippets}
              onSnippetSelect={setSelectedSnippet}
            />
          </div>
          {/* Right side: Content Note (conditionally rendered) */}
          {selectedSnippet && (
            <div className="bg-muted/50 rounded-xl p-5">
              <ContentNote
                snippet={selectedSnippet}
                onClose={() => setSelectedSnippet(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardAllSnippetsView;
