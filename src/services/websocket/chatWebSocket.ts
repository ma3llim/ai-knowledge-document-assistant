import { ENV } from "@/config/env";
import type { ChatWebSocketEvent, ChatWebSocketRequest } from "./types";

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

        const url = `${ENV.WS_BASE_URL}?token=${encodeURIComponent(accessToken)}`;

        const socket = new WebSocket(url);

        this.socket = socket;

        socket.onopen = () => {
            if (this.socket !== socket) {
                return;
            }

            this.notifyOpen();
        };

        socket.onmessage = (event) => {
            if (this.socket !== socket) {
                return;
            }

            try {
                const parsedEvent = JSON.parse(event.data) as ChatWebSocketEvent;

                this.notifyMessage(parsedEvent);
            } catch (error) {
                console.error("Failed to parse WebSocket message:", error);
                this.notifyError();
            }
        };

        socket.onerror = (event) => {
            if (this.socket !== socket) {
                return;
            }

            console.error("WebSocket error:", event);
            this.notifyError();
        };

        socket.onclose = () => {
            if (this.socket !== socket) {
                return;
            }

            this.socket = null;
            this.notifyClose();
        };
    }

    async ensureConnection(accessToken: string): Promise<void> {
        if (this.isConnected) {
            return;
        }

        this.connect(accessToken);

        await this.waitForConnection();
    }

    private waitForConnection(): Promise<void> {
        if (this.isConnected) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            let settled = false;

            let unsubscribeOpen: (() => void) | undefined;
            let unsubscribeError: (() => void) | undefined;
            let unsubscribeClose: (() => void) | undefined;

            const cleanup = () => {
                unsubscribeOpen?.();
                unsubscribeError?.();
                unsubscribeClose?.();
            };

            unsubscribeOpen = this.subscribeOpen(() => {
                if (settled) {
                    return;
                }

                settled = true;
                cleanup();
                resolve();
            });

            unsubscribeError = this.subscribeError(() => {
                if (settled) {
                    return;
                }

                settled = true;
                cleanup();
                reject(new Error("WebSocket connection failed"));
            });

            unsubscribeClose = this.subscribeClose(() => {
                if (settled) {
                    return;
                }

                settled = true;
                cleanup();
                reject(new Error("WebSocket connection closed before opening"));
            });
        });
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

    cancel(): void {
        if (!this.socket) {
            return;
        }

        if (this.socket.readyState !== WebSocket.OPEN) {
            return;
        }

        this.socket.send(
            JSON.stringify({
                type: "CANCEL",
            }),
        );
    }

    disconnect(): void {
        const socket = this.socket;

        if (!socket) {
            return;
        }

        this.socket = null;

        if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
            socket.close();
        }
    }

    get isConnected(): boolean {
        return this.socket?.readyState === WebSocket.OPEN;
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
