import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/actions/blog-action";
import { getApprovedComments } from "@/actions/comment-action";
import CommentSection from "./comment";

export default async function IndividualBlog({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = await getBlogBySlug(slug);

	if (!post) {
		notFound();
	}

	const comments = await getApprovedComments(post.id);

	const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<main className="min-h-screen">
			{/* Top bar */}
			<div className="border-b border-slate-200 dark:border-slate-800">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
					<Link
						href="/blog"
						className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
					>
						← Back to blog
					</Link>
				</div>
			</div>

			<article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
				{/* Category + date */}
				<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm mb-4">
					<span className="inline-block px-2.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 font-semibold uppercase tracking-wide break-words">
						{post.category?.name ?? "Uncategorized"}
					</span>
					<span className="text-slate-400">•</span>
					<time className="text-slate-500 dark:text-slate-400">
						{formattedDate}
					</time>
				</div>

				{/* Title */}
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-slate-900 dark:text-white break-words mb-3">
					{post.title}
				</h1>

				{/* Subtitle */}
				{post.subtitle && (
					<p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed break-words mb-6">
						{post.subtitle}
					</p>
				)}

				{/* Author */}
				<div className="flex items-center gap-3 mb-8">
					<div className="w-9 h-9 rounded-full bg-slate-900 dark:bg-cyan-600 text-white flex items-center justify-center text-sm font-semibold shrink-0">
						{(post.authorName || "A").charAt(0).toUpperCase()}
					</div>
					<p className="text-sm text-slate-600 dark:text-slate-300 break-words min-w-0">
						By{" "}
						<span className="font-semibold text-slate-900 dark:text-white">
							{post.authorName || "Anonymous"}
						</span>
					</p>
				</div>

				{/* Hero image */}
				{post.imageUrl && (
					<div className="relative w-full aspect-video sm:aspect-[16/9] rounded-lg sm:rounded-xl overflow-hidden mb-8 sm:mb-10 bg-slate-100 dark:bg-slate-900">
						<Image
							src={post.imageUrl}
							alt={post.title}
							fill
							priority
							className="object-cover"
							sizes="(max-width: 768px) 100vw, 768px"
						/>
					</div>
				)}

				{/* Body */}
				<div className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-line break-words [overflow-wrap:anywhere]">
					{post.body}
				</div>

				{/* Comments */}
				<div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-slate-200 dark:border-slate-800">
					<CommentSection blogId={post.id} initialComments={comments} />
				</div>
			</article>
		</main>
	);
}