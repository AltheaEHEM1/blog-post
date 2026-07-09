"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react"; // Removed unused React import

const navItems = [{ name: "Blog", href: "/blog" }];

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	return (
		<nav className="w-full">
			<div className="flex justify-between items-center p-4">
				<Link
					href="/"
					className="focus:outline-none select-none cursor-pointer group"
					aria-label="Home"
				>
					<span className="inline-block font-sans text-lg tracking-widest uppercase">
						<span>&lt;</span>
						<span className="mx-0.5">AAJ.ASIS</span>
						<span>/&gt;</span>
					</span>
				</Link>

				<div className="hidden md:flex items-center">
					<ul className="flex items-center space-x-1">
						{navItems.map((item) => {
							const isActive =
								item.href === "/"
									? pathname === "/"
									: pathname.startsWith(item.href);
							return (
								<li key={item.name}>
									<Link
										href={item.href}
										className={`px-4 py-2.5 text-xs tracking-widest uppercase rounded-xl transition-all duration-300 ${
											isActive
												? "bg-gray-200 text-teal-600"
												: "text-slate-600 hover:text-teal-600 hover:bg-gray-100"
										}`}
									>
										{item.name}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>

			<button
				type="button"
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-gray-100 transition-colors cursor-pointer"
				aria-expanded={isMenuOpen}
				aria-label="Toggle menu"
			>
				{/* Added <title> for accessibility */}
				<svg className="h-6 w-6 fill-none stroke-current" viewBox="0 0 24 24">
					<title>Toggle Menu</title>
					{isMenuOpen ? (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					) : (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					)}
				</svg>
			</button>

			<div
				className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-64 border-t" : "max-h-0"}`}
			>
				<ul className="px-4 py-3 space-y-1">
					{navItems.map((item) => (
						<li key={item.name}>
							<Link
								href={item.href}
								onClick={() => setIsMenuOpen(false)}
								className="block px-4 py-2.5 text-sm font-bold tracking-widest uppercase rounded-xl"
							>
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
