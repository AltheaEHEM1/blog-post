import type React from "react";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import BackgroundUser from "@/components/background/background-user";

export default function BaserUser({ children }: { children: React.ReactNode }) {
	return (
		<div className="dark relative min-h-screen flex flex-col">
			<BackgroundUser />
			<div className="relative z-10 flex min-h-screen flex-col">
				<Navbar />
				<main className="flex-1 w-full">{children}</main>
				<Footer />
			</div>
		</div>
	);
}
