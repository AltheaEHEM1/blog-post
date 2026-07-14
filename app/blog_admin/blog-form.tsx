"use client";

import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createBlog, updateBlog } from "@/actions/blog-action";
import { Button } from "@/components/button/button";
import type { BlogPost, Category } from "./blog-admin";

interface BlogFormProps {
	initialData?: BlogPost;
	categories: Category[];
	onDone: () => void;
	onCancel: () => void;
}

export default function BlogForm({ initialData, categories, onDone, onCancel }: BlogFormProps) {
	const action = initialData ? updateBlog : createBlog;
	const [state, formAction, isPending] = useActionState(action, null);
	const [imagePreview, setImagePreview] = useState<string>(initialData?.imageUrl ?? "");

	useEffect(() => {
		if (state?.success) {
			toast.success(
				initialData ? "Blog post updated successfully" : "Blog post published successfully",
			);
			onDone();
		} else if (state?.error) {
			const firstError = Object.values(state.error).flat()[0];
			if (firstError) toast.error(firstError as string);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state, onDone, initialData]);

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

	return (
		<div className="flex flex-col h-full overflow-auto pb-8">
			<div className="px-7">
				<form action={formAction} className="space-y-6">
					{initialData && <input type="hidden" name="id" value={initialData.id} />}
					<input type="hidden" name="imageUrl" value={imagePreview} />

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

					<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
						<div className="flex flex-col">
							<label
								className="block text-xs font-semibold mb-0.5 font-mono text-gray-500"
								htmlFor="title-input"
							>
								Title <span className="text-red-500">*</span>
							</label>
							<input
								id="title-input"
								name="title"
								type="text"
								defaultValue={initialData?.title ?? ""}
								className="w-full rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs font-mono focus:border-green-50 focus:outline-none focus:ring-1 focus:ring-green-50"
								placeholder="Enter title"
							/>
							{state?.error?.title && (
								<p className="text-xs text-red-500 mt-1 font-mono">{state.error.title[0]}</p>
							)}
						</div>

						<div className="flex flex-col">
							<label
								className="block text-xs font-semibold mb-0.5 font-mono text-gray-500"
								htmlFor="subtitle-input"
							>
								Subtitle
							</label>
							<input
								id="subtitle-input"
								name="subtitle"
								type="text"
								defaultValue={initialData?.subtitle ?? ""}
								className="w-full rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs font-mono focus:border-green-50 focus:outline-none focus:ring-1 focus:ring-green-50"
								placeholder="Article hook..."
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
						<div className="flex flex-col">
							<label
								className="block text-xs font-semibold mb-0.5 font-mono text-gray-500"
								htmlFor="author-input"
							>
								Author
							</label>
							<input
								id="author-input"
								name="authorName"
								type="text"
								defaultValue={initialData?.authorName ?? ""}
								className="w-full rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs font-mono focus:border-green-50 focus:outline-none focus:ring-1 focus:ring-green-50"
								placeholder="Writer's name..."
							/>
							{state?.error?.authorName && (
								<p className="text-xs text-red-500 mt-1 font-mono">{state.error.authorName[0]}</p>
							)}
						</div>

						<div className="flex flex-col">
							<label
								className="block text-xs font-semibold mb-0.5 font-mono text-gray-500"
								htmlFor="category-input"
							>
								Category <span className="text-red-500">*</span>
							</label>
							<select
								id="category-input"
								name="categoryId"
								defaultValue={initialData?.categoryId ?? ""}
								className="w-full rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs font-mono focus:border-green-50 focus:outline-none focus:ring-1 focus:ring-green-50 text-gray-700"
							>
								<option value="">Select category</option>
								{categories.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.name}
									</option>
								))}
							</select>
							{state?.error?.categoryId && (
								<p className="text-xs text-red-500 mt-1 font-mono">{state.error.categoryId[0]}</p>
							)}
						</div>
					</div>

					<div className="flex flex-col mt-3">
						<label
							className="block text-xs font-semibold mb-0.5 font-mono text-gray-500"
							htmlFor="body-input"
						>
							Body <span className="text-red-500">*</span>
						</label>
						<textarea
							id="body-input"
							name="body"
							rows={20}
							defaultValue={initialData?.body ?? ""}
							className="w-full rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs font-mono focus:border-green-50 focus:outline-none focus:ring-1 focus:ring-green-50 leading-relaxed"
							placeholder="Compose your article..."
						/>
						{state?.error?.body && (
							<p className="text-xs text-red-500 mt-1 font-mono">{state.error.body[0]}</p>
						)}
					</div>

					<div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
						<Button type="button" variant="ghost" onClick={onCancel} className="cursor-pointer">
							Cancel
						</Button>
						<Button type="submit" variant="green" className="cursor-pointer" disabled={isPending}>
							{isPending ? "Saving..." : initialData ? "Update Post" : "Publish Post"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}