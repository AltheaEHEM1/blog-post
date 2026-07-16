"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function buildHref(category?: string, query?: string) {
	const params = new URLSearchParams();
	if (category) params.set("category", category);
	if (query?.trim()) params.set("q", query.trim());
	const qs = params.toString();
	return qs ? `/blog?${qs}` : "/blog";
}

export default function BlogSearchBar({
	category,
	initialQuery,
}: {
	category?: string;
	initialQuery: string;
}) {
	const router = useRouter();
	const [query, setQuery] = useState(initialQuery ?? "");

	// Debounced route update when search query changes
	useEffect(() => {
		const timer = setTimeout(() => {
			const trimmed = query.trim();
			const initial = initialQuery?.trim() ?? "";
			if (trimmed === initial) return;
			router.replace(buildHref(category, trimmed), { scroll: false });
		}, 300);
		return () => clearTimeout(timer);
	}, [query, category, initialQuery, router]);

	return (
		<div className="relative w-full sm:w-48 md:w-56 group">
			<Search
				className="absolute left-2 top-1/2 -translate-y-1/2 text-cyan-500/70 group-focus-within:text-white transition-colors z-10"
				size={14}
			/>
			<input
				type="search"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search..."
				className="w-full pl-6 pr-2 py-1 text-xs border border-cyan-500/50 bg-slate-900/60 text-cyan-100 rounded-sm backdrop-blur-sm outline-none transition-all duration-300 focus:border-white focus:shadow-[0_0_6px_rgba(255,255,255,0.2)]"
			/>
		</div>
	);
}