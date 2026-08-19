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
      <p className="text-sm text-gray-500 py-8 text-center">Tidak ada artikel.</p>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="w-24 text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="font-medium max-w-xs truncate">{post.title}</TableCell>
            <TableCell>{post.category}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push(`/posts/edit/${post.id}`)}
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onTrash(post.id)}
                  disabled={isTrashLoading}
                  aria-label="Trash"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
