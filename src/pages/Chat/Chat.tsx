import { useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Chat = () => {
    const [selectedConversation, setSelectedConversation] = useState<{
        id: string;
        title: string;
    } | null>(null);

    return (
        <>
            <header className="flex h-14 shrink-0 items-center">
                <div className="flex w-full items-center gap-3 px-4">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-5 w-px shrink-0 bg-border" />

                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage className="line-clamp-1">Manage Library</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <main className="flex flex-1 flex-col">
                <h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea laboriosam, perferendis voluptatum consequuntur placeat sint! Ullam
                    consequatur ducimus delectus amet maxime nihil iusto? Beatae, fuga vel error odio reiciendis sit.
                </h1>
            </main>
        </>
    );
};

export default Chat;
