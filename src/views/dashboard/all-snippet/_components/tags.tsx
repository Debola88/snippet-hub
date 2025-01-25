"use client";

import { Button } from "@/components/ui/button";

const Tags = () => {
  const navItems = [
    "All",
    "Filter function Exercises",
    "API Methods",
    "JavaScript Functions",
    "React Functions",
    "Reduce Function",
    "Reduce Function",
    "Reduce Function",
    "Reduce Function",
    "JavaScript Functions",
  ];

  return (
    <div className="max-w-full overflow-x-auto flex gap-3">
      {navItems.map((item, index) => (
        <Button
          key={index}
          variant="ghost"
          className="px-4 py-2 min-w-fit text-gray-700 hover:text-white hover:bg-gradient-to-r from-blue-600 to-blue-800 dark:text-white"
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default Tags;
