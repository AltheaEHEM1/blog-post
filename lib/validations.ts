import { z } from "zod";

/*  Shared helpers */

export const noConsecutiveSpaces = (_message: string) => (val: string) =>
	!/ {2,}/.test(val);

// Collapses 2+ consecutive spaces into one, and hard-caps length.
// Call this on every keystroke so invalid input never lands in the field.
export function sanitizeInput(value: string, maxLength: number) {
	const collapsed = value.replace(/ {2,}/g, " ");
	return collapsed.length > maxLength
		? collapsed.slice(0, maxLength)
		: collapsed;
}

/* Blog schema */
export const blogSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, "Title is required")
		.max(200, "Title must be at most 200 characters")
		.refine(noConsecutiveSpaces("Title cannot contain consecutive spaces"), {
			message: "Title cannot contain consecutive spaces",
		}),
	subtitle: z
		.string()
		.trim()
		.max(200, "Subtitle must be at most 200 characters")
		.refine(noConsecutiveSpaces("Subtitle cannot contain consecutive spaces"), {
			message: "Subtitle cannot contain consecutive spaces",
		})
		.optional()
		.or(z.literal("")),
	body: z
		.string()
		.trim()
		.min(10, "Body must be at least 10 characters")
		.max(2000, "Body must be at most 2000 characters")
		.refine(noConsecutiveSpaces("Body cannot contain consecutive spaces"), {
			message: "Body cannot contain consecutive spaces",
		}),
	authorName: z
		.string()
		.trim()
		.min(1, "Author is required")
		.max(80, "Author name must be at most 80 characters")
		.refine(
			noConsecutiveSpaces("Author name cannot contain consecutive spaces"),
			{
				message: "Author name cannot contain consecutive spaces",
			},
		),
	categoryId: z.string().uuid("Please select a category"),
	imageUrl: z.string().optional(),
});

export type BlogFormValues = z.infer<typeof blogSchema>;

/* Category schema */
export const categorySchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Category name is required")
		.max(50, "Category name must be at most 50 characters")
		.refine(
			noConsecutiveSpaces("Category name cannot contain consecutive spaces"),
			{
				message: "Category name cannot contain consecutive spaces",
			},
		),
	description: z
		.string()
		.trim()
		.max(300, "Description must be at most 300 characters")
		.refine(
			noConsecutiveSpaces("Description cannot contain consecutive spaces"),
			{
				message: "Description cannot contain consecutive spaces",
			},
		)
		.optional()
		.or(z.literal("")),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

/* Comment schema */
export const commentSchema = z.object({
	blogId: z.string().uuid(),
	authorName: z
		.string()
		.trim()
		.min(1, "Name is required")
		.max(80, "Name must be at most 80 characters")
		.refine(noConsecutiveSpaces("Name cannot contain consecutive spaces"), {
			message: "Name cannot contain consecutive spaces",
		}),
	body: z
		.string()
		.trim()
		.min(10, "Comment must be at least 10 characters")
		.max(2000, "Comment must be at most 2000 characters")
		.refine(noConsecutiveSpaces("Comment cannot contain consecutive spaces"), {
			message: "Comment cannot contain consecutive spaces",
		}),
});

export type CommentFormValues = z.infer<typeof commentSchema>;
