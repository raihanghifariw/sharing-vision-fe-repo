"use client"

import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostTable } from "@/components/PostTable"
import { useGetPosts, useUpdatePost } from "@/hooks/usePosts"
import { usePostStore } from "@/store/usePostStore"
import type { PostStatus } from "@/types/post"

export default function AllPostsPage() {
  const { activeTab, setActiveTab, currentPage } = usePostStore()
  const { data: posts = [], isLoading } = useGetPosts(currentPage, activeTab)
  const updatePost = useUpdatePost()

  const handleTrash = (id: number) => {
    const post = posts.find((p) => p.id === id)
    if (!post) return
    updatePost.mutate({
      id,
      payload: {
        title: post.title,
        content: post.content,
        category: post.category,
        status: "thrash",
      },
    })
  }

  const tabs: { value: PostStatus; label: string }[] = [
    { value: "publish", label: "Published" },
    { value: "draft", label: "Drafts" },
    { value: "thrash", label: "Trashed" },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Posts</h1>
        <Link
          href="/posts/new"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          + Add New
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as PostStatus)}>
        <TabsList className="mb-4">
          {tabs.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((t) => (
          <TabsContent key={t.value} value={t.value}>
            {isLoading ? (
              <p className="text-gray-500 text-sm py-8 text-center">Memuat...</p>
            ) : (
              <PostTable
                posts={posts}
                onTrash={handleTrash}
                isTrashLoading={updatePost.isPending}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
