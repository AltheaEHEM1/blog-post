"use client";
import type React from "react";
import { useState } from "react";
import Sidebar from "../sidebar/sidebar";
import type { BreadcrumbItem } from "../sidebar/sidebar-header";
import Header from "../sidebar/sidebar-header";

export default function BaseAdmin({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const breadcrumbs: BreadcrumbItem[] = [
		{ href: "/blog_admin", label: "Blog Admin", isLast: true },
	];

	return (
		<div className="flex min-h-screen relative z-10">
			<Sidebar opened={sidebarOpen} close={() => setSidebarOpen(false)} />

			<div className="flex-1 flex flex-col min-w-0">
				<Header
					onMenuClick={() => setSidebarOpen(true)}
					breadcrumbs={breadcrumbs}
				/>

				<main className="overflow-x-hidden py-7 px-4 md:px-8">
					<div className="container mx-auto bg-white p-4 md:p-8 rounded-lg shadow-lg">
						{children}
					</div>
				</main>
			</div>
		</div>
	);
}
