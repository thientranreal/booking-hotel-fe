"use client";

import SuccessPage from "@/components/ui/SuccessPage";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  // Hello
  return <SuccessPage onNext={() => router.push("/")} />;
}
