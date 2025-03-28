/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface SnippetFormData {
  functionName: string;
  description: string;
  code: string;
  language: string;
}

interface SnippetFormProps {
  initialData?: SnippetFormData;
  onSave: (snippet: SnippetFormData) => void;
}

const SUPPORTED_LANGUAGES: string[] = [
  "javascript",
  "typescript",
  "python",
  "c",
  "cpp",
  "csharp",
  "go",
  "php",
  "ruby",
  "kotlin",
  "swift",
  "rust",
  "json",
  "html",
  "css",
  "scss",
  "sql",
  "markdown",
  "bash",
  "shell",
  "powershell",
  "yaml",
  "ini",
  "dockerfile",
  "perl",
  "lua",
  "r",
];

const SnippetForm: React.FC<SnippetFormProps> = ({ initialData, onSave }) => {
  const [form, setForm] = useState<SnippetFormData>({
    functionName: "",
    description: "",
    code: "",
    language: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, code: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        name="functionName"
        placeholder="Function name"
        value={form.functionName}
        onChange={handleChange}
        required
      />
      <Select
        value={form.language}
        onValueChange={(val: string) =>
          setForm((prev) => ({ ...prev, language: val }))
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      {/* Code Editor Replacement using a styled textarea */}
      <div className="h-72 border border-gray-700 rounded-lg overflow-hidden">
        <textarea
          className="w-full h-full p-4 bg-gray-900 text-green-300 font-mono text-sm resize-none outline-none"
          placeholder="Enter your code here..."
          value={form.code}
          onChange={handleCodeChange}
        />
      </div>
      <Button type="submit" className="w-full">
        Save
      </Button>
    </form>
  );
};

export default SnippetForm;
