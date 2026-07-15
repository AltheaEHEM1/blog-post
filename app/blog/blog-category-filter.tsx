"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";

interface Category {
	id: string;
	name: string;
	slug: string;
}

function buildHref(category?: string, query?: string) {
	const params = new URLSearchParams();
	if (category) params.set("category", category);
	if (query?.trim()) params.set("q", query.trim());
	const qs = params.toString();
	return qs ? `/blog?${qs}` : "/blog";
}

export default function BlogCategoryFilter({
	categories,
	category,
	initialQuery,
}: {
	categories: Category[];
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

	const chipClass = (active: boolean) =>
		`px-4 py-2 text-[11px] sm:text-xs font-mono border rounded-sm transition-colors whitespace-nowrap md:whitespace-normal md:break-words md:text-left ${active
			? "bg-cyan-600 text-white border-cyan-600"
			: "border-slate-700 text-slate-400 hover:border-cyan-500/60 hover:text-cyan-400"
		}`;

	return (
		<div className="md:sticky md:top-24 md:self-start w-full">
			{/* Search Input wrapper */}
			<div className="relative w-full mb-4 sm:mb-6 group">
				<Search
					className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500/70 group-focus-within:text-white transition-colors z-10"
					size={16}
				/>
				<input
					type="search"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search posts..."
					className="w-full pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-cyan-500/50 bg-slate-900/60 text-cyan-100 rounded-sm backdrop-blur-sm outline-none transition-all duration-300 focus:border-white focus:shadow-[0_0_8px_rgba(255,255,255,0.2)]"
				/>
			</div>

			<h2 className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 mb-2 sm:mb-4">
				Categories
			</h2>

			{/* Scrollable list for smaller viewports, stacked list for larger screens */}
			<div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-thin scrollbar-thumb-slate-700">
				<Link
					href={buildHref(undefined, query)}
					className={`${chipClass(!category)} md:w-full`}
				>
					All
				</Link>
				{categories.map((cat) => (
					<Link
						key={cat.id}
						href={buildHref(cat.slug, query)}
						className={`${chipClass(category === cat.slug)} md:w-full`}
					>
						{cat.name}
					</Link>
				))}
			</div>
		</div>
	);
}