// import { Button } from "@/components/ui/button";
import React from "react";
import SnippetSearchBar from "./_components/searchbar";
import Tags from "./_components/tags";
import CodeSnippetsGrid from "./_components/codesnippet";

const DashboardAllSnippetsView = () => {
  return (
    <div>
      <SnippetSearchBar />
      <div className="bg-muted/50 rounded-xl p-5 flex gap-2">
        <Tags />
      </div>
      <div>
        <CodeSnippetsGrid />
      </div>
    </div>
  );
};

export default DashboardAllSnippetsView;
