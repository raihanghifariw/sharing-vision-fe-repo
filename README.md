# Sharing Vision — Frontend

Aplikasi manajemen artikel berbasis web. Dibangun dengan Next.js 16 + TypeScript + Tailwind CSS + Shadcn UI.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn UI
- **Data Fetching:** TanStack Query v5 + Axios
- **State Management:** Zustand
- **Hosting:** Vercel

## Pages

| Route | Description |
|---|---|
| `/` | Preview — public blog, published articles only, with pagination |
| `/posts` | All Posts — 3 tabs (Published / Drafts / Trashed) with Edit & Trash actions |
| `/posts/new` | Add New — create article with Publish or Draft |
| `/posts/edit/[id]` | Edit Article — update existing article |

## Local Development

### Prerequisites
- Node.js 18+
- Backend running at `http://localhost:8080`

### Setup
```bash
cd frontend

# Install dependencies
npm install

# Copy env file
cp .env.example .env.local
# .env.local already set to http://localhost:8080 for local dev

# Start dev server
npm run dev
```

Open `http://localhost:3000`

## Deployment (Vercel)

1. Push this repo to GitHub
2. Import project on Vercel
3. Set environment variable:
   - `NEXT_PUBLIC_API_BASE_URL` = `https://<your-backend>.railway.app`
4. Deploy

Vercel auto-deploys on every push to `main`.
