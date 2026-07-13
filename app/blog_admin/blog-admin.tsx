"use client";

import { useState } from "react";
import { toast } from "sonner";
import { deleteBlog } from "@/actions/blog-action";
import { PageHeader } from "@/components/page-header/page-header";
import BlogForm from "./blog-form";
import BlogTable from "./blog-table";
import ViewBlog from "./view-blog";

export interface BlogPost {
	id: string;
	title: string;
	subtitle: string | null;
	body: string;
	authorName: string;
	categoryId: string | null;
	category: { id: string; name: string } | null;
	createdAt: Date;
}

export interface Category {
	id: string;
	name: string;
}

interface BlogAdminProps {
	initialBlogs: BlogPost[];
	categories: Category[];
}

export default function BlogAdmin({
	initialBlogs,
	categories,
}: BlogAdminProps) {
	const [view, setView] = useState<"list" | "add" | "edit" | "view">("list");
	const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

	const handleAdd = () => {
		setSelectedBlog(null);
		setView("add");
	};

	const handleEdit = (blog: BlogPost) => {
		setSelectedBlog(blog);
		setView("edit");
	};

	const handleView = (blog: BlogPost) => {
		setSelectedBlog(blog);
		setView("view");
	};

	const handleDelete = async (id: string) => {
		try {
			await deleteBlog(id);
			toast.success("Blog post moved to trash");
		} catch {
			toast.error("Failed to delete blog post");
		}
	};

	const handleFormDone = () => {
		setView("list");
		setSelectedBlog(null);
	};

	const handleCancel = () => {
		setView("list");
		setSelectedBlog(null);
	};

	const headerInfo = {
		list: {
			title: "Blog post",
			description: "Manage your published articles, and content for your blog.",
			showArea: true,
		},
		add: {
			title: "Write a New Article",
			description: "Create and publish a new article on your blog.",
			showArea: false,
		},
		edit: {
			title: "Modify Article Details",
			description: `Modify the details of "${selectedBlog?.title || "the blog post"}"`,
			showArea: false,
		},
		view: {
			title: "View Blog Post",
			description: `Reading details of "${selectedBlog?.title || "the blog post"}"`,
			showArea: false,
		},
	}[view];

	return (
		<>
			<PageHeader
				title={headerInfo.title}
				description={headerInfo.description}
				area="Administrator"
				showArea={headerInfo.showArea}
			/>
			<div className="flex-1 overflow-hidden">
				{view === "list" && (
					<BlogTable
						data={initialBlogs}
						onAdd={handleAdd}
						onEdit={handleEdit}
						onView={handleView}
						onDelete={handleDelete}
					/>
				)}
				{(view === "add" || view === "edit") && (
					<BlogForm
						key={selectedBlog?.id ?? "new"}
						initialData={selectedBlog || undefined}
						categories={categories}
						onDone={handleFormDone}
						onCancel={handleCancel}
					/>
				)}
				{view === "view" && selectedBlog && (
					<ViewBlog
						data={selectedBlog}
						onBack={handleCancel}
						onEdit={() => handleEdit(selectedBlog)}
					/>
				)}
			</div>
		</>
	);
}
