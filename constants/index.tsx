import { HiHome } from "react-icons/hi";
import { CiUser } from "react-icons/ci";
import { HiMagnifyingGlass } from "react-icons/hi2";

export const linkData = [
	{
		name: "Home",
		href: "/home",
		icon: <HiHome size="100%" />,
	},

	{
		name: "Explore",
		href: "/explore",
		icon: <HiMagnifyingGlass size="100%" />,
	},
	{
		name: "Profile",
		href: "/profile",
		icon: <CiUser size="100%" />,
	},
];

export const BASE_URL = "https://forum-api.dicoding.dev/v1";
