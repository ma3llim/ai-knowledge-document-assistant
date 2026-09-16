import type { ChatWebSocketEvent, ChatWebSocketRequest } from "./types";

const WS_BASE_URL = "ws://localhost:8080/ws/chat";

type MessageHandler = (event: ChatWebSocketEvent) => void;
type ConnectionHandler = () => void;

class ChatWebSocket {
    private socket: WebSocket | null = null;

    private messageHandlers = new Set<MessageHandler>();
    private openHandlers = new Set<ConnectionHandler>();
    private closeHandlers = new Set<ConnectionHandler>();
    private errorHandlers = new Set<ConnectionHandler>();

    connect(accessToken: string): void {
        if (!accessToken) {
            return;
        }

        if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
            return;
        }

        const url = `${WS_BASE_URL}?token=${encodeURIComponent(accessToken)}`;

        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            this.notifyOpen();
        };

        this.socket.onmessage = (event) => {
            try {
                const parsedEvent = JSON.parse(event.data) as ChatWebSocketEvent;

                this.notifyMessage(parsedEvent);
            } catch (error) {
                console.error("Failed to parse WebSocket message:", error);
                this.notifyError();
            }
        };

        this.socket.onerror = (event) => {
            console.error("WebSocket error:", event);
            this.notifyError();
        };

        this.socket.onclose = (event) => {
            console.log("WebSocket closed:", {
                code: event.code,
                reason: event.reason,
                wasClean: event.wasClean,
            });

            this.socket = null;
            this.notifyClose();
        };
    }

    send(request: ChatWebSocketRequest): void {
        if (!this.socket) {
            throw new Error("WebSocket is not initialized");
        }

        if (this.socket.readyState !== WebSocket.OPEN) {
            throw new Error("WebSocket is not connected");
        }

        this.socket.send(JSON.stringify(request));
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    subscribeMessage(handler: MessageHandler): () => void {
        this.messageHandlers.add(handler);
        return () => {
            this.messageHandlers.delete(handler);
        };
    }

    subscribeOpen(handler: ConnectionHandler): () => void {
        this.openHandlers.add(handler);
        return () => {
            this.openHandlers.delete(handler);
        };
    }

    subscribeClose(handler: ConnectionHandler): () => void {
        this.closeHandlers.add(handler);
        return () => {
            this.closeHandlers.delete(handler);
        };
    }

    subscribeError(handler: ConnectionHandler): () => void {
        this.errorHandlers.add(handler);
        return () => {
            this.errorHandlers.delete(handler);
        };
    }

    get isConnected(): boolean {
        return this.socket?.readyState === WebSocket.OPEN;
    }

    private notifyMessage(event: ChatWebSocketEvent): void {
        this.messageHandlers.forEach((handler) => {
            handler(event);
        });
    }

    private notifyOpen(): void {
        this.openHandlers.forEach((handler) => {
            handler();
        });
    }

    private notifyClose(): void {
        this.closeHandlers.forEach((handler) => {
            handler();
        });
    }

    private notifyError(): void {
        this.errorHandlers.forEach((handler) => {
            handler();
        });
    }
}

export const chatWebSocket = new ChatWebSocket();
