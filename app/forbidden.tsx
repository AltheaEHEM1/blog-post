"use client";

import BaseError from "@/components/layout/BaseError";
import Link from "next/link";

export default function Forbidden() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <BaseError
                title="403 - Forbidden"
                message="You do not have permission to view this page."
            />
            <Link href="/" className="text-blue-600 hover:underline mt-4">
                Go Home
            </Link>
        </div>
    );
}