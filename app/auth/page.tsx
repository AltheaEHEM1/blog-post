import AdminAuth from "./admin-auth";

export default function AuthPage() {
	return (
		<main
			className="relative min-h-screen flex items-center justify-center overflow-hidden"
			style={{
				backgroundImage: "url('/assets/bg_login.png')",
				backgroundPosition: "50% 50%",
				backgroundSize: "cover",
			}}
		>
			<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90 z-0" />
			<AdminAuth />
		</main>
	);
}
