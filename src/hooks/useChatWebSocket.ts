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
                    setStreamingContent("");

                    const data = event.data;

                    if (data && typeof data === "object" && "conversationId" in data) {
                        const { conversationId, newlyCreated } = data as {
                            conversationId?: string;
                            newlyCreated?: boolean;
                        };

                        if (conversationId) {
                            onConversationCreated?.(conversationId);
                        }

                        if (conversationId && newlyCreated) {
                            queryClient.invalidateQueries({
                                queryKey: ["conversations"],
                            });
                        }
                    }

                    break;
                }

                case "CONTENT": {
                    if (typeof event.data === "string") {
                        streamingContentRef.current += event.data;
                        setStreamingContent(streamingContentRef.current);
                    }

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
