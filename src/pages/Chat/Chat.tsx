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
            <header className="flex h-14 shrink-0 items-center gap-2">
                <div className="flex flex-1 items-center gap-2 px-3">
                    <SidebarTrigger />

                    <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />

                    {selectedConversation && (
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1">{selectedConversation.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    )}
                </div>
            </header>

            <main className="flex flex-1 flex-col container mx-auto">
                <h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea laboriosam, perferendis voluptatum consequuntur placeat sint! Ullam
                    consequatur ducimus delectus amet maxime nihil iusto? Beatae, fuga vel error odio reiciendis sit.
                </h1>
            </main>
        </>
    );
};

export default Chat;
