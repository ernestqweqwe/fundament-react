import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { routes } from '../router';

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route,i) => (
        <Route key={i} Component={route.component} path={route.path} />
      ))}
      <Route path="/*" element={<Navigate to="/posts" replace />} />
    </Routes>
  );
};

export default AppRouter;
