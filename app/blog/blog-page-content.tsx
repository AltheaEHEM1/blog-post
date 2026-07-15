"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";

export default function BlogPageContent({
	category,
	initialQuery,
}: {
	category?: string;
	initialQuery: string;
}) {
	const router = useRouter();
	const [query, setQuery] = useState(initialQuery);

	// 1. We use standard React state to hold the rendered string
	const [h1Text, setH1Text] = useState("");
	const [pText, setPText] = useState("");

	const h1Content = "<AAA.blog_post/>";
	const pContent = "Explore our latest updates and thoughts";

	useEffect(() => {
		// 2. Animate and update state instead of MotionValues directly in JSX
		animate(0, h1Content.length, {
			duration: 1.5,
			ease: "linear",
			onUpdate: (latest) => setH1Text(h1Content.slice(0, Math.round(latest))),
		});

		animate(0, pContent.length, {
			duration: 1.5,
			delay: 1.5,
			ease: "linear",
			onUpdate: (latest) => setPText(pContent.slice(0, Math.round(latest))),
		});
	}, []);

	// 3. Helper to apply color to "AAA"
	const renderStyledH1 = (text: string) => {
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
		<div className="relative min-h-110 flex flex-col justify-center px-4 bg-center bg-cover bg-no-repeat overflow-hidden mb-8"
			style={{ backgroundImage: "url('/assets/bg_image.png')", backgroundPosition: "50% 70%" }}
		>
			<div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/90 z-0" />

			<div className="relative z-10 flex flex-col items-center">
				<div className="text-center space-y-2 min-h-[120px]">
					<h1 className="font-mono text-4xl md:text-5xl font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
						{renderStyledH1(h1Text)}
						<motion.span
							animate={{ opacity: [0, 1, 0] }}
							transition={{ repeat: Infinity, duration: 0.8 }}
							className="text-cyan-400 ml-1"
						>
							|
						</motion.span>
					</h1>
					<p className="text-slate-400 font-mono text-xs uppercase tracking-[0.2em] h-4">
						{pText}
					</p>
				</div>

				<div className="relative w-full max-w-md group">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500/70 group-focus-within:text-white transition-colors z-10" size={18} />
					<input
						type="search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search posts..."
						className="w-full pl-10 pr-4 py-2.5 text-sm border border-cyan-500/50 bg-slate-900/60 text-cyan-100 rounded-sm backdrop-blur-sm outline-none transition-all duration-300 focus:border-white focus:shadow-[0_0_8px_rgba(255,255,255,0.2)]"
					/>
				</div>
			</div>
		</div>
	);
}