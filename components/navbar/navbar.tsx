import Image from "next/image";

export default function Navbar() {
	return (
		<div className="w-full text-center py-15 relative overflow-hidden h-50">
			<Image
				src="/assets/main-project_bg.png"
				alt="Blog post background"
				fill
				priority
				className="object-cover object-[center_60%] pointer-events-none"
			/>

			<div className="absolute inset-0 bg-black/50 pointer-events-none z-10"></div>

			{/* Content Container */}
			<div className="flex flex-col items-center justify-center relative z-20 text-white px-4">
				<h1 className="text-xl sm:text-2xl md:text-3xl font-mono">
					Welcome to AAA.blog_post
				</h1>
				<p className="text-[9px] sm:text-[10px] md:text-xs font-mono text-gray-200 mt-2 max-w-2xl">
					this is my blog where i share my thoughts and experiences
				</p>
			</div>
		</div>
	);
}
