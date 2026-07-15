"use client";
import Link from "next/link";

interface Category {
	id: string;
	name: string;
	slug: string;
}

export default function BlogCategoryFilter({
	categories,
	category,
	query,
}: {
	categories: Category[];
	category?: string;
	query: string;
}) {
	const buildHref = (catSlug?: string) => {
		const params = new URLSearchParams();
		if (catSlug) params.set("category", catSlug);
		if (query) params.set("q", query);
		return `/blog${params.toString() ? `?${params.toString()}` : ""}`;
	};

	return (
		<div className="flex flex-wrap gap-2 mb-8 justify-center">
			<Link
				href={buildHref()}
				className={`px-4 py-1.5 text-xs font-mono border rounded-sm ${!category ? "bg-cyan-600 text-white" : "border-slate-700 text-slate-400"}`}
			>
				All
			</Link>
			{categories.map((cat) => (
				<Link
					key={cat.id}
					href={buildHref(cat.slug)}
					className={`px-4 py-1.5 text-xs font-mono border rounded-sm ${category === cat.slug ? "bg-cyan-600 text-white" : "border-slate-700 text-slate-400"}`}
				>
					{cat.name}
				</Link>
			))}
		</div>
	);
}
