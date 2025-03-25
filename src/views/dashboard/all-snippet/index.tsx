"use client";
import React, { useState, useEffect } from "react";
import SnippetSearchBar from "./_components/searchbar";
import Tags from "./_components/tags";
import ContentNote from "./_components/contentnote";
import CodeSnippetsGrid from "./_components/codesnippetgrid";
import SnippetForm from "./_components/snippetform";
import { IconType } from "react-icons/lib";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiC,
  SiCplusplus,
  SiGo,
  SiPhp,
  SiRuby,
  SiKotlin,
  SiSwift,
  SiRust,
  SiJson,
  SiHtml5,
  SiCss3,
  SiSass,
  SiMysql,
  SiMarkdown,
  SiGnubash,
  SiYaml,
  SiDocker,
  SiPerl,
  SiLua,
  SiR,
  SiPostgresql,
  SiMongodb,
  SiVuedotjs,
  SiReact,
  SiSharp,
} from "react-icons/si";

interface Snippet {
  language: string;
  icon: IconType;
  functionName: string;
  description: string;
  code: string;
  dateCreated: string;
}

const languageIconMap: Record<string, IconType> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  C: SiC,
  "C++": SiCplusplus,
  Cpp: SiCplusplus,
  "C#": SiSharp,
  Csharp: SiSharp,
  Go: SiGo,
  PHP: SiPhp,
  Php: SiPhp,
  Ruby: SiRuby,
  Kotlin: SiKotlin,
  Swift: SiSwift,
  Rust: SiRust,
  JSON: SiJson,
  Json: SiJson,
  HTML: SiHtml5,
  Html: SiHtml5,
  CSS: SiCss3,
  Css: SiCss3,
  SCSS: SiSass,
  Scss: SiSass,
  SQL: SiMysql,
  Sql: SiMysql,
  PostgreSQL: SiPostgresql,
  Postgresql: SiPostgresql,
  MongoDB: SiMongodb,
  Mongodb: SiMongodb,
  Markdown: SiMarkdown,
  Bash: SiGnubash,
  Shell: SiGnubash,
  YAML: SiYaml,
  Yaml: SiYaml,
  Dockerfile: SiDocker,
  Docker: SiDocker,
  Perl: SiPerl,
  Lua: SiLua,
  R: SiR,
  Vue: SiVuedotjs,
  React: SiReact,
};

const normalizeLang = (lang: string) => {
  switch (lang.toLowerCase()) {
    case "python":
      return "Python";
    case "c":
      return "C";
    case "typescript":
      return "TypeScript";
    case "javascript":
      return "JavaScript";
    case "c++":
    case "cpp":
      return "C++";
    case "c#":
    case "csharp":
      return "C#";
    case "go":
      return "Go";
    case "php":
      return "PHP";
    case "ruby":
      return "Ruby";
    case "kotlin":
      return "Kotlin";
    case "swift":
      return "Swift";
    case "rust":
      return "Rust";
    case "json":
      return "JSON";
    case "html":
      return "HTML";
    case "css":
      return "CSS";
    case "scss":
      return "SCSS";
    case "sql":
      return "SQL";
    case "postgresql":
      return "PostgreSQL";
    case "mongodb":
      return "MongoDB";
    case "markdown":
      return "Markdown";
    case "bash":
    case "shell":
      return "Bash";
    case "yaml":
      return "YAML";
    case "ini":
      return "INI";
    case "dockerfile":
    case "docker":
      return "Dockerfile";
    case "perl":
      return "Perl";
    case "lua":
      return "Lua";
    case "r":
      return "R";
    case "vue":
      return "Vue";
    case "react":
      return "React";
    default:
      return lang.charAt(0).toUpperCase() + lang.slice(1);
  }
};


const DashboardAllSnippetsView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editSnippetIndex, setEditSnippetIndex] = useState<number | null>(null);
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedSnippets = localStorage.getItem("my-snippets");
    if (storedSnippets) {
      setSnippets(JSON.parse(storedSnippets));
    }
  }, []);

  // Sync to localStorage when snippets change
  useEffect(() => {
    localStorage.setItem("my-snippets", JSON.stringify(snippets));
  }, [snippets]);

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch = snippet.functionName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag =
      selectedTag === "All" || snippet.language === selectedTag;
    return matchesSearch && matchesTag;
  });

  const handleCreateClick = () => {
    setEditMode(false);
    setEditSnippetIndex(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (snippet: Snippet) => {
    const index = snippets.findIndex(
      (s) => s.functionName === snippet.functionName
    );
    setEditMode(true);
    setEditSnippetIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveSnippet = (data: Omit<Snippet, "icon" | "dateCreated">) => {
    const icon = languageIconMap[normalizeLang(data.language)] || SiJavascript;
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
    <div className="">
      <SnippetSearchBar
        onSearch={setSearchQuery}
        onCreateClick={handleCreateClick}
      />
      <div className="mt-6">
        <div className="bg-muted/50 rounded-xl p-5 flex gap-2">
          <Tags onSelectTag={setSelectedTag} />
        </div>

        <div className={`${selectedSnippet ? "gap-6" : ""} mt-6`}>
          <div
            className={`transition-all duration-500 ${
              selectedSnippet ? "hidden" : "w-full"
            }`}
          >
            <CodeSnippetsGrid
              snippets={filteredSnippets}
              onSnippetSelect={setSelectedSnippet}
            />
          </div>
          {selectedSnippet && (
            <div
              className={`transition-all duration-500 ${
                selectedSnippet ? "flex-1" : "w-0"
              } bg-muted/50 rounded-xl p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900`}
            >
              <ContentNote
                snippet={selectedSnippet}
                onClose={() => setSelectedSnippet(null)}
                onEdit={handleEditClick}
              />
            </div>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Edit Snippet" : "Create Snippet"}
            </DialogTitle>
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
