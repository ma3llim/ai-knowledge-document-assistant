export type DocumentStatus = "UPLOADED" | "PROCESSING" | "READY" | "FAILED" | "DELETING";

export type DocumentFileType = "PDF" | "DOCX" | "XLSX" | "PPTX" | "TXT" | "MD" | "CSV";

export interface Document {
    id: string;
    originalFilename: string;
    fileType: DocumentFileType;
    fileSize: number;
    status: DocumentStatus;
    createdAt: string;
    updatedAt: string;
}
