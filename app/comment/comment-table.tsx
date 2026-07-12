/* eslint-disable react-hooks/incompatible-library */
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
import ViewModal from "@/app/comment/view-modal";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/pagination";

type BlogPost = {
	id: string;
	username: string;
	blogtitle: string;
	comment: string;
	createdAt: string;
	status: "pending" | "approved";
};

export default function BlogTable() {
	const [selectedComment, setSelectedComment] = useState<BlogPost | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [data] = useState<BlogPost[]>([
		{
			id: "1",
			username: "John Doe",
			blogtitle: "Getting Started with Next.js",
			comment: "Great post!",
			createdAt: "2026-07-01",
			status: "pending",
		},
		{
			id: "2",
			username: "Jane Smith",
			blogtitle: "Advanced React Patterns",
			comment: "Excellent insights!",
			createdAt: "2026-07-02",
			status: "approved",
		},
		{
			id: "3",
			username: "Mike Johnson",
			blogtitle: "Understanding TypeScript",
			comment: "Very informative!",
			createdAt: "2026-07-03",
			status: "pending",
		},
		{
			id: "4",
			username: "Sarah Williams",
			blogtitle: "Design Systems in 2026",
			comment: "Love the examples!",
			createdAt: "2026-07-04",
			status: "approved",
		},
	]);

	const [globalFilter, setGlobalFilter] = useState("");
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
		{ id: "status", value: "pending" },
	]);
	const [activeTab, setActiveTab] = useState<"pending" | "approved">("pending");
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

	useEffect(() => {
		setColumnFilters([{ id: "status", value: activeTab }]);
	}, [activeTab]);

	const columns = useMemo<ColumnDef<BlogPost>[]>(
		() => [
			{ accessorKey: "username", header: "Username" },
			{ accessorKey: "blogtitle", header: "Blog Title" },
			{ accessorKey: "comment", header: "Comment" },
			{ accessorKey: "createdAt", header: "Created At" },
			{ accessorKey: "status", header: "Status" },
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
		data,
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
						placeholder="Search posts..."
						value={globalFilter ?? ""}
						onChange={(e) => setGlobalFilter(e.target.value)}
						className="h-8 w-48 pl-3 text-xs rounded-md border border-gray-200 outline-none"
					/>
				</div>

				<div className="flex gap-1">
					<button
						type="button"
						onClick={() => setActiveTab("pending")}
						className={`px-4 py-1.5 text-xs rounded-t-md font-medium transition-all ${
							activeTab === "pending"
								? "bg-green-700 text-white"
								: "bg-green-50 text-green-700 border"
						}`}
					>
						For Approval
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("approved")}
						className={`px-4 py-1.5 text-xs rounded-t-md font-medium transition-all ${
							activeTab === "approved"
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
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody className="divide-y divide-gray-100 text-xs">
							{table.getRowModel().rows.map((row) => (
								<tr key={row.id} className="bg-green-50 hover:bg-green-100">
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id} className="p-3 text-gray-600">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
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
								// biome-ignore lint/suspicious/noArrayIndexKey: Page numbers are stable in this pagination context
								<PaginationItem key={i + 1}>
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
				onApprove={(id) => console.log("Approved", id)}
				onReject={(id) => console.log("Rejected", id)}
			/>
		</>
	);
}
