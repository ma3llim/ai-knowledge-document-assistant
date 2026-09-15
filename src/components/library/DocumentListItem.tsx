import { FiFile, FiTrash2 } from "react-icons/fi";

import type { Document } from "@/types/document";

interface DocumentListItemProps {
    document: Document;
    onDelete: (document: Document) => void;
}

const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const getStatusLabel = (status: Document["status"]) => {
    switch (status) {
        case "UPLOADED":
            return "Uploaded";
        case "PROCESSING":
            return "Processing";
        case "READY":
            return "Ready";
        case "FAILED":
            return "Failed";
        default:
            return status;
    }
};

export function DocumentListItem({ document, onDelete }: DocumentListItemProps) {
    return (
        <div className="group flex items-center gap-4 border-b px-4 py-4 transition-colors hover:bg-muted/40">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <FiFile className="size-5 text-muted-foreground" />
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{document.originalFilename}</p>

                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{document.fileType}</span>
                    <span>•</span>
                    <span>{formatFileSize(document.fileSize)}</span>
                    <span>•</span>
                    <span>{formatDate(document.createdAt)}</span>
                </div>
            </div>

            <div className="hidden shrink-0 sm:block">
                <span
                    className={
                        document.status === "READY"
                            ? "text-xs font-medium text-foreground"
                            : document.status === "FAILED"
                              ? "text-xs font-medium text-destructive"
                              : "text-xs font-medium text-muted-foreground"
                    }
                >
                    {getStatusLabel(document.status)}
                </span>
            </div>

            <button
                type="button"
                onClick={() => onDelete(document)}
                className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                aria-label={`Delete ${document.originalFilename}`}
            >
                <FiTrash2 className="size-4" />
            </button>
        </div>
    );
}
