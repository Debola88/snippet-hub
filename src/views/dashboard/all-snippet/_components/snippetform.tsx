/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

interface SnippetFormProps {
  initialData?: {
    functionName: string;
    description: string;
    code: string;
    language: string;
  };
  onSave: (snippet: any) => void;
}

const SUPPORTED_LANGUAGES = [
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
  const [form, setForm] = useState({
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

  const handleCodeChange = (value: string | undefined) => {
    setForm((prev) => ({ ...prev, code: value || "" }));
  };

  const getMonacoLanguage = (lang: string) => {
    const safeLang = lang.trim().toLowerCase();
    return SUPPORTED_LANGUAGES.includes(safeLang) ? safeLang : "plaintext";
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
        onValueChange={(val) => setForm((prev) => ({ ...prev, language: val }))}
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
      {/* <Input
        name="language"
        placeholder="Language (e.g., javascript, python, rust)"
        value={form.language}
        onChange={handleChange}
        required
      /> */}
      <Input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <div className="h-72 border border-gray-700 rounded-lg overflow-hidden">
        <MonacoEditor
          height="100%"
          language={getMonacoLanguage(form.language)}
          theme="vs-dark"
          value={form.code}
          onChange={handleCodeChange}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
            tabSize: 2,
          }}
        />
      </div>

      <Button type="submit" className="w-full">
        Save
      </Button>
    </form>
  );
};

export default SnippetForm;
