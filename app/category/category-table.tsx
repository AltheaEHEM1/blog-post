"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
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
import { deleteCategory } from "@/actions/category-action";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
};

export default function CategoryTable({ categories }: { categories: Category[] }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [viewOpen, setViewOpen] = useState(false);
  const [viewCategory, setViewCategory] = useState<Category | null>(null);

  const handleDelete = async (id: string) => {
    await deleteCategory(id); // soft delete — revalidatePath refreshes the list automatically
  };

  const columns = useMemo<ColumnDef<Category>[]>(
    () => [
      { accessorKey: "name", header: "Category" },
      { accessorKey: "description", header: "Description" },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
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
              onClick={() => {
                setEditCategory(row.original);
                setModalOpen(true);
              }}
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
                  <AlertDialogTitle className="font-mono text-sm">Confirm Deletion</AlertDialogTitle>
                  <AlertDialogDescription className="font-mono text-sm">
                    This moves the category to trash. You can restore it later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel size="sm" className="font-mono text-sm">Cancel</AlertDialogCancel>
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
    [],
  );

  const table = useReactTable({
    data: categories,
    columns,
    state: { globalFilter, pagination },
    onGlobalFilterChange: setGlobalFilter,
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

          <div className="ml-auto">
            <Button
              type="button"
              variant="green"
              size="sm"
              onClick={() => {
                setEditCategory(null);
                setModalOpen(true);
              }}
            >
              <Plus size={18} /> Add Category
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto border border-gray-200 rounded-md">
          <table className="w-full min-w-150 text-left text-sm font-mono border-collapse">
            <thead className="bg-green-100 sticky top-0 z-10">
              <tr>
                <th className="p-3 w-[20%] text-green-800 border-b text-left font-semibold">Category</th>
                <th className="p-3 w-[50%] text-green-800 border-b text-left font-semibold">Description</th>
                <th className="p-3 w-[18%] text-green-800 border-b text-left font-semibold whitespace-nowrap">Created At</th>
                <th className="p-3 w-[12%] text-green-800 border-b text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {table.getRowModel().rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-400">No categories yet.</td>
                </tr>
              )}
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="bg-green-50 hover:bg-green-100 transition-colors">
                  {row.getVisibleCells().map((cell) => {
                    const isActions = cell.column.id === "actions";
                    return (
                      <td key={cell.id} className={`p-3 text-gray-600 truncate ${isActions ? "text-center" : "text-left"}`}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
              <PaginationPrevious size="xs" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
              {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    size="xs"
                    isActive={table.getState().pagination.pageIndex + 1 === pageNumber}
                    onClick={() => table.setPageIndex(pageNumber - 1)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationNext size="xs" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      <FormModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editCategory ?? undefined}
      />
      <ViewModal opened={viewOpen} onClose={() => setViewOpen(false)} data={viewCategory} />
    </>
  );
}
