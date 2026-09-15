import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiClock, FiFileText } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { useDocument } from "@/hooks/useDocuments";
import DocumentStatus from "@/components/library/DocumentStatus";

const Document = () => {
    const { documentId } = useParams();
    const navigate = useNavigate();

    const { data: document, isLoading, isError } = useDocument(documentId ?? "");

    if (isLoading) {
        return (
            <main className="flex min-h-svh flex-1 items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-foreground" />
            </main>
        );
    }

    if (isError || !document) {
        return (
            <main className="flex min-h-svh flex-1 items-center justify-center">
                <div className="text-center">
                    <h2 className="font-medium">Document not found</h2>

                    <Button variant="outline" className="mt-4" onClick={() => navigate("/library")}>
                        Back to Library
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-svh flex-1 flex-col">
            <div className="mx-auto w-full max-w-5xl px-6 py-8 lg:px-8">
                <Button variant="ghost" className="-ml-3 gap-2" onClick={() => navigate("/library")}>
                    <FiArrowLeft className="h-4 w-4" />
                    Library
                </Button>

                <div className="mt-8 flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                        <FiFileText className="h-7 w-7" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="truncate text-2xl font-semibold tracking-tight">{document.originalFilename}</h1>

                            <DocumentStatus status={document.status} />
                        </div>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {document.fileType} · {document.fileSize} bytes
                        </p>
                    </div>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border p-5">
                        <FiCheckCircle className="h-5 w-5 text-emerald-500" />

                        <p className="mt-4 text-sm font-medium">Status</p>

                        <p className="mt-1 text-sm text-muted-foreground">{document.status}</p>
                    </div>

                    <div className="rounded-2xl border p-5">
                        <FiClock className="h-5 w-5" />

                        <p className="mt-4 text-sm font-medium">Uploaded</p>

                        <p className="mt-1 text-sm text-muted-foreground">{new Date(document.createdAt).toLocaleString()}</p>
                    </div>

                    <div className="rounded-2xl border p-5">
                        <FiFileText className="h-5 w-5" />

                        <p className="mt-4 text-sm font-medium">File type</p>

                        <p className="mt-1 text-sm text-muted-foreground">{document.fileType}</p>
                    </div>
                </div>

                {document.status === "FAILED" && (
                    <div className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
                        <h2 className="font-medium">Processing failed</h2>

                        <p className="mt-1 text-sm text-muted-foreground">{document.failureReason ?? "We could not process this document."}</p>
                    </div>
                )}

                {document.status === "PROCESSING" && (
                    <div className="mt-6 rounded-2xl border p-6">
                        <div className="flex items-center gap-3">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-foreground" />

                            <div>
                                <h2 className="font-medium">Processing your document</h2>

                                <p className="mt-1 text-sm text-muted-foreground">Preparing your document for AI search and conversations.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Document;
