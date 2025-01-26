"use client";

import React, { useState } from "react";
import { Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiJavascript, SiPython, SiTypescript } from "react-icons/si";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const CodeSnippetCard = ({
  language,
  icon,
  code,
  functionName,
  description,
  dateCreated,
}: {
  language: string;
  icon: React.ElementType;
  code: string;
  functionName: string;
  description: string;
  dateCreated: string;
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="rounded-2xl flex flex-col justify-between shadow-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 max-w-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
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
          <span className="text-xl text-blue-600">{React.createElement(icon)}</span>
          <span className="font-medium bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gay-500">
            <Trash />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const CodeSnippetsGrid = () => {
  const snippets = [
    {
      language: "JavaScript",
      icon: SiJavascript,
      functionName: "filterArray",
      description: "Filters an array based on a callback function.",
      code: `const filterArray = (arr, fn) => arr.filter(fn);\n const filterArray = (arr, fn) => arr.filter(fn);\n const filterArray = (arr, fn) => arr.filter(fn);`,
      dateCreated: "Jan 24, 2025",
    },
    {
      language: "Python",
      icon: SiPython,
      functionName: "sum_list",
      description: "Calculates the sum of all elements in a list.",
      code: `def sum_list(lst):\n    return sum(lst)`,
      dateCreated: "Jan 10, 2025",
    },
    {
      language: "TypeScript",
      icon: SiTypescript,
      functionName: "sortArray",
      description: "Sorts an array of numbers in ascending order.",
      code: `const sortArray = (arr: number[]): number[] => \n  arr.sort((a, b) => a - b);`,
      dateCreated: "Jan 20, 2025",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
      {snippets.map((snippet, index) => (
        <CodeSnippetCard key={index} {...snippet} />
      ))}
    </div>
  );
};

export default CodeSnippetsGrid;
