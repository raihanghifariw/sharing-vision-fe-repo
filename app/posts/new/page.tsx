"use client"

import { useRouter } from "next/navigation"
import { PostForm } from "@/components/PostForm"
import { useCreatePost } from "@/hooks/usePosts"
import type { CreatePostPayload } from "@/types/post"

export default function AddNewPage() {
  const router = useRouter()
  const createPost = useCreatePost()

  const handleSubmit = (data: CreatePostPayload) => {
    createPost.mutate(data, {
      onSuccess: () => router.push("/posts"),
      onError: () => alert("Gagal menyimpan artikel. Coba lagi."),
    })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Article</h1>
      <div className="max-w-2xl">
        <PostForm onSubmit={handleSubmit} isLoading={createPost.isPending} />
      </div>
    </div>
  )
}
