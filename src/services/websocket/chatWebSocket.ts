import type { ChatWebSocketEvent, ChatWebSocketRequest } from "./types";

const WS_BASE_URL = "ws://localhost:8080/ws/chat";

type MessageHandler = (event: ChatWebSocketEvent) => void;
type ConnectionHandler = () => void;

export class ChatWebSocket {
    private socket: WebSocket | null = null;

    private messageHandler: MessageHandler | null = null;
    private openHandler: ConnectionHandler | null = null;
    private closeHandler: ConnectionHandler | null = null;
    private errorHandler: ConnectionHandler | null = null;

    connect(
        accessToken: string,
        handlers: {
            onMessage: MessageHandler;
            onOpen?: ConnectionHandler;
            onClose?: ConnectionHandler;
            onError?: ConnectionHandler;
        },
    ) {
        this.disconnect();

        this.messageHandler = handlers.onMessage;
        this.openHandler = handlers.onOpen ?? null;
        this.closeHandler = handlers.onClose ?? null;
        this.errorHandler = handlers.onError ?? null;

        const url = `${WS_BASE_URL}?token=${encodeURIComponent(accessToken)}`;

        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            this.openHandler?.();
        };

        this.socket.onmessage = (event) => {
            try {
                const parsedEvent = JSON.parse(event.data) as ChatWebSocketEvent;

                this.messageHandler?.(parsedEvent);
            } catch (error) {
                console.error("Failed to parse WebSocket message:", error);
            }
        };

        this.socket.onerror = (event) => {
            console.error("WebSocket error:", event);
            this.errorHandler?.();
        };

        this.socket.onclose = (event) => {
            console.log("WebSocket closed:", {
                code: event.code,
                reason: event.reason,
                wasClean: event.wasClean,
            });

            this.closeHandler?.();
        };
    }

    send(request: ChatWebSocketRequest) {
        if (!this.socket) {
            throw new Error("WebSocket is not initialized");
        }

        if (this.socket.readyState !== WebSocket.OPEN) {
            throw new Error("WebSocket is not connected");
        }

        this.socket.send(JSON.stringify(request));
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }

        this.messageHandler = null;
        this.openHandler = null;
        this.closeHandler = null;
        this.errorHandler = null;
    }

    get isConnected() {
        return this.socket?.readyState === WebSocket.OPEN;
    }
}
