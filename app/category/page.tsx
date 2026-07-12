import { PageHeader } from "@/components/page-header/page-header";
import CategoryTable from "./category-table";
import { getActiveCategories } from "@/actions/category-action";

export default async function Category() {
  const activeCategories = await getActiveCategories();

  return (
    <>
      <PageHeader
        title="Blog Categories"
        description="Organize your content by grouping related posts into specific categories for better navigation."
        area="Administrator"
        showArea={true}
      />
      <CategoryTable categories={activeCategories} />
    </>
  );
}