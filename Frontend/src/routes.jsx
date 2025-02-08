import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Index.jsx";
import Register from "./pages/Register/Index.jsx";

function MainRoutes(){
    return (
        <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
        </Routes>
    )
}

export default MainRoutes;