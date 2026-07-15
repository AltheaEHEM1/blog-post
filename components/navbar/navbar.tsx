import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
	title: string;
}

export default function Navbar({ title }: NavbarProps) {
	return (
		<div className="w-full relative overflow-hidden h-40 flex flex-col justify-center items-center">
			{/* Back Button - Absolute to keep it from affecting center alignment */}
			<Link
				href="/blog"
				className="absolute top-4 left-8 z-30 inline-flex items-center text-sm font-bold text-slate-200 hover:text-cyan-400 border-b border-transparent hover:border-cyan-400 transition-all"
			>
				← Back
			</Link>

			{/* Background Image */}
			<Image
				src="/assets/main-project_bg.png"
				alt="Blog post background"
				fill
				priority
				className="object-cover object-[center_50%] pointer-events-none"
			/>
			<div className="absolute inset-0 bg-black/60 pointer-events-none z-10"></div>

			{/* Centered Title */}
			<div className="relative z-20 text-white px-6 text-center max-w-4xl">
				<h1 className="text-3xl md:text-5xl font-mono font-bold leading-tight">
					{title}
				</h1>
			</div>
		</div>
	);
}