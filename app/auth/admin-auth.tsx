"use client";

import { Eye, EyeOff } from "lucide-react";
import { useActionState, useState } from "react";
import { login } from "@/actions/auth-action";

export default function AdminAuth() {
	const [showPassword, setShowPassword] = useState(false);
	const [state, formAction, isPending] = useActionState(login, null);

	return (
		<div className="max-w-md mx-auto p-8 bg-white/50 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl space-y-6 flex flex-col items-center">
			{/* Centered Heading */}
			<div className="text-center">
				<h1 className="font-mono text-2xl font-bold text-cyan-400 tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
					&lt;AAA.blog_post/&gt;
				</h1>
				<h2 className="font-mono text-xl font-bold text-cyan-400 tracking-tighter mt-2">
					Login
				</h2>
			</div>

			<form action={formAction} className="flex flex-col items-center w-full">
				{/* Email Section */}
				<div className="mb-4 w-full max-w-[235px]">
					<label htmlFor="email" className="block text-xs font-bold text-[#1A1A2E] mb-1 pl-1">
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="Enter email"
						maxLength={128}
						className="w-full px-3 py-2 bg-gray-100 border border-transparent rounded-lg focus:border-[#1A1A2E] focus:outline-none focus:ring-1 focus:ring-[#1A1A2E] transition-all text-sm placeholder:text-xs"
					/>
					{state?.error?.email && (
						<p className="text-[10px] text-red-500 mt-1 pl-1">{state.error.email[0]}</p>
					)}
				</div>

				{/* Password Section */}
				<div className="mb-4 w-full max-w-[235px]">
					<label htmlFor="password" className="block text-xs font-bold text-[#1A1A2E] mb-1 pl-1">
						Password
					</label>
					<div className="relative w-full">
						<input
							id="password"
							name="password"
							type={showPassword ? "text" : "password"}
							placeholder="Enter password"
							className="w-full px-3 py-2 bg-gray-100 border border-transparent rounded-lg focus:border-[#1A1A2E] focus:outline-none focus:ring-1 focus:ring-[#1A1A2E] transition-all text-sm placeholder:text-xs"
						/>
						<button
							type="button"
							className="absolute right-3 top-2.5 text-gray-400 hover:text-[#1A1A2E]"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
						</button>
					</div>
					{state?.error?.password && (
						<p className="text-[10px] text-red-500 mt-1 pl-1">{state.error.password[0]}</p>
					)}
				</div>

				<button
					type="submit"
					disabled={isPending}
					className="w-full max-w-[235px] bg-teal-600 text-white text-sm font-bold py-2 rounded-lg hover:bg-teal-700 transition-colors mt-2 mb-4 disabled:opacity-60 active:scale-[0.98]"
				>
					{isPending ? "Signing in..." : "Login"}
				</button>
			</form>

			<p className="text-[10px] text-gray-500 mt-4 leading-relaxed text-center">
				By using this service, you understand and agree to the{" "}
				<button type="button" className="underline hover:text-black">Terms of Use</button>{" "}
				and{" "}
				<button type="button" className="underline hover:text-black">Privacy Statement</button>.
			</p>
		</div>
	);
}