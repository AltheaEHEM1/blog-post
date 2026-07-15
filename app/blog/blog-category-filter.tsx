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
		// Changed to flex-col to stack the H1 on top of the links
		<div className="flex flex-col items-center gap-4 mb-8">
			<h1 className="font-mono text-md uppercase tracking-widest text-white">
				Categories
			</h1>

			{/* Links container stays flex-wrap so they flow nicely */}
			<div className="flex flex-wrap gap-2 justify-center">
				<Link
					href={buildHref()}
					className={`px-4 py-1.5 text-xs font-mono border rounded-sm transition-colors ${!category
							? "bg-cyan-600 text-white border-cyan-600"
							: "border-slate-700 text-slate-400 hover:border-slate-500"
						}`}
				>
					All
				</Link>
				{categories.map((cat) => (
					<Link
						key={cat.id}
						href={buildHref(cat.slug)}
						className={`px-4 py-1.5 text-xs font-mono border rounded-sm transition-colors ${category === cat.slug
								? "bg-cyan-600 text-white border-cyan-600"
								: "border-slate-700 text-slate-400 hover:border-slate-500"
							}`}
					>
						{cat.name}
					</Link>
				))}
			</div>
		</div>
	);
}
