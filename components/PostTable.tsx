"use client"

import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import type { Post } from "@/types/post"

interface PostTableProps {
  posts: Post[]
  onTrash: (id: number) => void
  isTrashLoading?: boolean
}

export function PostTable({ posts, onTrash, isTrashLoading }: PostTableProps) {
  const router = useRouter()

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center rounded-xl border border-dashed border-zinc-700">
        <p className="text-sm font-medium text-zinc-400">Tidak ada artikel di sini.</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-zinc-700 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-zinc-700 bg-zinc-900 hover:bg-zinc-900">
            <TableHead className="py-3 pl-5 text-xs font-semibold text-zinc-300 uppercase tracking-wider w-full">
              Title
            </TableHead>
            <TableHead className="py-3 text-xs font-semibold text-zinc-300 uppercase tracking-wider whitespace-nowrap">
              Category
            </TableHead>
            <TableHead className="py-3 pr-4 text-xs font-semibold text-zinc-300 uppercase tracking-wider text-right w-28">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.id}
              className="border-b border-zinc-800 last:border-0 bg-zinc-900/30 hover:bg-zinc-800/60 transition-colors group"
            >
              {/* Title */}
              <TableCell className="py-4 pl-5">
                <span className="text-sm font-medium text-zinc-100 group-hover:text-white transition-colors line-clamp-1 max-w-md block">
                  {post.title}
                </span>
              </TableCell>

              {/* Category */}
              <TableCell className="py-4">
                <span className="inline-flex px-2.5 py-1 rounded-md border border-zinc-600 bg-zinc-800 text-xs font-medium text-zinc-300 uppercase tracking-wide">
                  {post.category}
                </span>
              </TableCell>

              {/* Actions — always visible, not hidden behind hover */}
              <TableCell className="py-4 pr-4">
                <div className="flex items-center justify-end gap-1.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700"
                    onClick={() => router.push(`/posts/edit/${post.id}`)}
                    aria-label="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-md bg-zinc-800 hover:bg-red-900/70 text-zinc-400 hover:text-red-300 border border-zinc-700 hover:border-red-800"
                    onClick={() => onTrash(post.id)}
                    disabled={isTrashLoading}
                    aria-label="Trash"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
