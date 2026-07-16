"use server";
import { desc, eq, isNotNull, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { categories } from "@/db/schema";
import { categorySchema } from "@/lib/validations";

function slugify(name: string) {
	return name
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

export async function createCategory(_: unknown, formData: FormData) {
	const parsed = categorySchema.safeParse({
		name: formData.get("name"),
		description: formData.get("description") || undefined,
	});
	if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

	try {
		await db.insert(categories).values({
			name: parsed.data.name,
			slug: slugify(parsed.data.name),
			description: parsed.data.description,
		});
	} catch {
		return {
			error: { name: ["A category with a similar name already exists"] },
		};
	}

	revalidatePath("/category");
	return { success: true };
}

export async function updateCategory(_: unknown, formData: FormData) {
	const id = formData.get("id") as string;
	const parsed = categorySchema.safeParse({
		name: formData.get("name"),
		description: formData.get("description") || undefined,
	});
	if (!id) return { error: { name: ["Missing category id"] } };
	if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

	try {
		await db
			.update(categories)
			.set({
				name: parsed.data.name,
				slug: slugify(parsed.data.name),
				description: parsed.data.description,
			})
			.where(eq(categories.id, id));
	} catch {
		return {
			error: { name: ["A category with a similar name already exists"] },
		};
	}

	revalidatePath("/category");
	return { success: true };
}

export async function deleteCategory(id: string) {
	await db
		.update(categories)
		.set({ deletedAt: new Date() })
		.where(eq(categories.id, id));
	revalidatePath("/category");
}
export async function getActiveCategories() {
	return db
		.select()
		.from(categories)
		.where(isNull(categories.deletedAt))
		.orderBy(desc(categories.createdAt));
}

export async function getDeletedCategories() {
	return db
		.select()
		.from(categories)
		.where(isNotNull(categories.deletedAt))
		.orderBy(desc(categories.deletedAt));
}