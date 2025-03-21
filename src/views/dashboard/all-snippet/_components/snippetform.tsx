/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

interface SnippetFormProps {
  initialData?: {
    functionName: string;
    description: string;
    code: string;
    language: string;
  };
  onSave: (snippet: any) => void;
}

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      <Input
        name="language"
        placeholder="Language (e.g., JavaScript)"
        value={form.language}
        onChange={handleChange}
        required
      />
      <Input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <Input
        name="code"
        placeholder="Code snippet"
        // rows={6}
        value={form.code}
        onChange={handleChange}
        required
      />
      <Button type="submit" className="w-full">
        Save
      </Button>
    </form>
  );
};

export default SnippetForm;
