"use server";
import { and, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { comments } from "@/db/schema";
import { commentSchema } from "@/lib/validations";

export async function addComment(_: unknown, formData: FormData) {
	const parsed = commentSchema.safeParse({
		blogId: formData.get("blogId"),
		authorName: formData.get("authorName"),
		body: formData.get("body"),
	});

	if (!parsed.success) {
		return { error: parsed.error.flatten().fieldErrors };
	}

	await db.insert(comments).values({
		blogId: parsed.data.blogId,
		authorName: parsed.data.authorName,
		body: parsed.data.body,
	});

	revalidatePath(`/blog`);
	return { success: true };
}

export async function getApprovedComments(blogId: string) {
	return db
		.select()
		.from(comments)
		.where(and(eq(comments.blogId, blogId), eq(comments.approved, true)))
		.orderBy(desc(comments.createdAt));
}

export async function getAllCommentsForBlog(blogId: string) {
	return db
		.select()
		.from(comments)
		.where(eq(comments.blogId, blogId))
		.orderBy(desc(comments.createdAt));
}

export async function getAllComments() {
	return db.query.comments.findMany({
		orderBy: desc(comments.createdAt),
		with: { blog: true },
	});
}

export async function approveComment(id: string) {
	await db.update(comments).set({ approved: true }).where(eq(comments.id, id));
	revalidatePath("/blog");
	revalidatePath("/comment");
}

export async function rejectComment(id: string) {
	await db.delete(comments).where(eq(comments.id, id));
	revalidatePath("/blog");
	revalidatePath("/comment");
}
