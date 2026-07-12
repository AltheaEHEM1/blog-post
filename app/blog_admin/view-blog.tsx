"use client";

import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import Image from "next/image";
import type { BlogPost } from "./blog-admin";

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

			<div className="px-7">

				<div className="p-8">
					<div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs font-mono border border-green-200 w-fit">
						<Tag size={12} /> {data.category?.name ?? "Uncategorized"}
					</div>

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
								{new Date(data.createdAt).toLocaleDateString()}
							</div>
						</div>
					</div>

					{data.subtitle && (
						<p className="text-xs font-mono text-gray-500 italic mt-1">
							{data.subtitle}
						</p>
					)}

					<div className="mt-8 text-sm prose font-mono prose-green max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
						{data.body || "No content provided."}
					</div>
				</div>
			</div>
		</div>
	);
}