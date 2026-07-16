"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Post {
	id: string;
	slug: string;
	title: string;
	subtitle: string | null;
	body: string;
	createdAt: Date;
	imageUrl: string | null;
	category: { id: string; name: string } | null;
}

const TINTS = [
	"from-blue-950/95 via-blue-950/40 to-transparent",
	"from-emerald-950/95 via-emerald-950/40 to-transparent",
	"from-purple-950/95 via-purple-950/40 to-transparent",
	"from-teal-950/95 via-teal-950/40 to-transparent",
	"from-rose-950/95 via-rose-950/40 to-transparent",
];

const BUTTON_TINTS = [
	"bg-blue-950/60 hover:bg-blue-950/80",
	"bg-emerald-950/60 hover:bg-emerald-950/80",
	"bg-purple-950/60 hover:bg-purple-950/80",
	"bg-teal-950/60 hover:bg-teal-950/80",
	"bg-rose-950/60 hover:bg-rose-950/80",
];

const BlogPostsGrid = ({ blogPosts }: { blogPosts: Post[] }) => {
	if (blogPosts.length === 0) {
		return (
			<div className="flex items-center justify-center py-16 sm:py-24 border border-dashed border-slate-800 rounded-lg w-full">
				<p className="text-slate-500 font-mono text-xs sm:text-sm text-center px-4">
					No blog posts match this filter.
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-5 w-full min-h-75">
			<AnimatePresence mode="popLayout">
				{blogPosts.map((post, i) => {
					const tint = TINTS[i % TINTS.length];
					const buttonTint = BUTTON_TINTS[i % BUTTON_TINTS.length];
					return (
						<motion.div
							key={post.id}
							layout
							initial={{ opacity: 0, scale: 0.92 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.92 }}
							whileHover={{
								y: -6,
								transition: { duration: 0.2, ease: "easeOut" },
							}}
							transition={{ duration: 0.35, ease: "easeInOut" }}
							className="w-full"
						>
							<Link
								href={`/blog/${post.slug}`}
								className="group relative flex flex-col aspect-[3/3.4] w-full h-full rounded-xl overflow-hidden shadow-md shadow-black/30 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
							>
								{post.imageUrl ? (
									<Image
										src={post.imageUrl}
										alt={post.title}
										fill
										className="object-cover transition-transform duration-300 group-hover:scale-105"
										sizes="(max-width: 480px) 100vw, (max-width: 1280px) 50vw, 33vw"
									/>
								) : (
									<div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600 font-mono text-xs">
										No image
									</div>
								)}

								<div
									className={`absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t ${tint} pointer-events-none`}
								/>

								<div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col gap-3 z-10">
									<div>
										<h2 className="text-white text-base sm:text-lg font-bold leading-snug line-clamp-2 [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
											{post.title}
										</h2>
										<p className="text-white/80 text-[10px] sm:text-xs mt-1.5 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
											{post.category?.name ?? "Uncategorized"} •{" "}
											{new Date(post.createdAt).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
												year: "numeric",
											})}
										</p>
									</div>

									<span
										className={`flex items-center justify-between px-4 py-2.5 rounded-lg backdrop-blur-sm text-white text-xs sm:text-sm font-semibold transition-colors ${buttonTint}`}
									>
										Read more
										<ArrowRight
											size={14}
											className="transform transition-transform group-hover:translate-x-1"
										/>
									</span>
								</div>
							</Link>
						</motion.div>
					);
				})}
			</AnimatePresence>
		</div>
	);
};

export default BlogPostsGrid;
