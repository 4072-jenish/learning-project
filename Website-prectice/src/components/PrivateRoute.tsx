"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

interface Props {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const auth = isAuthenticated();
    if (!auth) {
      router.push("/login");
    } else {
      setIsAuth(true);
    }

  }, [router]);

  if (!isMounted) {
    return null;
  }

  if (!isAuth) {
    return null;
  }

  return children;
}