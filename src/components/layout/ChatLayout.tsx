import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./Sidebar";

const ChatLayout = () => {
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
