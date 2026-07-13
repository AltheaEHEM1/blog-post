"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import ViewModal from "@/app/comment/view-modal";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/pagination";
import { approveComment, rejectComment } from "@/actions/comment-action";

export type CommentRow = {
	id: string;
	authorName: string;
	body: string;
	approved: boolean;
	createdAt: Date;
	blog: { id: string; title: string } | null;
};

interface CommentTableProps {
	comments: CommentRow[];
}

export default function CommentTable({ comments }: CommentTableProps) {
	const [selectedComment, setSelectedComment] = useState<CommentRow | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [globalFilter, setGlobalFilter] = useState("");
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
		{ id: "status", value: "pending" },
	]);
	const [activeTab, setActiveTab] = useState<"pending" | "approved">("pending");
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

	useEffect(() => {
		setColumnFilters([{ id: "status", value: activeTab }]);
	}, [activeTab]);

	const handleApprove = async (id: string) => {
		try {
			await approveComment(id);
			toast.success("Comment approved and is now visible on the blog");
		} catch {
			toast.error("Failed to approve comment");
		}
	};

	const handleReject = async (id: string) => {
		try {
			await rejectComment(id);
			toast.success("Comment rejected and removed");
		} catch {
			toast.error("Failed to reject comment");
		}
	};

	const columns = useMemo<ColumnDef<CommentRow>[]>(
		() => [
			{ accessorKey: "authorName", header: "Username" },
			{
				id: "blogtitle",
				header: "Blog Title",
				accessorFn: (row) => row.blog?.title ?? "Untitled",
			},
			{ accessorKey: "body", header: "Comment" },
			{
				accessorKey: "createdAt",
				header: "Created At",
				cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
			},
			{
				id: "status",
				header: "Status",
				accessorFn: (row) => (row.approved ? "approved" : "pending"),
				cell: ({ row }) => (
					<span className="capitalize">{row.original.approved ? "approved" : "pending"}</span>
				),
			},
			{
				id: "actions",
				header: () => <div className="text-center">Actions</div>,
				cell: (info) => (
					<div className="flex justify-center items-center">
						<button
							type="button"
							className="text-blue-600 hover:scale-110 transition-transform"
							onClick={() => {
								setSelectedComment(info.row.original);
								setModalOpen(true);
							}}
						>
							<Eye size={15} />
						</button>
					</div>
				),
			},
		],
		[],
	);

	const table = useReactTable({
		data: comments,
		columns,
		state: { globalFilter, pagination, columnFilters },
		onGlobalFilterChange: setGlobalFilter,
		onColumnFiltersChange: setColumnFilters,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<>
			<div className="flex flex-col h-full overflow-hidden">
				<div className="flex flex-wrap gap-2 items-center mb-4 shrink-0">
					<input
						placeholder="Search comments..."
						value={globalFilter ?? ""}
						onChange={(e) => setGlobalFilter(e.target.value)}
						className="h-8 w-48 pl-3 text-xs rounded-md border border-gray-200 outline-none"
					/>
				</div>

				<div className="flex gap-1">
					<button
						type="button"
						onClick={() => setActiveTab("pending")}
						className={`px-4 py-1.5 text-xs rounded-t-md font-medium transition-all ${activeTab === "pending"
							? "bg-green-700 text-white"
							: "bg-green-50 text-green-700 border"
							}`}
					>
						For Approval
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("approved")}
						className={`px-4 py-1.5 text-xs rounded-t-md font-medium transition-all ${activeTab === "approved"
							? "bg-green-700 text-white"
							: "bg-green-50 text-green-700 border"
							}`}
					>
						Approved
					</button>
				</div>

				<div className="flex-1 overflow-auto border border-gray-200 rounded-b-md">
					<table className="w-full min-w-150 text-left text-sm font-mono border-collapse">
						<thead className="bg-green-100 sticky top-0 z-10">
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th key={header.id} className="p-3 text-green-800 border-b">
											{flexRender(header.column.columnDef.header, header.getContext())}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody className="divide-y divide-gray-100 text-xs">
							{table.getRowModel().rows.length === 0 && (
								<tr>
									<td colSpan={6} className="p-6 text-center text-gray-400">
										No comments in this view.
									</td>
								</tr>
							)}
							{table.getRowModel().rows.map((row) => (
								<tr key={row.id} className="bg-green-50 hover:bg-green-100">
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id} className="p-3 text-gray-600">
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="flex justify-end mt-4 shrink-0">
					<Pagination className="w-auto mr-0">
						<PaginationContent className="gap-0.5">
							<PaginationPrevious
								size="xs"
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
							/>
							{Array.from({ length: table.getPageCount() }).map((_, i) => (
								<PaginationItem key={`page-${i + 1}`}>
									<PaginationLink
										size="xs"
										isActive={i === pagination.pageIndex}
										onClick={() => table.setPageIndex(i)}
									>
										{i + 1}
									</PaginationLink>
								</PaginationItem>
							))}
							<PaginationNext
								size="xs"
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
							/>
						</PaginationContent>
					</Pagination>
				</div>
			</div>

			<ViewModal
				opened={modalOpen}
				onClose={() => setModalOpen(false)}
				data={selectedComment}
				onApprove={handleApprove}
				onReject={handleReject}
			/>
		</>
	);
}
