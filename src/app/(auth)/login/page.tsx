import AuthForm from "@/views/auth/login";
import { Suspense } from "react";
export const dynamic = "force-dynamic";


const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading snippets…</div>}>
      <AuthForm />
    </Suspense>
  );
};

export default LoginPage;
