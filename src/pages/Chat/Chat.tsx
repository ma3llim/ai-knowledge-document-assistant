import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDocuments } from "@/hooks/useDocuments";
import type { RootState } from "@/store";
import type { Document } from "@/types/document";
import { formatFileSize } from "@/utils.TextUtils";
import { Separator } from "@base-ui/react";
import { useState } from "react";
import { FiCheck, FiFileText } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DocumentSelectionSkeleton } from "./DocumentSelectionSkeleton";

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

        navigate(`/chat/${selectedDocument.id}`);
    };

    return (
        <main className="flex min-h-svh flex-1 flex-col bg-[#0a0907]">
            <header className="flex h-14 shrink-0 items-center border-b border-white/10">
                <div className="flex w-full items-center gap-3 px-4">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-5 w-px shrink-0 bg-white/10" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-sm font-medium text-[#f8f5ee]">Chat</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <div className="flex flex-1 w-full items-center justify-center px-6">
                <div className="w-full max-w-5xl">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-semibold tracking-tight">Select a document</h1>

                        <p className="mt-3 text-sm text-muted-foreground">Choose a document to start chatting with your AI assistant.</p>
                    </div>

                    {isLoading ? (
                        <DocumentSelectionSkeleton />
                    ) : (
                        <div className="flex flex-wrap justify-center gap-4">
                            {documents.length > 0 ? (
                                documents.map((document) => {
                                    const isSelected = selectedDocument?.id === document.id;

                                    return (
                                        <button
                                            key={document.id}
                                            type="button"
                                            onClick={() => setSelectedDocument(document)}
                                            className={`relative w-full max-w-xs rounded-xl border p-5 text-left transition ${
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
                                })
                            ) : (
                                <div className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-12 text-center">
                                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-muted">
                                        <FiFileText size={22} className="text-muted-foreground" />
                                    </div>

                                    <h3 className="text-sm font-semibold">No documents uploaded yet</h3>

                                    <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                                        Upload a document to start asking questions and exploring it with your AI assistant.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => navigate("/library")}
                                        className="mt-5 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                                    >
                                        Upload document
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {documents.length > 0 && (
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
                    )}
                </div>
            </div>
        </main>
    );
};

export default Chat;
