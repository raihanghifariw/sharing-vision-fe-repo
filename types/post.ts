export interface Post {
  id: number
  title: string
  content: string
  category: string
  status: "publish" | "draft" | "thrash"
  created_date: string
  updated_date: string
}

export type PostStatus = "publish" | "draft" | "thrash"

export interface CreatePostPayload {
  title: string
  content: string
  category: string
  status: PostStatus
}
