"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  hasPrevPage: boolean
  hasNextPage: boolean
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  hasPrevPage,
  hasNextPage,
  onPageChange,
}: PaginationProps) {
  if (!hasPrevPage && !hasNextPage) return null

  return (
    <div className="flex items-center justify-center gap-3 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className="flex items-center gap-1.5 px-3 h-9 rounded-lg border border-zinc-700 bg-zinc-900 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
        Prev
      </button>

      <span className="px-3 h-9 flex items-center text-sm font-semibold text-zinc-100 rounded-lg border border-zinc-600 bg-zinc-800">
        {currentPage}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="flex items-center gap-1.5 px-3 h-9 rounded-lg border border-zinc-700 bg-zinc-900 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
