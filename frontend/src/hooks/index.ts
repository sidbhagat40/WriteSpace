import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config";
import axios from "axios";


export interface Blog{
    "title": string,
    "content": string,
    "id": string,
    "author":{
        "name": string
    }
}

export const useBlog = ({id}:{id:string} )=>{
    const [blog,setBlog] = useState<Blog>();
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/post/${id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            setBlog(response.data.post);
            setLoading(false);
        })
    },[])

    return{
        loading,
        blog
    }
}

export const useBlogs = () => {
    const[loading, setLoading] = useState(true);
    const[blogs,setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/post/bulk`,{
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then(response => {
            setBlogs(response.data.posts);
            setLoading(false);
         })
    },[])
    return{
        loading,
        blogs
    }
} 