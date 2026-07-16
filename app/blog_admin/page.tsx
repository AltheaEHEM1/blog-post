import { getActiveBlogs } from "@/actions/blog-action";
import { getActiveCategories } from "@/actions/category-action";
import BlogAdmin from "./blog-admin";

//import Forbidden from "@/app/forbidden";
//import Error from "@/app/error";

export default async function BlogAdminPage() {
	const [blogs, categories] = await Promise.all([
		getActiveBlogs(),
		getActiveCategories(),
	]);

	// Temporarily returning the Forbidden component so you can preview it directly
	//return <Forbidden />;
	//return <Error />;

	return <BlogAdmin initialBlogs={blogs} categories={categories} />;
}
