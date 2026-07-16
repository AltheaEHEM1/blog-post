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
import RichTextEditor from "@/components/rich-text-editor/rich-text-editor";
import { blogSchema, sanitizeInput } from "@/lib/validations";
import type { BlogPost, Category } from "./blog-admin";

interface BlogFormProps {
	initialData?: BlogPost;
	categories: Category[];
	onDone: () => void;
	onCancel: () => void;
}

interface FieldErrors {
	title?: string;
	subtitle?: string;
	authorName?: string;
	body?: string;
}

export default function BlogForm({
	initialData,
	categories,
	onDone,
	onCancel,
}: BlogFormProps) {
	const action = initialData ? updateBlog : createBlog;
	const [state, formAction, isPending] = useActionState(action, null);

	const [imageUrl, setImageUrl] = useState<string>(initialData?.imageUrl ?? "");
	const [uploading, setUploading] = useState(false);

	const [title, setTitle] = useState(initialData?.title ?? "");
	const [subtitle, setSubtitle] = useState(initialData?.subtitle ?? "");
	const [authorName, setAuthorName] = useState(initialData?.authorName ?? "");
	const [body, setBody] = useState<string>(initialData?.body ?? "");

	const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (state?.success) {
			toast.success(
				initialData
					? "Blog post updated successfully"
					: "Blog post published successfully",
			);
			onDone();
		}
		// No toast on validation errors — those render inline below each field.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state, onDone, initialData]);

	// ── Live validation, field by field, against blogSchema.shape.<field> ──
	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const sanitized = sanitizeInput(e.target.value, 200);
		setTitle(sanitized);
		const result = blogSchema.shape.title.safeParse(sanitized);
		setFieldErrors((prev) => ({
			...prev,
			title: result.success ? undefined : result.error.issues[0]?.message,
		}));
	};

	const handleSubtitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const sanitized = sanitizeInput(e.target.value, 200);
		setSubtitle(sanitized);
		const result = blogSchema.shape.subtitle.safeParse(sanitized);
		setFieldErrors((prev) => ({
			...prev,
			subtitle: result.success ? undefined : result.error.issues[0]?.message,
		}));
	};

	const handleAuthorNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const sanitized = sanitizeInput(e.target.value, 80);
		setAuthorName(sanitized);
		const result = blogSchema.shape.authorName.safeParse(sanitized);
		setFieldErrors((prev) => ({
			...prev,
			authorName: result.success ? undefined : result.error.issues[0]?.message,
		}));
	};

	// RichTextEditor is contentEditable, so keystrokes can't be intercepted to
	// block double spaces there — length/space rules are still validated live.
	const handleBodyChange = (html: string) => {
		setBody(html);
		const result = blogSchema.shape.body.safeParse(html);
		setFieldErrors((prev) => ({
			...prev,
			body: result.success ? undefined : result.error.issues[0]?.message,
		}));
	};

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

			setImageUrl(result.url ?? "");
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

	const isFormInvalid =
		Boolean(fieldErrors.title) ||
		Boolean(fieldErrors.subtitle) ||
		Boolean(fieldErrors.authorName) ||
		Boolean(fieldErrors.body) ||
		title.trim().length === 0 ||
		authorName.trim().length === 0 ||
		body.trim().length < 10;

	return (
		<div className="flex flex-col h-full overflow-auto pb-8 px-7">
			<form action={formAction} className="space-y-8">
				{initialData && (
					<input type="hidden" name="id" value={initialData.id} />
				)}
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
							value={title}
							onChange={handleTitleChange}
							className="w-full rounded-md border border-gray-400 px-3 py-2 text-xs font-mono focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
							placeholder="Enter title"
						/>
						{fieldErrors.title && (
							<p className="text-xs text-red-500 font-mono">
								{fieldErrors.title}
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
							value={authorName}
							onChange={handleAuthorNameChange}
							className="w-full rounded-md border border-gray-400 px-3 py-2 text-xs font-mono focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
							placeholder="Writer's name..."
						/>
						{fieldErrors.authorName && (
							<p className="text-xs text-red-500 font-mono">
								{fieldErrors.authorName}
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
								rows={3}
								value={subtitle}
								onChange={handleSubtitleChange}
								className="w-full rounded-md border border-gray-400 px-3 py-2 text-xs font-mono focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 resize-none"
								placeholder="Article hook..."
							/>
							{fieldErrors.subtitle && (
								<p className="text-xs text-red-500 font-mono">
									{fieldErrors.subtitle}
								</p>
							)}
						</div>
					</div>

					{/* Cover Image */}
					<div className="flex flex-col gap-1.5">
						<span className="text-xs font-semibold font-mono text-gray-700">
							Cover Image
						</span>

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

				{/* ── Section 3: Content Body (Rich Text Editor) ── */}
				<div className="flex flex-col gap-1.5">
					<span className="text-xs font-semibold font-mono text-gray-600">
						Body <span className="text-red-500">*</span>
					</span>
					<input type="hidden" name="body" value={body} />
					<RichTextEditor content={body} onChange={handleBodyChange} />
					{fieldErrors.body && (
						<p className="text-xs text-red-500 font-mono">{fieldErrors.body}</p>
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
						disabled={isPending || uploading || isFormInvalid}
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
