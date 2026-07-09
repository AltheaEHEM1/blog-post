import BlogPostsGrid from "@/app/blog/blog-post-card";

// Mock data fetcher - replace this with your actual data fetching logic
async function getBlogPosts() {
	// Simulate database/API delay
	await new Promise((resolve) => setTimeout(resolve, 1500));

	return [
		{
			id: "1",
			category: "Tech",
			date: "July 09, 2026",
			title: "Learning Next.js",
			excerpt:
				"Exploring the fundamentals of server components and data fetching.",
		},
		// Add more post objects here...
	];
}

const Blog = async () => {
	const posts = await getBlogPosts();

	return (
		<main className="min-h-screen text-slate-200">
			<section className="max-w-6xl mx-auto px-6 py-20">
				<h1 className="text-4xl font-bold mb-12">Blog Posts</h1>
				<BlogPostsGrid blogPosts={posts} />
			</section>
		</main>
	);
};

export default Blog;
