"use client";

import BaseModal from "@/components/layout/BaseModal";

interface CommentData {
	id: string;
	username: string;
	blogtitle: string;
	comment: string;
	createdAt: string;
	status: "pending" | "approved" | "rejected";
}

interface ViewModalProps {
	opened: boolean;
	onClose: () => void;
	data: CommentData | null;
	// Optional callbacks for approve/reject actions
	onApprove?: (id: string) => void;
	onReject?: (id: string) => void;
}

export default function ViewModal({
	opened,
	onClose,
	data,
	onApprove,
	onReject,
}: ViewModalProps) {
	const title = "View Comment";

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
			title={title}
			footer={
				<div className="flex justify-end gap-2">
					{data?.status === "pending" && (
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
						<span>{data.username}</span>
					</div>
					<div className="flex items-center">
						<span className="font-medium w-32">Blog Title:</span>
						<span>{data.blogtitle}</span>
					</div>
					<div className="flex items-start gap-4">
						<span className="font-medium w-32 shrink-0">Comment:</span>
						<p className="flex-1 wrap-break-words">{data.comment}</p>
					</div>
					<div className="flex items-center">
						<span className="font-medium w-32">Created At:</span>
						<span>{data.createdAt}</span>
					</div>
					<div className="flex items-center">
						<span className="font-medium w-32">Status:</span>
						<span className="capitalize">{data.status}</span>
					</div>
				</div>
			) : (
				<p className="text-gray-500 italic">No comment data available.</p>
			)}
		</BaseModal>
	);
}
