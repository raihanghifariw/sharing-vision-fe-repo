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

  const handleClick = (status: PostStatus) => setPendingStatus(status)

  const processSubmit = (data: FormValues) => {
    if (!pendingStatus) return
    onSubmit({ ...data, status: pendingStatus })
    setPendingStatus(null)
  }

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="space-y-6">

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-semibold text-zinc-200">
          Title
        </Label>
        <Input
          id="title"
          placeholder="Judul artikel (min. 20 karakter)"
          className="h-11 bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-500
            focus-visible:border-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-500 text-sm"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-xs font-medium text-red-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category" className="text-sm font-semibold text-zinc-200">
          Category
        </Label>
        <Input
          id="category"
          placeholder="Kategori (min. 3 karakter)"
          className="h-11 bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-500
            focus-visible:border-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-500 text-sm"
          {...register("category")}
        />
        {errors.category && (
          <p className="text-xs font-medium text-red-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content" className="text-sm font-semibold text-zinc-200">
          Content
        </Label>
        <Textarea
          id="content"
          placeholder="Tulis konten artikel (min. 200 karakter)"
          rows={10}
          className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-500
            focus-visible:border-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-500
            text-sm resize-none leading-relaxed"
          {...register("content")}
        />
        {errors.content && (
          <p className="text-xs font-medium text-red-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
            {errors.content.message}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-zinc-800 pt-5 flex items-center gap-3">
        <Button
          type="submit"
          disabled={isLoading}
          onClick={() => handleClick("publish")}
          className="px-6 h-10 bg-zinc-100 text-zinc-900 font-semibold text-sm hover:bg-white rounded-lg transition-colors"
        >
          {isLoading && pendingStatus === "publish" ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-zinc-400 border-t-zinc-900 rounded-full animate-spin" />
              Saving...
            </span>
          ) : "Publish"}
        </Button>

        <Button
          type="submit"
          disabled={isLoading}
          onClick={() => handleClick("draft")}
          className="px-6 h-10 bg-zinc-800 border border-zinc-600 text-zinc-200 font-semibold text-sm hover:bg-zinc-700 hover:text-white rounded-lg transition-colors"
        >
          {isLoading && pendingStatus === "draft" ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-zinc-500 border-t-zinc-200 rounded-full animate-spin" />
              Saving...
            </span>
          ) : "Save as Draft"}
        </Button>
      </div>

    </form>
  )
}
