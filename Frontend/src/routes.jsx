import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Index.jsx";


function MainRoutes(){
    return (
        <Routes>
            <Route path="*" element={<Login />} />
        </Routes>
    )
}

export default MainRoutes;