import { useState } from "react";
import { FiUpload, FiFileText, FiMoreHorizontal } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useDocuments } from "@/hooks/useDocuments";
import type { Document, DocumentStatus } from "@/types/document";
import { DocumentUpload } from "@/components/library/DocumentUpload";
import { useQueryClient } from "@tanstack/react-query";
import { deleteDocument } from "@/services/api/documentApi";
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialog, Separator } from "@base-ui/react";
import { toast } from "sonner";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatDate, formatFileSize } from "@/utils.TextUtils";

const statusConfig: Record<
    DocumentStatus,
    {
        label: string;
        dotClass: string;
        textClass: string;
    }
> = {
    UPLOADED: {
        label: "Uploaded",
        dotClass: "bg-[#cbb0f7]",
        textClass: "text-[#a5a39d]",
    },
    PROCESSING: {
        label: "Processing",
        dotClass: "bg-amber-400",
        textClass: "text-[#a5a39d]",
    },
    READY: {
        label: "Ready",
        dotClass: "bg-emerald-400",
        textClass: "text-[#a5a39d]",
    },
    FAILED: {
        label: "Failed",
        dotClass: "bg-red-400",
        textClass: "text-red-400",
    },
    DELETING: {
        label: "Deleting",
        dotClass: "bg-red-400",
        textClass: "text-[#a5a39d]",
    },
};

const Library = () => {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const { data, isLoading, isError } = useDocuments(0, 12);
    const documents = data?.content ?? [];
    const queryClient = useQueryClient();
    const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null);

    const handleDelete = (document: Document) => {
        setDocumentToDelete(document);
    };

    const handleConfirmDelete = async () => {
        if (!documentToDelete) {
            return;
        }

        try {
            await deleteDocument(documentToDelete.id);
            setDocumentToDelete(null);

            toast.success("Document deleted successfully");

            await queryClient.invalidateQueries({
                queryKey: ["documents"],
            });
        } catch (error) {
            console.error("Failed to delete document:", error);
        }
    };

    return (
        <>
            <main className="flex min-h-svh flex-1 flex-col bg-[#0a0907]">
                <header className="flex h-14 shrink-0 items-center border-b border-white/10">
                    <div className="flex w-full items-center gap-3 px-4">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="h-5 w-px shrink-0 bg-white/10" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-sm font-medium text-[#f8f5ee]">Library</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                <div className="mx-auto flex w-full max-w-300 flex-1 flex-col px-6 py-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-start justify-between gap-6">
                            <div>
                                <h1 className="text-[30px] font-normal leading-[1.2] tracking-[-0.02em] text-[#f8f5ee]">Library</h1>

                                <p className="mt-2 text-sm leading-6 text-[#a5a39d]">Manage the documents your AI assistant can learn from.</p>
                            </div>

                            <Button
                                onClick={() => setIsUploadOpen(true)}
                                disabled={(data?.totalElements ?? 0) >= 3}
                                className="h-11 shrink-0 rounded-sm bg-white px-5 text-sm font-medium text-[#0a0907] shadow-none transition-colors duration-150 hover:bg-[#f8f5ee] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
                            >
                                <FiUpload className="mr-2 size-4" />
                                Upload Document
                            </Button>
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#111111] px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/3">
                                    <FiFileText className="size-4 text-[#c0bdb8]" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-[#f8f5ee]">Your document library</p>

                                    <p className="mt-0.5 text-xs text-[#a5a39d]">Up to 3 documents can be stored at a time.</p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-sm font-medium text-[#f8f5ee]">{Math.min(data?.totalElements ?? 0, 3)} / 3</p>

                                <p className="mt-0.5 text-xs text-[#a5a39d]">documents</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex-1">
                        {isLoading && (
                            <div className="flex min-h-64 items-center justify-center">
                                <p className="text-sm text-[#a5a39d]">Loading documents...</p>
                            </div>
                        )}

                        {isError && (
                            <div className="flex min-h-64 items-center justify-center rounded-2xl border border-white/10 bg-[#111111]">
                                <div className="text-center">
                                    <p className="text-sm font-medium text-[#f8f5ee]">Failed to load documents</p>

                                    <p className="mt-1.5 text-sm text-[#a5a39d]">Please try again later.</p>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {documents.map((document) => (
                                <article
                                    key={document.id}
                                    className="group relative flex min-h-47.5 flex-col rounded-2xl border border-white/10 bg-[#111111] p-5 transition-colors duration-150 hover:border-white/16 hover:bg-[#141412]"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/4">
                                            <FiFileText className="size-5 text-[#cbb0f7]" />
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-8 rounded-md text-[#a5a39d] opacity-0 transition-opacity duration-150 hover:bg-white/6 hover:text-[#f8f5ee] group-hover:opacity-100"
                                                >
                                                    <FiMoreHorizontal className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(document)}
                                                    className="text-destructive focus:text-destructive cursor-pointer"
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="mt-5 min-w-0">
                                        <h3 className="truncate text-sm font-medium text-[#f8f5ee]" title={document.originalFilename}>
                                            {document.originalFilename}
                                        </h3>

                                        <p className="mt-1 text-xs text-[#a5a39d]">
                                            {document.fileType} · {formatFileSize(document.fileSize)}
                                        </p>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between pt-6">
                                        <div className="flex items-center gap-2">
                                            <span className={`h-1.5 w-1.5 rounded-full ${statusConfig[document.status].dotClass}`} />
                                            <span className={`text-xs ${statusConfig[document.status].textClass}`}>
                                                {statusConfig[document.status].label}
                                            </span>
                                        </div>
                                        <span className="text-xs text-[#706d68]">{formatDate(document.createdAt)}</span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>

                <DocumentUpload open={isUploadOpen} onOpenChange={setIsUploadOpen} />

                <AlertDialog.Root
                    open={!!documentToDelete}
                    onOpenChange={(open) => {
                        if (!open) {
                            setDocumentToDelete(null);
                        }
                    }}
                >
                    <AlertDialogContent className="border-white/10 bg-[#111111] shadow-none">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-[#f8f5ee]">Delete document?</AlertDialogTitle>

                            <AlertDialogDescription className="text-[#a5a39d]">
                                Are you sure you want to delete{" "}
                                <span className="font-medium text-[#f8f5ee]">{documentToDelete?.originalFilename}</span>? This action cannot be
                                undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-sm border-white/10 bg-transparent text-[#f8f5ee] shadow-none hover:bg-white/6">
                                Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction
                                onClick={handleConfirmDelete}
                                className="rounded-sm bg-destructive text-destructive-foreground shadow-none hover:bg-destructive/90"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog.Root>
            </main>
        </>
    );
};

export default Library;
