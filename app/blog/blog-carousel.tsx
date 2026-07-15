"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

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

    if (!posts || posts.length === 0) return null;

    const active = posts[activeIndex];
    const total = posts.length;

    const go = (dir: "prev" | "next") => {
        setActiveIndex((i) => {
            if (dir === "next") return (i + 1) % total;
            return (i - 1 + total) % total;
        });
    };

    return (
        <div className="mb-16">
            <div className="relative w-full overflow-hidden border border-white/10 shadow-xl shadow-black/40">
                <div className="relative h-[450px] sm:h-[510px] lg:h-[570px] w-full bg-slate-900">
                    {/* Crossfading background image */}
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
                                    className="object-cover"
                                    sizes="100vw"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-800" />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Gradient overlays for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent" />

                    {/* Main content, bottom-left */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 pb-24 sm:pb-28 max-w-xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.35 }}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    {isNew(active.createdAt) && (
                                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono uppercase tracking-wide">
                                            New
                                        </span>
                                    )}
                                    <span className="text-cyan-300/90 font-mono text-xs uppercase tracking-wider">
                                        {active.category?.name ?? "Uncategorized"} •{" "}
                                        {new Date(active.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>

                                <h3 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-[0.95] tracking-tight line-clamp-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                                    {active.title}
                                </h3>

                                {active.subtitle && (
                                    <p className="text-slate-300 text-sm sm:text-base mt-4 line-clamp-2 max-w-md">
                                        {active.subtitle}
                                    </p>
                                )}

                                <Link
                                    href={`/blog/${active.slug}`}
                                    className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-semibold transition-colors"
                                >
                                    Read article
                                    <ArrowUpRight size={16} />
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Prev / next + counter, bottom-left */}
                    <div className="absolute bottom-5 left-6 sm:left-10 flex items-center gap-3 z-10">
                        <button
                            type="button"
                            onClick={() => go("prev")}
                            aria-label="Previous post"
                            className="w-8 h-8 rounded-full border border-white/25 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:border-cyan-400/60 transition-colors"
                        >
                            <ChevronLeft size={15} />
                        </button>
                        <button
                            type="button"
                            onClick={() => go("next")}
                            aria-label="Next post"
                            className="w-8 h-8 rounded-full border border-white/25 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:border-cyan-400/60 transition-colors"
                        >
                            <ChevronRight size={15} />
                        </button>
                        <div className="flex flex-col gap-1 ml-1">
                            <span className="text-white/70 font-mono text-[11px]">
                                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                                {String(total).padStart(2, "0")}
                            </span>
                            <div className="w-16 h-[3px] rounded-full bg-white/15 overflow-hidden">
                                <div
                                    className="h-full bg-cyan-400 transition-all duration-300"
                                    style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Thumbnail selector — desktop: overlapping bottom-right */}
                    <div className="hidden sm:flex absolute bottom-5 right-6 lg:right-10 gap-3 z-10">
                        {posts.map((post, i) => {
                            const isActive = i === activeIndex;
                            return (
                                <button
                                    key={post.id}
                                    type="button"
                                    onClick={() => setActiveIndex(i)}
                                    aria-label={`Show ${post.title}`}
                                    className={`relative w-20 lg:w-24 h-28 lg:h-32 rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${isActive
                                        ? "border-cyan-400 shadow-[0_0_0_3px_rgba(34,211,238,0.25)] -translate-y-1"
                                        : "border-white/20 opacity-70 hover:opacity-100 hover:-translate-y-0.5"
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                    <div className="absolute bottom-1.5 left-1.5 right-1.5">
                                        <p className="text-white text-[9px] font-mono uppercase tracking-wide truncate opacity-80">
                                            {post.category?.name ?? "General"}
                                        </p>
                                        <p className="text-white text-[10px] font-bold leading-tight line-clamp-2">
                                            {post.title}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Thumbnail selector — mobile: scrollable row below the hero */}
            <div className="sm:hidden flex gap-3 mt-4 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin scrollbar-thumb-slate-700">
                {posts.map((post, i) => {
                    const isActive = i === activeIndex;
                    return (
                        <button
                            key={post.id}
                            type="button"
                            onClick={() => setActiveIndex(i)}
                            aria-label={`Show ${post.title}`}
                            className={`relative flex-shrink-0 w-24 h-32 rounded-xl overflow-hidden border-2 transition-colors ${isActive ? "border-cyan-400" : "border-white/15"
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            <div className="absolute bottom-1.5 left-1.5 right-1.5">
                                <p className="text-white text-[9px] font-mono uppercase tracking-wide truncate opacity-80">
                                    {post.category?.name ?? "General"}
                                </p>
                                <p className="text-white text-[10px] font-bold leading-tight line-clamp-2">
                                    {post.title}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}