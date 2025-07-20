import {Appbar} from "./Appbar"

export const FullBlogSkeleton = () => {
    return <div>
        <Appbar/>
        <div className="border-b border-slate-200 pb-5 animate-pulse">
        <div className="grid grid-cols-12">
        <div className="col-span-8">
            <div className="ml-10">
            <div className="mt-15 text-5xl font-semibold font-serif min-w-50">
            <div className="h-10 bg-gray-100 rounded w-150 mt-2"></div>
        </div>
        <div className="pt-4 ml-1 text-slate-400 text-xl">
            <div className="h-5 bg-gray-100 rounded w-50 mt-2"></div>
        </div>
        <div className="pt-8 text-xl font-serif text-gray-800 leading-relaxed">
            <div className="h-60 bg-gray-100 rounded w-200 mt-2"></div>
        </div>
            </div>

        </div>
        <div className="col-span-4">
            <div className="mt-15 text-3xl font-medium font-serif min-w-50">
                <div className="h-10 bg-gray-100 rounded w-80 mt-2"></div>
            </div>
            <div className="mt-6 text-xl font-normal font-serif text-slate-600">
                <div className="h-8 bg-gray-100 rounded w-50 mt-2"></div>
            </div>
            <div className="mt-6">
                <div className="h-30 bg-gray-100 rounded w-80 mt-2"></div>
            </div>
            
        </div>
    </div>
    </div>
    </div>
}