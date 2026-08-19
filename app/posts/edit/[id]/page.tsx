"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { PostForm } from "@/components/PostForm"
import { useGetPostById, useUpdatePost } from "@/hooks/usePosts"
import type { CreatePostPayload } from "@/types/post"

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const postId = parseInt(id, 10)
  const router = useRouter()
  const { data: post, isLoading, isError } = useGetPostById(postId)
  const updatePost = useUpdatePost()

  const handleSubmit = (data: CreatePostPayload) => {
    updatePost.mutate(
      { id: postId, payload: data },
      {
        onSuccess: () => router.push("/posts"),
        onError: () => alert("Gagal mengupdate artikel. Coba lagi."),
      }
    )
  }

  if (isLoading) return <p className="text-gray-500 py-16 text-center">Memuat artikel...</p>
  if (isError || !post) return <p className="text-red-500 py-16 text-center">Artikel tidak ditemukan.</p>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Article</h1>
      <div className="max-w-2xl">
        <PostForm
          defaultValues={{
            title: post.title,
            content: post.content,
            category: post.category,
          }}
          onSubmit={handleSubmit}
          isLoading={updatePost.isPending}
        />
      </div>
    </div>
  )
}
