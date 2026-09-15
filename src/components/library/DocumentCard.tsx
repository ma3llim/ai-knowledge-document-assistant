import { useNavigate } from "react-router-dom";
import { FiFile, FiFileText, FiMoreHorizontal } from "react-icons/fi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import DocumentStatus from "./DocumentStatus";
import type { Document } from "@/types/document";
import { Card, CardContent } from "../ui/card";

interface DocumentCardProps {
    document: Document;
}

const getFileIcon = (fileType: string) => {
    if (fileType.toLowerCase().includes("pdf")) {
        return <FiFileText className="h-7 w-7" />;
    }

    return <FiFile className="h-7 w-7" />;
};

const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const DocumentCard = ({ document }: DocumentCardProps) => {
    const navigate = useNavigate();

    return (
        <Card
            className="group cursor-pointer rounded-2xl border-border/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-lg"
            onClick={() => navigate(`/document/${document.id}`)}
        >
            <CardContent className="p-5">
                <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">{getFileIcon(document.fileType)}</div>

                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    <FiMoreHorizontal className="h-4 w-4" />
                                </Button>
                            }
                        />

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={(event) => {
                                    event.stopPropagation();
                                    navigate(`/document/${document.id}`);
                                }}
                            >
                                Open document
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="mt-5">
                    <h3 className="truncate font-medium">{document.originalFilename}</h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                        {document.fileType} · {formatFileSize(document.fileSize)}
                    </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t pt-4">
                    <DocumentStatus status={document.status} />

                    <span className="text-xs text-muted-foreground">{new Date(document.createdAt).toLocaleDateString()}</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default DocumentCard;
