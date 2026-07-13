"use client";

interface BaseErrorProps {
	title: string;
	message: string;
	actionLabel?: string;
	onAction?: () => void;
}

export default function BaseError({
	title,
	message,
	actionLabel,
	onAction,
}: BaseErrorProps) {
	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
			<h2 className="text-2xl font-bold text-gray-900">{title}</h2>
			<p className="mt-2 text-gray-600">{message}</p>
			{onAction && (
				<button
					type="button"
					onClick={onAction}
					className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
				>
					{actionLabel || "Try again"}
				</button>
			)}
		</div>
	);
}
