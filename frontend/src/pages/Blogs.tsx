    import { Appbar } from "../components/Appbar"
    import { BlogCard } from "../components/BlogCard"
    import { useBlogs } from "../hooks"
    import { BlogSkeleton } from "../components/BlogSkeleton"

    export const Blogs = () => {

        const {loading,blogs} = useBlogs();

        if(loading || !blogs || blogs.length === 0 ){
            return<div>
                <Appbar/>
                <div className="flex justify-center pt-2">
                <div className="max-w-xl">
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                </div>
                </div>
                </div> 

        }
        return<div>
            <Appbar/>  
            <div className="flex justify-center pt-2">
            <div className="max-w-xl">
                {blogs.map(blog => <BlogCard
                key={blog.id}
                id={blog.id}
                authorName ={blog.author.name}
                title={blog.title}
                content={blog.content}
                publishedDate={"10.05.2025"}
            /> )}

        </div>
        </div>
        </div>
        
        
        

    }