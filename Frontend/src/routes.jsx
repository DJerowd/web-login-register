import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Index.jsx";
import Login from "./pages/Login/Index.jsx";
import Signup from "./pages/Signup/Index.jsx";
import Dashboard from "./pages/Dashboard/Index.jsx";
import Settings from "./pages/Settings/Index.jsx";

function MainRoutes(){
    return (
        <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
    )
}

export default MainRoutes;