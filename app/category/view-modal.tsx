import BaseModal from "@/components/layout/BaseModal";

interface ViewModalProps {
	opened: boolean;
	onClose: () => void;
	data: { name: string; description?: string | null } | null;
}

export default function ViewModal({ opened, onClose, data }: ViewModalProps) {
	return (
		<BaseModal opened={opened} onClose={onClose} title="View Category">
			{data ? (
				<div className="space-y-4 text-sm font-mono text-gray-800">
					<div className="flex items-center">
						<span className="font-medium w-32">Category:</span>
						<span>{data.name}</span>
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
