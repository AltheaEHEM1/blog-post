import { PageHeader } from "@/components/page-header/page-header";
import CommentTable from "./comment-table";

function Comment() {
	return (
		<>
			<PageHeader
				title="Post Comments"
				description="Moderate, approve, or remove visitor comments to maintain healthy discussion on your articles."
				area="Moderation"
				showArea={true}
			/>
			<CommentTable />
		</>
	);
}

export default Comment;
