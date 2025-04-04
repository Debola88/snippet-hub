/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { IoClose } from "react-icons/io5";

interface ContentNoteProps {
  snippet: {
    _id: string;
    functionName: string;
    description: string;
    code: string;
    language?: string;
  };
  onClose: () => void;
  onEdit: (updatedSnippet: any) => void;
}

const ContentNote: React.FC<ContentNoteProps> = ({
  snippet,
  onClose,
  onEdit,
}) => {
  const [code, setCode] = useState(snippet.code);
  const [functionName, setFunctionName] = useState(snippet.functionName);
  const [description, setDescription] = useState(snippet.description);
  const [isEditing, setIsEditing] = useState(false);

  const getLanguageExtension = () => {
    switch ((snippet.language || "javascript").toLowerCase()) {
      case "javascript":
      case "js":
        return javascript();
      default:
        return javascript();
    }
  };

  const handleSave = () => {
    onEdit({ ...snippet, functionName, description, code });
    setIsEditing(false);
  };

  return (
    <div className="relative h-full p-5 bg-muted/50 rounded-lg">
      <Button
        onClick={onClose}
        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        aria-label="Close"
        variant= 'ghost'
      >
        <IoClose />
      </Button>

      {isEditing ? (
        <>
          <input
            type="text"
            value={functionName}
            onChange={(e) => setFunctionName(e.target.value)}
            className="w-full p-2 mb-3 border rounded-md bg-gray-100 dark:bg-gray-800"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-3 border rounded-md bg-gray-100 dark:bg-gray-800"
          />
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2">{snippet.functionName}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {snippet.description}
          </p>
        </>
      )}

      <div className="overflow-x-auto">
        <CodeMirror
          value={code}
          height="200px"
          theme={oneDark}
          extensions={[getLanguageExtension()]}
          onChange={setCode}
          className="rounded-md"
        />
      </div>

      <div className="mt-4 flex gap-2">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        {isEditing ? (
          <Button onClick={handleSave}>Save Changes</Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </div>
    </div>
  );
};

export default ContentNote;
