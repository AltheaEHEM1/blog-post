"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface Post {
	id: string;
	slug: string;
	title: string;
	subtitle: string | null;
	createdAt: Date;
	imageUrl: string | null;
	category: { id: string; name: string } | null;
}

function isNew(createdAt: Date) {
	const days = (Date.now() - new Date(createdAt).getTime()) / 86_400_000;
	return days <= 7;
}

export default function BlogCarousel({ posts }: { posts: Post[] }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	const total = posts?.length ?? 0;

	const go = useCallback(
		(dir: "prev" | "next") => {
			if (total === 0) return;
			setActiveIndex((i) => {
				if (dir === "next") return (i + 1) % total;
				return (i - 1 + total) % total;
			});
		},
		[total],
	);

	// Autoplay: progress every 7 seconds unless hovered
	useEffect(() => {
		if (isHovered || total === 0) return;
		const timer = setInterval(() => {
			go("next");
		}, 7000);
		return () => clearInterval(timer);
	}, [isHovered, total, go]);

	if (!posts || posts.length === 0) return null;

	const active = posts[activeIndex];

	return (
		<section
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			aria-label="Blog carousel"
			className="mb-12 md:mb-16 w-full"
		>
			<div className="relative w-full overflow-hidden border border-white/10 shadow-xl shadow-black/40">
				<div
					className="
					relative 
					h-125 sm:h-150 md:h-162.5 lg:h-175 
					w-full 
					bg-slate-900 
					overflow-hidden 
					shadow-2xl 
					ring-1 ring-white/10 
					transition-all duration-700 ease-in-out
					group
					will-change-transform"
				>
					<AnimatePresence mode="wait">
						<motion.div
							key={active.id}
							initial={{ opacity: 0, scale: 1.03 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							className="absolute inset-0"
						>
							{active.imageUrl ? (
								<Image
									src={active.imageUrl}
									alt={active.title}
									fill
									priority
									className="object-cover object-center"
									sizes="100vw"
								/>
							) : (
								<div className="w-full h-full bg-slate-800" />
							)}
						</motion.div>
					</AnimatePresence>

					{/* Gradient overlays */}
					<div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent z-1" />
					<div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/20 to-transparent z-1" />

					{/* Main content */}
					<div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16 pb-28 sm:pb-36 lg:pb-44 max-w-2xl z-2 pointer-events-none">
						<AnimatePresence mode="wait">
							<motion.div
								key={active.id}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								transition={{ duration: 0.5, ease: "circOut" }}
								className="pointer-events-auto space-y-5"
							>
								{/* Mono Meta Header */}
								<div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
									{isNew(active.createdAt) && (
										<span className="px-2 py-0.5 border border-cyan-400 text-cyan-400 bg-cyan-400/10">
											[NEW]
										</span>
									)}
									<span className="text-white/60">
										{active.category?.name ?? "GENERAL"}
									</span>
									<span className="text-white/20">/</span>
									<span className="text-white/60">
										{new Date(active.createdAt).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
										})}
									</span>
								</div>

								{/* Main Title - Mono Font (Reduced Size) */}
								<h3 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold uppercase leading-[1.1] tracking-tight text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
									{active.title}
								</h3>

								{/* Subtitle */}
								{active.subtitle && (
									<p className="font-mono text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md border-l-2 border-cyan-500/50 pl-4">
										{active.subtitle}
									</p>
								)}

								{/* Interaction Button */}
								<div className="pt-4">
									<Link
										href={`/blog/${active.slug}`}
										className="group inline-flex items-center gap-3 px-6 py-3 border border-white/20 bg-transparent font-mono text-xs uppercase tracking-widest text-white transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300"
									>
										<span>READ_ARTICLE</span>
										<ArrowUpRight
											size={16}
											className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
										/>
									</Link>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Prev / next + counter, bottom-left */}
					<div className="absolute bottom-4 left-4 sm:left-8 lg:left-10 flex items-center gap-3 z-10">
						<button
							type="button"
							onClick={() => go("prev")}
							aria-label="Previous post"
							className="w-8 h-8 rounded-full border border-white/25 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:border-cyan-400/60 transition-colors"
						>
							<ChevronLeft size={15} />
						</button>
						<button
							type="button"
							onClick={() => go("next")}
							aria-label="Next post"
							className="w-8 h-8 rounded-full border border-white/25 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:border-cyan-400/60 transition-colors"
						>
							<ChevronRight size={15} />
						</button>
						<div className="flex flex-col gap-1 ml-1">
							<span className="text-white/70 font-mono text-[10px] sm:text-[11px]">
								{String(activeIndex + 1).padStart(2, "0")} /{" "}
								{String(total).padStart(2, "0")}
							</span>
							<div className="w-12 sm:w-16 h-0.75 rounded-full bg-white/15 overflow-hidden relative">
								{!isHovered ? (
									<motion.div
										key={activeIndex}
										initial={{ width: "0%" }}
										animate={{ width: "100%" }}
										transition={{ duration: 7, ease: "linear" }}
										className="h-full bg-cyan-400 absolute left-0 top-0"
									/>
								) : (
									<div
										className="h-full bg-cyan-400 absolute left-0 top-0"
										style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
									/>
								)}
							</div>
						</div>
					</div>

					{/* Thumbnail selector */}
					<div className="hidden sm:flex absolute bottom-4 right-4 lg:right-10 gap-3 z-10 max-w-[50%] overflow-x-auto py-1 scrollbar-none">
						{posts.map((post, i) => {
							const isActive = i === activeIndex;
							return (
								<motion.button
									key={post.id}
									type="button"
									onClick={() => setActiveIndex(i)}
									animate={{ y: isActive ? -4 : 0 }}
									whileHover={{ y: isActive ? -4 : -2 }}
									whileTap={{ scale: 0.95 }}
									aria-label={`Show ${post.title}`}
									className={`relative w-16 lg:w-20 h-24 lg:h-28 rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${
										isActive
											? "border-cyan-400 shadow-[0_0_0_3px_rgba(34,211,238,0.25)]"
											: "border-white/20 opacity-70 hover:opacity-100"
									}`}
								>
									{post.imageUrl ? (
										<Image
											src={post.imageUrl}
											alt={post.title}
											fill
											className="object-cover"
											sizes="100px"
										/>
									) : (
										<div className="w-full h-full bg-slate-800" />
									)}
									<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
									<div className="absolute bottom-1 left-1 right-1 text-left">
										<p className="text-white text-[8px] font-mono uppercase tracking-wide truncate opacity-85">
											{post.category?.name ?? "General"}
										</p>
										<p className="text-white text-[9px] font-bold leading-tight line-clamp-2">
											{post.title}
										</p>
									</div>
								</motion.button>
							);
						})}
					</div>
				</div>
			</div>

			{/* Thumbnail selector (mobile) */}
			<div className="sm:hidden flex gap-2 mt-3 overflow-x-auto pb-2 px-4 -mx-4 scrollbar-thin scrollbar-thumb-slate-700">
				{posts.map((post, i) => {
					const isActive = i === activeIndex;
					return (
						<motion.button
							key={post.id}
							type="button"
							onClick={() => setActiveIndex(i)}
							whileTap={{ scale: 0.95 }}
							aria-label={`Show ${post.title}`}
							className={`relative shrink-0 w-24 h-28 rounded-xl overflow-hidden border-2 transition-all ${
								isActive
									? "border-cyan-400 bg-slate-900"
									: "border-white/15 bg-slate-950"
							}`}
						>
							{post.imageUrl ? (
								<Image
									src={post.imageUrl}
									alt={post.title}
									fill
									className="object-cover"
									sizes="100px"
								/>
							) : (
								<div className="w-full h-full bg-slate-800" />
							)}
							<div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/30 to-transparent" />
							<div className="absolute bottom-1.5 left-1.5 right-1.5 text-left">
								<p className="text-white text-[8px] font-mono uppercase tracking-wide truncate opacity-80">
									{post.category?.name ?? "General"}
								</p>
								<p className="text-white text-[9px] font-bold leading-tight line-clamp-2">
									{post.title}
								</p>
							</div>
						</motion.button>
					);
				})}
			</div>
		</section>
	);
}
