"use client";

import { type ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable, } from "@tanstack/react-table";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
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
		{
			id: "1",
			title: "Getting Started with Next.js",
			createdAt: "2026-07-01",
			category: "Tech",
		},
		{
			id: "2",
			title: "Getting Started with Next.js",
			createdAt: "2026-07-01",
			category: "Tech",
		},
		{
			id: "3",
			title: "Getting Started with Next.jsGetting Started with Next.jsGetting Started with Next.jsStarted wng Started with Next.jsStarted with Next.jsGetting Started with Next.js",
			createdAt: "2026-07-01",
			category: "Tech",
		},
		{
			id: "4",
			title: "Getting Started with Next.js",
			createdAt: "2026-07-01",
			category: "Techng Started with Next.jsStarted wng Started with Next.jsStarted wng Started with Next.jsStarted w",
		},
		{
			id: "5",
			title: "Getting Started with Next.js",
			createdAt: "2026-07-01",
			category: "Tech",
		},
		{
			id: "4",
			title: "Getting Started with Next.js",
			createdAt: "2026-07-01",
			category: "Techng Started with Next.jsStarted wng Started with Next.jsStarted wng Started with Next.jsStarted w",
		},
		{
			id: "5",
			title: "Getting Started with Next.js",
			createdAt: "2026-07-01",
			category: "Tech",
		},
		{
			id: "4",
			title: "Getting Started with Next.js",
			createdAt: "2026-07-01",
			category: "Techng Started with Next.jsStarted wng Started with Next.jsStarted wng Started with Next.jsStarted w",
		},
		{
			id: "5",
			title: "Getting Started with Next.js",
			createdAt: "2026-07-01",
			category: "Tech",
		},

	]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

	const columns = useMemo<ColumnDef<BlogPost>[]>(
		() => [
			{ accessorKey: "title", header: "Title" },
			{ accessorKey: "category", header: "Category" },
			{ accessorKey: "createdAt", header: "Created At" },
			{
				id: "actions",
				header: "Actions",
				cell: () => (
					<div className="flex gap-1">
						<button type="button" className="text-blue-600 transform transition-transform duration-200 hover:scale-110" title="View">
							<Eye size={18} />
						</button>
						<button
							type="button"
							className="text-yellow-600 transform transition-transform duration-200 hover:scale-110"
							title="Edit"
						>
							<Pencil size={18} />
						</button>
						<button type="button" className="text-red-600 transform transition-transform duration-200 hover:scale-110" title="Delete">
							<Trash2 size={18} />
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
		state: { globalFilter, pagination },
		onGlobalFilterChange: setGlobalFilter,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	return (
		<div>
			{/* Header & Search */}
			<div className="flex justify-between items-center mb-4">
				<div className="relative flex items-center">
					{/* Icon */}
					<Search className="absolute left-2.5 text-gray-400" size={14} />
					<input
						placeholder="Search posts..."
						value={globalFilter ?? ""}
						onChange={(e) => setGlobalFilter(e.target.value)}
						className="h-8 w-64 pl-8 pr-3 py-1 font-mono text-xs rounded-md border border-gray-200 bg-white shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-green-50 focus:ring-1 focus:ring-green-400"
					/>
				</div>
				<Button
					type="button"
					variant="green"
					size="sm"
				>
					<Plus size={18} /> Add Post
				</Button>
			</div>

			<div className="border border-gray-200 rounded-md h-[300px] overflow-y-auto relative">
				<table className="w-full table-fixed text-left text-sm font-mono border-collapse">
					{/* Added sticky positioning to the thead */}
					<thead className="bg-green-100 sticky top-0 z-10">
						<tr>
							<th className="p-3 w-[50%] font-bold text-green-800 border-b">Title</th>
							<th className="p-3 w-[20%] font-bold text-green-800 border-b">Category</th>
							<th className="p-3 w-[15%] font-bold text-green-800 border-b">Created At</th>
							<th className="p-3 w-[15%] font-bold text-green-800 border-b text-center">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100 text-xs">
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className="odd:bg-green-50 even:bg-green-50 hover:bg-green-50 transition-colors">
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className={`p-3 text-gray-600 truncate ${cell.column.id === 'actions' ? 'flex justify-center items-center' : ''}`}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
