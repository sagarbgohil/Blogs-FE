import darkLogo from "@/assets/logos/dark.png";
import logo from "@/assets/logos/main.png";
import Image from "next/image";

export function Logo() {
  return (
    <div className="items-center lg:flex">
      <Image
        src={darkLogo}
        width={40}
        height={200}
        className="dark:hidden"
        alt="Sagar - Admin logo"
        role="presentation"
      />
      <Image
        src={logo}
        width={40}
        height={200}
        className="hidden dark:block"
        alt="Sagar - Admin logo"
        role="presentation"
      />

      {/* Add "Sagar | Admin text" */}
      <div className="hidden pl-3 lg:block">
        <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
          Sagar
        </h1>
        <p className="font-medium">Admin</p>
      </div>
    </div>
  );
}
