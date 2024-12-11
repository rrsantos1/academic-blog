import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login.tsx';
import Home from './home.tsx';
import Posts from './posts.tsx';
import CreatePost  from './createPost.tsx';
import Administracao from './adm.tsx';
import EditPost from './editPost.tsx';
import './css/index.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path='/posts' element={<Posts />} />
      <Route path='/createPost' element={<CreatePost />} />
      <Route path='/administracao' element={<Administracao  />} />
      <Route path='/editPost/:id' element={<EditPost />} /> 
    </Routes>
  </Router>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
