"use client";

import "@/css/satoshi.css";
import "@/css/style.css";

import { Sidebar } from "@/components/Layouts/sidebar";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/components/Layouts/header";
import NextTopLoader from "nextjs-toploader";
import { Providers } from "./providers";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith("/auth");
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />
          <Toaster
            position="top-right"
            removeDelay={100}
            toastOptions={{
              className:
                "bg-white text-black dark:bg-[#1F2937] dark:text-white shadow-md rounded-md",
              duration: 3000,
              style: {
                fontSize: "14px",
                padding: "12px 16px",
              },
              success: {
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#ffffff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#ffffff",
                },
              },
            }}
          />
          <Header isAuthPage={isAuthPage} isAdminPage={isAdminPage} />

          {isAuthPage ? (
            <main className="min-h-screen p-4 md:p-6 2xl:p-10">{children}</main>
          ) : (
            <ProtectedRoute>
              <div className="flex min-h-screen">
                <Sidebar isAdminPage={isAdminPage} />

                <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
                  <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                    {children}
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          )}
        </Providers>
      </body>
    </html>
  );
}
