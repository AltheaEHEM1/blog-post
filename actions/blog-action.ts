"use server";
import { z } from "zod";
import { eq, isNull, isNotNull, desc } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { blogs } from "@/db/schema";
import { revalidatePath } from "next/cache";

const blogSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(200),
    subtitle: z.string().trim().max(200).optional(),
    body: z.string().trim().min(10, "Body must be at least 10 characters"),
    authorName: z.string().trim().min(1, "Author is required").max(100),
    categoryId: z.string().uuid("Please select a category"),
    imageUrl: z.string().optional(),
});

function slugify(title: string) {
    return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// CREATE
export async function createBlog(_: unknown, formData: FormData) {
    const parsed = blogSchema.safeParse({
        title: formData.get("title"),
        subtitle: formData.get("subtitle") || undefined,
        body: formData.get("body"),
        authorName: formData.get("authorName"),
        categoryId: formData.get("categoryId"),
        imageUrl: formData.get("imageUrl") || undefined,
    });

    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors };
    }

    try {
        await db.insert(blogs).values({
            title: parsed.data.title,
            subtitle: parsed.data.subtitle,
            slug: slugify(parsed.data.title),
            body: parsed.data.body,
            authorName: parsed.data.authorName,
            categoryId: parsed.data.categoryId,
            imageUrl: parsed.data.imageUrl,
        });
    } catch {
        return { error: { title: ["A blog with a similar title already exists"] } };
    }

    revalidatePath("/blog");
    revalidatePath("/blog_admin");
    return { success: true };
}

// UPDATE
export async function updateBlog(_: unknown, formData: FormData) {
    const id = formData.get("id") as string;

    const parsed = blogSchema.safeParse({
        title: formData.get("title"),
        subtitle: formData.get("subtitle") || undefined,
        body: formData.get("body"),
        authorName: formData.get("authorName"),
        categoryId: formData.get("categoryId"),
        imageUrl: formData.get("imageUrl") || undefined,
    });

    if (!id) return { error: { title: ["Missing blog id"] } };
    if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

    try {
        await db.update(blogs).set({
            title: parsed.data.title,
            subtitle: parsed.data.subtitle,
            slug: slugify(parsed.data.title),
            body: parsed.data.body,
            authorName: parsed.data.authorName,
            categoryId: parsed.data.categoryId,
            updatedAt: new Date(),
        }).where(eq(blogs.id, id));
    } catch {
        return { error: { title: ["A blog with a similar title already exists"] } };
    }

    revalidatePath("/blog");
    revalidatePath("/blog_admin");
    return { success: true };
}

// SOFT DELETE
export async function deleteBlog(id: string) {
    await db.update(blogs).set({ deletedAt: new Date() }).where(eq(blogs.id, id));
    revalidatePath("/blog");
    revalidatePath("/blog_admin");
}

// RESTORE
export async function restoreBlog(id: string) {
    await db.update(blogs).set({ deletedAt: null }).where(eq(blogs.id, id));
    revalidatePath("/blog");
    revalidatePath("/blog_admin");
}

// READ — active blogs, with category joined in (admin list + public list)
export async function getActiveBlogs() {
    return db.query.blogs.findMany({
        where: isNull(blogs.deletedAt),
        orderBy: desc(blogs.createdAt),
        with: { category: true },
    });
}

// READ — single blog by id (admin edit form)
export async function getBlogById(id: string) {
    return db.query.blogs.findFirst({
        where: eq(blogs.id, id),
        with: { category: true },
    });
}

// READ — single blog by slug (public detail page)
export async function getBlogBySlug(slug: string) {
    return db.query.blogs.findFirst({
        where: eq(blogs.slug, slug),
        with: { category: true },
    });
}

// READ — deleted blogs (trash view)
export async function getDeletedBlogs() {
    return db.select().from(blogs).where(isNotNull(blogs.deletedAt)).orderBy(desc(blogs.deletedAt));
}