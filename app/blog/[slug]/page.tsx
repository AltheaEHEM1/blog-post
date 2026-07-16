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
				<div className="w-full px-6 py-4 mx-auto max-w-[1400px]">
					<Link
						href="/blog"
						className="text-sm font-medium text-slate-500 hover:text-cyan-600 transition-colors"
					>
						← Back to blog
					</Link>
				</div>
			</div>

			{/* Article container without top/bottom padding */}
			<article className="w-full px-6 mx-auto max-w-300">
				{/* 12-Column Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 mb-16 items-start">
					{/* LEFT COLUMN: Hero Image + Subtitle */}
					<div className="lg:col-span-8 flex flex-col gap-6">
						{post.imageUrl && (
							<div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
								<Image
									src={post.imageUrl}
									alt={post.title}
									fill
									priority
									className="object-cover"
									sizes="(max-width: 1024px) 100vw, 66vw"
								/>
							</div>
						)}
						{post.subtitle && (
							<p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">
								{post.subtitle}
							</p>
						)}
					</div>

					{/* RIGHT COLUMN: Metadata, Title, Author */}
					<div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-8">
						<div className="flex flex-wrap items-center gap-x-4 text-xs font-semibold uppercase tracking-widest">
							<span className="text-cyan-600 dark:text-cyan-400">
								{post.category?.name ?? "Uncategorized"}
							</span>
							<span className="text-slate-300">|</span>
							<time className="text-slate-500">{formattedDate}</time>
						</div>

						<h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
							{post.title}
						</h1>

						<div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
							<div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
								{(post.authorName || "A").charAt(0).toUpperCase()}
							</div>
							<div className="text-sm">
								<p className="text-slate-400 uppercase text-[10px] tracking-wider">
									Written by
								</p>
								<p className="font-bold text-slate-900 dark:text-white text-base">
									{post.authorName || "Anonymous"}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Body Content — rendered as rich HTML with explicit fallback styling */}
				<div
					className="max-w-[1400px] text-lg leading-loose text-slate-700 dark:text-slate-300 [word-break:break-word] hyphens-auto [&_p]:text-justify [&_p]:my-3 [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_i]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_li]:my-1 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:my-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:my-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:my-2"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: content authored by trusted admin only
					dangerouslySetInnerHTML={{ __html: post.body }}
				/>

				{/* Comments */}
				<div className="max-w-[1400px] mt-12 pt-12 border-t border-slate-200 dark:border-slate-800">
					<CommentSection blogId={post.id} initialComments={comments} />
				</div>
			</article>
		</main>
	);
}