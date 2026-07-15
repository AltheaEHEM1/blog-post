"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function BlogPageContent({
	category,
	initialQuery,
}: {
	category?: string;
	initialQuery: string;
}) {
	const router = useRouter();
	const [query, setQuery] = useState(initialQuery);

	useEffect(() => {
		const timer = setTimeout(() => {
			const params = new URLSearchParams();
			if (category) params.set("category", category);
			if (query.trim()) params.set("q", query.trim());
			router.replace(`/blog?${params.toString()}`, { scroll: false });
		}, 300);
		return () => clearTimeout(timer);
	}, [query, category, router]);

	return (
		<div
			className="relative min-h-110 flex flex-col justify-center px-4 bg-center bg-cover bg-no-repeat overflow-hidden mb-8"
			style={{
				backgroundImage: "url('/assets/bg_image.png')",
				backgroundPosition: "50% 70%",
			}}
		>
			{/* Standardized gradient overlay */}
			<div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/90 z-0" />

			<div className="relative z-10 flex flex-col items-center">
				<div className="text-center mb-8 space-y-2">
					<h1 className="font-mono text-4xl md:text-5xl font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
						&lt;<span className="text-cyan-400">AAA</span>.blog_post/&gt;
					</h1>
					<p className="text-slate-400 font-mono text-xs uppercase tracking-[0.2em]">
						Explore our latest updates and thoughts
					</p>
				</div>

				<div className="relative w-full max-w-md group">
					{/* Search Icon */}
					<Search
						className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500/70 group-focus-within:text-white transition-colors z-10"
						size={18}
					/>

					<input
						type="search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search posts..."
						className="w-full pl-10 pr-4 py-2.5 text-sm 
                   border border-cyan-500/50 bg-slate-900/60 text-cyan-100 
                   rounded-sm backdrop-blur-sm outline-none transition-all duration-300
                   focus:border-white focus:shadow-[0_0_8px_rgba(255,255,255,0.2)]"
					/>
				</div>
			</div>
		</div>
	);
}
