    import { Appbar } from "../components/Appbar"
    import { BlogCard } from "../components/BlogCard"
    import { useBlogs } from "../hooks"
    import { BlogSkeleton } from "../components/BlogSkeleton"
    import type { OutputData } from "@editorjs/editorjs"

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

        const previewText = (content : OutputData) => {
            const paragraph = content.blocks.find(block => block.type === 'paragraph');
            return paragraph ? paragraph.data.text : '';
        }
        const getPublishedDate = (date : string) => {
            const dateObject = new Date(date);            
            const options: Intl.DateTimeFormatOptions = {year : 'numeric',month : 'long', day : 'numeric'};
            const formattedDate = dateObject.toLocaleDateString('en-US', options);
            return formattedDate ? formattedDate : '';
        }

        return<div>
            <Appbar/>  
            <div className="flex justify-center pt-2">
            <div className="max-w-xl">
               {
                    blogs.map(blog => {
                        const preview = previewText(blog.content);
                        return(
                            <BlogCard
                            key = {blog.id}
                            id = {blog.id}
                            authorName={blog.author.name}
                            title={blog.title}
                            content={preview}
                            publishedDate={getPublishedDate(blog.createdAt)}                         
                            />
                        )
                    })
               }

        </div>
        </div>
        </div>



    }