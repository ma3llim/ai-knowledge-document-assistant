import Loader from "@/components/common/Loader";
import ChatLayout from "@/layouts/ChatLayout";
import ChatConversation from "@/pages/Chat/ChatConversation";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/auth/Login"));
const OAuthCallback = lazy(() => import("@/pages/auth/OAuthCallback"));
const OAuthFailure = lazy(() => import("@/pages/auth/OAuthFailure"));
const Chat = lazy(() => import("@/pages/Chat/Chat"));
const Library = lazy(() => import("@/pages/Library/Library"));

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/oauth/callback" element={<OAuthCallback />} />
                    <Route path="/oauth/failure" element={<OAuthFailure />} />
                    <Route element={<ChatLayout />}>
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/chat/:documentId" element={<ChatConversation />} />
                        <Route path="/chat/:documentId/:conversationId" element={<ChatConversation />} />
                        <Route path="/library" element={<Library />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRoutes;
