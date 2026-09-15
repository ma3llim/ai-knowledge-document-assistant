import Sidebar from "@/components/layout/Sidebar";
import Header from "./Header";

const ChatLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />

            <div className="flex min-w-0 flex-1 flex-col">
                <Header />

                <main className="flex min-h-0 flex-1 items-center justify-center">
                    <p className="text-sm text-muted-foreground">Chat coming soon...</p>
                </main>
            </div>
        </div>
    );
};

export default ChatLayout;
