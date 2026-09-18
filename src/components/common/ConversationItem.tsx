import { useEffect, useRef, useState } from "react";
import { FiCheck, FiMoreHorizontal, FiTrash2, FiEdit2 } from "react-icons/fi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
            <div className="group flex w-full items-center">
                <SidebarMenuButton isActive={isActive} onClick={onClick} tooltip={conversation.title} className="min-w-0 flex-1">
                    <span className="block min-w-0 overflow-hidden whitespace-nowrap">{conversation.title}</span>
                </SidebarMenuButton>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <button
                            type="button"
                            onClick={(event) => event.stopPropagation()}
                            className="
                        flex h-8 w-8 shrink-0 items-center justify-center
                        rounded-md
                        opacity-0
                        transition-opacity
                        group-hover:opacity-100
                        hover:bg-accent
                        focus-visible:opacity-100
                        focus-visible:outline-none
                    "
                            aria-label="Conversation options"
                        >
                            <FiMoreHorizontal className="h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" side="bottom" sideOffset={4} className="w-36">
                        <DropdownMenuItem onClick={handleStartRename}>
                            <FiEdit2 className="mr-2 h-4 w-4" />
                            Rename
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive">
                            <FiTrash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </SidebarMenuItem>
    );
}
