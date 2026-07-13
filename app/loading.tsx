import { Skeleton } from "@/components/skeleton/skeleton";

export default function Loading() {
	return (
		<main className="min-h-screen text-slate-200">
			<section className="max-w-6xl mx-auto px-6 py-20">
				<Skeleton className="h-9 w-56 mb-6 rounded-lg" />

				<div className="flex flex-wrap gap-2 mb-12">
					{[1, 2, 3, 4].map((i) => (
						<Skeleton key={i} className="h-6 w-20 rounded-full" />
					))}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{[1, 2, 3, 4, 5, 6].map((i) => (
						<div
							key={i}
							className="flex flex-col border border-slate-200 dark:border-slate-800 p-6 rounded-xl h-70"
						>
							<Skeleton className="h-3 w-32 mb-4 rounded-md" />
							<Skeleton className="h-6 w-3/4 mb-4 rounded-md" />
							<div className="space-y-2 mb-6 grow">
								<Skeleton className="h-4 w-full rounded-md" />
								<Skeleton className="h-4 w-full rounded-md" />
								<Skeleton className="h-4 w-5/6 rounded-md" />
							</div>
							<Skeleton className="h-4 w-24 rounded-md" />
						</div>
					))}
				</div>
			</section>
		</main>
	);
}