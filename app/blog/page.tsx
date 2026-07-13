import { getActiveBlogs } from "@/actions/blog-action";
import BlogPostsGrid from "@/app/blog/blog-post-card";

const Blog = async () => {
	const posts = await getActiveBlogs();

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