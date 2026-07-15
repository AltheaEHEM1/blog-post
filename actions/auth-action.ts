"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
	email: z.string().trim().email("Enter a valid email"),
	password: z.string().min(1, "Password is required"),
});

const SESSION_COOKIE = "admin_session";

export async function login(_: unknown, formData: FormData) {
	const parsed = loginSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!parsed.success) {
		return { error: parsed.error.flatten().fieldErrors };
	}

	const validEmail = process.env.ADMIN_EMAIL;
	const validPassword = process.env.ADMIN_PASSWORD;

	if (
		parsed.data.email !== validEmail ||
		parsed.data.password !== validPassword
	) {
		return { error: { password: ["Invalid email or password"] } };
	}

	const cookieStore = await cookies();
	cookieStore.set(SESSION_COOKIE, "authenticated", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 8,
	});

	redirect("/blog_admin");
}

export async function logout() {
	const cookieStore = await cookies();
	cookieStore.delete(SESSION_COOKIE);
	redirect("/auth");
}

export async function isAuthenticated() {
	const cookieStore = await cookies();
	return cookieStore.get(SESSION_COOKIE)?.value === "authenticated";
}
