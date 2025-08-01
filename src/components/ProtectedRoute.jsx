"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      router.replace("/onboard");
    } else {
      setIsAllowed(true);
    }
  }, [router]);

  if (!isAllowed) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center text-sm text-gray-700 dark:text-white">
        Loading
        <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-gray-500 border-t-transparent" />
      </div>
    );
  }

  return children;
};
