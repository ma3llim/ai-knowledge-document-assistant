import type { Document } from "@/types/document";

import { DocumentListItem } from "./DocumentListItem";

interface DocumentListProps {
    documents: Document[];
    onDelete: (document: Document) => void;
}

export function DocumentList({ documents, onDelete }: DocumentListProps) {
    if (documents.length === 0) {
        return (
            <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed">
                <div className="text-center">
                    <p className="text-sm font-medium">No documents found</p>
                    <p className="mt-1 text-sm text-muted-foreground">Upload a document to get started.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border bg-background">
            {documents.map((document) => (
                <DocumentListItem key={document.id} document={document} onDelete={onDelete} />
            ))}
        </div>
    );
}
