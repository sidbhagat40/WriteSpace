import {useState } from 'react';
import { Appbar } from '../components/Appbar';
import { BACKEND_URL } from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Publish = () => {

    const [post_title, setTitle] = useState('');
    const [post_content, setContent] = useState('');
    const navigate = useNavigate();
    
    const handlePublish = async () => {

        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/post`,{
            title: post_title,
            content: post_content
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
        })
        console.log(response);
        navigate(`/posts/${response.data.id}`)

        }catch(e){
            console.log("Failed to create the post",e);
            alert("ERROR: Could not publish the post");
        }
    }
    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css"
            />

            <style>{`
                .active\\:bg-gray-200:active {
                    background-color: #e5e7eb;
                }
            `}</style>

            <Appbar/>

            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-4xl mx-auto">
                    <input
                        type="text"
                        value={post_title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full text-4xl font-bold border-none focus:ring-0 p-2 mb-4 bg-transparent outline-none"
                    />

                    <div className="w-full mx-auto rounded-xl bg-white shadow-lg text-gray-800">
                        <div className="border border-gray-200 overflow-hidden rounded-md">
                            <div className="w-full">
                                <input
                                type="text"
                                value={post_content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Create your story ..."
                                className="w-full text-l font-semibold border-none focus:ring-0 p-2 mb-4 bg-transparent outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                         <button
                            onClick={handlePublish}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-200"
                        >
                            Publish
                        </button>
                    </div>
                </div>
            </div>
          </>
    );
};

