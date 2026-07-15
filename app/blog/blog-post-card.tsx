"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
// Cycles through tint colors so the grid matches the carousel's palette
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
			<div className="flex items-center justify-center py-24 border border-dashed border-slate-800 rounded-lg">
				<p className="text-slate-500 font-mono text-sm">
					No blog posts match this filter.
				</p>
			</div>
		);
	}
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
			{blogPosts.map((post, i) => {
				const tint = TINTS[i % TINTS.length];
				const buttonTint = BUTTON_TINTS[i % BUTTON_TINTS.length];
				return (
					<Link
						key={post.id}
						href={`/blog/${post.slug}`}
						className="group relative flex flex-col aspect-[3/3.8] rounded-xl overflow-hidden shadow-md shadow-black/30 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300"
					>
						{post.imageUrl ? (
							<Image
								src={post.imageUrl}
								alt={post.title}
								fill
								className="object-cover transition-transform duration-300 group-hover:scale-105"
								sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
							/>
						) : (
							<div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600 font-mono text-xs">
								No image
							</div>
						)}
						{/* Colored gradient tint, covering enough of the bottom to keep text readable */}
						<div
							className={`absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t ${tint}`}
						/>
						<div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2.5">
							<div>
								<h2 className="text-white text-base font-bold leading-snug line-clamp-2 [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
									{post.title}
								</h2>
								<p className="text-white/80 text-[11px] mt-1 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
									{post.category?.name ?? "Uncategorized"} •{" "}
									{new Date(post.createdAt).toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
										year: "numeric",
									})}
								</p>
								{post.subtitle && (
									<p className="text-white/70 text-xs mt-1.5 line-clamp-2 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
										{post.subtitle}
									</p>
								)}
							</div>
							<span
								className={`flex items-center justify-between px-3.5 py-2 rounded-lg backdrop-blur-sm text-white text-xs font-semibold transition-colors ${buttonTint}`}
							>
								Read more
								<ArrowRight
									size={14}
									className="transform transition-transform group-hover:translate-x-1"
								/>
							</span>
						</div>
					</Link>
				);
			})}
		</div>
	);
};
export default BlogPostsGrid;