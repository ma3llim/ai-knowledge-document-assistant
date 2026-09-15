import Login from "@/pages/auth/Login";
import Home from "@/pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
