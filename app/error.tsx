"use client";

import BaseError from "@/components/layout/BaseError";

export default function AppError({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<BaseError
			title="Something went wrong!"
			message={error.message || "An unexpected error occurred."}
			onAction={reset}
			actionLabel="Try again"
		/>
	);
}
