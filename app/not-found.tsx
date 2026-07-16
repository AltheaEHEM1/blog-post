"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function NotFound() {
	const pathname = usePathname();
	
	const adminPaths = ["/blog_admin", "/category", "/comment"];
	const isAdminPath = adminPaths.some((path) => pathname?.startsWith(path));

	// Dynamic values based on context
	const href = isAdminPath ? "/blog_admin" : "/blog";
	const containerClass = isAdminPath ? "bg-white text-slate-900" : "bg-transparent text-white";
	const titleColor = isAdminPath ? "text-slate-900" : "text-white";
	const subtitleColor = isAdminPath ? "text-slate-600" : "text-slate-400";
	const buttonClass = isAdminPath
		? "border-slate-300 hover:border-cyan-600 hover:bg-cyan-50 text-slate-700"
		: "border-white/20 hover:border-cyan-400 hover:bg-cyan-400/10 text-white";
	const iconColor = isAdminPath ? "text-cyan-600" : "text-cyan-400";
	const iconShadow = isAdminPath 
		? "drop-shadow-[0_0_15px_rgba(8,145,178,0.2)]" 
		: "drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]";

	return (
		<div className={`flex flex-col items-center justify-center min-h-[70vh] px-6 text-center transition-colors duration-300 ${containerClass}`}>
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
				>
					<circle cx="12" cy="12" r="10" />
					<line x1="12" y1="8" x2="12" y2="12" />
					<line x1="12" y1="16" x2="12.01" y2="16" />
                    <path d="M9 12h.01M15 12h.01" />
                    <path d="M9 16c1.5 1 4.5 1 6 0" />
				</svg>
			</motion.div>

			<motion.h1 
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2 }}
				className={`text-4xl md:text-5xl font-bold font-mono tracking-tighter mb-4 ${titleColor}`}
			>
				404 <span className={iconColor}>|</span> NOT_FOUND
			</motion.h1>

			<motion.p 
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.3 }}
				className={`text-sm md:text-base font-mono max-w-md mb-8 ${subtitleColor}`}
			>
				The requested resource could not be found. It might have been moved or deleted.
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
					Return_To_Base
				</Link>
			</motion.div>
		</div>
	);
}
