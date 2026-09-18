export interface Conversation {
    conversationId: string;
    userId: string;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
}

export interface ConversationPage {
    content: Conversation[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}

export interface Message {
    id: string;
    conversationId: string;
    role: string;
    content: string;
    createdAt: string;
}

export interface MessageCursor {
    beforeCreatedAt: string;
    beforeMessageId: string;
}

export interface MessagePage {
    content: Message[];
    nextCursor: MessageCursor | null;
    hasMore: boolean;
}

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

export interface ChatErrorData {
    code: string;
    message: string;
}

export interface ChatErrorEvent {
    type: "ERROR";
    data: ChatErrorData;
}

export type ChatWebSocketEvent = ChatStartEvent | ChatContentEvent | ChatErrorEvent;
