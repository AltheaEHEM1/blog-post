export default function Footer() {
	const currentYear: number = new Date().getFullYear();

	return (
		<footer>
			<div>
				{/* Brand Logo Token */}
				<span className="inline-block text-sm tracking-wide transition-all duration-500 ease-out hover:scale-105">
					{/* Opening Bracket */}
					<span className="text-teal">&lt;&nbsp;</span>
					<span className="text-teal-dark">AAJ.Asis</span>
					<span className="text-teal">&nbsp;/&gt;</span>
				</span>

				{/* Main Copyright Text */}
				<p className="font-valorant text-xs tracking-wide text-text transition-colors duration-300">
					&copy; {currentYear}{" "}
					<span className="font-medium opacity-80">Althea Amor J. Asis</span>.
					Built with passion &amp; curiosity.
				</p>
			</div>
		</footer>
	);
}
