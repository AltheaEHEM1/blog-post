< AAA.blog_post/>  — Blog Post System
A full-stack blog platform with a public-facing blog and a password-protected admin panel for managing posts, categories, and comment moderation. 

✨ Overview
The system is split into two sides:
Public side — visitors browse published blog posts, view full articles, and leave comments.
Admin side — a sidebar-driven dashboard to manage Blogs, Categories, and Comments, with full CRUD and moderation controls.

🚀 Tech Stack
Framework - Next.js 16 (App Router, Turbopack)
Database - Neon Postgres
ORM - Drizzle ORM v2 (drizzle-orm/neon-http)
Validation - Zod
Styling - Tailwind CSS v4
Language - TypeScript
Linting/Formatting - Biome

🧩 Features
Public (User) Side
* Blog list page — fetches and displays all published posts
* Individual post page — image, title, subtitle, author, category, and body
* Comment section per post
   - Visitors can submit comments
   - Comments are not shown immediately — pending admin approval
* Skeleton loading states for blog list and post pages


Admin Side
Accessed via a sidebar with three sections:
  Blog
  * Add, edit, delete, and view posts
  * Fields: image, title, subtitle, author, category (dropdown), body
  Category
  * Add, edit, delete, and view categories
  * Fields: category name, description
  Comment
  * View all submitted comments
  * Approve or reject comments before they appear on the public post

🛠 Getting Started
Prerequisites
Node.js v20+
pnpm 
A Neon Postgres account (or local Postgres instance)

1. Clone the repository
bashgit clone https://github.com/AltheaEHEM1/blog_post.git
cd blog_post

2. Install dependencies
This project uses sharp for image optimization, so native build scripts need to be approved:
bashpnpm config set only-built-dependencies sharp
pnpm install

3. Configure environment variables
Create a .env.local file in the project root:
envDATABASE_URL=postgres://your-username:your-password@your-neon-host/neondb
ADMIN_PASSWORD=your-admin-password
SESSION_SECRET=your-random-session-secret

4. Run database migrations
bashpnpm drizzle-kit generate
pnpm drizzle-kit migrate

5. Seed sample data (optional but recommended)
bashpnpm db:seed
Seeds at least 3 sample blog posts with categories so the public blog isn't empty on first load.

6. Start the dev server
bashpnpm dev
Visit http://localhost:3000 to view the public blog, and http://localhost:3000/auth for the admin panel.

📜 Scripts
pnpm dev - Start the dev server
pnpm build - Production build 
pnpm start - Run the production build
pnpm check - Run Biome lint/format check 
pnpm drizzle-kit generate - Generate SQL migration files 
pnpm drizzle-kit migrate - Apply migrations to the database
pnpm db:seed - Seed sample posts and categories 
pnpm db:studio - Open Drizzle Studio to inspect data



