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
		const h1Anim = animate(0, h1Content.length, {
			duration: 1.5,
			ease: "linear",
			onUpdate: (latest) => setH1Text(h1Content.slice(0, Math.round(latest))),
		});
		const pAnim = animate(0, pContent.length, {
			duration: 1.5,
			delay: 1.5,
			ease: "linear",
			onUpdate: (latest) => setPText(pContent.slice(0, Math.round(latest))),
		});
		return () => {
			h1Anim.stop();
			pAnim.stop();
		};
	}, []);

	const renderStyledH1 = (text: string) => {
		if (!text.includes("AAA")) {
			return <>{text}</>;
		}
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
		<div className="w-full">
			{/* Sticky/Responsive Hero Header */}
			<div className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-white/10 w-full py-3 px-4">
				<div className="relative z-10 flex flex-col items-center max-w-7xl mx-auto">
					<div className="text-center">
						<h1 className="font-mono text-sm sm:text-base md:text-lg font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] inline-flex items-center justify-center">
							{renderStyledH1(h1Text)}
							<motion.span
								animate={{ opacity: [0, 1, 0] }}
								transition={{ repeat: Infinity, duration: 0.8 }}
								className="text-cyan-400 ml-0.5"
							>
								|
							</motion.span>
						</h1>

						<p className="text-slate-400 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-0.5">
							{pText}
						</p>
					</div>
				</div>
			</div>

			{/* Carousel Section */}
			<BlogCarousel posts={latestPosts} />
		</div>
	);
}