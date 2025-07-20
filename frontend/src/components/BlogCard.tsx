import { Link } from "react-router-dom"

interface BlogCardProps{
    id: string,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}


export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps) => {
    return <Link to={`/posts/${id}`}>
     <div className="border-b border-slate-200 pb-5 cursor-pointer">
        <div className="ml-2 mt-4">
            <div className="flex">
            <div className="flex justify-center flex-col">
                <Avatar name={authorName}/>
            </div>
            <div className="text-lg font-extralight text-grey-300">
                {authorName}  
            </div>
            <div className="flex justify-center flex-col text-sm text-slate-200 ml-1 mr-1">
                &#9679;
            </div>
            <div className="text-lg font-extralight text-slate-400 ">
                {publishedDate}
            </div>
            
        </div>

        <div className="text-xl font-bold font-sans mt-2">
            {title}
        </div>
        <div className="text-base text-slate-600 font-serif pt-2 pb-1">
            {content.slice(0,100) + "..."}
        </div>
        <div className="pt-1">
            <div className="bg-gray-200 inline-block px-1 py-0.25 rounded">
                <span className="pt-2 text-slate-400">
                {`${Math.ceil(content.length / 100)} min read`}
                </span>
            </div>

        </div>

        </div>
        
        
    </div>
    </Link>
}

const sizeMap: Record<number, string> = {
  6: "w-6 h-6",
  8: "w-8 h-8",
  10: "w-10 h-10",
  12: "w-12 h-12",
  14: "w-14 h-14",
};

export function Avatar({ name, size = 6 }: { name: string; size?: number }) {
  const sizeClass = sizeMap[size] || sizeMap[6];

  return (
    <div
      className={`relative inline-flex items-center justify-center ${sizeClass} overflow-hidden bg-gray-600 rounded-full mr-2 ml-0.5`}
    >
      <span className="font-thin text-gray-300 text-sm">{name[0]}</span>
    </div>
  );
}