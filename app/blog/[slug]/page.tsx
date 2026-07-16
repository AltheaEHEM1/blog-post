import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/actions/blog-action";
import { getApprovedComments } from "@/actions/comment-action";
import { FadeInUp, ScaleIn } from "@/app/blog/blog-animator";
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
			<div className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
				<div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 py-4 flex items-center justify-between">
					<FadeInUp delay={0.05}>
						<Link
							href="/blog"
							className="group inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white hover:text-cyan-400 transition-all duration-300"
						>
							<span className="transition-transform duration-300 group-hover:-translate-x-1">
								&larr;
							</span>
							Back
						</Link>
					</FadeInUp>
					<FadeInUp delay={0.1}>
						<div className="hidden md:block font-mono text-[10px] sm:text-xs text-white/70 truncate hover:text-cyan-400 transition-all duration-300 text-right max-w-[300px] lg:max-w-[500px]">
							{post.title.toUpperCase()}
						</div>
					</FadeInUp>

				</div>
			</div>
			<article className="w-full px-6 mx-auto max-w-300">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 mb-16 items-start">
					<div className="lg:col-span-8 flex flex-col gap-2">
						{post.imageUrl && (
							<ScaleIn delay={0.15}>
								<div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200/50">
									<Image
										src={post.imageUrl}
										alt={post.title}
										fill
										priority
										className="object-cover transition-transform duration-700 hover:scale-[1.02]"
										sizes="(max-width: 1024px) 100vw, 66vw"
									/>
								</div>
							</ScaleIn>
						)}
						{post.subtitle && (
							<FadeInUp delay={0.3} className="w-full flex justify-center">
								<p className="max-w-2xl text-center text-sm md:text-base font-mono italic text-slate-500 dark:text-slate-200 leading-relaxed tracking-tight px-4">
									{post.subtitle}
								</p>
							</FadeInUp>
						)}
					</div>
					<div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-8">
						<FadeInUp delay={0.2} className="w-full flex flex-col gap-4">
							<div className="mt-10 flex flex-wrap items-center gap-x-3 text-xs font-semibold uppercase tracking-wider">
								<span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
									{post.category?.name ?? "Uncategorized"}
								</span>
								<span className="text-slate-300 dark:text-slate-600">•</span>
								<time className="text-slate-500 dark:text-slate-400 font-medium">
									{formattedDate}
								</time>
							</div>

							<h1 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-slate-900 dark:text-white leading-tight">
								{post.title}
							</h1>
						</FadeInUp>

						<FadeInUp delay={0.35} className="w-full">
							<div className="flex items-center gap-4 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
								<div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
									{(post.authorName || "A").charAt(0).toUpperCase()}
								</div>
								<div className="flex flex-col">
									<span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500">
										Written by
									</span>
									<span className="font-semibold text-slate-900 dark:text-white leading-tight">
										{post.authorName || "Anonymous"}
									</span>
								</div>
							</div>
						</FadeInUp>
					</div>
				</div>

				{/* Body Content */}
				<FadeInUp delay={0.4} className="w-full">
					<div
						className="max-w-[1400px] text-base leading-relaxed text-slate-700 dark:text-slate-300 [word-break:break-word] hyphens-auto [&_p]:text-justify [&_p]:my-3 [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_i]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_li]:my-1 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:my-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:my-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:my-2"
						dangerouslySetInnerHTML={{ __html: post.body }}
					/>
				</FadeInUp>

				{/* Comments */}
				<FadeInUp delay={0.45} className="w-full">
					<div className="max-w-[1400px] mt-12 pt-12 border-t border-slate-200 dark:border-slate-800">
						<CommentSection blogId={post.id} initialComments={comments} />
					</div>
				</FadeInUp>
			</article>
		</main>
	);
}
