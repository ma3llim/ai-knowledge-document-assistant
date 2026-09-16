import { useState } from "react";
import { FiArrowUp } from "react-icons/fi";

interface ChatInputProps {
    disabled?: boolean;
    onSend: (message: string) => void;
}

const ChatInput = ({ disabled = false, onSend }: ChatInputProps) => {
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        const value = message.trim();

        if (!value || disabled) {
            return;
        }

        onSend(value);
        setMessage("");
    };

    return (
        <div className="border-t bg-background px-6 py-4">
            <div className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border bg-muted/30 p-2">
                <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault();
                            handleSubmit();
                        }
                    }}
                    disabled={disabled}
                    rows={1}
                    placeholder={disabled ? "AI is generating a response..." : "Ask anything about your document..."}
                    className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
                />

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={disabled || !message.trim()}
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-40"
                >
                    <FiArrowUp size={18} />
                </button>
            </div>

            <p className="mt-2 text-center text-[11px] text-muted-foreground">AI responses are generated from your selected document.</p>
        </div>
    );
};

export default ChatInput;
