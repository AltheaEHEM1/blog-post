import { redirect } from "next/navigation";

export default function HomePage() {
	// Redirect to a default route of blog
	redirect("/blog");
}
