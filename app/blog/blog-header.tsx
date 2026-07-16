"use client";

import { animate, motion } from "framer-motion";
import { useEffect, useState } from "react";
import BlogSearchBar from "@/app/blog/blog-search-bar";

interface BlogHeaderProps {
	category?: string;
	initialQuery: string;
}

export default function BlogHeader({
	category,
	initialQuery,
}: BlogHeaderProps) {
	const [h1Text, setH1Text] = useState("");

	const h1Content = "<AAA.blog_post/>";

	useEffect(() => {
		const h1Anim = animate(0, h1Content.length, {
			duration: 1.5,
			ease: "linear",
			onUpdate: (latest) => setH1Text(h1Content.slice(0, Math.round(latest))),
		});
		return () => {
			h1Anim.stop();
		};
	}, []);

	const renderStyledH1 = (text: string) => {
		if (!text.includes("AAA")) {
			return <>{text}</>;
		}
		const parts = text.split("AAA");
		return (
			<>
				{parts[0]}
				<span className="text-cyan-400">AAA</span>
				{parts[1] || ""}
			</>
		);
	};

	return (
		<motion.header
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="sticky top-0 z-50 w-full bg-slate-950/85 backdrop-blur-md border-b border-white/10 py-3 px-4 shadow-lg"
		>
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 max-w-7xl mx-auto">
				<h1 className="font-mono text-sm sm:text-base md:text-lg font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] inline-flex items-center">
					{renderStyledH1(h1Text)}
					<motion.span
						animate={{ opacity: [0, 1, 0] }}
						transition={{ repeat: Infinity, duration: 0.8 }}
						className="text-cyan-400 ml-0.5"
					>
						|
					</motion.span>
				</h1>

				<div className="w-full sm:w-auto">
					<BlogSearchBar category={category} initialQuery={initialQuery} />
				</div>
			</div>
		</motion.header>
	);
}
