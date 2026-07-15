"use client";
import type React from "react";
import { useState } from "react";
import BackgroundAdmin from "@/components/background/background-admin";
import Sidebar from "../sidebar/sidebar";
import Header from "../sidebar/sidebar-header";

export default function BaseAdmin({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen overflow-hidden">
			<BackgroundAdmin />
			<Sidebar opened={sidebarOpen} close={() => setSidebarOpen(false)} />

			<div className="flex-1 flex flex-col min-w-0">
				<Header onMenuClick={() => setSidebarOpen(true)} />

				<main className="flex-1 overflow-hidden flex flex-col p-4 md:px-8 md:pb-8 md:pt-3">
					<div className="flex-1 container mx-auto bg-[rgba(218,243,236,0.3)] p-4 md:p-8 rounded-lg shadow-lg flex flex-col overflow-hidden">
						{children}
					</div>
				</main>
			</div>
		</div>
	);
}
