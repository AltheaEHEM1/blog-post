"use client";

import { Eye, EyeOff } from "lucide-react";
import { useActionState, useState } from "react";
import { login } from "@/actions/auth-action";

export default function AdminAuth() {
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, isPending] = useActionState(login, null);

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-sm">
                <div className="mb-6">
                    <span className="inline-block text-lg tracking-widest uppercase">
                        <span className="font-sans">&lt;</span>
                        <span className=" mx-0.5">AAA.Blog_post</span>
                        <span className="font-sans">/&gt;</span>
                    </span>
                </div>

                <form action={formAction}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-bold text-[#1A1A2E] mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter email address"
                            maxLength={128}
                            className="w-full px-4 py-2.5 bg-gray-100 border border-transparent rounded-lg focus:border-[#470606] focus:outline-none transition-all text-sm placeholder:text-sm"
                        />
                        {state?.error?.email && (
                            <p className="text-xs text-red-500 mt-1">{state.error.email[0]}</p>
                        )}
                    </div>

                    <div className="mb-2">
                        <label htmlFor="password" className="block text-sm font-bold text-[#1A1A2E] mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className="w-full px-4 py-2.5 bg-gray-100 border border-transparent rounded-lg focus:border-[#470606] focus:outline-none transition-all text-sm placeholder:text-sm"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-2.5 text-gray-400"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {state?.error?.password && (
                            <p className="text-xs text-red-500 mt-1">{state.error.password[0]}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-[#1A1A2E] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#2A2A4E] transition-colors mb-6 mt-4 disabled:opacity-60"
                    >
                        {isPending ? "Signing in..." : "Login"}
                    </button>
                </form>

                <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                    By using this service, you understand and agree to the{" "}
                    <button type="button" className="underline hover:text-black">
                        Terms of Use
                    </button>{" "}
                    and{" "}
                    <button type="button" className="underline hover:text-black">
                        Privacy Statement
                    </button>
                    .
                </p>
            </div>
        </div>
    );
}