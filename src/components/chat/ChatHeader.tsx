import { FiArrowLeft, FiFileText } from "react-icons/fi";

interface ChatHeaderProps {
    documentName: string;
    isConnected: boolean;
    onBack: () => void;
}

const ChatHeader = ({ documentName, isConnected, onBack }: ChatHeaderProps) => {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-6">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex size-9 items-center justify-center rounded-lg transition hover:bg-muted"
                    aria-label="Back to chat"
                >
                    <FiArrowLeft size={18} />
                </button>

                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <FiFileText size={18} />
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{documentName}</p>

                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span className={`size-1.5 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />

                            {isConnected ? "Connected" : "Disconnected"}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ChatHeader;
