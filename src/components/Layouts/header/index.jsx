"use client";

import { MenuIcon } from "@/assets/icons";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebarContext";
import { ThemeToggleSwitch } from "./themeToggleSwitch";
import { UserInfo } from "./userInfo";
import { Logo } from "@/components/logo";

export function Header({ isAdminPage = false, isAuthPage = false }) {
  const { toggleSidebar, isMobile } = useSidebarContext();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-stroke bg-white px-2 py-2 shadow-1 dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10">
      <div className="flex items-center gap-4">
        {(isAdminPage || isMobile) && (
          <button
            onClick={toggleSidebar}
            className="mr-2 rounded-lg border px-1.5 py-1 dark:border-stroke-dark dark:bg-[#020D1A] hover:dark:bg-[#FFFFFF1A]"
          >
            <MenuIcon />
            <span className="sr-only">Toggle Sidebar</span>
          </button>
        )}
        <div className="flex items-center gap-6">
          <Link href={"/"} className="flex items-center">
            <Logo />
          </Link>

          {!isAdminPage && (
            <nav className="hidden items-center gap-4 text-sm font-medium text-gray-600 dark:text-gray-300 sm:flex">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <Link href="/blogs" className="hover:text-primary">
                Blogs
              </Link>
            </nav>
          )}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4">
        <ThemeToggleSwitch />
        {!isAuthPage && <UserInfo />}
      </div>
    </header>
  );
}
