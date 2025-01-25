import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SnippetSearchBar = () => {
  return (
    <div>
      <div className="rounded-xl py-5 flex w-full max-w-full items-center gap-2 ">
        <div className="relative w-full">
          <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-800" />
          <Input
            type="text"
            placeholder="Search a snippet..."
            className="block w-full focus-visible:ring-blue-600  pl-12 pr-4 text-gray-700 bg-muted/50 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-blue-600  rounded-full"
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
    </div>
  );
};

export default SnippetSearchBar;
