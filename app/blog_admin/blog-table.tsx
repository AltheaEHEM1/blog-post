"use client";

import { type ColumnDef, type ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from "@/components/pagination";
import { useMemo, useState } from "react";
import { Button } from '@/components/button/button';

type BlogPost = {
	id: string;
	title: string;
	category: string;
	createdAt: string;
};

export default function BlogTable() {
	const [data] = useState<BlogPost[]>([
		{ id: "1", title: "Getting Started with Next.js", createdAt: "2026-07-01", category: "Tech" },
		{ id: "2", title: "Advanced React Patterns", createdAt: "2026-07-02", category: "Tech" },
		{ id: "3", title: "Understanding TypeScript", createdAt: "2026-07-03", category: "Tech" },
		{ id: "4", title: "Design Systems in 2026", createdAt: "2026-07-04", category: "Design" },
		{ id: "5", title: "Optimizing Web Performance", createdAt: "2026-07-05", category: "Performance" },
		{ id: "6", title: "Deploying with Vercel", createdAt: "2026-07-06", category: "DevOps" },
		{ id: "7", title: "State Management with TanStack Table", createdAt: "2026-07-07", category: "Tech" },
		{ id: "8", title: "CSS Grid vs Flexbox", createdAt: "2026-07-08", category: "Design" },
		{ id: "9", title: "Using React Query", createdAt: "2026-07-09", category: "Tech" },
		{ id: "10", title: "Testing React Components", createdAt: "2026-07-10", category: "Testing" },
		{ id: "11", title: "Accessibility Best Practices", createdAt: "2026-07-11", category: "UX" },
		{ id: "12", title: "Serverless Functions Overview", createdAt: "2026-07-12", category: "Backend" },
		{ id: "13", title: "Testing React Components", createdAt: "2026-07-10", category: "Testing" },
		{ id: "14", title: "Accessibility Best Practices", createdAt: "2026-07-11", category: "UX" },
		{ id: "15", title: "Serverless Functions Overview", createdAt: "2026-07-12", category: "Backend" },
	]);

	const [globalFilter, setGlobalFilter] = useState("");
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

	const columns = useMemo<ColumnDef<BlogPost>[]>(() => [
		{ accessorKey: "title", header: "Title" },
		{ accessorKey: "category", header: "Category" },
		{ accessorKey: "createdAt", header: "Created At" },
		{
			id: "actions",
			header: "Actions",
			cell: () => (
				<div className="flex gap-2 justify-center">
					<button type="button" className="text-blue-600 hover:scale-110 transition-transform"><Eye size={15} /></button>
					<button type="button" className="text-yellow-600 hover:scale-110 transition-transform"><Pencil size={15} /></button>
					<button type="button" className="text-red-600 hover:scale-110 transition-transform"><Trash2 size={15} /></button>
				</div>
			),
		},
	], []);

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

				<div className="relative h-8">
					<select
						className="h-full w-full appearance-none pl-3 pr-8 text-xs rounded-md border border-gray-200 outline-none transition-all cursor-pointer hover:border-green-300 focus:border-green-500 focus:ring-1 focus:ring-green-400 text-gray-700 font-medium"
						onChange={(e) => table.getColumn("category")?.setFilterValue(e.target.value)}
					>
						<option value="">Category</option>
						<option value="Tech">Tech</option>
						<option value="Design">Design</option>
						<option value="Performance">Performance</option>
						<option value="DevOps">DevOps</option>
						<option value="UX">UX</option>
					</select>
					<div className="pointer-events-none absolute right-2 top-0 flex h-full items-center text-gray-400">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</div>
				</div>

				<input
					type="date"
					className="h-8 px-2 text-xs rounded-md border border-gray-200 outline-none"
					onChange={(e) => table.getColumn("createdAt")?.setFilterValue(e.target.value)}
				/>

				<div className="ml-auto">
					<Button type="button" variant="green" size="sm"><Plus size={18} /> Add Post</Button>
				</div>
			</div>

			{/* Table Container */}
			<div className="flex-1 overflow-auto border border-gray-200 rounded-md">
				<table className="w-full min-w-[600px] text-left text-sm font-mono border-collapse">
					<thead className="bg-green-100 sticky top-0 z-10">
						<tr>
							<th className="p-3 w-1/2 text-green-800 border-b">Title</th>
							<th className="p-3 w-1/4 text-green-800 border-b">Category</th>
							<th className="p-3 w-1/6 text-green-800 border-b">Created At</th>
							<th className="p-3 w-1/12 text-green-800 border-b text-center">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100 text-xs">
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className="bg-green-50 hover:bg-green-100 transition-colors">
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

						{Array.from({ length: table.getPageCount() }).map((_, i) => (
							<PaginationItem key={i}>
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
	);
}
