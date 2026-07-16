"use client";

import { ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import {
	type ChangeEvent,
	useActionState,
	useEffect,
	useRef,
	useState,
} from "react";
import { toast } from "sonner";
import { createBlog, updateBlog } from "@/actions/blog-action";
import { uploadImage } from "@/actions/upload-action";
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

	// Holds the committed Blob URL (or pre-existing one on edit)
	const [imageUrl, setImageUrl] = useState<string>(initialData?.imageUrl ?? "");
	const [uploading, setUploading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

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

	const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setUploading(true);
		try {
			const uploadData = new FormData();
			uploadData.append("file", file);
			const result = await uploadImage(uploadData);

			if (result.error) {
				toast.error(result.error);
				return;
			}

			setImageUrl(result.url);
			toast.success("Image uploaded successfully");
		} catch {
			toast.error("Image upload failed — please try again");
		} finally {
			setUploading(false);
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	};

	const handleRemoveImage = () => {
		setImageUrl("");
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	return (
		<div className="flex flex-col h-full overflow-auto pb-8 px-7">
			<form action={formAction} className="space-y-8">
				{initialData && (
					<input type="hidden" name="id" value={initialData.id} />
				)}
				{/* Pass the committed Blob URL to the Server Action */}
				<input type="hidden" name="imageUrl" value={imageUrl} />

				{/* ── Section 1: Basic Info ───────────────────── */}
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
						{state?.error?.authorName && (
							<p className="text-xs text-red-500 font-mono">
								{state.error.authorName[0]}
							</p>
						)}
					</div>
				</div>

				{/* ── Section 2: Categorization, Hook, Cover Image ── */}
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
							{state?.error?.categoryId && (
								<p className="text-xs text-red-500 font-mono">
									{state.error.categoryId[0]}
								</p>
							)}
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

					{/* Cover Image — now uploads to Vercel Blob */}
					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-semibold font-mono text-gray-700">
							Cover Image
						</label>

						{imageUrl ? (
							<div className="relative border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
								<div className="relative w-full aspect-video">
									<Image
										src={imageUrl}
										alt="Cover preview"
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, 500px"
									/>
								</div>
								<button
									type="button"
									onClick={handleRemoveImage}
									className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
									title="Remove image"
								>
									<X size={14} />
								</button>
							</div>
						) : (
							<label
								htmlFor="cover-image"
								className={`relative border border-dashed border-gray-400 rounded-lg hover:border-green-400 hover:bg-green-50/10 transition-colors h-[150px] flex flex-col items-center justify-center gap-2 ${
									uploading
										? "pointer-events-none opacity-60 cursor-not-allowed"
										: "cursor-pointer"
								}`}
							>
								{uploading ? (
									<>
										<Loader2 size={24} className="text-gray-400 animate-spin" />
										<span className="text-xs text-gray-500 font-mono">
											Uploading to Blob...
										</span>
									</>
								) : (
									<>
										<ImageIcon size={24} className="text-gray-400" />
										<span className="text-xs text-gray-500 font-mono">
											Click to upload cover image
										</span>
										<span className="text-[11px] text-gray-400 font-mono">
											JPEG, PNG, WebP or GIF — max 5MB
										</span>
									</>
								)}
							</label>
						)}

						<input
							id="cover-image"
							ref={fileInputRef}
							type="file"
							accept="image/jpeg,image/png,image/webp,image/gif"
							onChange={handleImageChange}
							disabled={uploading}
							className="hidden"
						/>
					</div>
				</div>

				{/* ── Section 3: Content Body ──────────────────── */}
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
					{state?.error?.body && (
						<p className="text-xs text-red-500 font-mono">
							{state.error.body[0]}
						</p>
					)}
				</div>

				{/* ── Footer Actions ───────────────────────────── */}
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
						disabled={isPending || uploading}
					>
						{isPending
							? "Saving..."
							: uploading
								? "Uploading image..."
								: initialData
									? "Update Post"
									: "Publish Post"}
					</Button>
				</div>
			</form>
		</div>
	);
}
