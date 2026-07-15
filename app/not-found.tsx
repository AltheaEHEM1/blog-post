"use client";

import Link from "next/link";
import BaseError from "@/components/layout/BaseError";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh]">
			<BaseError
				title="404 - Page Not Found"
				message="The page or blog post you are looking for does not exist."
			/>
			<Link href="/blog" className="text-blue-600 hover:underline mt-4">
				Return to Blog List
			</Link>
		</div>
	);
}
