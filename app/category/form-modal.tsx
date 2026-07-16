"use client";

import { Check } from "lucide-react";
import { type ChangeEvent, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createCategory, updateCategory } from "@/actions/category-action";
import { Button } from "@/components/button/button";
import BaseModal from "@/components/layout/BaseModal";
import { categorySchema, sanitizeInput } from "@/lib/validations";

interface FormModalProps {
	opened: boolean;
	onClose: () => void;
	initialData?: { id: string; name: string; description: string | null };
}

interface FieldErrors {
	name?: string;
	description?: string;
}

export default function FormModal({
	opened,
	onClose,
	initialData,
}: FormModalProps) {
	const action = initialData ? updateCategory : createCategory;
	const [state, formAction, isPending] = useActionState(action, null);

	const [name, setName] = useState(initialData?.name ?? "");
	const [description, setDescription] = useState(
		initialData?.description ?? "",
	);
	const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

	useEffect(() => {
		if (state?.success) {
			toast.success(
				initialData
					? "Category updated successfully"
					: "Category created successfully",
			);
			onClose();
		}
		// No toast on validation errors — those render inline below each field.
	}, [state, onClose, initialData]);

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const sanitized = sanitizeInput(e.target.value, 50);
		setName(sanitized);
		const result = categorySchema.shape.name.safeParse(sanitized);
		setFieldErrors((prev) => ({
			...prev,
			name: result.success ? undefined : result.error.issues[0]?.message,
		}));
	};

	const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const sanitized = sanitizeInput(e.target.value, 300);
		setDescription(sanitized);
		const result = categorySchema.shape.description.safeParse(sanitized);
		setFieldErrors((prev) => ({
			...prev,
			description: result.success ? undefined : result.error.issues[0]?.message,
		}));
	};

	const isFormInvalid =
		Boolean(fieldErrors.name) ||
		Boolean(fieldErrors.description) ||
		name.trim().length === 0;

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
						type="submit"
						form="category-form"
						variant="green"
						size="sm"
						disabled={isPending || isFormInvalid}
					>
						{isPending ? "Saving..." : initialData ? "Update" : "Create"}
						<Check className="ml-1" size={14} />
					</Button>
				</div>
			}
		>
			<form
				id="category-form"
				action={formAction}
				className="space-y-4 overflow-hidden"
			>
				{initialData && (
					<input type="hidden" name="id" value={initialData.id} />
				)}

				<div className="w-full">
					<label
						className="block text-xs font-medium text-gray-700 mb-0.5 font-mono"
						htmlFor="name"
					>
						Category Name<span className="text-red-500">*</span>
					</label>
					<input
						id="name"
						name="name"
						type="text"
						value={name}
						onChange={handleNameChange}
						className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-mono shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
						placeholder="Enter category"
					/>
					{fieldErrors.name && (
						<p className="text-xs text-red-500 mt-1 font-mono">
							{fieldErrors.name}
						</p>
					)}
				</div>

				<div className="w-full">
					<label
						className="block text-xs font-medium text-gray-700 mb-0.5 font-mono"
						htmlFor="description"
					>
						Description
					</label>
					<textarea
						id="description"
						name="description"
						rows={5}
						value={description}
						onChange={handleDescriptionChange}
						className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-mono shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 resize-none"
						placeholder="Enter description"
					/>
					{fieldErrors.description && (
						<p className="text-xs text-red-500 mt-1 font-mono">
							{fieldErrors.description}
						</p>
					)}
				</div>
			</form>
		</BaseModal>
	);
}
