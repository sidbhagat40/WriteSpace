import { useState } from 'react';
import axios from 'axios';
import type { OutputData } from '@editorjs/editorjs'; 
import Editor from '../components/Editor';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../config';
import { Appbar } from '../components/Appbar';
 
axios.defaults.withCredentials = true;

export const Publish = () => {
    const [title, setTitle] = useState('');
    const [data, setData] = useState<OutputData>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handlePublish = async () => {
        if (isSubmitting || !data) {
            alert("Content is empty or submission in progress.");
            return;
        }
        setIsSubmitting(true);

        try {
            console.log(data);
            const response = await axios.post(`${BACKEND_URL}/api/v1/post`, {
                title: title,
                content: data,
            });

            navigate(`/posts/${response.data.id}`);
            
            alert("Post published successfully! Navigation is disabled in this example.");

        } catch (e) {
            console.error("Failed to create the post", e);
            alert("ERROR: Could not publish the post");
        } finally {
            setIsSubmitting(false); // Re-enable button on failure or success
        }
    };

    return (
        <div>
            <Appbar />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
                <div className="w-full max-w-4xl mx-auto">
                    {/* Title Input remains the same */}
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full text-4xl font-bold border-none focus:ring-0 p-2 mb-4 bg-transparent outline-none"
                    />

                    
                    <div className="w-full mx-auto rounded-xl bg-white shadow-lg text-gray-800">
                        <Editor data={data} onChange={setData} holder="editorjs-container" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handlePublish}
                            disabled={isSubmitting}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-200 disabled:bg-gray-400"
                        >
                            {isSubmitting ? "Publishing..." : "Publish"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Publish;

