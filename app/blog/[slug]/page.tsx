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

	return (
		<main className="min-h-screen transition-colors duration-300">
			<article className="max-w-5xl mx-auto px-6 py-10">
				<div className="mb-12">
					<Link
						href="/blog"
						className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-500 border-b border-slate-300 hover:border-cyan-600 dark:border-slate-700 dark:hover:border-cyan-500 transition-colors"
					>
						← BACK TO LOGS
					</Link>
				</div>

				<div className="mb-4 text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-500">
					{post.category?.name ?? "Uncategorized"} •{" "}
					{new Date(post.createdAt).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</div>

				<h1 className="text-3xl md:text-3xl font-bold mb-2 text-slate-900 dark:text-white">
					{post.title}
				</h1>

				{post.subtitle && (
					<p className="text-slate-500 dark:text-slate-400 italic mb-8 font-mono text-sm">
						{post.subtitle}
					</p>
				)}

				<p className="text-xs font-mono text-slate-500 mb-8">
					By {post.authorName}
				</p>

				<div className="prose dark:prose-invert font-mono prose-slate prose-lg max-w-none text-justify whitespace-pre-wrap">
					{post.body}
				</div>

				<CommentSection blogId={post.id} initialComments={comments} />
			</article>
		</main>
	);
}
