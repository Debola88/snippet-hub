/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

interface CodeSnippetCardProps {
  language: string;
  icon: string;
  code: string;
  functionName: string;
  description: string;
  dateCreated: string;
  onSnippetSelect: (snippet: any) => void;
}

const CodeSnippetCard = ({
  language,
  icon,
  code,
  functionName,
  description,
  dateCreated,
  onSnippetSelect,
}: CodeSnippetCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="rounded-2xl flex flex-col justify-between shadow-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 max-w-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle
            className="text-lg font-bold text-gray-900 dark:text-white cursor-pointer"
            onClick={() => onSnippetSelect({ functionName, description, code })}
          >
            {functionName}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
            className="text-pink-600 hover:text-pink-700"
          >
            {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
          </Button>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {dateCreated}
        </span>
      </CardHeader>
      <CardContent className="mt-4">
        <div className="mb-2 flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-2 rounded-t-lg text-xs text-gray-700 dark:text-gray-300">
          <span>index.{language.toLowerCase()}</span>
          <span>readonly</span>
        </div>
        <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-b-lg text-sm overflow-x-auto font-mono text-gray-800 dark:text-gray-200 h-auto">
          {code}
        </pre>
      </CardContent>
      {/* Card Footer */}
      <div className="mt-auto px-6 pb-4 flex justify-between items-center text-sm">
        <div className="flex items-center gap-1 relative">
          <span className="text-xl text-blue-600">{icon}</span>
          <span className="font-medium bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Trash />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CodeSnippetCard;