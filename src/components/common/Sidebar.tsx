"use client";

import React, { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useInfiniteQuery, useQueryClient, type InfiniteData } from "@tanstack/react-query";
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
import { ConversationItem } from "./ConversationItem";
import logo from "@/assets/logo.png";
import type { ConversationPage } from "@/types/conversation";
import { deleteConversation, getConversations, updateConversationTitle } from "@/services/api/conversation";
import { toast } from "sonner";
import { chatWebSocket } from "@/services/websocket/chatWebSocket";
import { ConversationListSkeleton } from "./ConversationListSkeleton";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const navigate = useNavigate();
    const { conversationId } = useParams();
    const queryClient = useQueryClient();

    const {
        data: conversationData,
        isLoading: conversationsLoading,
        isError: conversationsError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["conversations"],
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getConversations(pageParam, 20),
        getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.page + 1),
    });

    const conversations = conversationData?.pages.flatMap((page) => page.content) ?? [];

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = loadMoreRef.current;

        if (!element || !hasNextPage) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];

                if (firstEntry.isIntersecting && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                rootMargin: "200px",
            },
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handleNewChat = () => {
        navigate("/chat");
    };

    const handleConversationClick = (selectedConversationId: string, documentId: string) => {
        if (chatWebSocket.isConnected) {
            chatWebSocket.disconnect();
        }
        navigate(`/chat/${documentId}/${selectedConversationId}`);
    };

    const handleRenameConversation = async (selectedConversationId: string, title: string) => {
        try {
            await updateConversationTitle(selectedConversationId, title);

            queryClient.setQueryData<InfiniteData<ConversationPage>>(["conversations"], (currentData) => {
                if (!currentData) {
                    return currentData;
                }

                return {
                    ...currentData,
                    pages: currentData.pages.map((page) => ({
                        ...page,
                        content: page.content.map((conversation) =>
                            conversation.conversationId === selectedConversationId
                                ? {
                                      ...conversation,
                                      title,
                                  }
                                : conversation,
                        ),
                    })),
                };
            });

            toast.success("Conversation renamed successfully.");
        } catch (error) {
            toast.error("Failed to rename conversation.");
            throw error;
        }
    };

    const handleDeleteConversation = async (deletedConversationId: string) => {
        try {
            await deleteConversation(deletedConversationId);

            queryClient.setQueryData<InfiniteData<ConversationPage>>(["conversations"], (currentData) => {
                if (!currentData) {
                    return currentData;
                }

                return {
                    ...currentData,
                    pages: currentData.pages.map((page) => {
                        const conversationExists = page.content.some((conversation) => conversation.conversationId === deletedConversationId);

                        if (!conversationExists) {
                            return page;
                        }

                        return {
                            ...page,
                            content: page.content.filter((conversation) => conversation.conversationId !== deletedConversationId),
                            totalElements: Math.max(0, page.totalElements - 1),
                        };
                    }),
                };
            });

            toast.success("Conversation deleted successfully.");

            if (deletedConversationId === conversationId) {
                navigate("/chat");
            }
        } catch (error) {
            toast.error("Failed to delete conversation.");
            throw error;
        }
    };

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
                        <SidebarMenu className="gap-0.5">
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
                        <SidebarMenu className="gap-0.5">
                            {conversationsLoading && conversations.length === 0 && <ConversationListSkeleton />}

                            {conversationsError && conversations.length === 0 && (
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

                            {hasNextPage && (
                                <SidebarMenuItem>
                                    <div ref={loadMoreRef} className="h-4 w-full" />
                                </SidebarMenuItem>
                            )}

                            {isFetchingNextPage && (
                                <SidebarMenuItem>
                                    <div className="px-2 py-2 text-center text-xs text-muted-foreground">Loading more...</div>
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
