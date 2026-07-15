"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	type FilterFn,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { deleteCategory } from "@/actions/category-action";
import FormModal from "@/app/category/form-modal";
import ViewModal from "@/app/category/view-modal";
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

type Category = {
	id: string;
	name: string;
	slug: string;
	createdAt: Date;
};

const isWithinDate: FilterFn<Category> = (row, columnId, filterValue) => {
	if (!filterValue) return true;
	const cellValue = new Date(row.getValue(columnId)).toLocaleDateString(
		"en-CA",
	);
	return cellValue === filterValue;
};

export default function CategoryTable({
	categories,
}: {
	categories: Category[];
}) {
	const [globalFilter, setGlobalFilter] = useState("");
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [editCategory, setEditCategory] = useState<Category | null>(null);
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
	const [viewOpen, setViewOpen] = useState(false);
	const [viewCategory, setViewCategory] = useState<Category | null>(null);

	const handleEdit = useCallback((category: Category) => {
		setEditCategory(category);
		setModalOpen(true);
	}, []);
	const handleDelete = useCallback(async (id: string) => {
		try {
			await deleteCategory(id);
			toast.success("Category deleted successfully");
		} catch {
			toast.error("Failed to delete category");
		}
	}, []);

	const handleAdd = () => {
		setEditCategory(null);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setEditCategory(null);
	};

	const columns = useMemo<ColumnDef<Category>[]>(
		() => [
			{ accessorKey: "name", header: "Category" },
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
				cell: ({ row }) => (
					<div className="flex gap-2 justify-center">
						<button
							type="button"
							className="text-blue-600 hover:scale-110 transition-transform"
							onClick={() => {
								setViewCategory(row.original);
								setViewOpen(true);
							}}
						>
							<Eye size={15} />
						</button>
						<button
							type="button"
							className="text-yellow-600 hover:scale-110 transition-transform"
							onClick={() => handleEdit(row.original)}
						>
							<Pencil size={15} />
						</button>
						<AlertDialog>
							<AlertDialogTrigger
								className="text-red-600 hover:scale-110 transition-transform cursor-pointer"
								title="Delete Category"
							>
								<Trash2 size={15} />
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle className="font-mono text-sm">
										Confirm Deletion
									</AlertDialogTitle>
									<AlertDialogDescription className="font-mono text-sm">
										This action cannot be undone. This will permanently deleted.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel size="sm" className="font-mono text-sm">
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction
										size="sm"
										className="font-mono text-sm !bg-destructive !text-destructive-foreground hover:!bg-destructive/90"
										onClick={() => handleDelete(row.original.id)}
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
		[handleEdit, handleDelete],
	);

	const table = useReactTable({
		data: categories,
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
					<div className="relative flex items-center">
						<Search className="absolute left-2.5 text-gray-400" size={14} />
						<input
							placeholder="Search categories..."
							value={globalFilter ?? ""}
							onChange={(e) => setGlobalFilter(e.target.value)}
							className="h-8 w-48 pl-8 pr-3 text-xs rounded-md border border-gray-200 outline-none focus:ring-1 focus:ring-green-400"
						/>
					</div>

					<div className="flex items-center gap-2">
						<label
							htmlFor="filterDate"
							className="text-xs font-mono text-gray-500"
						>
							Filter Date:
						</label>
						<input
							id="filterDate"
							type="date"
							className="h-8 px-2 text-xs rounded-md border border-gray-200 outline-none focus:ring-1 focus:ring-green-400"
							onChange={(e) =>
								table.getColumn("createdAt")?.setFilterValue(e.target.value)
							}
						/>
					</div>

					<div className="ml-auto">
						<Button type="button" variant="green" size="sm" onClick={handleAdd}>
							<Plus size={18} /> Add Category
						</Button>
					</div>
				</div>

				<div className="flex-1 overflow-auto border border-gray-200 rounded-md">
					<table className="w-full min-w-[600px] text-left text-sm font-mono border-collapse table-fixed">
						<thead className="bg-green-100 sticky top-0 z-10">
							<tr>
								<th className="p-3 w-[20%] text-green-800 border-b text-left font-semibold">
									Category
								</th>

								<th className="p-3 w-[18%] text-green-800 border-b text-left font-semibold whitespace-nowrap">
									Created At
								</th>
								<th className="p-3 w-[12%] text-green-800 border-b text-center font-semibold">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100 text-xs">
							{table.getRowModel().rows?.length === 0 && (
								<tr>
									<td colSpan={4} className="p-6 text-center text-gray-400">
										No categories found.
									</td>
								</tr>
							)}
							{table.getRowModel().rows.map((row) => (
								<tr
									key={row.id}
									className="bg-green-50 hover:bg-green-100 transition-colors"
								>
									{row.getVisibleCells().map((cell) => {
										const isActions = cell.column.id === "actions";
										return (
											<td
												key={cell.id}
												className={`p-3 text-gray-600 whitespace-normal break-words ${isActions ? "text-center" : "text-left"}`}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</td>
										);
									})}
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
							{Array.from(
								{ length: table.getPageCount() },
								(_, i) => i + 1,
							).map((pageNumber) => (
								<PaginationItem key={pageNumber}>
									<PaginationLink
										size="xs"
										isActive={
											table.getState().pagination.pageIndex + 1 === pageNumber
										}
										onClick={() => table.setPageIndex(pageNumber - 1)}
									>
										{pageNumber}
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

			<FormModal
				key={modalOpen ? (editCategory?.id ?? "new") : "closed"}
				opened={modalOpen}
				onClose={handleCloseModal}
				initialData={
					editCategory
						? {
								id: editCategory.id,
								name: editCategory.name,
								description: null, // Provide a default value for the missing field
							}
						: undefined
				}
			/>
			<ViewModal
				opened={viewOpen}
				onClose={() => setViewOpen(false)}
				data={viewCategory}
			/>
		</>
	);
}
