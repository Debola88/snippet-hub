/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import SnippetSearchBar from "./_components/searchbar";
import Tags from "./_components/tags";
import ContentNote from "./_components/contentnote";
import CodeSnippetsGrid from "./_components/codesnippetgrid";
import SnippetForm from "./_components/snippetform";
import { IconType } from "react-icons/lib";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from 'next/navigation';
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
  _id: string;
  language: string;
  icon: IconType;
  functionName: string;
  description: string;
  code: string;
  createdAt: string;
  userId: string;
}

export type SnippetFormData = {
  functionName: string;
  description: string;
  code: string;
  language: string;
};

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
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editSnippetIndex, setEditSnippetIndex] = useState<number | null>(null);
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [selectedFunction, setSelectedFunction] = useState("All");
  const searchParams = useSearchParams();
  const selectedLanguage = searchParams.get("lang");
  const { toast } = useToast();

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found");
          return;
        }

        const res = await fetch("/api/snippet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
          return;
        }

        const data = await res.json();
        if (res.ok) {
          const mapped = data.map((snippet: Snippet) => ({
            ...snippet,
            icon:
              languageIconMap[normalizeLang(snippet.language)] || SiJavascript,
          }));
          setSnippets(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch snippets:", error);
        toast({
          title: "Error",
          description: "Failed to fetch snippets",
          variant: "destructive",
        });
      }
    };

    fetchSnippets();
  }, [toast]);

  const functionNames = Array.from(
    new Set(snippets.map((snippet) => snippet.functionName))
  );

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.functionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase());
  
    const matchesLanguage =
      !selectedLanguage ||
      snippet.language.toLowerCase() === selectedLanguage.toLowerCase();
  
    const matchesFunction =
      selectedFunction === "All" || 
      snippet.functionName === selectedFunction;
  
    return matchesSearch && matchesLanguage && matchesFunction;
  });

  const handleCreateClick = () => {
    setEditMode(false);
    setEditSnippetIndex(null);
    setSelectedSnippet(null);
    setIsModalOpen(true);
  };

  const handleEdit = async (updatedSnippet: Snippet) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Snipped ID", updatedSnippet.code, updatedSnippet._id);
      const res = await fetch(`/api/snippet/${updatedSnippet._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedSnippet),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Update failed");

      // alert("Snippet updated successfully!");
      return result;
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update snippet.");
    }
  };

  const handleSaveSnippet = async (data: SnippetFormData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to add or edit a snippet.");
        return;
      }

      let res;
      if (editMode && selectedSnippet) {
        res = await fetch(`/api/snippet/${selectedSnippet._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
      } else {
        res = await fetch("/api/snippet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
      }
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to save snippet.");

      const snippetWithIcon: Snippet = {
        ...result,
        icon: languageIconMap[normalizeLang(result.language)] || SiJavascript,
      };

      if (editMode && selectedSnippet) {
        setSnippets((prev) =>
          prev.map((s) => (s._id === selectedSnippet._id ? snippetWithIcon : s))
        );
        setSelectedSnippet(snippetWithIcon);
      } else {
        setSnippets([snippetWithIcon, ...snippets]);
      }
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error saving snippet:", error);
      alert("Error: " + error.message);
    }
  };

  const handleDeleteSnippet = async (snippetId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to delete a snippet.");
        return;
      }

      const res = await fetch(`/api/snippet/${snippetId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete snippet.");
      }

      setSnippets((prev) => prev.filter((s) => s._id !== snippetId));

      console.log("Snippet deleted successfully.");
    } catch (error) {
      console.error("Error deleting snippet:", error);
      alert("Error deleting snippet:");
    }
  };

  return (
    <div className="">
      <SnippetSearchBar
        onSearch={setSearchQuery}
        onCreateClick={handleCreateClick}
      />
      <div className="mt-6">
        <div className="bg-muted/50 rounded-xl p-5 flex gap-2">
          <Tags
            onSelectTag={setSelectedFunction}
            functionNames={functionNames}
          />
        </div>
        <div className={`${selectedSnippet ? "gap-6" : ""} mt-6`}>
          <div
            className={`transition-all duration-500 ${
              selectedSnippet ? "hidden" : "w-full"
            }`}
          >
            {filteredSnippets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {snippets.length === 0
                    ? "No snippets found"
                    : "No snippets match your current filters"}
                </p>
              </div>
            ) : (
              <CodeSnippetsGrid
                snippets={filteredSnippets}
                onSnippetSelect={setSelectedSnippet}
                onDelete={handleDeleteSnippet}
              />
            )}
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
                onEdit={(snippet) => {
                  handleEdit(snippet).then((res) => {
                    setSnippets((prev) =>
                      prev.map((s) => (s._id === selectedSnippet._id ? res : s))
                    );
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-md:max-w-[370px] mx-auto">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Edit Snippet" : "Create Snippet"}
            </DialogTitle>
          </DialogHeader>
          <SnippetForm
            initialData={
              editMode && editSnippetIndex !== null
                ? {
                    functionName: snippets[editSnippetIndex].functionName,
                    description: snippets[editSnippetIndex].description,
                    code: snippets[editSnippetIndex].code,
                    language: snippets[editSnippetIndex].language,
                  }
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
