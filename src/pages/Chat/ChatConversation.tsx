import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ChatInput from "@/components/chat/ChatInput";
import { useChatWebSocket } from "@/hooks/useChatWebSocket";
import { useDocument } from "@/hooks/useDocuments";
import type { ChatMessage } from "@/services/websocket/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { MessagePage } from "@/types/conversation";
import { getConversationMessages } from "@/services/api/conversation";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@base-ui/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { chatWebSocket } from "@/services/websocket/chatWebSocket";

const ChatConversation = () => {
    const { documentId, conversationId: routeConversationId } = useParams();
    const [conversationId, setConversationId] = useState<string | null>(routeConversationId ?? null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const { data, isLoading, isError } = useDocument(documentId!);
    const navigate = useNavigate();

    console.log("routeConversationId:", routeConversationId);
    console.log("conversationId state:", conversationId);

    const { data: conversationMessageData, isLoading: messagesLoading } = useInfiniteQuery<MessagePage>({
        queryKey: ["conversation-messages", routeConversationId],
        enabled: !!routeConversationId,
        initialPageParam: null,

        queryFn: ({ pageParam }) => {
            const cursor = pageParam as {
                beforeCreatedAt: string;
                beforeMessageId: string;
            } | null;

            return getConversationMessages(routeConversationId!, cursor?.beforeCreatedAt, cursor?.beforeMessageId);
        },

        getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
    });

    const { isStreaming, streamingContent, sendMessage } = useChatWebSocket({
        documentId: documentId ?? null,
        conversationId,
        onConversationCreated: setConversationId,
        onMessageComplete: (content) => {
            setMessages((current) => [
                ...current,
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content,
                },
            ]);
        },
    });

    useEffect(() => {
        if (!conversationMessageData) {
            return;
        }

        const loadedMessages = conversationMessageData.pages
            .flatMap((page) => page.content)
            .reverse()
            .map((message) => ({
                id: message.id,
                role: message.role.toLowerCase() as "user" | "assistant",
                content: message.content,
            }));

        setMessages(loadedMessages);
    }, [conversationMessageData]);

    useEffect(() => {
        setConversationId(routeConversationId ?? null);
    }, [routeConversationId]);

    const handleSend = (userQuery: string) => {
        setMessages((current) => [
            ...current,
            {
                id: crypto.randomUUID(),
                role: "user",
                content: userQuery,
            },
        ]);

        sendMessage(userQuery);
    };

    if (isLoading || (routeConversationId && messagesLoading)) {
        return (
            <div className="flex min-h-svh w-full flex-col">
                <div className="flex h-14 items-center border-b px-4">
                    <Skeleton className="h-5 w-40 bg-muted-foreground/30" />
                </div>

                <div className="flex flex-1 flex-col gap-6 p-6">
                    <div className="flex justify-end">
                        <Skeleton className="h-10 w-48 rounded-2xl bg-muted-foreground/30" />
                    </div>

                    <div className="flex justify-start">
                        <Skeleton className="h-20 w-3/5 rounded-2xl bg-muted-foreground/30" />
                    </div>

                    <div className="flex justify-end">
                        <Skeleton className="h-10 w-64 rounded-2xl bg-muted-foreground/30" />
                    </div>

                    <div className="flex justify-start">
                        <Skeleton className="h-24 w-2/3 rounded-2xl bg-muted-foreground/30" />
                    </div>
                </div>

                <div className="border-t p-4">
                    <Skeleton className="h-12 w-full rounded-xl bg-muted-foreground/30" />
                </div>
            </div>
        );
    }

    if (isError || !document) {
        return (
            <div className="flex min-h-svh items-center justify-center">
                <p className="text-sm text-muted-foreground">Document not found.</p>
            </div>
        );
    }

    return (
        <main className="flex h-svh min-h-0 flex-1 flex-col overflow-hidden bg-[#0a0907]">
            <header className="flex h-14 shrink-0 items-center border-b border-white/10">
                <div className="flex w-full items-center gap-3 px-4">
                    <SidebarTrigger />

                    <Separator orientation="vertical" className="h-5 w-px shrink-0 bg-white/10" />

                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    onClick={(event) => {
                                        event.preventDefault();

                                        if (chatWebSocket.isConnected) {
                                            chatWebSocket.disconnect();
                                        }

                                        navigate("/chat");
                                    }}
                                >
                                    Chat
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage className="max-w-64 truncate text-sm font-medium text-[#f8f5ee]">
                                    {data?.data?.originalFilename}
                                </BreadcrumbPage>
                            </BreadcrumbItem>

                            {routeConversationId && (
                                <>
                                    <BreadcrumbSeparator />

                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="text-sm text-muted-foreground">Conversation</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </>
                            )}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <div className="min-h-0 flex-1 overflow-y-auto">
                    <ChatMessageList messages={messages} streamingContent={streamingContent} isStreaming={isStreaming} />
                </div>

                <div className="shrink-0">
                    <ChatInput disabled={isStreaming} onSend={handleSend} />
                </div>
            </div>
        </main>
    );
};

export default ChatConversation;
