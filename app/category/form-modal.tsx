import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/button/button";
import BaseModal from "@/components/layout/BaseModal";

interface FormModalProps {
	opened: boolean;
	onClose: () => void;
	initialData?: { category: string; description?: string };
	onSubmit: (values: { category: string; description?: string }) => void;
}

export default function FormModal({
	opened,
	onClose,
	initialData,
	onSubmit,
}: FormModalProps) {
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		setCategory(initialData?.category ?? "");
		setDescription(initialData?.description ?? ""); // reset description on open
	}, [initialData, opened]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!category.trim()) return;
		onSubmit({
			category: category.trim(),
			description: description.trim() || undefined,
		});
	};

	return (
		<BaseModal
			opened={opened}
			onClose={onClose}
			title={initialData ? "Edit Category" : "Add Category"}
			footer={
				<div className="flex justify-end gap-2">
					<Button type="button" variant="ghost" size="sm" onClick={onClose}>
						Cancel
					</Button>
					<Button
						type="button"
						variant="green"
						size="sm"
						onClick={handleSubmit}
					>
						{initialData ? "Update" : "Create"}
						<Check className="ml-1" size={14} />
					</Button>
				</div>
			}
		>
			<form onSubmit={handleSubmit} className="space-y-2">
				<div>
					<label
						className="block text-xs font-medium text-gray-700 mb-0.5 font-mono"
						htmlFor="category-input"
					>
						Category Name
					</label>
					<input
						id="category-input"
						type="text"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-mono shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
						placeholder="Enter category"
					/>
				</div>
				<div>
					<label
						className="block text-xs font-medium text-gray-700 mb-0.5 font-mono"
						htmlFor="description-input"
					>
						Description
					</label>
					<textarea
						id="description-input"
						rows={2}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-mono shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
						placeholder="Enter description"
					></textarea>
				</div>
			</form>
		</BaseModal>
	);
}
