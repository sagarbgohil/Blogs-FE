import { HomeIcon, SettingsIcon, UserIcon } from "@/assets/icons";

export const NAV_DATA = [
  {
    label: "",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: HomeIcon,
        items: [],
      },
      {
        title: "Profile",
        url: "/profile",
        icon: UserIcon,
        items: [],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: SettingsIcon,
        items: [],
      },
    ],
  },
];
