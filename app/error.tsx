"use client";

import { motion } from "framer-motion";

export default function AppError({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
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
					className="w-32 h-32 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]"
				>
					<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
					<line x1="12" y1="9" x2="12" y2="13" />
					<line x1="12" y1="17" x2="12.01" y2="17" />
				</svg>
			</motion.div>

			<motion.h1 
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2 }}
				className="text-4xl md:text-5xl font-bold font-mono tracking-tighter text-white mb-4"
			>
				500 <span className="text-amber-500">|</span> SYSTEM_ERROR
			</motion.h1>

			<motion.p 
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.3 }}
				className="text-slate-400 text-sm md:text-base font-mono max-w-md mb-8"
			>
				{error.message || "An unexpected anomaly occurred in the system."}
			</motion.p>

			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.4 }}
			>
				<button 
					type="button"
					onClick={reset}
					className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-amber-500 hover:bg-amber-500/10 text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
				>
					Reboot_Sequence
				</button>
			</motion.div>
		</div>
	);
}
