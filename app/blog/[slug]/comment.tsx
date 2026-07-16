"use client";

import { AlertCircle, MessageCircle } from "lucide-react";
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

function FieldError({ message }: { message: string }) {
	return (
		<div className="flex items-start gap-1.5 mt-1.5 px-2 py-1.5 rounded-md bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900">
			<AlertCircle
				size={12}
				className="text-red-500 dark:text-red-400 shrink-0 mt-px"
			/>
			<p className="text-[11px] text-red-600 dark:text-red-400 wrap-break-word leading-snug">
				{message}
			</p>
		</div>
	);
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
	}, [state]);

	return (
		<div className="mb-16">
			<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-6 lg:gap-8 items-start">
				{/* LEFT: Comment form */}
				<div className="lg:sticky lg:top-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 sm:p-5">
					<h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
						<MessageCircle
							size={17}
							className="text-cyan-600 dark:text-cyan-400"
						/>
						Comments ({initialComments.length})
					</h2>
					<h3 className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300 mb-3">
						Leave a comment
					</h3>

					<form ref={formRef} action={formAction} className="space-y-3">
						<input type="hidden" name="blogId" value={blogId} />

						<div>
							<label
								htmlFor="authorName"
								className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1 uppercase tracking-wide"
							>
								Name
							</label>
							<input
								id="authorName"
								name="authorName"
								type="text"
								placeholder="Your name"
								className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
							/>
							{state?.error?.authorName && (
								<FieldError message={state.error.authorName[0]} />
							)}
						</div>

						<div>
							<label
								htmlFor="body"
								className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1 uppercase tracking-wide"
							>
								Comment
							</label>
							<textarea
								id="body"
								name="body"
								rows={3}
								placeholder="Write a comment..."
								className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 px-2.5 py-1.5 text-xs resize-y focus:outline-none focus:ring-1 focus:ring-cyan-500"
							/>
							{state?.error?.body && (
								<FieldError message={state.error.body[0]} />
							)}
						</div>

						<button
							type="submit"
							disabled={isPending}
							className="inline-flex items-center text-xs font-semibold text-white bg-slate-900 dark:bg-cyan-600 rounded-md px-3.5 py-1.5 hover:opacity-90 transition-opacity disabled:opacity-50"
						>
							{isPending ? "Posting..." : "Post Comment"}
						</button>
					</form>
				</div>

				{/* RIGHT: Comments list */}
				<div className="min-w-0">
					{initialComments.length === 0 ? (
						<div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 text-center">
							<p className="text-xs text-slate-500 dark:text-slate-400">
								No comments yet — be the first to comment.
							</p>
						</div>
					) : (
						<div className="space-y-3">
							{initialComments.map((comment) => (
								<div
									key={comment.id}
									className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3.5 min-w-0"
								>
									<div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mb-1.5">
										<span className="font-semibold text-xs text-slate-900 dark:text-white wrap-break-word min-w-0">
											{comment.authorName}
										</span>
										<span className="text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
											{new Date(comment.createdAt).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</span>
									</div>
									<p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed rap-break-word overflow-wrap:anywhere">
										{comment.body}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
