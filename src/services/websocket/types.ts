export interface ChatWebSocketRequest {
    documentId: string;
    userId: string;
    conversationId: string | null;
    userQuery: string;
}

export type ChatWebSocketEventType = "START" | "CONTENT" | "COMPLETE" | "ERROR";

export interface ChatWebSocketEvent {
    type: ChatWebSocketEventType;
    data: unknown;
}

export interface ChatErrorData {
    code: string;
    message: string;
}

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
}
