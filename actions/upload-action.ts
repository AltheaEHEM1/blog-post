"use server";

import { put } from "@vercel/blob";

export async function uploadImage(formData: FormData) {
    const file = formData.get("file") as File | null;

    if (!file || file.size === 0) {
        return { error: "No file provided" };
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
        return { error: "Only JPEG, PNG, WebP, and GIF images are allowed" };
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        return { error: "Image must be under 5MB" };
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.error("BLOB_READ_WRITE_TOKEN is missing from environment variables");
        return { error: "Server misconfiguration — missing Blob token" };
    }

    try {
        const blob = await put(
            `blog-covers/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`,
            file,
            { access: "public" },
        );
        return { url: blob.url };
    } catch (err) {
        console.error("Blob upload error:", err);
        return { error: "Upload failed — please try again" };
    }
}