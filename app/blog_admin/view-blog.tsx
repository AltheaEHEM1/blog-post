"use client";

import { Calendar, Tag, User } from "lucide-react";
import type { BlogPost } from "./blog-admin";

interface ViewBlogProps {
    data: BlogPost;
    onEdit: () => void;
}

export default function ViewBlog({ data }: ViewBlogProps) {
    return (
        <div className="flex flex-col h-full w-full min-h-0 overflow-y-auto overflow-x-hidden px-7">
            <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs font-mono border border-green-200 w-fit max-w-full">
                <Tag size={12} className="shrink-0" />
                <span className="truncate">{data.category?.name ?? "Uncategorized"}</span>
            </div>
            <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2 mt-4 w-full">
                <h1 className="text-xl font-mono font-bold text-gray-900 break-words flex-1 min-w-[200px]">
                    {data.title}
                </h1>
                <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-xs font-mono text-gray-500 shrink-0">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <User size={14} className="text-green-600 shrink-0" />
                        <span>{data.authorName || "Anonymous"}</span>
                    </div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <Calendar size={14} className="text-green-600 shrink-0" />
                        <span>{new Date(data.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {data.subtitle && (
                <p className="text-xs font-mono text-gray-500 italic mt-2 break-words">
                    {data.subtitle}
                </p>
            )}
            <div className="mt-8 text-sm prose font-mono prose-green max-w-none text-gray-700 whitespace-pre-wrap break-words leading-relaxed">
                {data.body}
            </div>
        </div>
    );
}