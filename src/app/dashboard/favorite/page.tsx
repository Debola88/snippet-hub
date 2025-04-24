import DashboardFavoriteView from "@/views/dashboard/favorite";
import React, { Suspense } from "react";
export const dynamic = "force-dynamic";

const DashboardFavoritePage = () => {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardFavoriteView
        onSnippetSelect={(snippet) => console.log("Selected:", snippet)}
      />
    </Suspense>
  );
};

export default DashboardFavoritePage;
