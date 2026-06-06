"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

interface Props {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: Props) {
  const router = useRouter();
  useEffect(() => {
    const auth = isAuthenticated();
    if (auth) {
      router.push("/blogs");
    }
  }, [router]);

  if (isAuthenticated()) {
    return null;
  }

  return children;
}