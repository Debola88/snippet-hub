"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";

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

  interface SnippetSearchBarProps {
    onSearch: (query: string) => void; // Define the onSearch prop
  }
  const containerRef = useRef<HTMLDivElement>(null);

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
      container.style.cursor = "grab";
      container.style.userSelect = "auto";

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="max-w-full overflow-x-auto flex gap-3 scrollbar-hide cursor-grab"
        onMouseDown={handleMouseDown}
      >
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
      <Button className="">Tags</Button>
    </>
  );
};

export default Tags;
