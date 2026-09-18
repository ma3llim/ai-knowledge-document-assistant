import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { uploadDocument } from "@/services/api/documentApi";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

interface DocumentUploadProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function DocumentUpload({ open, onOpenChange, onSuccess }: DocumentUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const queryClient = useQueryClient();
    const handleSelectFile = () => {
        inputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        try {
            setIsUploading(true);

            await uploadDocument(file);

            toast.success("Document uploaded successfully");

            onOpenChange(false);
            onSuccess?.();
            queryClient.invalidateQueries({
                queryKey: ["documents"],
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Failed to upload document");
            } else {
                toast.error("Failed to upload document");
            }
        } finally {
            setIsUploading(false);
            event.target.value = "";
        }
    };

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-lg">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold">Upload Document</h2>

                    <p className="mt-1 text-sm text-muted-foreground">Select a document to add to your knowledge library.</p>
                </div>

                <button
                    type="button"
                    onClick={handleSelectFile}
                    disabled={isUploading}
                    className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed p-8 transition-colors hover:bg-muted/40 disabled:pointer-events-none disabled:opacity-50"
                >
                    <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
                        <FiUpload className="size-5" />
                    </div>

                    <p className="text-sm font-medium">{isUploading ? "Uploading..." : "Choose a document"}</p>

                    <p className="mt-1 text-xs text-muted-foreground">PDF, DOCX, XLSX, PPTX, TXT, MD, CSV</p>
                </button>

                <input ref={inputRef} type="file" className="hidden" accept=".pdf,.docx,.xlsx,.pptx,.txt,.md,.csv" onChange={handleFileChange} />

                <div className="mt-6 flex justify-end">
                    <Button variant="outline" disabled={isUploading} onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}
