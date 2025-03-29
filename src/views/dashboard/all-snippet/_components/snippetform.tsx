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
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

export type SnippetFormData = {
  functionName: string;
  description: string;
  code: string;
  language: string;
};

interface SnippetFormProps {
  initialData?: SnippetFormData;
  onSave: (data: SnippetFormData) => Promise<void>;
  onDelete?: (snippetId: string) => void;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCodeChange = (value: string) => {
    setForm((prev) => ({ ...prev, code: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSave(form);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <p className="text-red-500 text-sm">{error}</p>}

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

      <div className="h-72 border border-gray-700 rounded-lg overflow-hidden">
        <CodeMirror
          value={form.code}
          height="288px"
          theme={oneDark}
          extensions={[javascript()]}
          onChange={handleCodeChange}
          className="rounded-md"
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default SnippetForm;
