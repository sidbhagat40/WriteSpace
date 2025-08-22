import { create } from 'zustand';
import type { OutputData } from '@editorjs/editorjs';

export interface blogPost{
    id : string,
    title: string,
    content: OutputData,
    createdAt: string,
    author: {
        name: string
    };
}

interface BlogState {
    blogs: blogPost[];
    setBlog: (blogs: blogPost[]) => void; 
}

export const useBlogStore = create<BlogState>((set) => ({
    blogs: [],
    setBlog: (blogs) => set({blogs}),
}));