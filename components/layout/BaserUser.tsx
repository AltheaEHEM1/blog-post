import type React from "react";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";

export default function BaserUser({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col relative z-10">
			{/* Navbar */}
			<Navbar />

			{/* Main Layout */}
			<div className="flex-1 flex flex-row w-full">
				{/* Content now grows naturally */}
				<main className="w-full flex-1">{children}</main>
			</div>

			{/* Footer stays at bottom but moves with content */}
			<div className="z-30">
				<Footer />
			</div>
		</div>
	);
}
