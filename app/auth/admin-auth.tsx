"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { z } from "zod";
import { login } from "@/actions/auth-action";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const loginSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, "Email is required")
		.regex(EMAIL_REGEX, "Enter a valid email"),
	password: z.string().min(1, "Password is required"),
});

type FieldErrors = { email?: string; password?: string };
type TouchedFields = { email: boolean; password: boolean };

function validateField(field: keyof typeof loginSchema.shape, value: string) {
	const result = loginSchema.shape[field].safeParse(value);
	return result.success ? undefined : result.error.issues[0]?.message;
}

export default function AdminAuth() {
	const [showPassword, setShowPassword] = useState(false);
	const [state, formAction, isPending] = useActionState(login, null);

	const [values, setValues] = useState({ email: "", password: "" });
	const [touched, setTouched] = useState<TouchedFields>({
		email: false,
		password: false,
	});
	const [clientErrors, setClientErrors] = useState<FieldErrors>({});

	useEffect(() => {
		setClientErrors({
			email: touched.email ? validateField("email", values.email) : undefined,
			password: touched.password
				? validateField("password", values.password)
				: undefined,
		});
	}, [values, touched]);

	const handleChange =
		(field: "email" | "password") =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setValues((prev) => ({ ...prev, [field]: e.target.value }));
		};

	const handleBlur = (field: "email" | "password") => () => {
		setTouched((prev) => ({ ...prev, [field]: true }));
	};

	const isFormValid = loginSchema.safeParse(values).success;
	const emailError = clientErrors.email ?? state?.error?.email?.[0];
	const passwordError = clientErrors.password ?? state?.error?.password?.[0];

	return (
		<div className="relative w-full max-w-[420px] mx-auto px-4 sm:px-0">
			<div
				className="relative bg-white/15 backdrop-blur-xl border border-white/30 shadow-2xl px-5 sm:px-8 md:px-10 pt-12 pb-10"
				style={{
					clipPath:
						"polygon(12% 0%, 88% 0%, 100% 9%, 100% 91%, 88% 100%, 12% 100%, 0% 91%, 0% 9%)",
				}}
			>
				<div className="flex justify-center mb-4">
					<span className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs font-semibold text-emerald-50 bg-white/10 border border-white/25 rounded-full px-3 py-1 tracking-tight backdrop-blur-sm">
						<span className="w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_6px_rgba(110,231,183,0.9)]" />
						&lt;Stratpoint.blog_admin/&gt;
					</span>
				</div>

				<h1 className="text-center text-xl sm:text-3xl font-semibold text-white tracking-wide mb-8 drop-shadow-sm">
					Sign In
				</h1>

				<form
					action={formAction}
					noValidate
					className="flex flex-col items-center w-full gap-4"
				>
					{/* Email Input */}
					<div className="w-full">
						<div
							className={`flex items-center gap-3 w-full bg-white/70 rounded-full px-5 py-3 ring-1 transition-all focus-within:ring-2 ${emailError ? "ring-red-400 focus-within:ring-red-500" : "ring-transparent focus-within:ring-teal-500/60"}`}
						>
							<Mail size={16} className="text-emerald-800 shrink-0" />
							<div className="w-px h-4 bg-emerald-900/20 shrink-0" />
							<input
								id="email"
								name="email"
								type="email"
								placeholder="Email"
								maxLength={128}
								value={values.email}
								onChange={handleChange("email")}
								onBlur={handleBlur("email")}
								className="w-full bg-transparent outline-none text-sm text-[#1A1A2E] placeholder:text-[#1A1A2E]/50"
							/>
						</div>
						{emailError && (
							<p className="text-[11px] text-red-100 bg-red-500/30 rounded-full px-3 py-0.5 mt-1.5">
								{emailError}
							</p>
						)}
					</div>

					{/* Password Input */}
					<div className="w-full">
						<div
							className={`flex items-center gap-3 w-full bg-white/70 rounded-full px-5 py-3 ring-1 transition-all focus-within:ring-2 ${passwordError ? "ring-red-400 focus-within:ring-red-500" : "ring-transparent focus-within:ring-teal-500/60"}`}
						>
							<Lock size={16} className="text-emerald-800 shrink-0" />
							<div className="w-px h-4 bg-emerald-900/20 shrink-0" />
							<input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								value={values.password}
								onChange={handleChange("password")}
								onBlur={handleBlur("password")}
								className="w-full bg-transparent outline-none text-sm text-[#1A1A2E] placeholder:text-[#1A1A2E]/50"
							/>
							<button
								type="button"
								className="text-teal-700 hover:text-teal-900"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
							</button>
						</div>
						{passwordError && (
							<p className="text-[11px] text-red-100 bg-red-500/30 rounded-full px-3 py-0.5 mt-1.5">
								{passwordError}
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={isPending || !isFormValid}
						className="w-full sm:w-[85%] bg-teal-800 text-white text-sm font-bold tracking-wide py-3 rounded-full hover:bg-teal-900 transition-colors mt-2 disabled:opacity-60 active:scale-[0.98]"
						style={{
							clipPath:
								"polygon(6% 0%, 94% 0%, 100% 50%, 94% 100%, 6% 100%, 0% 50%)",
						}}
					>
						{isPending ? "Signing in..." : "LOGIN"}
					</button>
				</form>
			</div>

			<p className="text-[10px] text-white/70 mt-5 text-center px-4">
				By using this service, you understand and agree to the{" "}
				<button type="button" className="underline hover:text-white">
					Terms of Use
				</button>{" "}
				and{" "}
				<button type="button" className="underline hover:text-white">
					Privacy Statement
				</button>
				.
			</p>
		</div>
	);
}
