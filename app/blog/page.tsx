import { getActiveBlogs } from "@/actions/blog-action";
import { getActiveCategories } from "@/actions/category-action";
import BlogCategoryFilter from "@/app/blog/blog-category-filter";
import BlogPageContent from "@/app/blog/blog-page-content";
import BlogPostsGrid from "@/app/blog/blog-post-card";

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
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		)
		.slice(0, 5);

	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col w-full overflow-hidden">
			{/* Hero + carousel */}
			<BlogPageContent latestPosts={latestPosts} />

			{/* Content segment with uniform spacing constraints */}
			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
				<div className="flex flex-col md:flex-row gap-6 lg:gap-8 mt-6 sm:mt-10 items-start">
					{/* Category Filter and Search Section */}
					<div className="w-full md:w-52 lg:w-56 flex-shrink-0">
						<BlogCategoryFilter
							categories={categories}
							category={category}
							initialQuery={params.q ?? ""}
						/>
					</div>

					{/* Posts Layout Grid */}
					<div className="w-full flex-grow min-w-0">
						<BlogPostsGrid blogPosts={filteredPosts} />
					</div>
				</div>
			</div>
		</div>
	);
}
