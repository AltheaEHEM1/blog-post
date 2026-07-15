import { getActiveBlogs } from "@/actions/blog-action";
import { getActiveCategories } from "@/actions/category-action";
import BlogPageContent from "@/app/blog/blog-page-content";
import BlogPostsGrid from "@/app/blog/blog-post-card";
import BlogCategoryFilter from "@/app/blog/blog-category-filter";

export default async function Blog({
	searchParams,
}: {
	searchParams: Promise<{ category?: string; q?: string }>;
}) {
	const params = await searchParams;
	const category = params.category;
	const q = params.q?.toLowerCase() ?? "";

	const [allPosts, categories] = await Promise.all([
		getActiveBlogs(),
		getActiveCategories(),
	]);

	// Perform filtering on the server
	const filteredPosts = allPosts.filter((post) => {
		const matchesCategory = category ? post.category?.slug === category : true;
		const matchesQuery = q
			? post.title.toLowerCase().includes(q) ||
				post.category?.name.toLowerCase().includes(q)
			: true;
		return matchesCategory && matchesQuery;
	});

	return (
		<>
			<BlogPageContent initialQuery={params.q ?? ""} category={category} />

			<section className="max-w-6xl mx-auto px-6">
				<BlogCategoryFilter
					categories={categories}
					category={category}
					query={params.q ?? ""}
				/>
				<div className="mt-8">
					<BlogPostsGrid blogPosts={filteredPosts} />
				</div>
			</section>
		</>
	);
}
