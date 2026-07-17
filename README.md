# <AAA.blog_post/> — Blog Post System

A full-stack blog platform with a public-facing blog and a password-protected admin panel for managing posts, categories, and comment moderation. Built as Mini-Project 2 of the bootcamp full-stack track.

---

## ✨ Overview

The system is split into two sides:

- **Public side** — visitors browse published blog posts, view full articles, and leave comments.
- **Admin side** — a sidebar-driven dashboard to manage **Blogs**, **Categories**, and **Comments**, with full CRUD and moderation controls.

Comments submitted by visitors are **held for review** and only appear publicly once approved by an admin.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Database | Neon Postgres |
| ORM | Drizzle ORM v2 (`drizzle-orm/neon-http`) |
| Validation | Zod |
| Styling | Tailwind CSS v4 |
| Image Storage | Vercel Blob |
| Language | TypeScript |
| Linting/Formatting | Biome |

---

## 🧩 Features

### Public (User) Side
- Blog list page — fetches and displays all published posts
- Individual post page — image, title, subtitle, author, category, and body
- Comment section per post
  - Visitors can submit comments
  - Comments are **not shown immediately** — pending admin approval
- Skeleton loading states for blog list and post pages

### Admin Side
Accessed via a sidebar with three sections:

**Blog**
- Add, edit, delete, and view posts
- Fields: image (uploaded via Vercel Blob), title, subtitle, author, category (dropdown), body

**Category**
- Add, edit, delete, and view categories
- Fields: category name, description

**Comment**
- View all submitted comments
- Approve or reject comments before they appear on the public post


## 🖼️ Image Uploads (Vercel Blob)

Blog post images are uploaded to [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) rather than stored as raw files or base64 in the database.

1. Admin selects an image file in the blog form (Client Component).
2. The file is uploaded via a Server Action using `put()` from `@vercel/blob`.
3. Vercel Blob returns a public URL, which is saved to the post's `imageUrl` column.
4. The public blog pages render images directly from that Blob URL using Next.js `<Image>`.


## 🛠 Getting Started

### Prerequisites
- Node.js v20+
- pnpm (recommended) / npm / yarn
- A Neon Postgres account (or local Postgres instance)

### 1. Clone the repository
```bash
git clone https://github.com/AltheaEHEM1/blog_post.git
cd blog_post
```

### 2. Install dependencies
This project uses `sharp` for image optimization, so native build scripts need to be approved. `@vercel/blob` is used for image uploads:
```bash
pnpm config set only-built-dependencies sharp
pnpm install
pnpm add @vercel/blob
```

### 3. Configure environment variables
Create a `.env` file in the project root:
```env
DATABASE_URL=postgres://your-username:your-password@your-neon-host/neondb
ADMIN_PASSWORD=your-admin-password
SESSION_SECRET=your-random-session-secret
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

### 4. Run database migrations
```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

### 5. Seed sample data (optional but recommended)
```bash
pnpm db:seed
```
Seeds at least 3 sample blog posts with categories so the public blog isn't empty on first load.

### 6. Start the dev server
```bash
pnpm dev
```
Visit **http://localhost:3000** to view the public blog, and **http://localhost:3000/auth** for the admin panel.


## 📜 Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Run the production build |
| `pnpm check` | Run Biome lint/format check |
| `pnpm drizzle-kit generate` | Generate SQL migration files |
| `pnpm drizzle-kit migrate` | Apply migrations to the database |
| `pnpm db:seed` | Seed sample posts and categories |
| `pnpm db:studio` | Open Drizzle Studio to inspect data |

## 👤 Author

Built by **Althea** as part of a full-stack development bootcamp.
