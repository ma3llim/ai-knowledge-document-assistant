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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@base-ui/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { chatWebSocket } from "@/services/websocket/chatWebSocket";
import { ChatConversationSkeleton } from "./ChatConversationSkeleton";

const ChatConversation = () => {
    const { documentId, conversationId: routeConversationId } = useParams();
    const [conversationId, setConversationId] = useState<string | null>(routeConversationId ?? null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const { data, isLoading, isError } = useDocument(documentId!);
    const navigate = useNavigate();

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

    const { isStreaming, streamingContent, sendMessage, isThinking, setIsThinking } = useChatWebSocket({
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
        setIsThinking(true);
    };

    if (isError || !document) {
        return (
            <div className="flex min-h-svh items-center justify-center">
                <p className="text-sm text-muted-foreground">Document not found.</p>
            </div>
        );
    }

    return (
        <>
            <header className="sticky top-0 z-50 flex h-14 w-full transition-all duration-300 items-center border-b border-white/10 bg-[#0a0907]">
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

            <div className="flex min-h-0 flex-1 flex-col">
                <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                    {isLoading || (routeConversationId && messagesLoading) ? (
                        <ChatConversationSkeleton />
                    ) : (
                        <ChatMessageList messages={messages} streamingContent={streamingContent} isStreaming={isStreaming} isThinking={isThinking} />
                    )}
                </div>

                <div className="sticky bottom-0 z-50 shrink-0">
                    <ChatInput disabled={isStreaming} onSend={handleSend} />
                </div>
            </div>
        </>
    );
};

export default ChatConversation;
