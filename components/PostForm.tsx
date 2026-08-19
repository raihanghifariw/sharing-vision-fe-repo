"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { postSchema } from "@/lib/validations"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { CreatePostPayload, PostStatus } from "@/types/post"

type FormValues = z.infer<typeof postSchema>

interface PostFormProps {
  defaultValues?: Partial<FormValues>
  onSubmit: (data: CreatePostPayload) => void
  isLoading?: boolean
}

export function PostForm({ defaultValues, onSubmit, isLoading }: PostFormProps) {
  const [pendingStatus, setPendingStatus] = useState<PostStatus | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: defaultValues ?? { title: "", content: "", category: "" },
  })

  const handleClick = (status: PostStatus) => {
    setPendingStatus(status)
  }

  const processSubmit = (data: FormValues) => {
    if (!pendingStatus) return
    onSubmit({ ...data, status: pendingStatus })
    setPendingStatus(null)
  }

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="space-y-5">
      <div className="space-y-1">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Masukkan judul artikel (min. 20 karakter)"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          placeholder="Masukkan kategori (min. 3 karakter)"
          {...register("category")}
        />
        {errors.category && (
          <p className="text-xs text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Tulis konten artikel (min. 200 karakter)"
          rows={8}
          {...register("content")}
        />
        {errors.content && (
          <p className="text-xs text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isLoading}
          onClick={() => handleClick("publish")}
        >
          {isLoading && pendingStatus === "publish" ? "Saving..." : "Publish"}
        </Button>
        <Button
          type="submit"
          variant="outline"
          disabled={isLoading}
          onClick={() => handleClick("draft")}
        >
          {isLoading && pendingStatus === "draft" ? "Saving..." : "Draft"}
        </Button>
      </div>
    </form>
  )
}
