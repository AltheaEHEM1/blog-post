"use client";

import { ArrowLeft } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/button/button";
import { createBlog, updateBlog } from "@/actions/blog-action";
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

	useEffect(() => {
		if (state?.success) {
			toast.success(
				initialData ? "Blog post updated successfully" : "Blog post published successfully"
			);
			onDone();
		} else if (state?.error) {
			const firstError = Object.values(state.error).flat()[0];
			if (firstError) toast.error(firstError as string);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	return (
		<div className="flex flex-col h-full overflow-auto pb-8">
			<button
				type="button"
				onClick={onCancel}
				className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-600 transition-colors font-mono mb-4 w-fit cursor-pointer"
			>
				<ArrowLeft size={14} /> Back to Articles
			</button>

			<div className="px-7">
				<form action={formAction} className="space-y-6">
					{initialData && <input type="hidden" name="id" value={initialData.id} />}

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
							rows={4}
							defaultValue={initialData?.body ?? ""}
							className="w-full rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs font-mono focus:border-green-50 focus:outline-none focus:ring-1 focus:ring-green-50 leading-relaxed"
							placeholder="Compose your article..."
						/>
						{state?.error?.body && (
							<p className="text-xs text-red-500 mt-1 font-mono">{state.error.body[0]}</p>
						)}
					</div>

					<div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
						<Button
							type="button"
							variant="ghost"
							onClick={onCancel}
							className="cursor-pointer"
						>
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
