/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import SnippetSearchBar from "./_components/searchbar";
import Tags from "./_components/tags";
import ContentNote from "./_components/contentnote";
import CodeSnippetsGrid from "./_components/codesnippetgrid";
import SnippetForm from "./_components/snippetform";
import { IconType } from "react-icons/lib";
import { SnackbarProvider } from "notistack";

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
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editSnippetIndex, setEditSnippetIndex] = useState<number | null>(null);
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await fetch("/api/snippet");
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
      }
    };

    fetchSnippets();
  }, []);

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch = snippet.functionName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag =
      selectedTag === "All" ||
      snippet.language.toLowerCase() === selectedTag.toLowerCase();
    return matchesSearch && matchesTag;
  });

  const handleCreateClick = () => {
    setEditMode(false);
    setEditSnippetIndex(null);
    setSelectedSnippet(null);
    setIsModalOpen(true);
  };

  // const handleEditClick = (snippet: Snippet) => {
  //   const index = snippets.findIndex((s) => s._id === snippet._id);
  //   // const message = "Updated successfully";
  //   if (index !== -1) {
  //     // enqueueSnackbar(message, { variant: "success" });
  //     // setEditMode(true);
  //     // setEditSnippetIndex(index);
  //     // setSelectedSnippet(snippet);
  //     // setIsModalOpen(true);
  //     console.log('Editing error');
  //   }
  // };

  const handleEditClick = (updatedSnippet: Snippet) => {
    setSnippets((prev) =>
      prev.map((s) => (s._id === updatedSnippet._id ? updatedSnippet : s))
    );
  
    // You can also make an API request here to persist the changes:
    fetch(`/api/snippet/${updatedSnippet._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedSnippet),
    }).catch((error) => console.error("Failed to update snippet:", error));
  };
  
  

  const handleSaveSnippet = async (data: SnippetFormData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to add or edit a snippet.");
        return;
      }
  
      let res;
      let updatedSnippet: Snippet;
  
      if (editMode && selectedSnippet) {
        // Edit existing snippet
        res = await fetch(`/api/snippet/${selectedSnippet._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
  
        if (!res.ok) throw new Error("Failed to update snippet.");
  
        updatedSnippet = { ...selectedSnippet, ...data };
  
        setSnippets((prev) =>
          prev.map((s) => (s._id === selectedSnippet._id ? updatedSnippet : s))
        );
      } else {
        res = await fetch("/api/snippet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
  
        const result = await res.json();
        if (!res.ok) throw new Error("Failed to save snippet.");
  
        updatedSnippet = {
          ...result,
          icon: languageIconMap[normalizeLang(result.language)] || SiJavascript,
        };
  
        setSnippets((prev) => [updatedSnippet, ...prev]);
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

      // Update UI after deletion
      setSnippets((prev) => prev.filter((s) => s._id !== snippetId));

      console.log("Snippet deleted successfully.");
    } catch (error: any) {
      console.error("Error deleting snippet:", error);
      alert("Error: " + error.message);
    }
  };

  // const handleDeleteSnippet = async (snippetId: string) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       alert("You must be logged in to delete a snippet.");
  //       return;
  //     }
  //     const res = await fetch(`/api/snippet/${snippetId}`, {
  //       method: "DELETE",
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     if (!res.ok) throw new Error("Failed to delete snippet.");
  //     setSnippets((prev) => prev.filter((s) => s._id !== snippetId));
  //     setSelectedSnippet(null);
  //   } catch (error) {
  //     console.error("Error deleting snippet:", error);
  //   }
  // };

  return (
    <div>
      <SnackbarProvider />
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
              onDelete={handleDeleteSnippet}
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
                onEdit={() => handleEditClick(selectedSnippet)}
              />
            </div>
          )}
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-md:max-w-[370px]">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Edit Snippet" : "Create Snippet"}
            </DialogTitle>
          </DialogHeader>
          <SnippetForm
            initialData={
              editMode && editSnippetIndex
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

      {/* <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="bg-sidebar max-md:max-w-[350px]">
                <DialogHeader>
                  <DialogTitle className="text-gray-800 dark:text-white">
                    Success
                  </DialogTitle>
                </DialogHeader>
                <p className="text-gray-600 dark:text-gray-300">{modalMessage}</p>
                <DialogFooter>
                  <Button onClick={handleModalConfirm}>OK</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog> */}
    </div>
  );
};

export default DashboardAllSnippetsView;
