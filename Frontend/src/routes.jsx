import { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './context/AuthContext';
import PropTypes from 'prop-types';

import ErrorPage from "./components/ErrorPage";
import Home from "./pages/Home/Index.jsx";
import Signin from "./pages/Signin/Index.jsx";
import Signup from "./pages/Signup/Index.jsx";
import Dashboard from "./pages/Dashboard/Index.jsx";
import Profile from "./pages/Profile/Index.jsx";
import ProfileEdit from "./pages/ProfileEdit/Index.jsx";
import UsersList from "./pages/UsersList/Index.jsx";
import Settings from "./pages/Settings/Index.jsx";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('loggedInUser');
  if (!user) return <Navigate to="/signin" replace />;
  return children;
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

function MainRoutes(){
  useEffect(() => {
    const savedPrimaryColor = localStorage.getItem('primaryColor');
    if (savedPrimaryColor) {
      document.documentElement.style.setProperty('--primary-color', savedPrimaryColor);
    }
  }, []);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/*" element={<ErrorPage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/profile/edit" element={<ProtectedRoute><ProfileEdit /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
    </Routes>
  )
}

export default MainRoutes;