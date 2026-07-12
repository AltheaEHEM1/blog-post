"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header/page-header";
import BlogForm from "./blog-form";
import BlogTable from "./blog-table";
import ViewBlog from "./view-blog";

export interface BlogPost {
	id: string;
	title: string;
	subtitle: string;
	body: string;
	category: string;
	authorName: string;
	createdAt: string;
	imageUrl?: string;
}

const INITIAL_BLOGS: BlogPost[] = [
	{
		id: "1",
		title: "Getting Started with Next.js",
		subtitle: "A comprehensive guide to Next.js features and App Router.",
		body: "Next.js is a powerful React framework that enables developers to build high-performance web applications with ease. In this post, we will explore the core features, including server components, data fetching, routing, and optimization techniques. We will walk through setting up a project and structure. Next.js handles routing out-of-the-box and provides excellent default behaviors that improve development speeds.",
		category: "Tech",
		authorName: "Jane Doe",
		createdAt: "2026-07-01",
		imageUrl:
			"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "2",
		title: "Advanced React Patterns",
		subtitle: "Master state, composition, and reusable hooks.",
		body: "React's flexibility is one of its greatest strengths. However, as applications grow, structuring components and state can become challenging. This article covers advanced patterns such as compound components, render props, higher-order components, and custom hooks. By applying these patterns, you can write cleaner, more maintainable React code that is easy to extend and debug.",
		category: "Tech",
		authorName: "John Smith",
		createdAt: "2026-07-02",
		imageUrl:
			"https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "3",
		title: "Understanding TypeScript",
		subtitle: "Key concepts of static typing in JavaScript.",
		body: "TypeScript adds optional static typing to JavaScript, making it easier to catch errors early and write more robust code. In this blog, we'll dive deep into TypeScript's type system, interfaces, generics, and utility types. Learn how to construct type-safe components and leverage autocompletion tools to boost your productivity in complex react applications.",
		category: "Tech",
		authorName: "Alice Johnson",
		createdAt: "2026-07-03",
		imageUrl:
			"https://images.unsplash.com/photo-1516116211223-5c359a36298a?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "4",
		title: "Design Systems in 2026",
		subtitle: "Building cohesive and accessible user experiences.",
		body: "A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications. In this post, we explore how design systems have evolved in 2026. We will look at tokens, Tailwind CSS integration, accessibility (A11y), and how to maintain design systems across multiple engineering teams.",
		category: "Design",
		authorName: "Sarah Connor",
		createdAt: "2026-07-04",
		imageUrl:
			"https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "5",
		title: "Optimizing Web Performance",
		subtitle: "Actionable tips for blazing fast load times.",
		body: "Web performance is critical for user experience and search engine optimization. In this post, we detail practical strategies to optimize your web application's speed. We cover Core Web Vitals, code splitting, dynamic imports, image optimization, browser caching, and minimizing bundle size. Learn how to audit your site using Lighthouse and Chrome DevTools.",
		category: "Performance",
		authorName: "Robert Miller",
		createdAt: "2026-07-05",
		imageUrl:
			"https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "6",
		title: "Deploying with Vercel",
		subtitle: "From local commit to global production edge.",
		body: "Vercel makes deploying web applications fast, simple, and global. In this post, we guide you through deploying Next.js applications using Vercel. We discuss Git integration, automatic branch previews, custom domains, serverless function environments, and how Vercel's Edge Network speeds up content delivery to users globally.",
		category: "DevOps",
		authorName: "David Lee",
		createdAt: "2026-07-06",
		imageUrl:
			"https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "7",
		title: "State Management with TanStack Table",
		subtitle: "Managing tabular states and filters seamlessly.",
		body: "TanStack Table is a headless library that handles table state and formatting logic. This article demonstrates how to manage sorting, page indexes, globally filtered search, custom columns, and row selection in React. Explore why headless tables are the best choice for styling custom design systems with Tailwind CSS.",
		category: "Tech",
		authorName: "Emma Davis",
		createdAt: "2026-07-07",
		imageUrl:
			"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "8",
		title: "CSS Grid vs Flexbox",
		subtitle: "Choosing the right layout module for the job.",
		body: "CSS Grid and Flexbox are the two fundamental layout systems in modern web development. Flexbox is designed for one-dimensional layouts (a row or a column), while Grid is designed for two-dimensional layouts (rows and columns simultaneously). This post walks through code examples to show when to use Flexbox vs Grid for responsive layout designs.",
		category: "Design",
		authorName: "Sophia Martinez",
		createdAt: "2026-07-08",
		imageUrl:
			"https://images.unsplash.com/photo-1541462608141-2ff580de097a?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "9",
		title: "Using React Query",
		subtitle: "Simplify remote data fetching and caching.",
		body: "React Query (TanStack Query) is often described as the missing data-fetching library for React. It handles caching, background updates, stale data, and requests retrying with zero configuration. This article covers basics like query keys, useQuery, mutations, and pagination patterns to streamline server state synchronization in React apps.",
		category: "Tech",
		authorName: "James Wilson",
		createdAt: "2026-07-09",
		imageUrl:
			"https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "10",
		title: "Testing React Components",
		subtitle: "Write reliable tests with Vitest and Testing Library.",
		body: "Testing is essential to build durable web applications. Vitest combined with React Testing Library offers a powerful, fast setup to simulate user interactions and check component outputs. This post explains testing lifecycle, writing assertions, mocking API requests with MSW, and testing custom React hooks to avoid regressions.",
		category: "Testing",
		authorName: "Olivia Taylor",
		createdAt: "2026-07-10",
		imageUrl:
			"https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "11",
		title: "Accessibility Best Practices",
		subtitle: "Making your web pages inclusive for everyone.",
		body: "Web accessibility (a11y) ensures that people with disabilities can use web sites. Learn how to write semantic HTML, structure headers correctly, provide descriptive alt texts for images, design custom keyboard navigation focus rings, and apply ARIA labels to ensure compatibility with screen readers.",
		category: "UX",
		authorName: "Lucas Thomas",
		createdAt: "2026-07-11",
		imageUrl:
			"https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "12",
		title: "Serverless Functions Overview",
		subtitle: "Build backend logic without running servers.",
		body: "Serverless computing enables developers to execute code on demand without provisioning infrastructure. Learn how serverless functions scale automatically, integrate with databases, handle authorization headers, and execute light tasks at edge locations to reduce cold start times and infrastructure costs.",
		category: "Backend",
		authorName: "Isabella White",
		createdAt: "2026-07-12",
		imageUrl:
			"https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
	},
];

export default function BlogAdmin() {
	const [data, setData] = useState<BlogPost[]>(INITIAL_BLOGS);
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

	const handleDelete = (id: string) => {
		setData((prev) => prev.filter((blog) => blog.id !== id));
	};

	const handleFormSubmit = (formData: Omit<BlogPost, "id">) => {
		if (view === "add") {
			const newBlog: BlogPost = {
				id: Math.random().toString(36).substring(2, 11),
				...formData,
			};
			setData((prev) => [newBlog, ...prev]);
		} else if (view === "edit" && selectedBlog) {
			setData((prev) =>
				prev.map((blog) =>
					blog.id === selectedBlog.id ? { ...blog, ...formData } : blog,
				),
			);
		}
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
						data={data}
						onAdd={handleAdd}
						onEdit={handleEdit}
						onView={handleView}
						onDelete={handleDelete}
					/>
				)}
				{(view === "add" || view === "edit") && (
					<BlogForm
						initialData={selectedBlog || undefined}
						onSubmit={handleFormSubmit}
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
