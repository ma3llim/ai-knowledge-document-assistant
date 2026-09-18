import { FiCheckCircle, FiClock, FiAlertCircle } from "react-icons/fi";

import type { DocumentStatus as Status } from "@/types/document";

interface DocumentStatusProps {
    status: Status;
}

const DocumentStatus = ({ status }: DocumentStatusProps) => {
    switch (status) {
        case "READY":
            return (
                <div className="flex items-center gap-1.5 text-xs text-emerald-500">
                    <FiCheckCircle className="h-3.5 w-3.5" />
                    <span>Ready</span>
                </div>
            );

        case "PROCESSING":
            return (
                <div className="flex items-center gap-1.5 text-xs text-amber-500">
                    <FiClock className="h-3.5 w-3.5 animate-pulse" />
                    <span>Processing</span>
                </div>
            );

        case "FAILED":
            return (
                <div className="flex items-center gap-1.5 text-xs text-destructive">
                    <FiAlertCircle className="h-3.5 w-3.5" />
                    <span>Failed</span>
                </div>
            );

        default:
            return (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <FiClock className="h-3.5 w-3.5" />
                    <span>Uploaded</span>
                </div>
            );
    }
};

export default DocumentStatus;
