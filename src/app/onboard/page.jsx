"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Choice from "@/components/Auth/Choice";
import Login from "@/components/Auth/Login";
import Signup from "@/components/Auth/Signup";
import Otp from "@/components/Auth/Otp";

export default function AuthPage() {
  const [isClient, setIsClient] = useState(false);
  const [mode, setModeState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authMode") || "choice";
    }
    return "choice";
  });

  const [email, setEmail] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const setMode = (newMode) => {
    setModeState(newMode);
    localStorage.setItem("authMode", newMode);
  };

  useEffect(() => {
    setIsClient(true);
    const savedMode = localStorage.getItem("authMode") || "choice";
    setModeState(savedMode);
  }, []);

  if (!isClient) return null; // prevent mismatched SSR/CSR

  const renderComponent = {
    choice: <Choice setMode={setMode} />,
    login: <Login setMode={setMode} />,
    signup: (
      <Signup
        setMode={setMode}
        setEmail={setEmail}
        setResendTimer={setResendTimer}
      />
    ),
    otp: (
      <Otp
        email={email}
        setMode={setMode}
        setResendTimer={setResendTimer}
        resendTimer={resendTimer}
      />
    ),
  }[mode];

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-full max-w-screen-xl overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
        {/* Left */}
        <div className="flex w-full flex-col justify-center px-6 py-30 md:w-1/2 md:p-12">
          {renderComponent}
        </div>

        {/* Right */}
        <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-indigo-600 to-purple-700 p-10 text-white md:flex">
          <div>
            <h1 className="text-3xl font-bold leading-tight">
              Join thousands of developers
            </h1>
            <p className="mt-4 text-sm text-white/80">
              Share knowledge, grow your brand, and build in public.
            </p>
          </div>
          <Image
            src="/images/grids/grid-02.svg"
            alt="Graphic"
            width={400}
            height={300}
            className="self-center pt-8 opacity-60 2xl:pt-20"
          />
        </div>
      </div>
    </div>
  );
}
