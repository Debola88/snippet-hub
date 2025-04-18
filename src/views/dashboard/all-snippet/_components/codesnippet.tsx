import React, { useState } from "react";
import { Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { FaCode } from "react-icons/fa"; // Default icon import

interface CodeSnippetCardProps {
  userId: string;
  _id: string;
  language: string;
  icon?: React.ElementType; // Made optional
  code: string;
  functionName: string;
  description: string;
  dateCreated: string;
  favoritedBy?: string[];
  onSnippetSelect: (snippet: {
    _id: string;
    functionName: string;
    description: string;
    code: string;
    language: string;
  }) => void;
  onDelete: (_id: string) => void;
}

const CodeSnippetCard = ({
  _id,
  language,
  icon: Icon = FaCode, // Default icon if none provided
  code,
  functionName,
  description,
  dateCreated,
  favoritedBy = [],
  userId,
  onSnippetSelect,
  onDelete,
}: CodeSnippetCardProps) => {
  const [isFavorite, setIsFavorite] = useState(favoritedBy.includes(userId));
  const shortCode = code.split("\n").slice(0, 3).join("\n");

  const toggleFavorite = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No authentication token found");
      }

      const res = await fetch(`/api/snippet/${_id}/favorite`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to toggle favorite");
      }

      const data = await res.json();
      setIsFavorite(data.favorited);
      return data;
    } catch (error: unknown) {
      console.error("Favorite toggle failed:", error);
      if (error instanceof Error && 
          (error.message.includes("Unauthorized") || 
           error.message.includes("Invalid token"))) {
        // Handle token expiration
      }
      throw error;
    }
  };

  const getLanguageExtension = () => {
    return javascript();
  };

  return (
    <Card className="rounded-2xl flex flex-col justify-between shadow-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle
            className="text-lg font-bold text-gray-900 dark:text-white cursor-pointer hover:underline"
            onClick={() =>
              onSnippetSelect({ _id, functionName, description, code, language })
            }
          >
            {functionName}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFavorite}
            className="text-pink-600 hover:text-pink-700"
            aria-label={isFavorite ? "Unfavorite" : "Favorite"}
          >
            {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
          </Button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {description}
        </p>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {new Date(dateCreated).toLocaleDateString()}
        </span>
      </CardHeader>
      <CardContent className="mt-4">
        <div className="mb-2 flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-2 rounded-t-lg text-xs text-gray-700 dark:text-gray-300">
          <span>index.{language}</span>
          <span>readonly</span>
        </div>
        <div className="overflow-x-auto">
          <CodeMirror
            value={shortCode}
            height="150px"
            theme={oneDark}
            extensions={[getLanguageExtension()]}
            readOnly={true}
            className="rounded-b-md"
            basicSetup={{
              lineNumbers: false,
              highlightActiveLine: false,
            }}
          />
        </div>
        {code.split("\n").length > 3 && (
          <Button
            variant="ghost"
            className="text-blue-600 dark:text-blue-400 text-sm mt-2"
            onClick={() =>
              onSnippetSelect({ _id, functionName, description, code, language })
            }
          >
            Show More
          </Button>
        )}
      </CardContent>
      <div className="mt-auto px-6 pb-4 flex justify-between items-center text-sm">
        <div className="flex items-center gap-1 relative">
          <Icon className="text-xl text-blue-600" />
          <span className="font-medium bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-red-600"
            onClick={() => onDelete(_id)}
            aria-label="Delete snippet"
          >
            <Trash />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CodeSnippetCard;