import type { Blog } from "../hooks"
import { Appbar } from "./Appbar"

export const FullBlog = ({blog}:{blog: Blog}) => {

       return <div>
        <Appbar/>
        <div className="grid grid-cols-12">
        <div className="col-span-8">
            <div className="ml-10">
            <div className="mt-15 text-5xl font-semibold font-serif min-w-50">
            {blog.title}
        </div>
        <div className="pt-4 ml-1 text-slate-400 text-xl">
            Posted on 14th July 25
        </div>
        <div className="pt-8 text-xl font-serif text-gray-800 leading-relaxed">
            {blog.content}
        </div>
            </div>

        </div>
        <div className="col-span-4">
            <div className="mt-15 text-3xl font-medium font-serif min-w-50">
                Author
            </div>
            <div className="mt-6 text-xl font-normal font-serif text-slate-600">
                {blog.author.name || "Anonymous"}
            </div>
            <div className="mt-6">
                Just Do It
            </div>
            
        </div>
    </div>

    </div>
    

}