"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	type Row,
	useReactTable,
} from "@tanstack/react-table";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/alert-dialog/alert-dialog";
import { Button } from "@/components/button/button";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/pagination";
import type { BlogPost } from "./blog-admin";

// Define the filter function outside the component
const isWithinDate = (
	row: Row<BlogPost>,
	columnId: string,
	filterValue: string,
) => {
	if (!filterValue) return true;
	const rowDate = new Date(row.getValue(columnId)).toLocaleDateString();
	const filterDate = new Date(filterValue).toLocaleDateString();
	return rowDate === filterDate;
};

interface BlogTableProps {
	data: BlogPost[];
	onAdd: () => void;
	onEdit: (blog: BlogPost) => void;
	onView: (blog: BlogPost) => void;
	onDelete: (id: string) => void;
}

export default function BlogTable({
	data,
	onAdd,
	onEdit,
	onView,
	onDelete,
}: BlogTableProps) {
	const [globalFilter, setGlobalFilter] = useState("");
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

	const columns = useMemo<ColumnDef<BlogPost>[]>(
		() => [
			{ accessorKey: "title", header: "Title" },
			{
				id: "category",
				header: "Category",
				accessorFn: (row) => row.category?.name ?? "Uncategorized",
			},
			{
				accessorKey: "createdAt",
				header: "Created At",
				filterFn: isWithinDate,
				cell: ({ row }) =>
					new Date(row.original.createdAt).toLocaleDateString(),
			},
			{
				id: "actions",
				header: "Actions",
				cell: (info) => (
					<div className="flex gap-2 justify-center">
						<button
							type="button"
							className="text-blue-600 hover:scale-110 transition-transform cursor-pointer"
							onClick={() => onView(info.row.original)}
							title="View Post"
						>
							<Eye size={15} />
						</button>
						<button
							type="button"
							className="text-yellow-600 hover:scale-110 transition-transform cursor-pointer"
							onClick={() => onEdit(info.row.original)}
							title="Edit Post"
						>
							<Pencil size={15} />
						</button>

						<AlertDialog>
							<AlertDialogTrigger
								className="text-red-600 hover:scale-110 transition-transform cursor-pointer"
								title="Delete Post"
							>
								<Trash2 size={15} />
							</AlertDialogTrigger>

							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle className="font-mono text-sm">
										Confirm Deletion
									</AlertDialogTitle>
									<AlertDialogDescription className="font-mono text-sm">
										This action cannot be undone. This will permanently delete
										the post and all associated comments.
									</AlertDialogDescription>
								</AlertDialogHeader>

								<AlertDialogFooter>
									<AlertDialogCancel size="sm" className="font-mono text-sm">
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction
										size="sm"
										className="font-mono text-sm bg-destructive! text-destructive-foreground hover:!bg-destructive/90!"
										onClick={() => onDelete(info.row.original.id)}
									>
										Delete
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				),
			},
		],
		[onDelete, onEdit, onView],
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
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex flex-wrap gap-2 items-center mb-4 shrink-0">
				<div className="relative flex items-center">
					<Search className="absolute left-2.5 text-gray-400" size={14} />
					<input
						placeholder="Search posts..."
						value={globalFilter ?? ""}
						onChange={(e) => setGlobalFilter(e.target.value)}
						className="h-8 w-48 pl-8 pr-3 text-xs rounded-md border border-gray-200 outline-none focus:ring-1 focus:ring-green-400"
					/>
				</div>

				<div className="flex items-center gap-2">
					<label
						htmlFor="date-filter"
						className="text-xs font-mono text-gray-500"
					>
						Filter Date:
					</label>
					<input
						id="date-filter"
						type="date"
						className="h-8 px-2 text-xs rounded-md border border-gray-200 outline-none focus:ring-1 focus:ring-green-400"
						onChange={(e) => {
							const val = e.target.value;
							table.getColumn("createdAt")?.setFilterValue(val);
						}}
					/>
				</div>

				<div className="ml-auto">
					<Button type="button" variant="green" size="sm" onClick={onAdd}>
						<Plus size={18} /> Add Post
					</Button>
				</div>
			</div>

			<div className="flex-1 overflow-auto border border-gray-200 rounded-md">
				<table className="w-full min-w-[600px] text-left text-sm font-mono border-collapse">
					<thead className="bg-green-100 sticky top-0 z-10">
						<tr>
							<th className="p-3 w-1/2 text-green-800 border-b">Title</th>
							<th className="p-3 w-1/4 text-green-800 border-b">Category</th>
							<th className="p-3 w-1/6 text-green-800 border-b">Created At</th>
							<th className="p-3 w-1/12 text-green-800 border-b text-center">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100 text-xs">
						{table.getRowModel().rows.length === 0 && (
							<tr>
								<td colSpan={4} className="p-6 text-center text-gray-400">
									No blog posts found.
								</td>
							</tr>
						)}
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className="bg-green-50 hover:bg-green-100 transition-colors"
							>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="p-3 text-gray-600 truncate">
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
						{table.getPageOptions().map((pageNumber) => (
							<PaginationItem key={pageNumber}>
								<PaginationLink
									size="xs"
									isActive={pageNumber === pagination.pageIndex}
									onClick={() => table.setPageIndex(pageNumber)}
								>
									{pageNumber + 1}
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
	);
}
