import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ChatInput from "@/components/chat/ChatInput";
import { useChatWebSocket } from "@/hooks/useChatWebSocket";
import { useDocument } from "@/hooks/useDocuments";
import { chatWebSocket } from "@/services/websocket/chatWebSocket";
import type { ChatMessage } from "@/services/websocket/types";

const ChatConversation = () => {
    const { documentId } = useParams();
    const navigate = useNavigate();
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const { data, isLoading, isError } = useDocument(documentId!);
    const { isConnected, isStreaming, streamingContent, citations, sendMessage } = useChatWebSocket({
        documentId: documentId ?? null,
        conversationId,
        onConversationCreated: setConversationId,
    });
    console.log(data);

    const handleBack = () => {
        chatWebSocket.disconnect();

        setConversationId(null);
        setMessages([]);

        navigate("/chat");
    };

    if (isLoading) {
        return (
            <div className="flex min-h-svh items-center justify-center">
                <p className="text-sm text-muted-foreground">Loading document...</p>
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

    return (
        <div className="flex min-h-svh w-full flex-col">
            <ChatHeader documentName={data?.data?.originalFilename!} isConnected={isConnected} onBack={handleBack} />
            <ChatMessageList messages={messages} streamingContent={streamingContent} isStreaming={isStreaming} />
            <ChatInput disabled={!isConnected || isStreaming} onSend={handleSend} />
        </div>
    );
};

export default ChatConversation;
