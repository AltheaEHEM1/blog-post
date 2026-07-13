"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { addComment } from "@/actions/comment-action";

interface Comment {
	id: string;
	authorName: string;
	body: string;
	createdAt: Date;
}

interface CommentSectionProps {
	blogId: string;
	initialComments: Comment[];
}

export default function CommentSection({
	blogId,
	initialComments,
}: CommentSectionProps) {
	const [state, formAction, isPending] = useActionState(addComment, null);
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (state?.success) {
			formRef.current?.reset();
			toast.success("Comment submitted! It'll appear once approved.");
		} else if (state?.error && typeof state.error === "object") {
			const firstError = Object.values(state.error).flat()[0];
			if (firstError) toast.error(firstError as string);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	return (
		<section className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-10">
			<h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
				Comments ({initialComments.length})
			</h2>

			{initialComments.length === 0 ? (
				<p className="text-sm font-mono text-slate-500 mb-8">
					No comments yet — be the first to comment.
				</p>
			) : (
				<div className="space-y-6 mb-10">
					{initialComments.map((comment) => (
						<div
							key={comment.id}
							className="border border-slate-200 dark:border-slate-800 rounded-lg p-4"
						>
							<div className="flex items-center justify-between mb-2">
								<span className="font-semibold text-sm text-slate-900 dark:text-white">
									{comment.authorName}
								</span>
								<span className="text-xs font-mono text-slate-500">
									{new Date(comment.createdAt).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</span>
							</div>
							<p className="text-sm text-slate-600 dark:text-slate-400 font-mono leading-relaxed">
								{comment.body}
							</p>
						</div>
					))}
				</div>
			)}

			<h3 className="text-sm font-mono uppercase tracking-wider text-slate-500 mb-4">
				Leave a comment
			</h3>

			<form ref={formRef} action={formAction} className="space-y-4">
				<input type="hidden" name="blogId" value={blogId} />

				<div>
					<label
						htmlFor="authorName"
						className="block text-xs font-mono text-slate-500 mb-1 uppercase tracking-wider"
					>
						Name
					</label>
					<input
						id="authorName"
						name="authorName"
						type="text"
						placeholder="Your name"
						className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500"
					/>
					{state?.error?.authorName && (
						<p className="text-xs text-red-500 mt-1 font-mono">
							{state.error.authorName[0]}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="body"
						className="block text-xs font-mono text-slate-500 mb-1 uppercase tracking-wider"
					>
						Comment
					</label>
					<textarea
						id="body"
						name="body"
						rows={4}
						placeholder="Write a comment... (min 10 characters)"
						className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500"
					/>
					{state?.error?.body && (
						<p className="text-xs text-red-500 mt-1 font-mono">
							{state.error.body[0]}
						</p>
					)}
				</div>

				<button
					type="submit"
					disabled={isPending}
					className="inline-flex items-center text-sm font-bold text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-md px-4 py-2 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors disabled:opacity-50"
				>
					{isPending ? "Posting..." : "Post Comment"}
				</button>
			</form>
		</section>
	);
}
