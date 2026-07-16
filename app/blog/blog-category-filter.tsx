"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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
	const chipClass = (active: boolean) =>
		`px-4 py-2 text-[11px] sm:text-xs font-mono border rounded-sm transition-colors whitespace-nowrap md:whitespace-normal md:break-words md:text-left ${
			active
				? "bg-cyan-600 text-white border-cyan-600"
				: "border-slate-700 text-slate-400 hover:border-cyan-500/60 hover:text-cyan-400"
		}`;

	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.04,
			},
		},
	} as const;

	const itemVariants = {
		hidden: { opacity: 0, y: 8 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
				ease: "easeOut",
			},
		},
	} as const;

	return (
		<div className="md:sticky md:top-14 md:self-start w-full">
			<h2 className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 mb-2 sm:mb-4">
				Categories
			</h2>

			{/* Scrollable list for smaller viewports, stacked list for larger screens */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="show"
				className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-thin scrollbar-thumb-slate-700"
			>
				<motion.div
					variants={itemVariants}
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="shrink-0 md:w-full"
				>
					<Link
						href={buildHref(undefined, initialQuery)}
						className={`${chipClass(!category)} block md:w-full`}
					>
						All
					</Link>
				</motion.div>
				{categories.map((cat) => (
					<motion.div
						key={cat.id}
						variants={itemVariants}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="shrink-0 md:w-full"
					>
						<Link
							href={buildHref(cat.slug, initialQuery)}
							className={`${chipClass(category === cat.slug)} block md:w-full`}
						>
							{cat.name}
						</Link>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}
