import type { ReactNode } from "react";
import { Badge } from "../badge/badge";

export interface PageHeaderProps {
	title: string;
	description: string;
	area: string;
	showArea?: boolean;
	titleAction?: ReactNode;
}

export function PageHeader({
	title,
	description,
	area,
	showArea = false,
	titleAction,
}: PageHeaderProps) {
	return (
		<header className="mb-6 space-y-0">
			{showArea && (
				<div className="pb-1">
					<Badge className="border border-teal-700 bg-teal-50 text-teal-700 font-oxanium text-[9px] font-bold uppercase tracking-widest px-1.5 py-0">
						{area}
					</Badge>
				</div>
			)}
			<div className="flex items-center justify-between gap-1">
				<h1 className="text-xl font-bold text-slate-900 tracking-tight font-mono">
					{title}
				</h1>
				{titleAction && <div className="shrink-0">{titleAction}</div>}
			</div>
			<p className="-mt-1 text-slate-500 text-[12px] leading-relaxed font-mono">
				{description}
			</p>
		</header>
	);
}
