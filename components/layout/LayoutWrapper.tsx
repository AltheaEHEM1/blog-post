"use client";
import { usePathname } from "next/navigation";
import type React from "react";

import BaseAdmin from "./BaseAdmin";
import BaserUser from "./BaserUser";

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	const adminPaths = ["/blog_admin", "/category", "/comment"];

	const isAdminPath = adminPaths.some((path) => pathname?.startsWith(path));

	// Auth route has no layout wrapper so it can be standalone or just use fragment
	if (pathname?.startsWith("/auth")) {
		return <>{children}</>;
	}

	if (isAdminPath) {
		return <BaseAdmin>{children}</BaseAdmin>;
	}

	return <BaserUser>{children}</BaserUser>;
}
