import { z } from "zod"

export const postSchema = z.object({
  title: z.string().min(20, "Title minimal 20 karakter"),
  content: z.string().min(200, "Content minimal 200 karakter"),
  category: z.string().min(3, "Category minimal 3 karakter"),
})
