import { Navigate, Outlet, useLocation } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { AppSidebar } from "@/components/common/Sidebar";

const ChatLayout = () => {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const location = useLocation();

    if (!accessToken) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    );
};

export default ChatLayout;
