import { create } from 'zustand';

export interface blogPost{
    id : string,
    title: string,
    content: string,
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