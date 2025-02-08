import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Index.jsx";
import Signup from "./pages/Signup/Index.jsx";

function MainRoutes(){
    return (
        <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )
}

export default MainRoutes;