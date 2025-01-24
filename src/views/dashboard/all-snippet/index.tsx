import { Button } from "@/components/ui/button";
import React from "react";
import SnippetSearchBar from "./_components/searchbar";
import Tags from "./_components/tags";

const DashboardAllSnippetsView = () => {
  const buttonLabels = [
    "All",
    "Filter function Exercises",
    "API Methods",
    "JavaScript Functions",
    "React Functions",
    "Reduce Function",
  ];

  return (
    <>
      {/* Search Bar */}
      <SnippetSearchBar />

      {/* Tags and Buttons Section */}
      <section className="bg-muted/50 rounded-xl p-5 flex flex-wrap w-full gap-2">
        {/* Tags */}
        <Tags />

        {/* Buttons */}
        {buttonLabels.map((label, index) => (
          <Button
            key={index}
            variant="ghost"
            className="max-w-max flex-1 text-gray-700 hover:text-white hover:bg-gradient-to-r from-blue-600 to-blue-800 dark:text-white"
          >
            {label}
          </Button>
        ))}
      </section>
    </>
  );
};

export default DashboardAllSnippetsView;
