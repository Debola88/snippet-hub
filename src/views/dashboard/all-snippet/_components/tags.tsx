"use client";

import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

interface TagsProps {
  onSelectTag: (tag: string) => void;
  functionNames: string[];
}

const Tags: React.FC<TagsProps> = ({ onSelectTag, functionNames }) => {
  const navItems = ["All", ...functionNames];
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedFunction, setSelectedFunction] = useState("All");

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    container.style.cursor = "grabbing";
    container.style.userSelect = "none";

    const startX = e.clientX;
    const scrollLeft = container.scrollLeft;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const x = moveEvent.clientX - startX;
      container.scrollLeft = scrollLeft - x;
    };

    const handleMouseUp = () => {
      if (container) {
        container.style.cursor = "grab";
        container.style.userSelect = "auto";
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleTagClick = (tag: string) => {
    setSelectedFunction(tag);
    onSelectTag(tag);
  };

  return (
    <div className="flex items-center gap-4 w-full">
      <div
        ref={containerRef}
        className="flex-1 overflow-x-auto flex gap-3 scrollbar-hide cursor-grab"
        onMouseDown={handleMouseDown}
      >
        {navItems.map((item) => (
          <Button
            key={item}
            variant={selectedFunction === item ? "default" : "ghost"}
            className={`px-4 py-2 min-w-fit ${
              selectedFunction === item
                ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            }`}
            onClick={() => handleTagClick(item)}
            aria-label={`Filter by ${item}`}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Tags;