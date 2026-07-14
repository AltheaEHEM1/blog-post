"use client";

import Link from "next/link";

interface Post {
	id: string;
	slug: string;
	title: string;
	subtitle: string | null;
	body: string;
	createdAt: Date;
	category: { id: string; name: string } | null;
}

function excerptFrom(body: string, maxLength = 140) {
	if (body.length <= maxLength) return body;
	return `${body.slice(0, maxLength).trim()}...`;
}

const BlogPostsGrid = ({ blogPosts }: { blogPosts: Post[] }) => {
	if (blogPosts.length === 0) {
		return (
			<p className="text-slate-500 font-mono text-sm">
				No blog posts match this filter.
			</p>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{blogPosts.map((post) => (
				<article
					key={post.id}
					className="group flex flex-col border border-slate-200 dark:border-slate-800 p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-500/50"
				>
					<div className="text-cyan-600 dark:text-cyan-500 text-xs font-semibold tracking-wider mb-3 uppercase">
						{post.category?.name ?? "Uncategorized"} •{" "}
						{new Date(post.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</div>

					<h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
						{post.title}
					</h2>

					<Link
						href={`/blog/${post.slug}`}
						className="inline-flex items-center text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
					>
						READ LOG
						<span className="ml-2 transform transition-transform group-hover:translate-x-1">
							→
						</span>
					</Link>
				</article>
			))}
		</div>
	);
};

export default BlogPostsGrid;
