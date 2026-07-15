export default function Footer() {
	const currentYear: number = new Date().getFullYear();

	return (
		<footer className="mt-auto w-full border-t border-slate-800/80 bg-[#0a0f0e]/60 backdrop-blur-md">
			<div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-y-2 px-6 py-4">
				<span className="inline-block text-sm tracking-wide transition-all duration-500 ease-out hover:scale-105">
					<span className="text-cyan-400">&lt;&nbsp;</span>
					<span className="text-cyan-300">AAA.blog_post</span>
					<span className="text-cyan-400">&nbsp;/&gt;</span>
				</span>
				<span className="font-mono text-xs tracking-wide text-slate-400 transition-colors duration-300">
					&copy; {currentYear}{" "}
					<span className="font-medium text-slate-300">
						Althea Amor J. Asis
					</span>
					. Built with passion &amp; curiosity.
				</span>
			</div>
		</footer>
	);
}
