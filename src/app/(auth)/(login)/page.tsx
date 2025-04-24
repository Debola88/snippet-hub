import AuthForm from "@/views/auth/login";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading snippets…</div>}>
      <AuthForm />
    </Suspense>
  );
};

export default LoginPage;
