import { PageHeader } from "@/components/page-header/page-header";
import { Pagination } from "../../components/pagination";
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
			<div className="flex justify-end mt-4">
				<Pagination />
			</div>
		</>
	);
}

export default BlogAdmin;
