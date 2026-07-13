"use server";
import { z } from "zod";
import { eq, and, desc } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { comments } from "@/db/schema";
import { revalidatePath } from "next/cache";

const commentSchema = z.object({
    blogId: z.string().uuid(),
    authorName: z.string().trim().min(1, "Name is required").max(80),
    body: z.string().trim().min(10, "Comment must be at least 10 characters").max(2000),
});

// ─────────────────────────────────────────────
// CREATE — public, anonymous, goes in as unapproved
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// READ — only approved comments, for the public blog page
// ─────────────────────────────────────────────
export async function getApprovedComments(blogId: string) {
    return db
        .select()
        .from(comments)
        .where(and(eq(comments.blogId, blogId), eq(comments.approved, true)))
        .orderBy(desc(comments.createdAt));
}

// ─────────────────────────────────────────────
// READ — all comments for one blog, for admin moderation
// ─────────────────────────────────────────────
export async function getAllCommentsForBlog(blogId: string) {
    return db
        .select()
        .from(comments)
        .where(eq(comments.blogId, blogId))
        .orderBy(desc(comments.createdAt));
}

// ─────────────────────────────────────────────
// READ — every comment across every blog, with blog title joined in
// (used by the admin /comment moderation page)
// ─────────────────────────────────────────────
export async function getAllComments() {
    return db.query.comments.findMany({
        orderBy: desc(comments.createdAt),
        with: { blog: true },
    });
}

// ─────────────────────────────────────────────
// MODERATION — accept / reject
// ─────────────────────────────────────────────
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