"use client";

import { ArrowLeft, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { Button } from "@/components/button/button";
import type { BlogPost } from "./page";

interface BlogFormProps {
	initialData?: BlogPost;
	onSubmit: (values: Omit<BlogPost, "id">) => void;
	onCancel: () => void;
}

export default function BlogForm({
	initialData,
	onSubmit,
	onCancel,
}: BlogFormProps) {
	const [title, setTitle] = useState("");
	const [subtitle, setSubtitle] = useState("");
	const [body, setBody] = useState("");
	const [category, setCategory] = useState("");
	const [authorName, setAuthorName] = useState("");
	const [createdAt, _setCreatedAt] = useState("");
	const [imagePreview, setImagePreview] = useState<string>("");

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] ?? null;
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveImage = () => {
		setImagePreview("");
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!title.trim() || !body.trim()) return;

		const data: Omit<BlogPost, "id"> = {
			title: title.trim(),
			subtitle: subtitle.trim(),
			body: body.trim(),
			category: category.trim() || "Uncategorized",
			authorName: authorName.trim() || "Anonymous",
			createdAt: createdAt || new Date().toISOString().split("T")[0],
			imageUrl: imagePreview,
		};
		onSubmit(data);
	};

	return (
		<div className="flex flex-col h-full overflow-auto pb-8">
			{/* Back link */}
			<button
				type="button"
				onClick={onCancel}
				className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-600 transition-colors font-mono mb-4 w-fit cursor-pointer"
			>
				<ArrowLeft size={14} /> Back to Articles
			</button>

			{/* Main Form Container */}
			<div className="px-7">
				<form className="space-y-6" onSubmit={handleSubmit}>
					<div className="flex flex-col">
						<label
							className="block text-xs font-semibold mb-1 font-mono text-gray-700"
							htmlFor="image-input"
						>
							Cover Image
						</label>
						{imagePreview ? (
							<div className="relative border border-gray-200 rounded-lg p-2 flex items-center gap-3 bg-gray-50/50">
								<Image
									src={imagePreview}
									alt="Preview of the uploaded blog cover"
									className="object-cover rounded"
									width={80}
									height={56}
								/>
								<div className="flex-1 min-w-0">
									<p className="text-xs font-mono text-gray-500 truncate">
										Cover Image Selected
									</p>
								</div>
								<button
									type="button"
									onClick={handleRemoveImage}
									className="p-1 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shrink-0 cursor-pointer"
									title="Remove Image"
								>
									<X size={16} />
								</button>
							</div>
						) : (
							<div className="relative border border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50/10 transition-colors p-15 flex flex-col items-center justify-center gap-1.5 cursor-pointer">
								<ImageIcon size={30} className="text-gray-400" />
								<span className="text-xs text-gray-500 font-mono">
									Upload high-res cover image
								</span>
								<input
									id="image-input"
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
								/>
							</div>
						)}
					</div>

					{/* Title and Subtitle Row */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
						{/* Title */}
						<div className="flex flex-col">
							<label
								className="block text-xs font-semibold mb-0.5 font-mono text-gray-500"
								htmlFor="title-input"
							>
								Title <span className="text-red-500">*</span>
							</label>
							<input
								id="title-input"
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="w-full rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs font-mono focus:border-green-50 focus:outline-none focus:ring-1 focus:ring-green-50"
								placeholder="Enter title"
								required
							/>
						</div>

						{/* Subtitle */}
						<div className="flex flex-col">
							<label
								className="block text-xs font-semibold mb-0.5 font-mono text-gray-500"
								htmlFor="subtitle-input"
							>
								Subtitle
							</label>
							<input
								id="subtitle-input"
								type="text"
								value={subtitle}
								onChange={(e) => setSubtitle(e.target.value)}
								className="w-full rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs font-mono focus:border-green-50 focus:outline-none focus:ring-1 focus:ring-green-50"
								placeholder="Article hook..."
							/>
						</div>
					</div>

					{/* Author Name and Category Row */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
						{/* Author Name */}
						<div className="flex flex-col">
							<label
								className="block text-xs font-semibold mb-0.5 font-mono text-gray-500"
								htmlFor="author-input"
							>
								Author
							</label>
							<input
								id="author-input"
								type="text"
								value={authorName}
								onChange={(e) => setAuthorName(e.target.value)}
								className="w-full rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs font-mono focus:border-green-50 focus:outline-none focus:ring-1 focus:ring-green-50"
								placeholder="Writer's name..."
							/>
						</div>

						{/* Category */}
						<div className="flex flex-col">
							<label
								className="block text-xs font-semibold mb-0.5 font-mono text-gray-500 "
								htmlFor="category-input"
							>
								Category <span className="text-red-500">*</span>
							</label>
							<select
								id="category-input"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								className="w-full rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs font-mono focus:border-green-50 focus:outline-none focus:ring-1 focus:ring-green-50 text-gray-700"
							>
								<option value="">Select category</option>
								<option value="Tech">Tech</option>
								<option value="Design">Design</option>
								<option value="Performance">Performance</option>
							</select>
						</div>
					</div>

					{/* Body Content */}
					<div className="flex flex-col mt-3">
						<label
							className="block text-xs font-semibold mb-0.5 font-mono text-gray-500"
							htmlFor="body-input"
						>
							Body <span className="text-red-500">*</span>
						</label>
						<textarea
							id="body-input"
							rows={4}
							value={body}
							onChange={(e) => setBody(e.target.value)}
							className="w-full rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs font-mono focus:border-green-50 focus:outline-none focus:ring-1 focus:ring-green-50 leading-relaxed"
							placeholder="Compose your article..."
							required
						/>
					</div>

					{/* Footer Buttons */}
					<div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
						<Button
							type="button"
							variant="ghost"
							onClick={onCancel}
							className="cursor-pointer"
						>
							Cancel
						</Button>
						<Button type="submit" variant="green" className="cursor-pointer">
							{initialData ? "Update Post" : "Publish Post"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
