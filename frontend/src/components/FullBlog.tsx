import type { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import type { OutputData, BlockToolData } from "@editorjs/editorjs"


const renderBlock = (block: BlockToolData) => {
    switch (block.type) {
        case 'header':
            switch (block.data.level) {
                case 1:
                    return <h1 key={block.id} className="font-serif font-bold mt-8 mb-4 text-4xl" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
                case 2:
                    return <h2 key={block.id} className="font-serif font-bold mt-8 mb-4 text-3xl" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
                case 3:
                    return <h3 key={block.id} className="font-serif font-bold mt-6 mb-3 text-2xl" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
                case 4:
                    return <h4 key={block.id} className="font-serif font-bold mt-6 mb-3 text-xl" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
                case 5:
                    return <h5 key={block.id} className="font-serif font-bold mt-5 mb-2 text-lg" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
                case 6:
                    return <h6 key={block.id} className="font-serif font-bold mt-5 mb-2 text-base" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
                default:
                    return null;
            }
        case 'paragraph':
            return (
                <p 
                    key={block.id} 
                    className="text-xl font-serif text-gray-800 leading-relaxed my-4"
                    dangerouslySetInnerHTML={{ __html: block.data.text }} 
                />
            );
        case 'list':
            const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
            const listStyle = block.data.style === 'ordered' ? 'list-decimal' : 'list-disc';
            return (
                <ListTag key={block.id} className={`${listStyle} list-inside pl-5 my-4 text-xl font-serif text-gray-800 leading-relaxed`}>
                    {/* The only change is from item.text to item.content */}
                    {block.data.items.map((item: { content: string }, index: number) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: item.content }} />
                    ))}
                </ListTag>
            );
        default:
            return null;
    }
};

export const FullBlog = ({blog}:{blog: Blog}) => {

    const getPublishedDate = (date : string) => {
        const dateObject = new Date(date);            
        const options: Intl.DateTimeFormatOptions = {year : 'numeric',month : 'long', day : 'numeric'};
        const formattedDate = dateObject.toLocaleDateString('en-US', options);
        return formattedDate ? formattedDate : '';
    }

    let parsedContent: OutputData | null = null;
        try {
            if (typeof blog.content === 'string') {
                parsedContent = JSON.parse(blog.content);
            } else {
                parsedContent = blog.content;
            }
        } catch (e) {
            console.error("Failed to parse blog content:", e);
        }

        if (!blog || !parsedContent || !parsedContent.blocks) {
        return <div>Loading blog content...</div>; // Or render a skeleton loader
    }


       return <div>
        <Appbar/>
        <div className="grid grid-cols-12">
        <div className="col-span-8">
            <div className="ml-10">
            <div className="mt-15 text-5xl font-semibold font-serif min-w-50">
            {blog.title}
        </div>
        <div className="pt-4 ml-1 text-slate-400 text-xl">
            {getPublishedDate(blog.createdAt)}
        </div>
        <div className="pt-8 text-xl font-serif text-gray-800 leading-relaxed">
        </div>
            {parsedContent.blocks.map(block => renderBlock(block))}
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