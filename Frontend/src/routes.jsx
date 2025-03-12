import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Index.jsx";
import Error from "./pages/Error/Index.jsx";
import Login from "./pages/Login/Index.jsx";
import Signup from "./pages/Signup/Index.jsx";
import Dashboard from "./pages/Dashboard/Index.jsx";
import Profile from "./pages/Profile/Index.jsx";
import UsersList from "./pages/UsersList/Index.jsx";
import Settings from "./pages/Settings/Index.jsx";

function MainRoutes(){
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="/*" element={<Error />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
    )
}

export default MainRoutes;