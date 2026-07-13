import { getActiveBlogs } from "@/actions/blog-action";
import { getActiveCategories } from "@/actions/category-action";
import BlogPostsGrid from "@/app/blog/blog-post-card";

export default async function Blog({
	searchParams,
}: {
	searchParams: Promise<{ category?: string }>;
}) {
	const { category } = await searchParams;

	const [allPosts, categories] = await Promise.all([
		getActiveBlogs(),
		getActiveCategories(),
	]);

	const posts = category
		? allPosts.filter((p) => p.category?.slug === category)
		: allPosts;

	return (
		<main className="min-h-screen text-slate-200">
			<section className="max-w-6xl mx-auto px-6 py-20">
				<h1 className="text-4xl font-bold mb-6">Blog Posts</h1>

				<div className="flex flex-wrap gap-2 mb-12">
					
            <a
              href="/blog"
              className={`text-xs font-mono px-3 py-1 rounded-full border transition-colors ${
                !category
                  ? "bg-cyan-600 text-white border-cyan-600"
                  : "border-slate-300 dark:border-slate-700 text-slate-500 hover:border-cyan-500 hover:text-cyan-600"
              }`}
            >
              All
            </a>
					{categories.map((cat) => (
						<a
							key={cat.id}
							href={`/blog?category=${encodeURIComponent(cat.slug)}`}
							className={`text-xs font-mono px-3 py-1 rounded-full border transition-colors ${
								category === cat.slug
									? "bg-cyan-600 text-white border-cyan-600"
									: "border-slate-300 dark:border-slate-700 text-slate-500 hover:border-cyan-500 hover:text-cyan-600"
							}`}
						>
							{cat.name}
						</a>
					))}
				</div>

				<BlogPostsGrid blogPosts={posts} />
			</section >
		</main >
	);
}
