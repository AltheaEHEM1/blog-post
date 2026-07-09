"use client";

import Link from "next/link";
import { use } from "react";

export default function IndividualBlog({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = use(params);

	return (
		<main className="min-h-screen transition-colors duration-300">
			<article className="max-w-5xl mx-auto px-6 py-10">
				{/* Back Link */}
				<div className="mb-12">
					<Link
						href="/blog"
						className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-500 border-b border-slate-300 hover:border-cyan-600 dark:border-slate-700 dark:hover:border-cyan-500 transition-colors"
					>
						← BACK TO LOGS
					</Link>
				</div>

				{/* Content Area */}
				<h1 className="text-3xl md:text-3xl font-bold mb-8 text-slate-900 dark:text-white">
					Hello
				</h1>

				<div className="prose dark:prose-invert font-mono prose-slate prose-lg max-w-none text-justify">
					<p>Displaying content for slug: {slug}</p>
				</div>
			</article>
		</main>
	);
}
