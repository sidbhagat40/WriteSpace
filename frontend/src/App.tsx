import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blogs } from './pages/Blogs'
import { Blog } from './pages/Blog'
import { Publish } from './pages/Publish'
 
function App() {
    return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/posts/:id" element={<Blog />} />
                <Route path="/posts" element={<Blogs />} />
                <Route path="/publish" element={<Publish />} />
            </Routes>
        </BrowserRouter>
      </>
    )
}

export default App