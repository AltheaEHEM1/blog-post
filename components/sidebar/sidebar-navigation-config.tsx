import type { IconType } from "react-icons";
import { FaBlog, FaComments, FaTags } from "react-icons/fa";

export interface NavItem {
	link: string;
	label: string;
	description: string;
	icon: IconType;
	roles: string[];
	links?: NavItem[];
}

export const NAV_CONFIG: NavItem[] = [
	{
		link: "blog_admin",
		label: "Blog",
		description: "Manage your blog posts",
		icon: FaBlog,
		roles: ["Admin"],
	},
	{
		link: "category",
		label: "Category",
		description: "Manage post categories",
		icon: FaTags,
		roles: ["Admin"],
	},
	{
		link: "comment",
		label: "Comments",
		description: "Moderate user comments",
		icon: FaComments,
		roles: ["Admin"],
	},
];
