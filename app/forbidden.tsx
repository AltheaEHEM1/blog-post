"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Forbidden() {
	const pathname = usePathname();

	const adminPaths = ["/blog_admin", "/category", "/comment"];
	const isAdminPath = adminPaths.some((path) => pathname?.startsWith(path));

	const href = isAdminPath ? "/blog_admin" : "/blog";
	const containerClass = isAdminPath
		? "bg-white text-slate-900"
		: "bg-transparent text-white";
	const titleColor = isAdminPath ? "text-slate-900" : "text-white";
	const subtitleColor = isAdminPath ? "text-slate-600" : "text-slate-400";
	const buttonClass = isAdminPath
		? "border-slate-300 hover:border-rose-600 hover:bg-rose-50 text-slate-700"
		: "border-white/20 hover:border-rose-500 hover:bg-rose-500/10 text-white";
	const iconColor = isAdminPath ? "text-rose-600" : "text-rose-500";
	const iconShadow = isAdminPath
		? "drop-shadow-[0_0_15px_rgba(225,29,72,0.2)]"
		: "drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]";

	return (
		<div
			className={`flex flex-col items-center justify-center min-h-[70vh] px-6 text-center transition-colors duration-300 ${containerClass}`}
		>
			<style>{`footer { display: none !important; }`}</style>

			<motion.div
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
				className="mb-8 relative"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					className={`w-32 h-32 ${iconColor} ${iconShadow}`}
					role="img"
					aria-labelledby="forbidden-title"
				>
					<title id="forbidden-title">Access forbidden icon</title>
					<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
					<path d="M7 11V7a5 5 0 0 1 10 0v4" />
				</svg>
			</motion.div>

			<motion.h1
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2 }}
				className={`text-4xl md:text-5xl font-bold font-mono tracking-tighter mb-4 ${titleColor}`}
			>
				403 <span className={iconColor}>|</span> FORBIDDEN
			</motion.h1>

			<motion.p
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.3 }}
				className={`text-sm md:text-base font-mono max-w-md mb-8 ${subtitleColor}`}
			>
				Access denied. You lack the necessary clearance to view this sector.
			</motion.p>

			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.4 }}
			>
				<Link
					href={href}
					className={`inline-flex items-center gap-2 px-6 py-3 border font-mono text-xs uppercase tracking-widest transition-all duration-300 ${buttonClass}`}
				>
					Abort_And_Return
				</Link>
			</motion.div>
		</div>
	);
}
