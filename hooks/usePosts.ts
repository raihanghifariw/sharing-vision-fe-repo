import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"
import type { CreatePostPayload, Post, PostStatus } from "@/types/post"

const LIMIT = 10

export function useGetPosts(page: number, status?: PostStatus) {
  const offset = (page - 1) * LIMIT
  return useQuery<Post[]>({
    queryKey: ["posts", status ?? "all", page],
    queryFn: async () => {
      const params: Record<string, string> = {}
      if (status) params.status = status
      const res = await api.get<Post[]>(`/article/${LIMIT}/${offset}`, { params })
      return res.data ?? []
    },
  })
}

export function useGetPostById(id: number) {
  return useQuery<Post>({
    queryKey: ["posts", "detail", id],
    queryFn: async () => {
      const res = await api.get<Post>(`/article/detail/${id}`)
      return res.data
    },
    enabled: id > 0,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreatePostPayload) => api.post("/article/", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CreatePostPayload }) =>
      api.put(`/article/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/article/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}
