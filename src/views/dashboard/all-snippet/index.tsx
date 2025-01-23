import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const DashboardAllSnippetsView = () => {
  return (
    <>
      <div className="rounded-xl p-5 flex w-full max-w-full items-center gap-2 ">
        <Input
          type="text"
          placeholder="Search a snippets..."
          className="block text-gray-700 bg-muted/50 dark:text-white outline-none placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-full w-full"
        />
        <Button
          type="button"
          className="ml-2 rounded-full text-sm bg-gradient-to-r from-blue-600 to-blue-800 dark:text-white"
          size="lg"
        >
          <FaPlus />
          Snippet
        </Button>
      </div>
      <div className="bg-muted/50 rounded-xl p-5 flex flex-wrap w-full">
        {/* <Button variant={"ghost"} className="max-w-max text-gray-700 hover:text-white hover:bg-gradient-to-r from-blue-600 to-blue-800 dark:text-white">
          All
        </Button> */}
        <Button
          variant={"ghost"}
          className="max-w-max flex-1 text-gray-700 hover:text-white hover:bg-gradient-to-r from-blue-600 to-blue-800 dark:text-white"
        >
          All
        </Button>
        <Button
          variant={"ghost"}
          className="max-w-max flex-1 text-gray-700 hover:text-white hover:bg-gradient-to-r from-blue-600 to-blue-800 dark:text-white"
        >
          Filter function Exercises
        </Button>
        <Button
          variant={"ghost"}
          className="max-w-max flex-1 text-gray-700 hover:text-white hover:bg-gradient-to-r from-blue-600 to-blue-800 dark:text-white"
        >
          API Methods
        </Button>
        <Button
          variant={"ghost"}
          className="max-w-max flex-1 text-gray-700 hover:text-white hover:bg-gradient-to-r from-blue-600 to-blue-800 dark:text-white"
        >
          JavaScript Functions
        </Button>
        <Button
          variant={"ghost"}
          className="max-w-max flex-1 text-gray-700 hover:text-white hover:bg-gradient-to-r from-blue-600 to-blue-800 dark:text-white"
        >
          React Functions
        </Button>
        <Button
          variant={"ghost"}
          className="max-w-max flex-1 text-gray-700 hover:text-white hover:bg-gradient-to-r from-blue-600 to-blue-800 dark:text-white"
        >
          Reduce Function
        </Button>
      </div>
    </>
  );
};

export default DashboardAllSnippetsView;
