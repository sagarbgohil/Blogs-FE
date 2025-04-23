"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.replace("/auth/sign-in");
      setIsChecking(false);
    } else {
      setIsChecking(false);
    }
  }, []);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading
        <span className="m-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent p-2 dark:border-t-transparent" />
      </div>
    );
  }

  return children;
};
