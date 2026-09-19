import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { chatWebSocket } from "@/services/websocket/chatWebSocket";
import type { ChatErrorData, ChatWebSocketEvent, ChatWebSocketRequest } from "@/services/websocket/types";
import type { RootState } from "@/store";
import { useQueryClient } from "@tanstack/react-query";

interface UseChatWebSocketOptions {
    documentId: string | null;
    conversationId: string | null;
    onConversationCreated?: (conversationId: string) => void;
    onMessageComplete?: (content: string) => void;
}

export const useChatWebSocket = ({ documentId, conversationId, onConversationCreated, onMessageComplete }: UseChatWebSocketOptions) => {
    const { accessToken, user } = useSelector((state: RootState) => state.auth);
    const [isConnected, setIsConnected] = useState(chatWebSocket.isConnected);
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamingContent, setStreamingContent] = useState("");
    const streamingContentRef = useRef("");
    const queryClient = useQueryClient();

    const handleMessage = useCallback(
        (event: ChatWebSocketEvent) => {
            switch (event.type) {
                case "START": {
                    setIsStreaming(true);
                    streamingContentRef.current = "";
                    setStreamingContent("");

                    if (!event.data || typeof event.data !== "object") {
                        break;
                    }

                    const { conversationId: resolvedConversationId, newlyCreated } = event.data as {
                        conversationId?: string;
                        newlyCreated?: boolean;
                    };

                    if (resolvedConversationId) {
                        onConversationCreated?.(resolvedConversationId);
                    }

                    if (resolvedConversationId && newlyCreated) {
                        queryClient.invalidateQueries({
                            queryKey: ["conversations"],
                        });
                    }

                    break;
                }

                case "CONTENT": {
                    if (typeof event.data !== "string") {
                        break;
                    }

                    streamingContentRef.current += event.data;

                    setStreamingContent(streamingContentRef.current);

                    break;
                }

                case "COMPLETE": {
                    const completedContent = streamingContentRef.current;

                    if (completedContent) {
                        onMessageComplete?.(completedContent);
                    }

                    streamingContentRef.current = "";
                    setStreamingContent("");
                    setIsStreaming(false);

                    break;
                }

                case "ERROR": {
                    const errorData = event.data as ChatErrorData;
                    const errorMessage = errorData?.message;

                    if (errorMessage) {
                        onMessageComplete?.(errorMessage);
                    }

                    streamingContentRef.current = "";
                    setStreamingContent("");
                    setIsStreaming(false);

                    break;
                }
                default:
                    break;
            }
        },
        [onConversationCreated, onMessageComplete, queryClient],
    );

    useEffect(() => {
        const unsubscribeMessage = chatWebSocket.subscribeMessage(handleMessage);
        const unsubscribeOpen = chatWebSocket.subscribeOpen(() => {
            setIsConnected(true);
        });
        const unsubscribeClose = chatWebSocket.subscribeClose(() => {
            setIsConnected(false);
            setIsStreaming(false);
        });
        const unsubscribeError = chatWebSocket.subscribeError(() => {
            setIsConnected(false);
            setIsStreaming(false);

            toast.error("Unable to connect to chat server");
        });
        setIsConnected(chatWebSocket.isConnected);

        return () => {
            unsubscribeMessage();
            unsubscribeOpen();
            unsubscribeClose();
            unsubscribeError();
        };
    }, [handleMessage, onConversationCreated]);

    const connect = useCallback(() => {
        if (!accessToken) {
            toast.error("Authentication required");
            return;
        }

        if (chatWebSocket.isConnected) {
            setIsConnected(true);
            return;
        }

        chatWebSocket.connect(accessToken);
    }, [accessToken]);

    const disconnect = useCallback(() => {
        chatWebSocket.disconnect();

        setIsConnected(false);
        setIsStreaming(false);
        setStreamingContent("");
    }, []);

    const sendMessage = useCallback(
        async (userQuery: string) => {
            if (!documentId) {
                toast.error("Please select a document first");
                return;
            }

            if (!user?.id) {
                toast.error("Unable to identify the current user");
                return;
            }

            const trimmedQuery = userQuery.trim();

            if (!trimmedQuery) {
                return;
            }

            try {
                await chatWebSocket.ensureConnection(accessToken!);

                const request: ChatWebSocketRequest = {
                    documentId,
                    userId: user.id,
                    conversationId,
                    userQuery: trimmedQuery,
                };

                chatWebSocket.send(request);

                setIsStreaming(true);
                setStreamingContent("");
            } catch (error) {
                console.error("Failed to send chat message:", error);
                toast.error("Unable to connect to chat server");
            }
        },
        [conversationId, documentId, user?.id],
    );

    return {
        isConnected,
        isStreaming,
        streamingContent,
        connect,
        disconnect,
        sendMessage,
    };
};
