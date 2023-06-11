import React from 'react';
import { BrowserRouter , Route ,Routes, Router} from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Guide from './pages/Guide';
import Post from './pages/Post';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import UserPosts from './pages/UserPosts';


function App() {
  return (
    <BrowserRouter>
<AuthProvider>
  <PostProvider>
     <Routes>
          <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home/>} />
          <Route path="/guide" element={<Guide/>} />
          <Route path="/post" element={<Post/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/userposts" element={<UserPosts/>} />
          <Route path="/login" element={<Login/>} />
        
      </Route>
      </Routes>
      </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
