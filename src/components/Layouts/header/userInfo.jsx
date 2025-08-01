"use client";

import { LogOutIcon, SettingsIcon } from "@/assets/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Notification } from "./notification";
import { fetchProxyAuthV1 } from "@/lib/proxy";
import { decryptText } from "@/utils/encryption";

export function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const logout = async () => {
    try {
      await fetchProxyAuthV1("/auth/logout", {
        method: "POST",
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"),
        }),
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // TODO: When google login
      // await signOut({ callbackUrl: "/auth/sign-in" });
      window.location.href = "/onboard";
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    const data = async () => {
      return await decryptText(localStorage.getItem("user"));
    };

    data().then((storedUser) => {
      if (storedUser) {
        try {
          setUser({
            name: JSON.parse(storedUser).name || "Guest",
            email: JSON.parse(storedUser).email || "guest@example.com",
            userName: JSON.parse(storedUser).userName || "guest",
            profile:
              JSON.parse(storedUser).profile || "/images/user/user-03.png",
          });
        } catch {
          setUser(null);
        }
      }
    });
  }, []);

  return (
    <>
      {user && <Notification />}
      <div className="shrink-0">
        <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
          <DropdownTrigger className="rounded outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark">
            <span className="sr-only">Account</span>
            <figure className="flex items-center gap-2">
              <Image
                src={user?.profile || "/images/user/user-03.png"}
                alt={user?.name || "Guest"}
                className="size-10 rounded-full object-cover"
                width={40}
                height={40}
              />
            </figure>
          </DropdownTrigger>

          <DropdownContent
            className="border border-stroke bg-white shadow-md dark:border-dark-3 dark:bg-gray-dark min-[230px]:min-w-[17.5rem]"
            align="end"
          >
            {user ? (
              <>
                <Link href="/profile" onClick={() => setIsOpen(false)}>
                  <figure className="flex items-center gap-2.5 px-5 py-3.5 hover:bg-gray-2 dark:hover:bg-dark-3">
                    <Image
                      src={user.profile}
                      alt={user.name}
                      className="size-12 rounded-full object-cover"
                      width={48}
                      height={48}
                    />
                    <figcaption className="space-y-0.5">
                      <div className="font-medium text-dark dark:text-white">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-6">
                        @{user.userName}
                      </div>
                    </figcaption>
                  </figure>
                </Link>

                <hr className="border-[#E8E8E8] dark:border-dark-3" />

                <div className="p-2">
                  <Link
                    href="/pages/settings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-gray-2 dark:hover:bg-dark-3"
                  >
                    <SettingsIcon />
                    <span>Settings</span>
                  </Link>
                </div>

                <hr className="border-[#E8E8E8] dark:border-dark-3" />

                <div className="p-2">
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-red-500 hover:bg-gray-2 dark:hover:bg-dark-3"
                  >
                    <LogOutIcon className="size-5" />
                    <span>Log out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-3 p-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  You are not signed in.
                </p>
                <Link
                  href="/onboard"
                  className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                  Sign In
                </Link>
              </div>
            )}
          </DropdownContent>
        </Dropdown>
      </div>
    </>
  );
}
