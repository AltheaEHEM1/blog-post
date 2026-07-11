"use client";

import { ArrowLeft, BookOpen, Calendar, Edit, Tag, User } from "lucide-react";
import { Button } from "@/components/button/button";
import type { BlogPost } from "./page";

interface ViewBlogProps {
	data: BlogPost;
	onBack: () => void;
	onEdit: () => void;
}

export default function ViewBlog({ data, onBack, onEdit }: ViewBlogProps) {
	return (
		<div className="flex flex-col h-full overflow-auto pb-8">
			{/* Back Link */}
			<button
				type="button"
				onClick={onBack}
				className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-600 transition-colors font-mono mb-4 w-fit cursor-pointer"
			>
				<ArrowLeft size={14} /> Back to Articles
			</button>

			{/* Main Article Container */}
			<div className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-sm max-w-4xl w-full">
				{/* Cover Image or Gradient Fallback */}
				{data.imageUrl ? (
					<div className="relative h-64 w-full border-b border-gray-150">
						<img
							src={data.imageUrl}
							alt={data.title}
							className="h-full w-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
					</div>
				) : (
					<div className="h-44 w-full bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 border-b border-gray-200 flex flex-col items-center justify-center gap-2">
						<div className="p-3 bg-white rounded-full shadow-sm border border-green-100">
							<BookOpen size={24} className="text-green-600" />
						</div>
						<span className="text-xs font-mono font-medium text-green-800">
							Article View
						</span>
					</div>
				)}

				{/* Article Content Padding */}
				<div className="p-6 md:p-8">
					{/* Category Badge */}
					<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-green-50 text-green-700 border border-green-200/60">
						<Tag size={11} className="text-green-500" /> {data.category}
					</span>

					{/* Title */}
					<h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3 font-mono leading-tight tracking-tight">
						{data.title}
					</h1>

					{/* Subtitle */}
					{data.subtitle && (
						<p className="text-base text-gray-500 mt-2 font-mono italic leading-relaxed">
							{data.subtitle}
						</p>
					)}

					{/* Metadata section */}
					<div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-gray-500 border-y border-gray-100 py-3.5 my-6">
						<div className="flex items-center gap-1.5">
							<User size={14} className="text-green-600/70" />
							<span>
								Written by{" "}
								<span className="font-semibold text-gray-800">
									{data.authorName}
								</span>
							</span>
						</div>
						<div className="flex items-center gap-1.5">
							<Calendar size={14} className="text-green-600/70" />
							<span>Published on {data.createdAt}</span>
						</div>
					</div>

					{/* Body Content */}
					<div className="text-sm font-mono text-gray-700 leading-relaxed whitespace-pre-wrap break-words prose max-w-none">
						{data.body}
					</div>

					{/* Action buttons */}
					<div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={onBack}
							className="cursor-pointer"
						>
							Back to List
						</Button>
						<Button
							type="button"
							variant="green"
							size="sm"
							onClick={onEdit}
							className="cursor-pointer"
							icon={<Edit size={14} />}
						>
							Edit Post
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
