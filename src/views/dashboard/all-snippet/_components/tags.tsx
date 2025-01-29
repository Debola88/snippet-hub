"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";

interface TagsProps {
  onSelectTag: (tag: string) => void;
}

const Tags: React.FC<TagsProps> = ({ onSelectTag }) => {
  const navItems = [
    "All",
    "Filter function Exercises",
    "API Methods",
    "JavaScript Functions",
    "React Functions",
    "Reduce Function",
  ];

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
            onClick={() => onSelectTag(item)} // Call onSelectTag when a tag is clicked
            aria-label={`Select tag: ${item}`} // Improve accessibility
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