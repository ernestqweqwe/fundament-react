import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Posts from './../pages/Posts'
import About from './../pages/About';
import Error from './../pages/Error';
import PostIdPage from '../pages/PostIdPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />}></Route>
      <Route  path="/posts" element={<Posts />}></Route>
      <Route  path="/posts/:id" element={<PostIdPage />}></Route>
      <Route path="/error" element={<Error />}></Route>
      <Route path="/*" element={<Navigate to="/error" replace />} />
    </Routes>
  );
};

export default AppRouter;
