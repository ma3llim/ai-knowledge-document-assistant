"use client";

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FiBookOpen, FiPlus, FiMessageSquare } from "react-icons/fi";

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
} from "@/components/ui/sidebar";

import { SidebarUser } from "./sidebar-user";
import logo from "@/assets/logo.png";
import type { PaginationRequest } from "@/types/api";
import { getConversations } from "@/services/api/conversation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const navigate = useNavigate();
    const { conversationId } = useParams();

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
        staleTime: 5 * 60 * 1000,
    });

    const conversations = conversationData?.content ?? [];

    const handleNewChat = () => {
        navigate("/chat");
    };

    const handleConversationClick = (conversationId: string, documentId: string) => {
        navigate(`/chat/${documentId}/${conversationId}`);
    };

    const handlePreviousPage = () => {
        if (pagination.page === 0) {
            return;
        }

        setPagination((current) => ({
            ...current,
            page: current.page - 1,
        }));
    };

    const handleNextPage = () => {
        if (!conversationData || conversationData.last) {
            return;
        }

        setPagination((current) => ({
            ...current,
            page: current.page + 1,
        }));
    };

    return (
        <Sidebar className="border-r-0" {...props}>
            <SidebarHeader>
                <div className="flex h-10 items-center gap-2 px-2">
                    <img src={logo} alt="AI Knowledge" className="size-10 object-contain" />
                    <span className="font-semibold tracking-tight">AI Knowledge</span>
                </div>
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

                <SidebarGroup>
                    <SidebarGroupLabel>Conversations</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {conversationsLoading && (
                                <SidebarMenuItem>
                                    <div className="px-2 py-2 text-sm text-muted-foreground">Loading conversations...</div>
                                </SidebarMenuItem>
                            )}

                            {conversationsError && (
                                <SidebarMenuItem>
                                    <div className="px-2 py-2 text-sm text-muted-foreground">Failed to load conversations.</div>
                                </SidebarMenuItem>
                            )}

                            {!conversationsLoading && !conversationsError && conversations.length === 0 && (
                                <SidebarMenuItem>
                                    <div className="px-2 py-2 text-sm text-muted-foreground">No conversations yet.</div>
                                </SidebarMenuItem>
                            )}

                            {conversations.map((conversation) => {
                                const isActive = conversation.conversationId === conversationId;
                                return (
                                    <SidebarMenuItem key={conversation.conversationId}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            tooltip={conversation.title}
                                            onClick={() => handleConversationClick(conversation.conversationId, conversation.documentId)}
                                        >
                                            <FiMessageSquare />

                                            <span className="truncate">{conversation.title || "Untitled conversation"}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {conversationData && conversationData.totalPages > 1 && (
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <div className="flex items-center justify-between px-2">
                                <SidebarMenuButton size="sm" disabled={pagination.page === 0} onClick={handlePreviousPage} className="w-auto">
                                    Previous
                                </SidebarMenuButton>
                                <span className="text-xs text-muted-foreground">
                                    {pagination.page + 1} / {conversationData.totalPages}
                                </span>
                                <SidebarMenuButton size="sm" disabled={conversationData.last} onClick={handleNextPage} className="w-auto">
                                    Next
                                </SidebarMenuButton>
                            </div>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
            </SidebarContent>

            <SidebarFooter>
                <SidebarUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
