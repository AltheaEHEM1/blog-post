import AdminAuth from "./admin-auth";

export default function AuthPage() {
	return (
		<main
			className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12 bg-linear-to-br from-emerald-600 via-teal-600 to-cyan-700"
			style={{
				backgroundImage:
					"url('/assets/bg_login.png'), linear-gradient(135deg, #0f9b6e 0%, #16a085 45%, #1a8fb0 100%)",
				backgroundPosition: "50% 50%",
				backgroundSize: "cover",
				backgroundBlendMode: "overlay",
			}}
		>
			<div className="pointer-events-none absolute -left-32 -bottom-32 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl" />
			<div className="pointer-events-none absolute -right-32 top-1/4 w-md h-112 bg-cyan-400/30 rounded-full blur-3xl" />
			<div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/50 z-0" />

			<div className="relative z-10 w-full">
				<AdminAuth />
			</div>
		</main>
	);
}
