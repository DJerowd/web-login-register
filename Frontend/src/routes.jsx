import { Routes, Route } from "react-router-dom";

import ErrorPage from "./components/ErrorPage";
import Home from "./pages/Home/Index.jsx";
import Signin from "./pages/Signin/Index.jsx";
import Signup from "./pages/Signup/Index.jsx";
import Dashboard from "./pages/Dashboard/Index.jsx";
import Profile from "./pages/Profile/Index.jsx";
import ProfileEdit from "./pages/ProfileEdit/Index.jsx";
import UsersList from "./pages/UsersList/Index.jsx";
import Settings from "./pages/Settings/Index.jsx";

function MainRoutes(){
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="/*" element={<ErrorPage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
    )
}

export default MainRoutes;