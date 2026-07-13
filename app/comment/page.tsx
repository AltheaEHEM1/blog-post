import { getAllComments } from "@/actions/comment-action";
import { PageHeader } from "@/components/page-header/page-header";
import CommentTable from "./comment-table";

export default async function Comment() {
	const allComments = await getAllComments();

	return (
		<>
			<PageHeader
				title="Post Comments"
				description="Moderate, approve, or remove visitor comments to maintain healthy discussion on your articles."
				area="Moderation"
				showArea={true}
			/>
			<CommentTable comments={allComments} />
		</>
	);
}
