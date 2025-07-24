import darkLogo from "@/assets/logos/dark.png";
import logo from "@/assets/logos/main.png";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ showMobile = false }) {
  return (
    <div className="flex items-center">
      <Image
        src={darkLogo}
        width={40}
        height={40}
        className="dark:hidden"
        alt="Homiya - logo"
        role="presentation"
      />
      <Image
        src={logo}
        width={40}
        height={40}
        className="hidden dark:block"
        alt="Homiya - logo"
        role="presentation"
      />

      <div
        className={cn(
          "ml-2 text-heading-5 font-bold text-dark dark:text-white",
          showMobile ? "block" : "hidden sm:block",
        )}
      >
        <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
          Homiya
        </h1>
      </div>
    </div>
  );
}
