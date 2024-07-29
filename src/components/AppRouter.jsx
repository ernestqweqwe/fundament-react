import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '../router';
import { AuthContext } from '../context';

const AppRouter = () => {
  const {isAuth} = useContext(AuthContext)
  console.log(isAuth)
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route, i) => (
        <Route key={i} Component={route.component} path={route.path} />
      ))}
      <Route path="/*" element={<Navigate to="/posts" replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route, i) => (
        <Route key={i} Component={route.component} path={route.path} />
      ))}
      <Route path="/*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
