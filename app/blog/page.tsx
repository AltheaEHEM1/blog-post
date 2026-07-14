import { getActiveBlogs } from "@/actions/blog-action";
import { getActiveCategories } from "@/actions/category-action";
import BlogPageContent from "@/app/blog/blog-page-content";

export default async function Blog({
	searchParams,
}: {
	searchParams: Promise<{ category?: string; q?: string }>;
}) {
	const params = await searchParams;
	const category = params.category;
	const q = params.q;

	const [allPosts, categories] = await Promise.all([
		getActiveBlogs(),
		getActiveCategories(),
	]);

	const posts = category
		? allPosts.filter((post) => post.category?.slug === category)
		: allPosts;

	return (
		<main className="min-h-screen text-slate-200">
			<section className="max-w-6xl mx-auto px-6 py-20">
				<BlogPageContent
					posts={posts}
					categories={categories}
					category={category}
					initialQuery={q}
				/>
			</section>
		</main>
	);
}
