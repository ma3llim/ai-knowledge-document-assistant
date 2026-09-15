import { useState } from "react";
import { FiUpload, FiSearch } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DocumentList } from "@/components/library/DocumentList";
import { useDocuments } from "@/hooks/useDocuments";
import type { Document } from "@/types/document";
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
import { AlertDialog } from "@base-ui/react";
import { toast } from "sonner";

const Library = () => {
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    const { data, isLoading, isError } = useDocuments(page, 12);

    const documents = data?.content ?? [];
    const filteredDocuments = documents.filter((document) => document.originalFilename.toLowerCase().includes(search.toLowerCase()));

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

            // Close confirmation dialog
            setDocumentToDelete(null);

            toast.success("Document deleted successfully");

            // Refresh document list
            await queryClient.invalidateQueries({
                queryKey: ["documents"],
            });
        } catch (error) {
            console.error("Failed to delete document:", error);
        }
    };

    return (
        <>
            <div className="flex min-h-svh flex-1 flex-col">
                <header className="border-b">
                    <div className="flex items-center justify-between px-6 py-5">
                        <div>
                            <h1 className="text-xl font-semibold">Library</h1>
                            <p className="mt-1 text-sm text-muted-foreground">Manage your knowledge documents</p>
                        </div>
                        <Button onClick={() => setIsUploadOpen(true)}>
                            <FiUpload className="mr-2 size-4" />
                            Upload Document
                        </Button>
                    </div>
                </header>

                <main className="flex-1 space-y-5 p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="relative max-w-md flex-1">
                            <FiSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                    setPage(0);
                                }}
                                placeholder="Search documents..."
                                className="pl-9"
                            />
                        </div>

                        <p className="shrink-0 text-sm text-muted-foreground">{data?.totalElements ?? 0} documents</p>
                    </div>

                    {isLoading && (
                        <div className="flex min-h-64 items-center justify-center">
                            <p className="text-sm text-muted-foreground">Loading documents...</p>
                        </div>
                    )}

                    {isError && (
                        <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed">
                            <div className="text-center">
                                <p className="text-sm font-medium">Failed to load documents</p>

                                <p className="mt-1 text-sm text-muted-foreground">Please try again later.</p>
                            </div>
                        </div>
                    )}

                    {!isLoading && !isError && <DocumentList documents={filteredDocuments} onDelete={handleDelete} />}

                    {!isLoading && !isError && data && data.totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 pt-2">
                            <Button variant="outline" size="sm" disabled={data.first} onClick={() => setPage((current) => current - 1)}>
                                Previous
                            </Button>

                            <span className="text-sm text-muted-foreground">
                                Page {data.page + 1} of {data.totalPages}
                            </span>

                            <Button variant="outline" size="sm" disabled={data.last} onClick={() => setPage((current) => current + 1)}>
                                Next
                            </Button>
                        </div>
                    )}
                </main>

                <DocumentUpload open={isUploadOpen} onOpenChange={setIsUploadOpen} />
            </div>
            <AlertDialog.Root
                open={!!documentToDelete}
                onOpenChange={(open) => {
                    if (!open) {
                        setDocumentToDelete(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete document?</AlertDialogTitle>

                        <AlertDialogDescription>
                            Are you sure you want to delete <span className="font-medium text-foreground">{documentToDelete?.originalFilename}</span>?
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <AlertDialogAction
                            onClick={handleConfirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog.Root>
        </>
    );
};

export default Library;
