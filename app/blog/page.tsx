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

	const filteredPosts = allPosts.filter((post) => {
		const matchesCategory = category ? post.category?.slug === category : true;
		const matchesQuery = q
			? post.title.toLowerCase().includes(q) ||
			post.category?.name.toLowerCase().includes(q)
			: true;
		return matchesCategory && matchesQuery;
	});

	const latestPosts = [...allPosts]
		.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
		.slice(0, 5);

	return (
		<>
			{/* Hero + carousel, full-bleed hero has its own background image */}
			<BlogPageContent latestPosts={latestPosts} />

			{/* Everything below the hero shares one consistent page margin */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
				<div className="flex flex-col md:flex-row gap-8 mt-8 items-start">
					<div className="w-full md:w-56 flex-shrink-0">
						<BlogCategoryFilter
							categories={categories}
							category={category}
							initialQuery={params.q ?? ""}
						/>
					</div>

					<div className="flex-grow min-w-0">
						<BlogPostsGrid blogPosts={filteredPosts} />
					</div>
				</div>
			</div>
		</>
	);
}