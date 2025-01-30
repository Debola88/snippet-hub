import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";

interface SnippetSearchBarProps {
  onSearch: (query: string) => void;
}

const SnippetSearchBar: React.FC<SnippetSearchBarProps> = ({ onSearch }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="rounded-xl py-5 flex w-full max-w-full items-center gap-2">
      <div className="flex-1 flex items-center gap-2 rounded-full focus:ring-blue-600 bg-muted/50 dark:text-white focus-visible:ring-blue-600 px-4">
        <IoSearchOutline className="text-blue-800" />
        <Input
          type="text"
          placeholder="Search a snippet..."
          className="block text-gray-700 dark:text-white placeholder-gray-400 bg-transparent focus-visible:outline-none focus-visible:ring-none focus-visible:ring-transparent ring-none border-none focus-visible:ring-offset-0"
          onChange={handleInputChange} // Add onChange handler
        />
      </div>
      <Button
        type="button"
        className="ml-2 max-md:hidden transition-all duration-150 rounded-full text-sm bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-600/90 hover:to-blue-800/90 dark:text-white"
        size="lg"
      >
        <FaPlus />
        Snippet
      </Button>
      <Button
        type="button"
        className="ml-2 md:hidden p-[14px] rounded-full transition-all duration-150 text-sm bg-gradient-to-r from-blue-600 to-blue-800 dark:text-white hover:bg-gradient-to-r hover:from-blue-600/90 hover:to-blue-800/90"
        size="lg"
      >
        <FaPlus />
      </Button>
    </div>
  );
};

export default SnippetSearchBar;