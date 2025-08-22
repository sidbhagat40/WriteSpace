import {create} from "zustand";
import type { OutputData } from "@editorjs/editorjs";

export interface FullBlogPost{
    id: string,
    title: string,
    content: OutputData,
    author: {
        name: string
    };
}

interface FullBlogState{
    blogsById : {[id : string]: FullBlogPost};
    addBlog: (blog : FullBlogPost) => void;

}
 export const useFullBlogStore = create<FullBlogState>((set) =>({
    blogsById: {},
    addBlog: (newBlog) => 
        set((state) => ({
            blogsById:{
                ...state.blogsById,
                [newBlog.id]: newBlog,
            },
        })),   
 }))