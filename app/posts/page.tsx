"use client"

import { usePostStore } from "@/store/usePostStore"
import { PostTable } from "@/components/PostTable"
import { useGetPosts, useUpdatePost } from "@/hooks/usePosts"
import type { PostStatus } from "@/types/post"
import Link from "next/link"

const TAB_META: { value: PostStatus; label: string; dot: string }[] = [
  { value: "publish", label: "Published", dot: "bg-emerald-400" },
  { value: "draft",   label: "Drafts",    dot: "bg-amber-400"  },
  { value: "thrash",  label: "Trashed",   dot: "bg-red-400"    },
]

function Loader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex gap-2">
        <span className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse [animation-delay:0ms]" />
        <span className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse [animation-delay:160ms]" />
        <span className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse [animation-delay:320ms]" />
      </div>
    </div>
  )
}

export default function AllPostsPage() {
  const { activeTab, setActiveTab, currentPage } = usePostStore()
  const { data: posts = [], isLoading } = useGetPosts(currentPage, activeTab)
  const updatePost = useUpdatePost()

  const handleTrash = (id: number) => {
    const post = posts.find((p) => p.id === id)
    if (!post) return
    updatePost.mutate({
      id,
      payload: { title: post.title, content: post.content, category: post.category, status: "thrash" },
    })
  }

  return (
    <div>
      {/* Page header */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gradient">All Posts</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage and organise your articles</p>
        </div>
        <Link
          href="/posts/new"
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-zinc-100 text-zinc-900 hover:bg-white transition-colors"
        >
          <span className="text-base leading-none font-light">+</span>
          New Post
        </Link>
      </div>

      {/* Custom tab bar — plain HTML, no @base-ui overrides */}
      <div className="flex gap-1 p-1 rounded-lg border border-zinc-700 bg-zinc-950 w-fit mb-6">
        {TAB_META.map((t) => {
          const isActive = activeTab === t.value
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => setActiveTab(t.value)}
              className={[
                "inline-flex items-center gap-2 px-4 h-8 rounded-md text-sm font-medium transition-all",
                isActive
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800",
              ].join(" ")}
            >
              <span className={[
                "w-2 h-2 rounded-full shrink-0",
                t.dot,
                isActive ? "opacity-100" : "opacity-50",
              ].join(" ")} />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      {isLoading ? (
        <Loader />
      ) : (
        <PostTable
          posts={posts}
          onTrash={handleTrash}
          isTrashLoading={updatePost.isPending}
        />
      )}
    </div>
  )
}
