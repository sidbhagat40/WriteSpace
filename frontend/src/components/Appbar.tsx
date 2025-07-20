import {Avatar} from './BlogCard'
import { Link, useLocation } from 'react-router-dom'

export const Appbar = () => {

  const { pathname } = useLocation();
  return (
    <div className="border-b border-slate-200 flex items-center justify-between px-10 py-3">
      <Link
        to={"/posts"}
        className="font-bold text-3xl font-sans cursor-pointer"
      >
        WriteSpace 
      </Link>

      <div className="flex items-center space-x-4">
        {pathname != "/publish" && (
          <Link to={`/publish`}>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          >
            New
          </button>
        </Link>
        )}
        <Avatar name={"Siddharth"} size={10} />
      </div>
    </div>
  );
};