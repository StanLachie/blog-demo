# Blog Demo

A simple blog demo built with Next.js, Drizzle ORM, and modern React.

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd blog-demo
   ```

2. **Create your environment variables**

   Copy the example environment file and fill in the required values:

   ```bash
   cp .env.example .env
   # Edit .env to match your local setup
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Generate database client**

   ```bash
   pnpm run db:generate
   ```

5. **Run database migrations**

   ```bash
   pnpm run db:migrate
   ```

6. **Start the development server**

   ```bash
   pnpm run dev
   ```

7. **Open your browser**

   Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## Scripts

- `pnpm run dev` — Start the Next.js development server
- `pnpm run build` — Build for production
- `pnpm run start` — Start the production server
- `pnpm run lint` — Run ESLint
- `pnpm run db:generate` — Generate Drizzle ORM client
- `pnpm run db:migrate` — Run database migrations
- `pnpm run db:studio` — Open Drizzle Studio
