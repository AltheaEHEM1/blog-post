"use client";

import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    type Row,
} from "@tanstack/react-table";
import { Eye, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { approveComment, rejectComment } from "@/actions/comment-action";
import ViewModal from "@/app/comment/view-modal";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/pagination";

export type CommentRow = {
    id: string;
    authorName: string;
    body: string;
    approved: boolean;
    createdAt: Date;
    blog: { id: string; title: string } | null;
};

const isWithinDate = (
    row: Row<CommentRow>,
    columnId: string,
    filterValue: string,
) => {
    if (!filterValue) return true;
    const rowDate = new Date(row.getValue(columnId)).toLocaleDateString();
    const filterDate = new Date(filterValue).toLocaleDateString();
    return rowDate === filterDate;
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

    const columnWidths: Record<string, string> = {
        authorName: "w-[25%]",
        blogtitle: "w-[35%]",
        createdAt: "w-[15%]",
        status: "w-[10%]",
        actions: "w-[15%]",
    };

    useEffect(() => {
        setColumnFilters((prev) => [
            ...prev.filter((f) => f.id !== "status"),
            { id: "status", value: activeTab },
        ]);
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
            {
                accessorKey: "createdAt",
                header: "Created At",
                filterFn: isWithinDate,
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
                <div className="flex flex-wrap gap-4 items-center justify-between mb-4 w-full shrink-0">
                    <div className="relative flex items-center">
                        <Search className="absolute left-2.5 text-gray-400" size={14} />
                        <input
                            placeholder="Search comments..."
                            value={globalFilter ?? ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="h-8 w-48 pl-8 pr-3 text-xs rounded-md border border-gray-200 outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="filterDate" className="text-xs font-mono text-gray-500">
                            Filter Date:
                        </label>
                        <input
                            id="filterDate"
                            type="date"
                            className="h-8 px-2 text-xs rounded-md border border-gray-200 outline-none focus:ring-1 focus:ring-green-400"
                            onChange={(e) => table.getColumn("createdAt")?.setFilterValue(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-1">
                    {["pending", "approved"].map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab as "pending" | "approved")}
                            className={`px-4 py-1.5 text-xs rounded-t-md font-medium transition-all ${activeTab === tab
                                ? "bg-green-700 text-white"
                                : "bg-green-50 text-green-700 border"
                                }`}
                        >
                            {tab === "pending" ? "For Approval" : "Approved"}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-auto border border-gray-200 rounded-b-md">
                    <table className="w-full min-w-[600px] text-left text-sm font-mono border-collapse table-fixed">
                        <thead className="bg-green-100 sticky top-0 z-10">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className={`p-4 text-green-800 border-b ${columnWidths[header.column.id] || "w-auto"}`}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-xs">
                            {table.getRowModel().rows.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-6 text-center text-gray-400">
                                        No comments in this view.
                                    </td>
                                </tr>
                            )}
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="bg-green-50 hover:bg-green-100 transition-colors">
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className={`p-4 text-gray-600 whitespace-normal break-words ${columnWidths[cell.column.id] || "w-auto"}`}
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
