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
    <div className="max-w-2xl">
      <div className="mb-8">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">New Article</p>
        <h1 className="text-2xl font-bold tracking-tight text-gradient">Write something</h1>
      </div>

      <PostForm onSubmit={handleSubmit} isLoading={createPost.isPending} />
    </div>
  )
}
