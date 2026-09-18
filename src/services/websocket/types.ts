export interface ChatWebSocketRequest {
    documentId: string;
    userId: string;
    conversationId: string | null;
    userQuery: string;
}

export type ChatWebSocketEventType = "START" | "CONTENT" | "COMPLETE" | "ERROR";

export interface ChatStartData {
    documentId: string;
}

export interface ChatStartEvent {
    type: "START";
    data: ChatStartData;
    conversationId: string;
    conversationTitle: string;
    newlyCreated: boolean;
}

export interface ChatContentEvent {
    type: "CONTENT";
    data: string;
}

export interface ChatCompleteEvent {
    type: "COMPLETE";
    data: unknown;
}

export interface ChatErrorData {
    code: string;
    message: string;
}

export interface ChatErrorEvent {
    type: "ERROR";
    data: ChatErrorData;
}

export type ChatWebSocketEvent = ChatStartEvent | ChatContentEvent | ChatCompleteEvent | ChatErrorEvent;

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
}
