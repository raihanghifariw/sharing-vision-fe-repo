"use client"

import { create } from "zustand"
import type { PostStatus } from "@/types/post"

interface PostStore {
  activeTab: PostStatus
  currentPage: number
  setActiveTab: (tab: PostStatus) => void
  setCurrentPage: (page: number) => void
}

export const usePostStore = create<PostStore>((set) => ({
  activeTab: "publish",
  currentPage: 1,
  setActiveTab: (tab) => set({ activeTab: tab, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
}))
