"use client";
import React, { useState } from "react";
import SnippetSearchBar from "./_components/searchbar";
import Tags from "./_components/tags";
import ContentNote from "./_components/contentnote";
import CodeSnippetsGrid from "./_components/codesnippetgrid";
import SnippetForm from "./_components/snippetform";
import { SiJavascript, SiPython, SiTypescript } from "react-icons/si";
import { IconType } from "react-icons/lib";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editSnippetIndex, setEditSnippetIndex] = useState<number | null>(null);

  const [snippets, setSnippets] = useState<Snippet[]>([
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
  ]);

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch = snippet.functionName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "All" || snippet.language === selectedTag;
    return matchesSearch && matchesTag;
  });

  const handleCreateClick = () => {
    setEditMode(false);
    setEditSnippetIndex(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (snippet: Snippet) => {
    const index = snippets.findIndex((s) => s.functionName === snippet.functionName);
    setEditMode(true);
    setEditSnippetIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveSnippet = (data: Omit<Snippet, "icon" | "dateCreated">) => {
    const languageIconMap: Record<string, IconType> = {
      JavaScript: SiJavascript,
      Javascript: SiJavascript,
      Python: SiPython,
      TypeScript: SiTypescript,
    };

    const icon = languageIconMap[data.language] || SiJavascript;

    if (editMode && editSnippetIndex !== null) {
      const updatedSnippets = [...snippets];
      updatedSnippets[editSnippetIndex] = {
        ...updatedSnippets[editSnippetIndex],
        ...data,
        icon,
      };
      setSnippets(updatedSnippets);
      setSelectedSnippet(updatedSnippets[editSnippetIndex]);
    } else {
      const newSnippet: Snippet = {
        ...data,
        icon,
        dateCreated: new Date().toLocaleDateString(),
      };
      setSnippets([newSnippet, ...snippets]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <SnippetSearchBar onSearch={setSearchQuery} onCreateClick={handleCreateClick} />
      <div className="mt-6">
        <div className="bg-muted/50 rounded-xl p-5 flex gap-2">
          <Tags onSelectTag={setSelectedTag} />
        </div>

        <div className={`${selectedSnippet ? "gap-6" : ""} mt-6`}>
          <div className={`transition-all duration-500 ${selectedSnippet ? "hidden" : "w-full"}`}>
            <CodeSnippetsGrid snippets={filteredSnippets} onSnippetSelect={setSelectedSnippet} />
          </div>
          {selectedSnippet && (
            <div className={`transition-all duration-500 ${selectedSnippet ? "flex-1" : "w-0"} bg-muted/50 rounded-xl p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900`}>
              <ContentNote snippet={selectedSnippet} onClose={() => setSelectedSnippet(null)} onEdit={handleEditClick} />
            </div>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Snippet" : "Create Snippet"}</DialogTitle>
          </DialogHeader>
          <SnippetForm
            initialData={
              editMode && editSnippetIndex !== null
                ? snippets[editSnippetIndex]
                : undefined
            }
            onSave={handleSaveSnippet}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardAllSnippetsView;
