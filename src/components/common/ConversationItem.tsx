import { useEffect, useRef, useState } from "react";
import { FiCheck, FiTrash2, FiEdit2 } from "react-icons/fi";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import type { Conversation } from "@/types/conversation";

interface ConversationItemProps {
    conversation: Conversation;
    conversationId: string | undefined;
    isActive: boolean;
    onClick: () => void;
    onRename: (conversationId: string, title: string) => Promise<void>;
    onDelete: (conversationId: string) => Promise<void>;
}

export function ConversationItem({ conversation, isActive, onClick, onRename, onDelete }: ConversationItemProps) {
    const [isRenaming, setIsRenaming] = useState(false);
    const [title, setTitle] = useState(conversation.title);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isRenaming) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [isRenaming]);

    useEffect(() => {
        setTitle(conversation.title);
    }, [conversation.title]);

    const handleStartRename = () => {
        setTitle(conversation.title);
        setIsRenaming(true);
    };

    const handleCancelRename = () => {
        setTitle(conversation.title);
        setIsRenaming(false);
    };

    const handleSaveRename = async () => {
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            handleCancelRename();
            return;
        }

        if (trimmedTitle === conversation.title) {
            setIsRenaming(false);
            return;
        }

        try {
            await onRename(conversation.conversationId, trimmedTitle);
            setIsRenaming(false);
        } catch {
            setTitle(conversation.title);
        }
    };

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            await handleSaveRename();
        }

        if (event.key === "Escape") {
            event.preventDefault();
            handleCancelRename();
        }
    };

    const handleDelete = async () => {
        await onDelete(conversation.conversationId);
    };

    if (isRenaming) {
        return (
            <SidebarMenuItem>
                <div className="flex h-8 w-full items-center gap-1 rounded-md px-2">
                    <input
                        ref={inputRef}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleCancelRename}
                        className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                    />

                    <button
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={handleSaveRename}
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md hover:bg-accent"
                        aria-label="Save conversation title"
                    >
                        <FiCheck className="h-4 w-4" />
                    </button>
                </div>
            </SidebarMenuItem>
        );
    }

    return (
        <SidebarMenuItem>
            <div className="conversation-item relative w-full rounded-md">
                <SidebarMenuButton isActive={isActive} onClick={onClick} tooltip={conversation.title} className="w-full min-w-0">
                    <span className="block min-w-0 flex-1 overflow-hidden whitespace-nowrap">{conversation.title}</span>
                </SidebarMenuButton>

                <div className="conversation-actions absolute right-1 top-1/2 z-10 flex -translate-y-1/2 items-center rounded-md bg-sidebar opacity-0 transition-opacity">
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleStartRename();
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-md focus-visible:outline-none"
                        aria-label="Rename conversation"
                    >
                        <FiEdit2 className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleDelete();
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-destructive focus-visible:outline-none"
                        aria-label="Delete conversation"
                    >
                        <FiTrash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </SidebarMenuItem>
    );
}
