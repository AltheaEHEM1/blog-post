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

export default function BlogForm({
	initialData,
	categories,
	onDone,
	onCancel,
}: BlogFormProps) {
	const action = initialData ? updateBlog : createBlog;
	const [state, formAction, isPending] = useActionState(action, null);
	const [imagePreview, setImagePreview] = useState<string>(
		initialData?.imageUrl ?? "",
	);

	useEffect(() => {
		if (state?.success) {
			toast.success(
				initialData
					? "Blog post updated successfully"
					: "Blog post published successfully",
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
		<div className="flex flex-col h-full overflow-auto pb-8 px-7">
			<form action={formAction} className="space-y-8">
				{initialData && (
					<input type="hidden" name="id" value={initialData.id} />
				)}
				<input type="hidden" name="imageUrl" value={imagePreview} />

				{/* Section 1: Basic Info */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="md:col-span-2 flex flex-col gap-1.5">
						<label
							className="text-xs font-semibold font-mono text-gray-600"
							htmlFor="title-input"
						>
							Title <span className="text-red-500">*</span>
						</label>
						<input
							id="title-input"
							name="title"
							type="text"
							defaultValue={initialData?.title ?? ""}
							className="w-full rounded-md border border-gray-400 px-3 py-2 text-xs font-mono focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
							placeholder="Enter title"
						/>
						{state?.error?.title && (
							<p className="text-xs text-red-500 font-mono">
								{state.error.title[0]}
							</p>
						)}
					</div>

					<div className="md:col-span-1 flex flex-col gap-1.5">
						<label
							className="text-xs font-semibold font-mono text-gray-600"
							htmlFor="author-input"
						>
							Author
						</label>
						<input
							id="author-input"
							name="authorName"
							type="text"
							defaultValue={initialData?.authorName ?? ""}
							className="w-full rounded-md border border-gray-400 px-3 py-2 text-xs font-mono focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
							placeholder="Writer's name..."
						/>
					</div>
				</div>

				{/* Section 2: Categorization and Hook */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-1.5">
							<label
								className="text-xs font-semibold font-mono text-gray-600"
								htmlFor="category-input"
							>
								Category <span className="text-red-500">*</span>
							</label>
							<select
								id="category-input"
								name="categoryId"
								defaultValue={initialData?.categoryId ?? ""}
								className="w-full rounded-md border border-gray-400 px-3 py-2 text-xs font-mono focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-700"
							>
								<option value="">Select category</option>
								{categories.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.name}
									</option>
								))}
							</select>
						</div>
						<div className="flex flex-col gap-1.5">
							<label
								className="text-xs font-semibold font-mono text-gray-600"
								htmlFor="subtitle-input"
							>
								Subtitle
							</label>
							<textarea
								id="subtitle-input"
								name="subtitle"
								rows={4}
								defaultValue={initialData?.subtitle ?? ""}
								className="w-full rounded-md border border-gray-400 px-3 py-2 text-xs font-mono focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 resize-none"
								placeholder="Article hook..."
							/>
						</div>
					</div>

					{/* Cover Image Upload */}
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="cover-image"
							className="text-xs font-semibold font-mono text-gray-700"
						>
							Cover Image
						</label>
						{imagePreview ? (
							<div className="relative border border-gray-200 rounded-lg p-3 flex items-center gap-3 bg-gray-50/50 h-[100px]">
								<Image
									src={imagePreview}
									alt="Cover preview"
									className="object-cover rounded"
									width={80}
									height={56}
								/>
								<span className="text-xs font-mono text-gray-600 flex-1">
									Cover Image Selected
								</span>
								<button
									type="button"
									onClick={handleRemoveImage}
									className="p-1 rounded-full text-red-500 hover:bg-red-50 cursor-pointer"
								>
									<X size={16} />
								</button>
							</div>
						) : (
							<div className="relative border border-dashed border-gray-400 rounded-lg hover:border-green-400 hover:bg-green-50/10 transition-colors h-[150px] flex flex-col items-center justify-center gap-2 cursor-pointer">
								<ImageIcon size={24} className="text-gray-400" />
								<span className="text-xs text-gray-500 font-mono">
									Upload cover image
								</span>
								<input
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
								/>
							</div>
						)}
					</div>
				</div>

				{/* Section 3: Content Body */}
				<div className="flex flex-col gap-1.5">
					<label
						className="text-xs font-semibold font-mono text-gray-600"
						htmlFor="body-input"
					>
						Body <span className="text-red-500">*</span>
					</label>
					<textarea
						id="body-input"
						name="body"
						rows={12}
						defaultValue={initialData?.body ?? ""}
						className="w-full rounded-md border border-gray-400 px-3 py-2 text-xs font-mono focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 leading-relaxed"
						placeholder="Compose your article..."
					/>
				</div>

				{/* Footer Actions */}
				<div className="flex justify-end gap-3">
					<Button
						type="button"
						variant="ghost"
						onClick={onCancel}
						className="cursor-pointer"
					>
						Cancel
					</Button>
					<Button
						type="submit"
						variant="green"
						className="cursor-pointer"
						disabled={isPending}
					>
						{isPending
							? "Saving..."
							: initialData
								? "Update Post"
								: "Publish Post"}
					</Button>
				</div>
			</form>
		</div>
	);
}
