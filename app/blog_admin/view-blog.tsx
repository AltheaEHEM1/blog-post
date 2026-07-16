"use client";

import { Calendar, Tag, User } from "lucide-react";
import Image from "next/image";
import type { BlogPost } from "./blog-admin";

interface ViewBlogProps {
	data: BlogPost;
	onEdit: () => void;
}

export default function ViewBlog({ data }: ViewBlogProps) {
	return (
		<div className="flex flex-col h-full w-full min-h-0 overflow-y-auto overflow-x-hidden px-7">
			<div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs font-mono border border-green-200 w-fit">
				<Tag size={12} /> {data.category?.name ?? "Uncategorized"}
			</div>

			<h1 className="text-xl font-mono font-bold text-gray-900 text-center mb-5 w-full">
				{data.title}
			</h1>

			<div>
				{data.imageUrl && (
					<div className="relative w-full overflow-hidden rounded-2xl shadow-lg border border-gray-200/50 mb-6">
						<div className="relative aspect-video w-full">
							<Image
								src={data.imageUrl}
								alt={data.title}
								fill
								priority
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 800px"
							/>
						</div>
					</div>
				)}
			</div>

			<div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-xs font-mono text-gray-500 shrink-0">
				<div className="flex items-center gap-2 whitespace-nowrap">
					<User size={14} className="text-green-600 shrink-0" />
					<span>{data.authorName || "Anonymous"}</span>
				</div>
				<div className="flex items-center gap-2 whitespace-nowrap">
					<Calendar size={14} className="text-green-600 shrink-0" />
					<span>{new Date(data.createdAt).toLocaleDateString()}</span>
				</div>
			</div>

			{data.subtitle && (
				<p className="text-xs font-mono text-gray-500 italic mt-2 text-center mx-auto max-w-xl">
					{data.subtitle}
				</p>
			)}

			{/* Body — rendered as rich HTML (bold, italic, headings, lists, alignment) */}
			<div
				className="mt-8 text-sm prose font-mono prose-green max-w-none text-gray-700 break-words leading-relaxed"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: content authored by trusted admin only
				dangerouslySetInnerHTML={{ __html: data.body }}
			/>
		</div>
	);
}