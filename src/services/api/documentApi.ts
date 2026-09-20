import { apiClient } from "./axios";
import type { ApiResponse, PaginatedResponse } from "@/types/api";
import type { Document } from "@/types/document";
const DOCUMENT_ENDPOINT = "/api/v1/documents";

export const getDocuments = async (page = 0, size = 12): Promise<PaginatedResponse<Document>> => {
    const response = await apiClient.get<PaginatedResponse<Document>>(DOCUMENT_ENDPOINT, { params: { page, size } });
    return response.data;
};

export const getDocument = async (documentId: string): Promise<ApiResponse<Document>> => {
    const response = await apiClient.get<ApiResponse<Document>>(`${DOCUMENT_ENDPOINT}/${documentId}`);
    return response.data;
};

export const uploadDocument = async (file: File): Promise<Document> => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await apiClient.post<ApiResponse<Document>>(DOCUMENT_ENDPOINT, formData);

    return response.data.data;
};

export const deleteDocument = async (documentId: string): Promise<void> => {
    await apiClient.delete(`${DOCUMENT_ENDPOINT}/${documentId}`);
};
