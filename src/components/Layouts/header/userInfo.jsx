"use client";

import { LogOutIcon, SettingsIcon } from "@/assets/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { fetchWithAuthV1 } from "@/lib/api";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);

  const logout = async () => {
    try {
      await fetchWithAuthV1("/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"),
        }),
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // TODO: When google login
      // await signOut({ callbackUrl: "/auth/sign-in" });
      window.location.href = "/auth/sign-in";
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const USER = {
    name: "Sagar Gohil",
    email: "superadmin@sagargohil.dev",
    userName: "superadmin",
    img: "/images/user/user-03.png",
  };

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="rounded align-middle outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark">
        <span className="sr-only">My Account</span>

        <figure className="flex items-center gap-3">
          <Image
            src={USER.img}
            className="size-12"
            alt={`Avatar of ${USER.name}`}
            role="presentation"
            width={200}
            height={200}
          />
        </figure>
      </DropdownTrigger>

      <DropdownContent
        className="border border-stroke bg-white shadow-md dark:border-dark-3 dark:bg-gray-dark min-[230px]:min-w-[17.5rem]"
        align="end"
      >
        <h2 className="sr-only">User information</h2>

        <Link href={"/profile"} onClick={() => setIsOpen(false)}>
          <figure className="flex items-center gap-2.5 px-5 py-3.5 hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white">
            <Image
              src={USER.img}
              className="size-12"
              alt={`Avatar for ${USER.name}`}
              role="presentation"
              width={200}
              height={200}
            />

            <figcaption className="space-y-1 text-base font-medium">
              <div className="mb-2 leading-none text-dark dark:text-white">
                {USER.name}
              </div>

              <div className="leading-none text-gray-6">@{USER.userName}</div>
            </figcaption>
          </figure>
        </Link>

        <hr className="border-[#E8E8E8] dark:border-dark-3" />

        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6 [&>*]:cursor-pointer">
          <Link
            href={"/pages/settings"}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
          >
            <SettingsIcon />

            <span className="mr-auto text-base font-medium">Settings</span>
          </Link>
        </div>

        <hr className="border-[#E8E8E8] dark:border-dark-3" />

        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6">
          <button
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
            onClick={logout}
          >
            <LogOutIcon className={cn("size-5", "text-red-500")} />

            <span className="font-medium text-red-500">Log out</span>
          </button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
