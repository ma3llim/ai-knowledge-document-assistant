"use client";

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FiBookOpen, FiPlus } from "react-icons/fi";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { SidebarUser } from "./sidebar-user";
import logo from "@/assets/logo.png";
import type { RootState } from "@/store";
import { chatWebSocket } from "@/services/websocket/chatWebSocket";
import type { Conversation, ConversationPage } from "@/types/conversation";
import type { PaginationRequest } from "@/types/api";
import { deleteConversation, getConversations, updateConversationTitle } from "@/services/api/conversation";
import { ConversationItem } from "./ConversationItem";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const navigate = useNavigate();
    const { conversationId } = useParams();
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const queryClient = useQueryClient();
    const [pagination, setPagination] = useState<PaginationRequest>({
        page: 0,
        size: 20,
    });

    const {
        data: conversationData,
        isLoading: conversationsLoading,
        isError: conversationsError,
    } = useQuery({
        queryKey: ["conversations", pagination.page, pagination.size],
        queryFn: () => getConversations(pagination.page, pagination.size),
        placeholderData: (previousData) => previousData,
    });

    const conversations = Array.from(
        new Map(
            Array.from(
                { length: pagination.page + 1 },
                (_, page) => queryClient.getQueryData<ConversationPage>(["conversations", page, pagination.size])?.content ?? [],
            )
                .flat()
                .map((conversation) => [conversation.conversationId, conversation]),
        ).values(),
    );

    const handleNewChat = () => {
        navigate("/chat");
    };

    const handleConversationClick = (selectedConversationId: string, documentId: string) => {
        navigate(`/chat/${documentId}/${selectedConversationId}`);
    };

    const handleLoadMore = () => {
        if (!conversationData || conversationData.last) {
            return;
        }

        setPagination((current) => ({
            ...current,
            page: current.page + 1,
        }));
    };

    const handleRenameConversation = async (selectedConversationId: string, title: string) => {
        await updateConversationTitle(selectedConversationId, title);

        for (let page = 0; page <= pagination.page; page++) {
            queryClient.setQueryData<ConversationPage>(["conversations", page, pagination.size], (currentData) => {
                if (!currentData) {
                    return currentData;
                }

                return {
                    ...currentData,
                    content: currentData.content.map((conversation) =>
                        conversation.conversationId === selectedConversationId
                            ? {
                                  ...conversation,
                                  title,
                              }
                            : conversation,
                    ),
                };
            });
        }
    };

    const handleDeleteConversation = async (deletedConversationId: string) => {
        await deleteConversation(deletedConversationId);

        for (let page = 0; page <= pagination.page; page++) {
            queryClient.setQueryData<ConversationPage>(["conversations", page, pagination.size], (currentData) => {
                if (!currentData) {
                    return currentData;
                }

                const conversationExists = currentData.content.some((conversation) => conversation.conversationId === deletedConversationId);

                if (!conversationExists) {
                    return currentData;
                }

                return {
                    ...currentData,
                    content: currentData.content.filter((conversation) => conversation.conversationId !== deletedConversationId),
                    totalElements: Math.max(0, currentData.totalElements - 1),
                };
            });
        }

        if (deletedConversationId === conversationId) {
            navigate("/chat");
        }
    };

    /*
     * When a new conversation is created through WebSocket,
     * add it to the first page of the conversation list.
     */
    useEffect(() => {
        const unsubscribe = chatWebSocket.subscribeMessage((event) => {
            if (pagination.page !== 0 || event.type !== "START" || !event.newlyCreated) {
                return;
            }

            queryClient.setQueryData<ConversationPage>(["conversations", 0, pagination.size], (currentData) => {
                if (!currentData) {
                    return currentData;
                }

                const alreadyExists = currentData.content.some((conversation) => conversation.conversationId === event.conversationId);

                if (alreadyExists) {
                    return currentData;
                }

                const now = new Date().toISOString();

                const newConversation: Conversation = {
                    conversationId: event.conversationId,
                    documentId: event.data.documentId,
                    title: event.conversationTitle,
                    userId: userId!,
                    createdAt: now,
                    updatedAt: now,
                };

                return {
                    ...currentData,
                    content: [newConversation, ...currentData.content].slice(0, pagination.size),
                    totalElements: currentData.totalElements + 1,
                };
            });
        });

        return unsubscribe;
    }, [pagination.page, pagination.size, queryClient, userId]);

    const hasMore = conversationData && !conversationData.last;

    const loadingMore = pagination.page > 0 && conversationsLoading;

    return (
        <Sidebar className="border-r-0" {...props}>
            <SidebarHeader>
                <Link to="/chat">
                    <div className="flex h-10 cursor-pointer items-center gap-2 px-2">
                        <img src={logo} alt="AI Knowledge" className="size-10 object-contain" />

                        <span className="font-semibold tracking-tight">AI Knowledge</span>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="[&>svg]:size-5!" onClick={handleNewChat}>
                                    <FiPlus />
                                    <span>New Chat</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton className="[&>svg]:size-5!" onClick={() => navigate("/library")}>
                                    <FiBookOpen />
                                    <span>Library</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator className="mx-0" />

                <SidebarGroup>
                    <SidebarGroupLabel>Conversations</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {conversationsLoading && pagination.page === 0 && (
                                <SidebarMenuItem>
                                    <div className="px-2 py-2 text-sm text-muted-foreground">Loading conversations...</div>
                                </SidebarMenuItem>
                            )}

                            {conversationsError && pagination.page === 0 && (
                                <SidebarMenuItem>
                                    <div className="px-2 py-2 text-sm text-muted-foreground">Failed to load conversations.</div>
                                </SidebarMenuItem>
                            )}

                            {!conversationsLoading && !conversationsError && conversations.length === 0 && (
                                <SidebarMenuItem>
                                    <div className="px-2 py-2 text-sm text-muted-foreground">No conversations yet.</div>
                                </SidebarMenuItem>
                            )}

                            {conversations.map((conversation) => (
                                <ConversationItem
                                    key={conversation.conversationId}
                                    conversation={conversation}
                                    conversationId={conversationId}
                                    isActive={conversation.conversationId === conversationId}
                                    onClick={() => handleConversationClick(conversation.conversationId, conversation.documentId)}
                                    onRename={handleRenameConversation}
                                    onDelete={handleDeleteConversation}
                                />
                            ))}

                            {loadingMore && (
                                <SidebarMenuItem>
                                    <div className="px-2 py-2 text-center text-sm text-muted-foreground">Loading more...</div>
                                </SidebarMenuItem>
                            )}

                            {hasMore && (
                                <SidebarMenuItem>
                                    <SidebarMenuButton size="sm" className="justify-center" disabled={conversationsLoading} onClick={handleLoadMore}>
                                        Load more
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarUser />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
