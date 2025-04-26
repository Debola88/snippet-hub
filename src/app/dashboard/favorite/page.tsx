import DashboardFavoriteView from "@/views/dashboard/favorite";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

const DashboardFavoritePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardFavoriteView />
    </Suspense>
  );
};

export default DashboardFavoritePage;
