"use client";

import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import Image from "next/image";
import type { BlogPost } from "./page";

interface ViewBlogProps {
	data: BlogPost;
	onBack: () => void;
	onEdit: () => void;
}

export default function ViewBlog({ data, onBack }: ViewBlogProps) {
	return (
		<div className="flex flex-col h-full overflow-auto pb-8">
			<button
				type="button"
				onClick={onBack}
				className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-600 mb-3 transition-colors font-mono"
			>
				<ArrowLeft size={14} /> Back to Articles
			</button>

			{/* Content Wrapper */}
			<div className="px-7">
				{data.imageUrl && (
					<div className="relative w-full overflow-hidden rounded-2xl shadow-lg border border-gray-200/50">
						<div className="relative aspect-video w-full">
							<Image
								src={data.imageUrl}
								alt={data.title}
								fill
								priority
								className="object-cover transition-transform duration-700 hover:scale-105"
								sizes="(max-width: 768px) 100vw, 800px"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
						</div>
					</div>
				)}

				<div className="p-8">
					{/* Category */}
					<div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs font-mono border border-green-200 w-fit">
						<Tag size={12} /> {data.category || "Uncategorized"}
					</div>

					{/* Title & Metadata Row */}
					<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mt-4">
						<h1 className="text-xl font-mono font-bold text-gray-900 flex-1">
							{data.title}
						</h1>
						<div className="flex items-center gap-6 text-xs font-mono text-gray-500 shrink-0">
							<div className="flex items-center gap-2">
								<User size={14} className="text-green-600" />
								{data.authorName || "Anonymous"}
							</div>
							<div className="flex items-center gap-2">
								<Calendar size={14} className="text-green-600" />
								{data.createdAt || "Date unknown"}
							</div>
						</div>
					</div>

					{data.subtitle && (
						<p className="text-xs font-mono text-gray-500 italic mt-1">
							{data.subtitle}
						</p>
					)}

					{/* Body */}
					<div className="mt-8 text-sm prose font-mono prose-green max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
						{data.body || "No content provided."}
					</div>
				</div>
			</div>
		</div>
	);
}
