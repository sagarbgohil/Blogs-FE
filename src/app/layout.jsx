"use client";

import "@/css/satoshi.css";
import "@/css/style.css";

import { Sidebar } from "@/components/Layouts/sidebar";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/components/Layouts/header";
import NextTopLoader from "nextjs-toploader";
import { Providers } from "./providers";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/Layouts/footer.js";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith("/onboard");
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-white text-black dark:bg-gray-dark dark:text-white">
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

          <div className="flex flex-1 bg-gray-100 dark:bg-[#020d1a]">
            {isAuthPage ? (
              <main className="isolate mx-auto w-full max-w-screen-2xl flex-1 p-4 2xl:p-10">
                {children}
              </main>
            ) : (
              <ProtectedRoute>
                <Sidebar isAdminPage={isAdminPage} />
                <main className="isolate mx-auto w-full max-w-screen-2xl flex-1 p-4 2xl:p-10">
                  {children}
                </main>
              </ProtectedRoute>
            )}
          </div>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
