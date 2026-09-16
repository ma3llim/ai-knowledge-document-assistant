import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
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

    const { data: document, isLoading: isDocumentLoading, isError: isDocumentError } = useDocument(documentId!);

    const { isConnected, isStreaming, streamingContent, citations, sendMessage } = useChatWebSocket({
        documentId: documentId ?? null,
        conversationId,
        onConversationCreated: setConversationId,
    });

    useEffect(() => {
        if (!documentId) {
            navigate("/chat", { replace: true });
        }
    }, [documentId, navigate]);

    useEffect(() => {
        if (isDocumentError) {
            navigate("/chat", { replace: true });
        }
    }, [isDocumentError, navigate]);

    if (isDocumentLoading) {
        return (
            <div className="flex min-h-svh w-full items-center justify-center">
                <p className="text-sm text-muted-foreground">Loading document...</p>
            </div>
        );
    }

    if (!document) {
        return null;
    }

    const handleSend = (content: string) => {
        setMessages((current) => [
            ...current,
            {
                id: crypto.randomUUID(),
                role: "user",
                content,
            },
        ]);

        sendMessage(content);
    };

    return (
        <div className="flex min-h-svh w-full flex-col">
            <div className="flex items-center gap-2 border-b px-4 py-2">
                <button
                    type="button"
                    onClick={() => navigate("/chat")}
                    className="flex size-9 items-center justify-center rounded-lg transition hover:bg-muted"
                    aria-label="Back to documents"
                >
                    <FiArrowLeft size={18} />
                </button>

                <span className="text-sm text-muted-foreground">Back to documents</span>
            </div>

            <ChatHeader documentName={document.data.originalFilename} isConnected={isConnected} />

            <ChatMessageList messages={messages} streamingContent={streamingContent} isStreaming={isStreaming} />

            <ChatInput disabled={!isConnected || isStreaming} onSend={handleSend} />
        </div>
    );
};

export default ChatConversation;
