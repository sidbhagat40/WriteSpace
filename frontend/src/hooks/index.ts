import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { useBlogStore } from "../store/BlogStore";
import { useFullBlogStore } from "../store/FullBlogStore";
import type { FullBlogPost } from "../store/FullBlogStore";
import type { OutputData } from "@editorjs/editorjs";

export interface Blog{
    "title": string,
    "content": OutputData,
    "id": string,
    "author":{
        "name": string
    }
}

export const useBlog = ({id}:{id:string} )=>{
    const {blogsById,addBlog} = useFullBlogStore();
    const [loading,setLoading] = useState(true);
    const [blog, setBlog] = useState<FullBlogPost | null>(null);

    useEffect(()=>{

        const cachedBlog = blogsById[id];
        if (cachedBlog) {
            setBlog(cachedBlog);
            setLoading(false);
            return; 
        }

        axios.get(`${BACKEND_URL}/api/v1/post/${id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            const fetchedBlog = response.data.post;
            addBlog(fetchedBlog);
            setBlog(fetchedBlog);
            setLoading(false);
        })
    },[id,blogsById,addBlog]);

    return{
        loading,
        blog
    }
}

export const useBlogs = () => {
    const[loading, setLoading] = useState(true);
    const{blogs,setBlog} = useBlogStore();

    useEffect(()=>{

        if(blogs.length > 0){
            setLoading(false);
            return
        }

        axios.get(`${BACKEND_URL}/api/v1/post/bulk`,{
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then(response => {
            setBlog(response.data.posts);
            setLoading(false);
         })
    },[blogs,setBlog]);

    return{
        loading,
        blogs
    }
}   