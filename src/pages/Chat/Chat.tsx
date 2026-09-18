import Loader from "@/components/common/Loader";
import { useDocuments } from "@/hooks/useDocuments";
import { chatWebSocket } from "@/services/websocket/chatWebSocket";
import type { RootState } from "@/store";
import type { Document } from "@/types/document";
import { formatFileSize } from "@/utils.TextUtils";
import { useState } from "react";
import { FiCheck, FiFileText } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Chat = () => {
    const navigate = useNavigate();
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const { data, isLoading } = useDocuments(0, 12);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const documents = data?.content ?? [];

    const handleStartChat = () => {
        if (!selectedDocument) {
            return;
        }

        if (!accessToken) {
            return;
        }

        chatWebSocket.connect(accessToken);

        navigate(`/chat/${selectedDocument.id}`);
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center px-6">
            <div className="w-full max-w-5xl">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-semibold tracking-tight">Select a document</h1>
                    <p className="mt-3 text-sm text-muted-foreground">Choose a document to start chatting with your AI assistant.</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {documents.map((document) => {
                        const isSelected = selectedDocument?.id === document.id;
                        return (
                            <button
                                key={document.id}
                                type="button"
                                onClick={() => setSelectedDocument(document)}
                                className={`relative rounded-xl border p-5 text-left transition ${
                                    isSelected
                                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                                        : "border-border hover:border-primary/40 hover:bg-muted/40"
                                }`}
                            >
                                {isSelected && (
                                    <span className="absolute right-4 top-4 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                        <FiCheck size={14} />
                                    </span>
                                )}
                                <div className="mb-5 flex size-11 items-center justify-center rounded-lg bg-muted">
                                    <FiFileText size={22} />
                                </div>
                                <h3 className="truncate font-medium">{document.originalFilename}</h3>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    {document.fileType} • {formatFileSize(document.fileSize)}
                                </p>
                            </button>
                        );
                    })}
                </div>
                <div className="mt-8 flex justify-center">
                    <button
                        type="button"
                        disabled={!selectedDocument}
                        onClick={handleStartChat}
                        className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                    >
                        Start Chat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
