import type { ChatMessage } from "@/services/websocket/types";
import MarkdownMessage from "./MarkdownMessage";

interface ChatMessageListProps {
    messages: ChatMessage[];
    streamingContent: string;
    isStreaming: boolean;
    isThinking: boolean;
}

const ChatMessageList = ({ messages, streamingContent, isStreaming, isThinking }: ChatMessageListProps) => {
    return (
        <div className="flex-1 overflow-y-auto">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6">
                {messages.map((message) => {
                    const isUser = message.role === "user";

                    return (
                        <div key={message.id} className={isUser ? "flex justify-end" : "flex justify-start"}>
                            <div
                                className={
                                    isUser
                                        ? "max-w-[min(42rem,calc(100vw-2rem))] rounded-2xl rounded-br-md bg-secondary px-4 py-3 text-sm text-primary-foreground"
                                        : "max-w-[min(48rem,calc(100vw-2rem))] text-sm leading-7"
                                }
                            >
                                <MarkdownMessage content={message.content} />
                            </div>
                        </div>
                    );
                })}

                {/* {isThinking && ( */}
                <div className="flex justify-start items-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <p>AI is generating your response</p>

                        <span className="flex gap-1 mt-1.5 items-center">
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.3s] bg-muted-foreground" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.15s] bg-muted-foreground" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                        </span>
                    </div>
                </div>
                {/* )} */}

                {isStreaming && streamingContent && (
                    <div className="flex justify-start">
                        <div className="max-w-[min(48rem,calc(100vw-2rem))] text-sm leading-7">
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
