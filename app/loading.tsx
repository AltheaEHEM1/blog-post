import { Skeleton } from "@/components/skeleton/skeleton";

export default function Loading() {
	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col w-full">
			{/* Header skeleton */}
			<header className="sticky top-0 z-50 w-full bg-slate-950/85 backdrop-blur-md border-b border-white/10 py-3 px-4 shadow-lg h-[65px] flex items-center">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 max-w-7xl mx-auto w-full">
					<Skeleton className="h-6 w-32 sm:w-48 bg-slate-800" />
					<Skeleton className="h-8 w-full sm:w-64 rounded-md bg-slate-800" />
				</div>
			</header>

			{/* Carousel skeleton */}
			<section className="mb-12 md:mb-16 w-full">
				<div className="relative w-full h-125 sm:h-150 md:h-162.5 lg:h-175 overflow-hidden border border-white/10 bg-slate-900 shadow-xl shadow-black/40">
					<div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16 pb-28 sm:pb-36 lg:pb-44 max-w-2xl z-10">
						<Skeleton className="h-4 w-32 bg-slate-800 rounded-md mb-4" />
						<Skeleton className="h-10 sm:h-12 lg:h-14 w-3/4 bg-slate-800 rounded-md mb-3" />
						<Skeleton className="h-10 sm:h-12 lg:h-14 w-1/2 bg-slate-800 rounded-md mb-5" />
						<Skeleton className="h-4 w-full max-w-md bg-slate-800 rounded-md mb-2" />
						<Skeleton className="h-4 w-5/6 max-w-md bg-slate-800 rounded-md mb-6" />
						<Skeleton className="h-12 w-40 bg-slate-800 rounded-none border border-white/20" />
					</div>

					{/* Prev / next buttons skeleton */}
					<div className="absolute bottom-4 left-4 sm:left-8 lg:left-10 flex items-center gap-3 z-10">
						<Skeleton className="w-8 h-8 rounded-full bg-slate-800" />
						<Skeleton className="w-8 h-8 rounded-full bg-slate-800" />
						<div className="flex flex-col gap-1 ml-1">
							<Skeleton className="h-3 w-10 bg-slate-800 rounded-md" />
							<Skeleton className="w-12 sm:w-16 h-1 rounded-full bg-slate-800" />
						</div>
					</div>

					{/* Thumbnail selector skeleton */}
					<div className="hidden sm:flex absolute bottom-4 right-4 lg:right-10 gap-3 z-10">
						{[1, 2, 3, 4].map((i) => (
							<Skeleton
								key={i}
								className="w-16 lg:w-20 h-24 lg:h-28 rounded-xl bg-slate-800"
							/>
						))}
					</div>
				</div>
			</section>

			{/* Content segment */}
			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
				<div className="flex flex-col md:flex-row gap-6 lg:gap-8 mt-1 sm:mt-2 items-start">
					{/* Category Filter Section skeleton */}
					<div className="w-full md:w-52 lg:w-56 shrink-0 flex flex-wrap gap-2">
						{[1, 2, 3, 4, 5].map((i) => (
							<Skeleton
								key={i}
								className="h-9 w-20 sm:w-24 lg:w-28 rounded-full bg-slate-800"
							/>
						))}
					</div>

					{/* Posts Layout Grid skeleton */}
					<div className="w-full grow min-w-0">
						<div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-5 w-full min-h-75">
							{[1, 2, 3, 4, 5, 6].map((i) => (
								<div
									key={i}
									className="relative aspect-[3/3.4] w-full h-full rounded-xl bg-slate-900 border border-white/5 overflow-hidden flex flex-col justify-end p-4 sm:p-5"
								>
									<div className="space-y-3 w-full z-10">
										<Skeleton className="h-5 w-3/4 bg-slate-800 rounded-md" />
										<Skeleton className="h-5 w-1/2 bg-slate-800 rounded-md" />
										<Skeleton className="h-3 w-1/3 bg-slate-800 rounded-md mt-2" />
									</div>
									<Skeleton className="h-9 w-full bg-slate-800 rounded-lg mt-4 z-10" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
