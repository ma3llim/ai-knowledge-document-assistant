import type { ChatMessage } from "@/services/websocket/types";
import MarkdownMessage from "./MarkdownMessage";

interface ChatMessageListProps {
    messages: ChatMessage[];
    streamingContent: string;
    isStreaming: boolean;
}

const ChatMessageList = ({ messages, streamingContent, isStreaming }: ChatMessageListProps) => {
    return (
        <div className="flex-1 overflow-y-auto">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-8">
                {messages.map((message) => {
                    const isUser = message.role === "user";

                    return (
                        <div key={message.id} className={isUser ? "flex justify-end" : "flex justify-start"}>
                            <div
                                className={
                                    isUser
                                        ? "max-w-[80%] rounded-2xl rounded-br-md bg-secondary px-4 py-3 text-sm text-primary-foreground"
                                        : "max-w-[85%] text-sm leading-7"
                                }
                            >
                                <MarkdownMessage content={message.content} />
                            </div>
                        </div>
                    );
                })}

                {isStreaming && streamingContent && (
                    <div className="flex justify-start">
                        <div className="max-w-[85%] text-sm leading-7">
                            <MarkdownMessage content={streamingContent} isStreaming />
                            <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-foreground align-middle" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatMessageList;
