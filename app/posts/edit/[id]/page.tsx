"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { PostForm } from "@/components/PostForm"
import { useGetPostById, useUpdatePost } from "@/hooks/usePosts"
import type { CreatePostPayload } from "@/types/post"

function Loader() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="flex gap-2">
        <span className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse [animation-delay:0ms]" />
        <span className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse [animation-delay:160ms]" />
        <span className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse [animation-delay:320ms]" />
      </div>
    </div>
  )
}

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

  if (isLoading) return <Loader />

  if (isError || !post) {
    return (
      <div className="py-32 text-center">
        <p className="text-sm font-medium text-zinc-400">Artikel tidak ditemukan.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Editing</p>
        <h1 className="text-2xl font-bold tracking-tight text-gradient line-clamp-1">{post.title}</h1>
      </div>

      <PostForm
        defaultValues={{ title: post.title, content: post.content, category: post.category }}
        onSubmit={handleSubmit}
        isLoading={updatePost.isPending}
      />
    </div>
  )
}
