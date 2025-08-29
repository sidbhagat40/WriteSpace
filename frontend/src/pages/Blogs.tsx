import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton"
import type { OutputData } from "@editorjs/editorjs"


const getFirstTextContent = (content: OutputData | string, maxLength: number = 150): string => {
    let parsedContent: OutputData;

    if (typeof content === 'string') {
        try {
            parsedContent = JSON.parse(content);
        } catch (error) {
            console.error("Failed to parse blog content JSON:", error);
            return '';
        }
    } else {
        parsedContent = content;
    }

    if (!parsedContent || !parsedContent.blocks || parsedContent.blocks.length === 0) {
        return '';
    }

    for (const block of parsedContent.blocks) {
        let rawText = '';

        switch (block.type) {
            case 'header':
            case 'paragraph':
                rawText = block.data.text || '';
                break;
            
            case 'list':
                if (block.data.items && Array.isArray(block.data.items)) {
                    const stringItems = block.data.items
                        .map((item: any) => item.content || '') 
                        .filter(Boolean); 

                    rawText = stringItems.join('. ');
                }
                break;
        }

        const cleanText = rawText.replace(/<[^>]*>?/gm, '').trim();

        if (cleanText) {
            if (cleanText.length <= maxLength) {
                return cleanText;
            }

            const truncatedText = cleanText.substring(0, maxLength);
            const lastSpaceIndex = truncatedText.lastIndexOf(' ');
            
            return lastSpaceIndex > 0 
                ? truncatedText.substring(0, lastSpaceIndex) + '...'
                : truncatedText + '...';
        }
       
    }
    
    return '';
};

const getPublishedDate = (date: string) => {
    const dateObject = new Date(date);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    return formattedDate || '';
}

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading || !blogs || blogs.length === 0) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center pt-2">
                    <div className="max-w-xl">
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#F7F7F7] min-h-screen">
            <div>
                <Appbar />
                <div className="flex justify-center pt-2">
                    <div className="max-w-xl">
                        {blogs.map(blog => {
                            // You can remove the console.log now
                            const preview = getFirstTextContent(blog.content, 150);
                            
                            return (
                                <BlogCard
                                    key={blog.id}
                                    id={blog.id}
                                    authorName={blog.author.name}
                                    title={blog.title}
                                    content={preview}
                                    publishedDate={getPublishedDate(blog.createdAt)}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}