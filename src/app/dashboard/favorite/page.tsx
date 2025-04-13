'use client'
import DashboardFavoriteView from "@/views/dashboard/favorite";
import React from "react";

const DashboardFavoritePage = () => {
  return <DashboardFavoriteView onSnippetSelect={(snippet) => console.log("Selected:", snippet)} />
};

export default DashboardFavoritePage;
