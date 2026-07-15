"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import BlogCarousel from "@/app/blog/blog-carousel";

interface Post {
	id: string;
	slug: string;
	title: string;
	subtitle: string | null;
	createdAt: Date;
	imageUrl: string | null;
	category: { id: string; name: string } | null;
}

interface BlogPageContentProps {
	latestPosts: Post[];
}

export default function BlogPageContent({ latestPosts }: BlogPageContentProps) {
	const [h1Text, setH1Text] = useState("");
	const [pText, setPText] = useState("");

	const h1Content = "<AAA.blog_post/>";
	const pContent = "Explore our latest updates and thoughts";

	useEffect(() => {
		animate(0, h1Content.length, {
			duration: 1.5,
			ease: "linear",
			onUpdate: (latest) => setH1Text(h1Content.slice(0, Math.round(latest))),
		});
		animate(0, pContent.length, {
			duration: 1.5,
			delay: 1.5,
			ease: "linear",
			onUpdate: (latest) => setPText(pContent.slice(0, Math.round(latest))),
		});
	}, []);

	const renderStyledH1 = (text: string) => {
		const parts = text.split("AAA");
		return (
			<>
				{parts[0]}
				<span className="text-cyan-400">AAA</span>
				{parts[1] || ""}
			</>
		);
	};

	return (
		<>
			{/* Hero */}
			<div
				className="relative min-h-70 flex flex-col justify-center px-4 bg-center bg-cover bg-no-repeat overflow-hidden mb-8"
				style={{
					backgroundImage: "url('/assets/bg_image.png')",
					backgroundPosition: "50% 70%",
				}}
			>
				<div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/90 z-0" />

				<div className="relative z-10 flex flex-col items-center gap-2">
					<div className="text-center space-y-2 min-h-[120px]">
						<h1 className="font-mono text-4xl md:text-5xl font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
							{renderStyledH1(h1Text)}
							<motion.span
								animate={{ opacity: [0, 1, 0] }}
								transition={{ repeat: Infinity, duration: 0.8 }}
								className="text-cyan-400 ml-1"
							>
								|
							</motion.span>
						</h1>
						<p className="text-slate-400 font-mono text-xs uppercase tracking-[0.2em] h-4">
							{pText}
						</p>
					</div>
				</div>
			</div>

			{/* Carousel of latest posts */}
			<BlogCarousel posts={latestPosts} />
		</>
	);
}