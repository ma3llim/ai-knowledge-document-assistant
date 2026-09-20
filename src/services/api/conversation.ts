import type { Conversation, ConversationPage, MessagePage } from "@/types/conversation";
import { apiClient } from "./axios";

export const getConversations = async (page = 0, size = 20): Promise<ConversationPage> => {
    const response = await apiClient.get("/api/v1/conversation", {
        params: { page, size, sort: "updatedAt,desc" },
    });

    return response.data.data;
};

export const getConversationMessages = async (conversationId: string, beforeCreatedAt?: string, beforeMessageId?: string): Promise<MessagePage> => {
    const response = await apiClient.get(`/api/v1/conversation/${conversationId}/messages`, {
        params: {
            ...(beforeCreatedAt && { beforeCreatedAt }),
            ...(beforeMessageId && { beforeMessageId }),
        },
    });

    return response.data.data;
};

export const updateConversationTitle = async (conversationId: string, title: string): Promise<Conversation> => {
    const response = await apiClient.patch(`/api/v1/conversation/${conversationId}/title`, {
        title,
    });

    return response.data.data;
};

export const deleteConversation = async (conversationId: string): Promise<void> => {
    await apiClient.delete(`/api/v1/conversation/${conversationId}`);
};
