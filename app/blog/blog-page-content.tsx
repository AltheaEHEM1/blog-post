"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import BlogPostsGrid from "@/app/blog/blog-post-card";

interface Post {
	id: string;
	slug: string;
	title: string;
	subtitle: string | null;
	body: string;
	createdAt: Date;
	imageUrl: string | null;
	category: { id: string; name: string; slug: string } | null;
}

interface Category {
	id: string;
	name: string;
	slug: string;
}

interface BlogPageContentProps {
	posts: Post[];
	categories: Category[];
	category?: string;
	initialQuery?: string;
}

function filterPosts(posts: Post[], query: string) {
	const normalizedQuery = query.toLowerCase().trim();
	if (!normalizedQuery) return posts;

	return posts.filter(
		(post) =>
			post.title.toLowerCase().includes(normalizedQuery) ||
			(post.category?.name.toLowerCase().includes(normalizedQuery) ?? false),
	);
}

function buildBlogHref(category?: string, query?: string) {
	const params = new URLSearchParams();
	if (category) params.set("category", category);
	if (query?.trim()) params.set("q", query.trim());

	const queryString = params.toString();
	return queryString ? `/blog?${queryString}` : "/blog";
}

export default function BlogPageContent({
	posts,
	categories,
	category,
	initialQuery,
}: BlogPageContentProps) {
	const router = useRouter();
	const [query, setQuery] = useState(initialQuery ?? "");

	const filteredPosts = useMemo(
		() => filterPosts(posts, query),
		[posts, query],
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			const trimmedQuery = query.trim();
			const initial = initialQuery?.trim() ?? "";

			if (trimmedQuery === initial) return;

			router.replace(buildBlogHref(category, trimmedQuery), { scroll: false });
		}, 300);

		return () => clearTimeout(timer);
	}, [query, category, initialQuery, router]);

	return (
		<>
			<div className="-mt-6 mb-8 flex justify-center">
				<div className="relative w-full max-w-2xl">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<svg
							className="h-4 w-4 text-slate-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-labelledby="search-title"
						>
							<title id="search-title">Search</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
					<input
						type="search"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search posts..."
						className="w-full pl-9 pr-4 py-1.5 text-sm border border-slate-700/80 bg-slate-900/50 text-slate-200 rounded-sm focus:outline-none focus:border-cyan-500/60 focus:ring-0"
					/>
				</div>
			</div>

			<div className="flex flex-wrap gap-2 mb-12 justify-center">
				<Link
					href={buildBlogHref(undefined, query)}
					className={`text-xs font-mono px-4 py-1.5 border transition-colors rounded-sm ${
						!category
							? "bg-cyan-600 text-white border-cyan-600"
							: "border-slate-700 text-slate-400 hover:border-cyan-500 hover:text-cyan-400"
					}`}
				>
					All
				</Link>
				{categories.map((cat) => (
					<Link
						key={cat.id}
						href={buildBlogHref(cat.slug, query)}
						className={`text-xs font-mono px-4 py-1.5 border transition-colors rounded-sm ${
							category === cat.slug
								? "bg-cyan-600 text-white border-cyan-600"
								: "border-slate-700 text-slate-400 hover:border-cyan-500 hover:text-cyan-400"
						}`}
					>
						{cat.name}
					</Link>
				))}
			</div>

			<BlogPostsGrid blogPosts={filteredPosts} />
		</>
	);
}
