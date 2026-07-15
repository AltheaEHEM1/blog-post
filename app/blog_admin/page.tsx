import { getActiveBlogs } from "@/actions/blog-action";
import { getActiveCategories } from "@/actions/category-action";
import BlogAdmin from "./blog-admin";

export default async function BlogAdminPage() {
	const [blogs, categories] = await Promise.all([
		getActiveBlogs(),
		getActiveCategories(),
	]);

	return <BlogAdmin initialBlogs={blogs} categories={categories} />;
}
