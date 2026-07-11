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

type Category = {
    id: string;
    category: string;
    createdAt: string;
};

export default function CategoryTable() {
    const [data] = useState<Category[]>([
        { id: "1", category: "Tech", createdAt: "2026-07-01" },
        { id: "2", category: "UX", createdAt: "2026-07-02" },
    ]);

    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    const columns = useMemo<ColumnDef<Category>[]>(() => [
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

                <input
                    type="date"
                    className="h-8 px-2 text-xs rounded-md border border-gray-200 outline-none"
                    onChange={(e) => table.getColumn("createdAt")?.setFilterValue(e.target.value)}
                />

                <div className="ml-auto">
                    <Button type="button" variant="green" size="sm"><Plus size={18} /> Add Category</Button>
                </div>
            </div>

            <div className="flex-1 overflow-auto border border-gray-200 rounded-md">
                <table className="w-full min-w-[600px] text-left text-sm font-mono border-collapse">
                    <thead className="bg-green-100 sticky top-0 z-10">
                        <tr>
                            <th className="p-3 w-1/2 text-green-800 border-b">Category</th>
                            <th className="p-3 w-1/5 text-green-800 border-b">Created At</th>
                            <th className="p-3 w-1/10 text-green-800 border-b text-center">Actions</th>
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
