"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import UserChipDropdown from "../sidebar/chip-dropdown";

export interface BreadcrumbItem {
	href: string;
	label: string;
	isLast: boolean;
}

interface SidebarHeaderProps {
	onMenuClick: () => void;
	handleLogout?: () => void;
	blogHref?: string;
}

export default function SidebarHeader({
	onMenuClick,
	handleLogout = () => {},
	blogHref = "/blog_admin",
}: SidebarHeaderProps) {
	return (
		// Added font-mono to the header to apply to all children
		<header className="bg-white border-b border-slate-200 px-5 py-3 font-mono">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					{/* Mobile Menu Toggle */}
					<button
						type="button"
						className="lg:hidden flex p-2 rounded-lg hover:bg-slate-100 transition-colors"
						onClick={onMenuClick}
						aria-label="Toggle Navigation"
					>
						<Menu className="h-6 w-6 text-slate-700" />
					</button>

					{/* Breadcrumbs */}
					<nav
						aria-label="Breadcrumb"
						className="hidden sm:flex items-center text-xs text-slate-600 uppercase tracking-wide"
					>
						<Link
							href={blogHref}
							className="hover:text-black transition-colors"
						>
							Blog
						</Link>
					</nav>
				</div>

				{/* Right Section */}
				<div className="flex items-center not-odd:text-xs">
					<UserChipDropdown
						onLogout={handleLogout}
						noBackground
						hideLabelsOnMobile
					>
						<span>Blog Admin</span>
					</UserChipDropdown>
				</div>
			</div>
		</header>
	);
}
