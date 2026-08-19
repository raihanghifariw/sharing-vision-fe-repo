"use client"

import { useGetPosts } from "@/hooks/usePosts"
import { usePostStore } from "@/store/usePostStore"
import { Pagination } from "@/components/Pagination"
import { Badge } from "@/components/ui/badge"

const ITEMS_PER_PAGE = 9

export default function PreviewPage() {
  const { currentPage, setCurrentPage } = usePostStore()
  const { data: posts = [], isLoading, isError } = useGetPosts(currentPage, "publish")

  if (isLoading) {
    return <p className="text-gray-500 text-center py-16">Memuat artikel...</p>
  }

  if (isError) {
    return <p className="text-red-500 text-center py-16">Gagal memuat artikel. Pastikan backend berjalan.</p>
  }

  if (posts.length === 0) {
    return <p className="text-gray-500 text-center py-16">Belum ada artikel yang dipublikasikan.</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Blog</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="border border-gray-200 rounded-lg p-5 hover:border-gray-400 transition-colors"
          >
            <Badge variant="secondary" className="mb-2 text-xs">{post.category}</Badge>
            <h2 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h2>
            <p className="text-sm text-gray-500 line-clamp-3">{post.content}</p>
            <p className="text-xs text-gray-400 mt-3">
              {new Date(post.created_date).toLocaleDateString("id-ID", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </p>
          </article>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={posts.length === ITEMS_PER_PAGE ? currentPage * ITEMS_PER_PAGE + 1 : (currentPage - 1) * ITEMS_PER_PAGE + posts.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
