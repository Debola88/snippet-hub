'use client'
import { useRouter } from "next/navigation";
export const dynamic = "force-dynamic";

export default function Home() {
  const router = useRouter();

  router.push("/");
}
