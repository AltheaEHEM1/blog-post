"use client";

import { Check } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/button/button";
import BaseModal from "@/components/layout/BaseModal";
import { createCategory, updateCategory } from "@/actions/category-action";

interface FormModalProps {
  opened: boolean;
  onClose: () => void;
  initialData?: { id: string; name: string; description: string | null };
}

export default function FormModal({ opened, onClose, initialData }: FormModalProps) {
  const action = initialData ? updateCategory : createCategory;
  const [state, formAction, isPending] = useActionState(action, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success(
        initialData ? "Category updated successfully" : "Category created successfully"
      );
      router.refresh();
      onClose();
    } else if (state?.error) {
      // catch-all errors (e.g. duplicate name) that aren't tied to a single field
      const firstError = Object.values(state.error).flat()[0];
      if (firstError) toast.error(firstError as string);
    }
  }, [state, onClose, router, initialData]);

  return (
    <BaseModal
      opened={opened}
      onClose={onClose}
      title={initialData ? "Edit Category" : "Add Category"}
      footer={
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button type="submit" form="category-form" variant="green" size="sm" disabled={isPending}>
            {isPending ? "Saving..." : initialData ? "Update" : "Create"}
            <Check className="ml-1" size={14} />
          </Button>
        </div>
      }
    >
      <form id="category-form" action={formAction} className="space-y-2" key={opened ? "open" : "closed"}>
        {initialData && <input type="hidden" name="id" value={initialData.id} />}

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5 font-mono" htmlFor="name">
            Category Name<span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={initialData?.name ?? ""}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-mono shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="Enter category"
          />
          {state?.error?.name && <p className="text-xs text-red-500 mt-1 font-mono">{state.error.name[0]}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5 font-mono" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={2}
            defaultValue={initialData?.description ?? ""}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-mono shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="Enter description"
          />
        </div>
      </form>
    </BaseModal>
  );
}