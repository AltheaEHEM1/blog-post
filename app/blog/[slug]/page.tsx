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
		<main className="min-h-screen bg-slate-50 dark:bg-slate-950">
			{/* Top bar */}
			<div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
				<div className="w-full px-6 py-4 mx-auto max-w-[1400px]">
					<Link
						href="/blog"
						className="text-sm font-medium text-slate-500 hover:text-cyan-600 transition-colors"
					>
						← Back to blog
					</Link>
				</div>
			</div>

			<article className="w-full px-6 py-12 mx-auto max-w-[1400px]">
				{/* Two Column Grid: Image+Subtitle (Left) | Metadata+Title (Right) */}
				<div className="grid grid-cols-1 md:grid-cols-[1.7fr,1fr] gap-12 mb-16 items-start">
					{/* Left Column: Hero Image + Subtitle (italic) */}
					<div className="flex flex-col gap-6">
						{post.imageUrl && (
							<div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg bg-slate-200 dark:bg-slate-900">
								<Image
									src={post.imageUrl}
									alt={post.title}
									fill
									priority
									className="object-cover"
									sizes="(max-width: 1024px) 100vw, 70vw"
								/>
							</div>
						)}
						{post.subtitle && (
							<p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">
								{post.subtitle}
							</p>
						)}
					</div>

					{/* Right Column: Metadata, Title, Author */}
					<div className="flex flex-col gap-6 sticky top-8">
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

						<div className="flex items-center gap-4 mt-4">
							<div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
								{(post.authorName || "A").charAt(0).toUpperCase()}
							</div>
							<div className="text-sm">
								<p className="text-slate-400">Written by</p>
								<p className="font-bold text-slate-900 dark:text-white">
									{post.authorName || "Anonymous"}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Body (Justified & Wrapped) */}
				<div className="max-w-[1000px] text-lg leading-loose text-slate-700 dark:text-slate-300 text-justify [word-break:break-word] hyphens-auto">
					{post.body}
				</div>

				{/* Comments */}
				<div className="max-w-[1000px] mt-20 pt-12 border-t border-slate-200 dark:border-slate-800">
					<CommentSection blogId={post.id} initialComments={comments} />
				</div>
			</article>
		</main>
	);
}
