import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ChatInput from "@/components/chat/ChatInput";
import { useChatWebSocket } from "@/hooks/useChatWebSocket";
import type { ChatMessage } from "@/services/websocket/types";
import { useDocument } from "@/hooks/useDocuments";

const ChatConversation = () => {
    const { documentId } = useParams();
    const navigate = useNavigate();
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const { data: document, isLoading, isError } = useDocument(documentId!);

    const { isConnected, disconnect, isStreaming, streamingContent, citations, sendMessage } = useChatWebSocket({
        documentId: documentId ?? "",
        conversationId,
        onConversationCreated: setConversationId,
    });

    const handleBack = () => {
        disconnect();

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
        // Add user message to UI
        setMessages((current) => [
            ...current,
            {
                id: crypto.randomUUID(),
                role: "user",
                content: userQuery,
            },
        ]);

        // Send to WebSocket
        sendMessage(userQuery);
    };

    return (
        <div className="flex min-h-svh w-full flex-col">
            <ChatHeader documentName={document.originalFilename} isConnected={isConnected} onBack={handleBack} />

            <ChatMessageList messages={messages} streamingContent={streamingContent} isStreaming={isStreaming} />

            <ChatInput disabled={!isConnected || isStreaming} onSend={handleSend} />
        </div>
    );
};

export default ChatConversation;
