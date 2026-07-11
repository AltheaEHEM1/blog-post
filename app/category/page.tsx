import { PageHeader } from "@/components/page-header/page-header";
import CategoryTable from "./category-table";

function Category() {
	return (
		<>
			<PageHeader
				title="Blog Categories"
				description="Organize your content by grouping related posts into specific categories for better navigation."
				area="Administrator"
				showArea={true}
			/>
			<CategoryTable />
		</>
	);
}

export default Category;
