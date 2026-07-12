// "use client"

import BaseModal from "@/components/layout/BaseModal";

// import { X } from 'lucide-react';

interface ViewModalProps {
	opened: boolean;
	onClose: () => void;
	data: { category: string; description?: string } | null;
}

export default function ViewModal({ opened, onClose, data }: ViewModalProps) {
	const title = "View Category";

	return (
		<BaseModal opened={opened} onClose={onClose} title={title}>
			{data ? (
				<div className="space-y-4 text-sm font-mono text-gray-800">
					<div className="flex items-center">
						<span className="font-medium w-32">Category:</span>
						<span>{data.category}</span>
					</div>
					{data.description && (
						<div className="flex items-start gap-4">
							<span className="font-semibold text-gray-700 w-32 shrink-0">
								Description:
							</span>
							<p className="flex-1 min-w-0 break-words text-gray-600 leading-relaxed">
								{data.description}
							</p>
						</div>
					)}
				</div>
			) : (
				<p className="text-gray-500 italic">No category data available.</p>
			)}
		</BaseModal>
	);
}
