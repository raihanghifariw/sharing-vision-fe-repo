"use client"

import { useGetPosts } from "@/hooks/usePosts"
import { usePostStore } from "@/store/usePostStore"
import { Pagination } from "@/components/Pagination"

const ITEMS_PER_PAGE = 9

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

export default function PreviewPage() {
  const { currentPage, setCurrentPage } = usePostStore()
  const { data: posts = [], isLoading, isError } = useGetPosts(currentPage, "publish")

  if (isLoading) return <Loader />

  if (isError) {
    return (
      <div className="py-32 text-center">
        <p className="text-sm text-zinc-400">Backend tidak dapat dijangkau.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Page heading */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-800/60 text-xs font-medium text-zinc-300 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
          Published articles
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gradient">Latest Articles</h1>
      </div>

      {posts.length === 0 ? (
        <div className="py-24 text-center rounded-xl border border-dashed border-zinc-700">
          <p className="text-sm font-medium text-zinc-400">Belum ada artikel yang dipublikasikan.</p>
        </div>
      ) : (
        <>
          {/* Article list */}
          <div className="rounded-xl border border-zinc-700 overflow-hidden divide-y divide-zinc-700/60">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group bg-zinc-900/40 hover:bg-zinc-800/60 transition-colors px-5 py-4"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Title */}
                  <h2 className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors line-clamp-1 flex-1">
                    {post.title}
                  </h2>
                  {/* Category badge */}
                  <span className="shrink-0 px-2.5 py-0.5 rounded-full border border-zinc-600 bg-zinc-800 text-[11px] font-medium text-zinc-300 uppercase tracking-wide">
                    {post.category}
                  </span>
                </div>

                {/* Excerpt */}
                <p className="mt-1.5 text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                  {post.content}
                </p>

                {/* Date — suppress hydration warning; locale output differs server vs client */}
                <p className="mt-2 text-xs text-zinc-500" suppressHydrationWarning>
                  {new Date(post.created_date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </article>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalItems={
              posts.length === ITEMS_PER_PAGE
                ? currentPage * ITEMS_PER_PAGE + 1
                : (currentPage - 1) * ITEMS_PER_PAGE + posts.length
            }
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  )
}
