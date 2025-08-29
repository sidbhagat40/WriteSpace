import {Avatar} from './BlogCard'
import { Link, useLocation, useNavigate} from 'react-router-dom'
import api from '../api/axiosConfig';
import { useState, useRef } from 'react';
import { useAuthStore } from '../store/AuthStore';

export const Appbar = () => {
  
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try{
      await api.post('user/logout');
      logout();

      console.log("Logout succesfull");
      navigate('/');

    } catch(error){
      console.log("Logout failed");
    }
  }

  const { pathname } = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef <number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
};

const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
        setIsDropdownOpen(false);
    }, 200); // 200ms delay before closing
};

  return (
        <div className="shadow-md flex items-center justify-between py-3 px-10">
            <Link to={"/posts"} className="font-lobster text-3xl cursor-pointer">
                WriteSpace
            </Link>

            <div className="flex items-center space-x-4">
                {pathname !== "/publish" && (
                    <Link to={`/publish`}>
                        <button
                            type="button"
                            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-semibold rounded-full text-sm px-5 py-2.5 text-center">
                            + Create
                        </button>
                    </Link>
                )}

                {/* 2. Avatar and Dropdown Container */}
                <div 
                    className="relative" 
                    onMouseEnter = {handleMouseEnter}
                    onMouseLeave = {handleMouseLeave}
                >
                    <Avatar name={user?.name || "Anonymous"} size={10} />

                    {/* 3. The Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                          <Link to="/userPosts" className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                          My Posts
                          </Link>
                            <div className="border-t border-gray-100"></div>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};