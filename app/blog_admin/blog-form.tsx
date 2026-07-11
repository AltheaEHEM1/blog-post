"use client";

import { ArrowLeft, ImageIcon, X } from "lucide-react";
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/button/button";
import type { BlogPost } from "./page";

interface BlogFormProps {
	/**
	 * Optional initial data for editing an existing blog.
	 */
	initialData?: BlogPost;
	/**
	 * Callback with form values when the user submits.
	 */
	onSubmit: (values: Omit<BlogPost, "id">) => void;
	/**
	 * Callback to return to the list view.
	 */
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
	const [createdAt, setCreatedAt] = useState("");
	const [imagePreview, setImagePreview] = useState<string>("");

	// Populate fields when editing or opening
	useEffect(() => {
		if (initialData) {
			setTitle(initialData.title ?? "");
			setSubtitle(initialData.subtitle ?? "");
			setBody(initialData.body ?? "");
			setCategory(initialData.category ?? "");
			setAuthorName(initialData.authorName ?? "");
			setCreatedAt(initialData.createdAt ?? "");
			setImagePreview(initialData.imageUrl ?? "");
		} else {
			// Reset all fields for fresh add, set default date to today
			setTitle("");
			setSubtitle("");
			setBody("");
			setCategory("");
			setAuthorName("");
			setCreatedAt(new Date().toISOString().split("T")[0]);
			setImagePreview("");
		}
	}, [initialData]);

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
		if (!title.trim() || !body.trim()) return; // basic validation

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
			<div className="bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-xl p-6 shadow-sm max-w-4xl w-full">
				<h2 className="text-xl font-bold font-mono text-green-900 mb-6 pb-2 border-b border-gray-100">
					{initialData ? "Modify Article Details" : "Write a New Article"}
				</h2>

				<form className="space-y-6" onSubmit={handleSubmit}>
					{/* Title and Subtitle Row */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Title */}
						<div className="flex flex-col">
							<label
								className="block text-xs font-semibold mb-1 font-mono text-gray-700"
								htmlFor="title-input"
							>
								Title <span className="text-red-500">*</span>
							</label>
							<input
								id="title-input"
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-mono focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
								placeholder="Enter a descriptive title..."
								required
							/>
						</div>

						{/* Subtitle */}
						<div className="flex flex-col">
							<label
								className="block text-xs font-semibold mb-1 font-mono text-gray-700"
								htmlFor="subtitle-input"
							>
								Subtitle
							</label>
							<input
								id="subtitle-input"
								type="text"
								value={subtitle}
								onChange={(e) => setSubtitle(e.target.value)}
								className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-mono focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
								placeholder="Enter article hook or summary..."
							/>
						</div>
					</div>

					{/* Author Name and Category Row */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Author Name */}
						<div className="flex flex-col">
							<label
								className="block text-xs font-semibold mb-1 font-mono text-gray-700"
								htmlFor="author-input"
							>
								Author Name
							</label>
							<input
								id="author-input"
								type="text"
								value={authorName}
								onChange={(e) => setAuthorName(e.target.value)}
								className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-mono focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
								placeholder="Enter writer's name..."
							/>
						</div>

						{/* Category */}
						<div className="flex flex-col">
							<label
								className="block text-xs font-semibold mb-1 font-mono text-gray-700"
								htmlFor="category-input"
							>
								Category
							</label>
							<select
								id="category-input"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-mono focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-700"
							>
								<option value="">Select a category</option>
								<option value="Tech">Tech</option>
								<option value="Design">Design</option>
								<option value="Performance">Performance</option>
								<option value="DevOps">DevOps</option>
								<option value="UX">UX</option>
								<option value="Backend">Backend</option>
								<option value="Testing">Testing</option>
							</select>
						</div>
					</div>

					{/* Created At and Image Row */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Created At */}
						<div className="flex flex-col">
							<label
								className="block text-xs font-semibold mb-1 font-mono text-gray-700"
								htmlFor="created-at-input"
							>
								Created At
							</label>
							<input
								id="created-at-input"
								type="date"
								value={createdAt}
								onChange={(e) => setCreatedAt(e.target.value)}
								className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-mono focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-700"
							/>
						</div>

						{/* Image Upload Block */}
						<div className="flex flex-col">
							<label
								className="block text-xs font-semibold mb-1 font-mono text-gray-700"
								htmlFor="image-input"
							>
								Cover Image
							</label>
							{imagePreview ? (
								<div className="relative border border-gray-200 rounded-lg p-2 flex items-center gap-3 bg-gray-50/50">
									<img
										src={imagePreview}
										alt="Preview"
										className="h-14 w-20 object-cover rounded border border-gray-200 shrink-0"
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
								<div className="relative border border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50/10 transition-colors p-3 flex flex-col items-center justify-center gap-1.5 cursor-pointer">
									<ImageIcon size={20} className="text-gray-400" />
									<span className="text-[10px] text-gray-500 font-mono">
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
					</div>

					{/* Body Content */}
					<div className="flex flex-col">
						<label
							className="block text-xs font-semibold mb-1 font-mono text-gray-700"
							htmlFor="body-input"
						>
							Body Content <span className="text-red-500">*</span>
						</label>
						<textarea
							id="body-input"
							rows={4}
							value={body}
							onChange={(e) => setBody(e.target.value)}
							className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-mono focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 leading-relaxed"
							placeholder="Compose your article body content here..."
							required
						/>
					</div>

					{/* Footer Buttons */}
					<div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={onCancel}
							className="cursor-pointer"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							variant="green"
							size="sm"
							className="cursor-pointer"
						>
							{initialData ? "Update Post" : "Publish Post"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
