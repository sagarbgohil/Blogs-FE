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

// export const metadata = {
//   title: "Admin | Sagar Gohil",
//   favicon: "/favicon.ico",
//   description:
//     "Admin dashboard for Sagar Gohil, a software engineer and web developer.",
//   keywords: "Sagar Gohil, Software Engineer, Web Developer, Admin Dashboard",
//   authors: [
//     {
//       name: "Sagar Gohil",
//       url: "https://sagargohil.dev",
//     },
//   ],
//   creator: "Sagar Gohil",
//   publisher: "Sagar Gohil",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith("/auth");

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />

          {isAuthPage ? (
            <main className="min-h-screen p-4 md:p-6 2xl:p-10">{children}</main>
          ) : (
            <ProtectedRoute>
              <div className="flex min-h-screen">
                <Sidebar />

                <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
                  <Header />

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
