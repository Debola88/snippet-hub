import { Suspense } from "react";
import DashboardAllSnippetsView from "@/views/dashboard/all-snippet";

export const dynamic = "force-dynamic";


const DashboardAllSnippetPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardAllSnippetsView />
    </Suspense>
  );
};

export default DashboardAllSnippetPage;
