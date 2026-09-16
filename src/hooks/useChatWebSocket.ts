import { ChatWebSocket } from "@/services/websocket/chatWebSocket";
import type { ChatCitation, ChatErrorData, ChatWebSocketEvent, ChatWebSocketRequest } from "@/services/websocket/types";
import type { RootState } from "@/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface UseChatWebSocketOptions {
    documentId: string | null;
    conversationId: string | null;
    onConversationCreated?: (conversationId: string) => void;
}
export const useChatWebSocket = ({ documentId, conversationId, onConversationCreated }: UseChatWebSocketOptions) => {
    const { accessToken, user } = useSelector((state: RootState) => state.auth);
    const webSocketRef = useRef<ChatWebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamingContent, setStreamingContent] = useState("");
    const [citations, setCitations] = useState<ChatCitation[]>([]);

    const handleMessage = useCallback(
        (event: ChatWebSocketEvent) => {
            switch (event.type) {
                case "START": {
                    setIsStreaming(true);
                    setStreamingContent("");
                    setCitations([]);

                    const data = event.data;

                    if (data && typeof data === "object" && "conversationId" in data) {
                        const newConversationId = (data as { conversationId?: string }).conversationId;
                        if (newConversationId) {
                            onConversationCreated?.(newConversationId);
                        }
                    }

                    break;
                }

                case "CONTENT": {
                    if (typeof event.data === "string") {
                        setStreamingContent((current) => current + event.data);
                    }

                    break;
                }

                case "CITATIONS": {
                    if (Array.isArray(event.data)) {
                        setCitations(event.data as ChatCitation[]);
                    }

                    break;
                }

                case "COMPLETE": {
                    setIsStreaming(false);
                    break;
                }

                case "ERROR": {
                    setIsStreaming(false);
                    setStreamingContent("");

                    const errorData = event.data as ChatErrorData;

                    toast.error(errorData?.message ?? "Unable to generate a response");
                    break;
                }

                default:
                    break;
            }
        },
        [onConversationCreated],
    );

    const connect = useCallback(() => {
        if (!accessToken) {
            return;
        }

        if (webSocketRef.current?.isConnected) {
            return;
        }

        const webSocket = new ChatWebSocket();

        webSocketRef.current = webSocket;

        webSocket.connect(accessToken, {
            onMessage: handleMessage,

            onOpen: () => {
                setIsConnected(true);
            },

            onClose: () => {
                setIsConnected(false);
                setIsStreaming(false);
            },

            onError: () => {
                setIsConnected(false);
                setIsStreaming(false);

                toast.error("Unable to connect to chat server");
            },
        });
    }, [accessToken, handleMessage]);

    const disconnect = useCallback(() => {
        webSocketRef.current?.disconnect();
        webSocketRef.current = null;

        setIsConnected(false);
        setIsStreaming(false);
    }, []);

    const sendMessage = useCallback(
        (userQuery: string) => {
            if (!documentId) {
                toast.error("Please select a document first");
                return;
            }

            if (!user?.id) {
                toast.error("Unable to identify the current user");
                return;
            }

            if (!webSocketRef.current?.isConnected) {
                toast.error("Chat connection is not ready");
                return;
            }

            const request: ChatWebSocketRequest = {
                documentId,
                userId: user.id,
                conversationId,
                userQuery: userQuery.trim(),
            };

            if (!request.userQuery) {
                return;
            }

            webSocketRef.current.send(request);

            setIsStreaming(true);
            setStreamingContent("");
            setCitations([]);
        },
        [conversationId, documentId, user?.id],
    );

    useEffect(() => {
        if (!accessToken) {
            disconnect();
            return;
        }

        connect();

        return () => {
            disconnect();
        };
    }, [accessToken, connect, disconnect]);

    return {
        isConnected,
        isStreaming,
        streamingContent,
        citations,
        connect,
        disconnect,
        sendMessage,
    };
};
