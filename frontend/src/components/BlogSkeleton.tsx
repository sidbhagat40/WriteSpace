export const BlogSkeleton = () => {
  return (
    <div className="border-b border-slate-200 pb-5 animate-pulse">
      <div className="ml-2 mt-4">
        <div className="flex items-center">
          <div className="rounded-full bg-gray-200 h-6 w-6 mr-2 ml-0.5"></div>
          <div className="h-4 bg-gray-200 rounded w-25"></div>
          <div className="mx-2 text-slate-200">&#9679;</div>
          <div className="h-4 bg-gray-200 rounded w-25"></div>
        </div>

        <div className="h-6 bg-gray-200 rounded w-80 mt-2"></div>
        <div className="h-2 bg-gray-200 rounded w-20 mt-3"></div>
        <div className="h-6 bg-gray-200 rounded w-80 mt-2"></div>

        <div className="pt-2">
          <div className="bg-gray-200 inline-block px-2 py-1 rounded w-20 h-4"></div>
        </div>
      </div>
    </div>
  );
};