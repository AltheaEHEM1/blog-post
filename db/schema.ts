import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";
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
  body: text("body").notNull(),
  authorName: text("author_name").notNull(),
  categoryId: uuid("category_id").references(() => categories.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  blogId: uuid("blog_id").references(() => blogs.id, { onDelete: "cascade" }).notNull(),
  authorName: text("author_name").notNull(),
  body: text("body").notNull(),
  approved: boolean("approved").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations - required for db.query.*.findMany({ with: {...} })
export const categoriesRelations = relations(categories as any, ({ many }: any) => ({
  blogs: many(blogs as any),
}));

export const blogsRelations = relations(blogs as any, ({ one, many }: any) => ({
  category: one(categories as any, { fields: [blogs.categoryId], references: [categories.id] }),
  comments: many(comments as any),
}));

export const commentsRelations = relations(comments as any, ({ one }: any) => ({
  blog: one(blogs as any, { fields: [comments.blogId], references: [blogs.id] }),
}));