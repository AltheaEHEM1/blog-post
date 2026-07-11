import { PageHeader } from "@/components/page-header/page-header";
import BlogTable from "./blog-table";

function BlogAdmin() {
	return (
		<>
			<PageHeader
				title="Blog post"
				description="Manage your published articles, and content for your blog."
				area="Administrator"
				showArea={true}
			/>
			<BlogTable />
		</>
	);
}

export default BlogAdmin;
