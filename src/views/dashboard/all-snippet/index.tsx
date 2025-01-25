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
      <div className="relative w-[100%]">

      </div>
      <section className="bg-muted/50 rounded-xl p-5 flex w-full gap-2 absolute">
        <Tags />
      </section>
    </>
  );
};

export default DashboardAllSnippetsView;
