Blog Post System
A high-performance, minimalist blog post system built to showcase articles and technical insights.

🚀 Tech Stack
Framework: Next.js (App Router, Turbopack)

Database: Neon Postgres

ORM: Drizzle ORM

Styling: Tailwind CSS

Language: TypeScript

Tooling: Biome (Linting/Formatting)

🛠 Getting Started
Follow these steps to set up the project locally on your machine.

1. Clone the Repository
Bash
git clone https://github.com/AltheaEHEM1/blog_post.git
cd blog_post
2. Install Dependencies
This project utilizes sharp for high-performance image optimization. Authorize the build script and install dependencies natively using pnpm:

Bash
pnpm config set only-built-dependencies sharp
pnpm install
3. Database Configuration
This project uses Neon Postgres for data storage and Drizzle ORM for schema management.

Create a .env.local file in the root directory.

Add your Neon database connection string:

Code snippet
DATABASE_URL=postgres://your-username:your-password@your-neon-host/neondb
Sync your schema with the database:

Generate migrations: pnpm drizzle-kit generate

Apply migrations: pnpm drizzle-kit migrate

💻 Running the Development Server
Start the development server:

Bash
pnpm dev
Open http://localhost:3000 with your browser to see the result. You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

📖 Learn More
To learn more about the technologies used in this project, take a look at the following resources:

Next.js Documentation - Learn about Next.js features and API.

Learn Next.js - An interactive Next.js tutorial.

Drizzle ORM Docs - Database management and migrations.

🌐 Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.  

Check out the Next.js deployment documentation for more details.