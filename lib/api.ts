import axios from "axios"

// NEXT_PUBLIC_API_BASE_URL must be set in Vercel env vars.
// Fallback is the known Railway production URL.
const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://web-production-d1982.up.railway.app"

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
})

export default api
