"use client";

import BaseModal from "@/components/layout/BaseModal";
import type { CommentRow } from "./comment-table";

interface ViewModalProps {
	opened: boolean;
	onClose: () => void;
	data: CommentRow | null;
	onApprove?: (id: string) => void;
	onReject?: (id: string) => void;
}

export default function ViewModal({ opened, onClose, data, onApprove, onReject }: ViewModalProps) {
	const handleApprove = () => {
		if (data && onApprove) onApprove(data.id);
		onClose();
	};

	const handleReject = () => {
		if (data && onReject) onReject(data.id);
		onClose();
	};

	return (
		<BaseModal
			opened={opened}
			onClose={onClose}
			title="View Comment"
			footer={
				<div className="flex justify-end gap-2">
					{data && !data.approved && (
						<>
							<button
								type="button"
								className="bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-3 rounded text-sm"
								onClick={handleApprove}
							>
								Approve
							</button>
							<button
								type="button"
								className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded text-sm"
								onClick={handleReject}
							>
								Reject
							</button>
						</>
					)}
				</div>
			}
		>
			{data ? (
				<div className="space-y-4 text-sm font-mono text-gray-800">
					<div className="flex items-center">
						<span className="font-medium w-32">User:</span>
						<span>{data.authorName}</span>
					</div>
					<div className="flex items-center">
						<span className="font-medium w-32">Blog Title:</span>
						<span>{data.blog?.title ?? "Untitled"}</span>
					</div>
					<div className="flex items-start gap-4">
						<span className="font-medium w-32 shrink-0">Comment:</span>
						<p className="flex-1 wrap-break-words">{data.body}</p>
					</div>
					<div className="flex items-center">
						<span className="font-medium w-32">Created At:</span>
						<span>{new Date(data.createdAt).toLocaleDateString()}</span>
					</div>
					<div className="flex items-center">
						<span className="font-medium w-32">Status:</span>
						<span className="capitalize">{data.approved ? "approved" : "pending"}</span>
					</div>
				</div>
			) : (
				<p className="text-gray-500 italic">No comment data available.</p>
			)}
		</BaseModal>
	);
}