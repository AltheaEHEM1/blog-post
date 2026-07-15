import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/actions/blog-action";
import { getApprovedComments } from "@/actions/comment-action";
import Navbar from "@/components/navbar/navbar";
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
		<>
			<Navbar title={post.title} />

			<section className="max-w-4xl mx-auto px-6 py-12">
				{/* Hero Image */}
				{post.imageUrl && (
					<div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-12 shadow-2xl border border-slate-200 dark:border-slate-800">
						<Image
							src={post.imageUrl}
							alt={post.title}
							fill
							priority
							className="object-cover"
							sizes="(max-width: 1024px) 100vw, 900px"
						/>
					</div>
				)}

				{/* Metadata Header */}
				<div className="text-center mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
					<div className="text-xs font-bold tracking-widest uppercase text-cyan-600 mb-4">
						{post.category?.name ?? "Uncategorized"} •{" "}
						{new Date(post.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</div>

					{post.subtitle && (
						<p className="text-slate-600 dark:text-slate-400 italic font-mono text-base mb-6 max-w-2xl mx-auto">
							{post.subtitle}
						</p>
					)}

					<p className="text-xs font-mono text-slate-500">
						BY {post.authorName?.toUpperCase() || "ANONYMOUS"}
					</p>
				</div>

				{/* Body Content */}
				<article className=" text-justify text-white">{post.body}</article>

				<div className="mt-16">
					<CommentSection blogId={post.id} initialComments={comments} />
				</div>
			</section>
		</>
	);
}
