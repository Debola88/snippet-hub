"use client";
import React from "react";
import { useEffect, useState } from "react";
import { FileCode2, Loader } from "lucide-react";
import CodeSnippetCard from "../all-snippet/_components/codesnippet";
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
  userId: string;
  functionName: string;
  language: string;
  description: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  favoritedBy?: string[];
}

const DashboardFavoriteView = () => {
  const [favorites, setFavorites] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const languageIconMap: Record<string, React.ElementType> = {
    javascript: SiJavascript,
    typescript: SiTypescript,
    python: SiPython,
    c: SiC,
    "c++": SiCplusplus,
    cpp: SiCplusplus,
    "c#": SiSharp,
    csharp: SiSharp,
    go: SiGo,
    php: SiPhp,
    ruby: SiRuby,
    kotlin: SiKotlin,
    swift: SiSwift,
    rust: SiRust,
    json: SiJson,
    html: SiHtml5,
    css: SiCss3,
    scss: SiSass,
    sql: SiMysql,
    postgresql: SiPostgresql,
    mongodb: SiMongodb,
    markdown: SiMarkdown,
    bash: SiGnubash,
    shell: SiGnubash,
    yaml: SiYaml,
    dockerfile: SiDocker,
    docker: SiDocker,
    perl: SiPerl,
    lua: SiLua,
    r: SiR,
    vue: SiVuedotjs,
    react: SiReact,
  };
  
  

  const getIconForLanguage = (language: string): React.ElementType => {
    return languageIconMap[language.toLowerCase()] || FileCode2;
  };
  

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");

        const res = await fetch("/api/snippet/favorite", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch favorites");
        }

        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        console.error("Failed to fetch favorites", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleDelete = async (snippetId: string) => {
    try {
      const res = await fetch(`/api/snippets/${snippetId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to delete snippet");
      }

      setFavorites(favorites.filter((snippet) => snippet._id !== snippetId));
    } catch (err) {
      console.error("Failed to delete snippet", err);
      setError(err instanceof Error ? err.message : "Failed to delete snippet");
    }
  };

  const handleSnippetSelect = (snippet: Snippet) => {
    // Implement what happens when a snippet is selected
    console.log("Selected snippet:", snippet);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Favorite Snippets</h1>
        <p className="text-gray-500">You d have any favorite snippets yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Favorite Snippets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {favorites.map((snippet: Snippet) => (
          <CodeSnippetCard
            key={snippet._id}
            _id={snippet._id}
            userId={snippet.userId}
            language={snippet.language}
            icon={getIconForLanguage(snippet.language)}
            code={snippet.code}
            functionName={snippet.functionName}
            description={snippet.description}
            dateCreated={new Date(snippet.createdAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )}
            favoritedBy={snippet.favoritedBy}
            onSnippetSelect={handleSnippetSelect}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardFavoriteView;
