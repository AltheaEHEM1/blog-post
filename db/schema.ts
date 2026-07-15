import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

export const categories = pgTable("categories", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	slug: text("slug").notNull().unique(),
	description: text("description"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	deletedAt: timestamp("deleted_at"),
});

export const blogs = pgTable("blogs", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: text("title").notNull(),
	subtitle: text("subtitle"),
	slug: text("slug").notNull().unique(),
	imageUrl: text("image_url"),
	body: text("body").notNull(),
	authorName: text("author_name").notNull(),
	categoryId: uuid("category_id").references(() => categories.id, {
		onDelete: "set null",
	}),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
	deletedAt: timestamp("deleted_at"),
});

export const comments = pgTable("comments", {
	id: uuid("id").primaryKey().defaultRandom(),
	blogId: uuid("blog_id")
		.references(() => blogs.id, { onDelete: "cascade" })
		.notNull(),
	authorName: text("author_name").notNull(),
	body: text("body").notNull(),
	approved: boolean("approved").notNull().default(false),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations - required for db.query.*.findMany({ with: {...} })
export const categoriesRelations = relations(categories, ({ many }) => ({
	blogs: many(blogs),
}));

export const blogsRelations = relations(blogs, ({ one, many }) => ({
	category: one(categories, {
		fields: [blogs.categoryId],
		references: [categories.id],
	}),
	comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
	blog: one(blogs, {
		fields: [comments.blogId],
		references: [blogs.id],
	}),
}));
