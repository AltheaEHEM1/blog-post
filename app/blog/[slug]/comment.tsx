"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, MessageCircle } from "lucide-react";
import {
	type ChangeEvent,
	useActionState,
	useEffect,
	useRef,
	useState,
} from "react";
import { toast } from "sonner";
import { addComment } from "@/actions/comment-action";
import { commentSchema, sanitizeInput } from "@/lib/validations";

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

interface FieldErrors {
	authorName?: string;
	body?: string;
}

function FieldError({ message }: { message: string }) {
	return (
		<motion.div
			initial={{ height: 0, opacity: 0 }}
			animate={{ height: "auto", opacity: 1 }}
			exit={{ height: 0, opacity: 0 }}
			transition={{ duration: 0.2 }}
			className="overflow-hidden"
		>
			<div className="flex items-start gap-1.5 mt-1.5 px-2 py-1.5 rounded-md bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900">
				<AlertCircle
					size={12}
					className="text-red-500 dark:text-red-400 shrink-0 mt-px"
				/>
				<p className="text-[11px] text-red-600 dark:text-red-400 wrap-break-word leading-snug">
					{message}
				</p>
			</div>
		</motion.div>
	);
}

export default function CommentSection({
	blogId,
	initialComments,
}: CommentSectionProps) {
	const [state, formAction, isPending] = useActionState(addComment, null);
	const formRef = useRef<HTMLFormElement>(null);

	const [authorName, setAuthorName] = useState("");
	const [body, setBody] = useState("");
	const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

	useEffect(() => {
		if (state?.success) {
			formRef.current?.reset();
			setAuthorName("");
			setBody("");
			setFieldErrors({});
			toast.success("Comment submitted! It'll appear once approved.");
		}
		// No toast on validation errors — those render inline below each field.
	}, [state]);

	const handleAuthorNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const sanitized = sanitizeInput(e.target.value, 80);
		setAuthorName(sanitized);
		const result = commentSchema.shape.authorName.safeParse(sanitized);
		setFieldErrors((prev) => ({
			...prev,
			authorName: result.success ? undefined : result.error.issues[0]?.message,
		}));
	};

	const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const sanitized = sanitizeInput(e.target.value, 2000);
		setBody(sanitized);
		const result = commentSchema.shape.body.safeParse(sanitized);
		setFieldErrors((prev) => ({
			...prev,
			body: result.success ? undefined : result.error.issues[0]?.message,
		}));
	};

	const isFormInvalid =
		Boolean(fieldErrors.authorName) ||
		Boolean(fieldErrors.body) ||
		authorName.trim().length === 0 ||
		body.trim().length < 10;

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
								value={authorName}
								onChange={handleAuthorNameChange}
								placeholder="Your name"
								className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
							/>
							<AnimatePresence>
								{fieldErrors.authorName ? (
									<FieldError
										key="field-authorName"
										message={fieldErrors.authorName}
									/>
								) : (
									state?.error?.authorName && (
										<FieldError
											key="state-authorName"
											message={state.error.authorName[0]}
										/>
									)
								)}
							</AnimatePresence>
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
								value={body}
								onChange={handleBodyChange}
								placeholder="Write a comment..."
								className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 px-2.5 py-1.5 text-xs resize-y focus:outline-none focus:ring-1 focus:ring-cyan-500"
							/>
							<AnimatePresence>
								{fieldErrors.body ? (
									<FieldError key="field-body" message={fieldErrors.body} />
								) : (
									state?.error?.body && (
										<FieldError
											key="state-body"
											message={state.error.body[0]}
										/>
									)
								)}
							</AnimatePresence>
						</div>

						<button
							type="submit"
							disabled={isPending || isFormInvalid}
							className="inline-flex items-center text-xs font-semibold text-white bg-slate-900 dark:bg-cyan-600 rounded-md px-3.5 py-1.5 hover:opacity-90 transition-opacity disabled:opacity-50"
						>
							{isPending ? "Posting..." : "Post Comment"}
						</button>
					</form>
				</div>

				{/*  Comments list */}
				<div className="min-w-0">
					{initialComments.length === 0 ? (
						<div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 text-center">
							<p className="text-xs text-slate-500 dark:text-slate-400">
								No comments yet — be the first to comment.
							</p>
						</div>
					) : (
						<motion.div
							initial="hidden"
							animate="show"
							variants={{
								hidden: {},
								show: {
									transition: {
										staggerChildren: 0.05,
									},
								},
							}}
							className="space-y-3"
						>
							{initialComments.map((comment) => (
								<motion.div
									key={comment.id}
									variants={
										{
											hidden: { opacity: 0, y: 12 },
											show: {
												opacity: 1,
												y: 0,
												transition: {
													duration: 0.4,
													ease: "easeOut",
												},
											},
										} as const
									}
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
								</motion.div>
							))}
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
}
