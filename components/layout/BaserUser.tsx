import type React from "react";
import BackgroundUser from "@/components/background/background-user";
import Footer from "../footer/footer";

export default function BaserUser({ children }: { children: React.ReactNode }) {
	return (
		<div className="dark relative min-h-screen flex flex-col">
			<BackgroundUser />
			<div className="relative z-10 flex min-h-screen flex-col">
				<main className="flex-1 w-full">{children}</main>
				<Footer />
			</div>
		</div>
	);
}
