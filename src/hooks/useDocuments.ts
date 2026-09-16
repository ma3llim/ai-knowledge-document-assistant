import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDocument, getDocuments, uploadDocument } from "@/services/api/documentApi";

export const useDocuments = (page = 0, size = 12) => {
    return useQuery({
        queryKey: ["documents", page, size],
        queryFn: () => getDocuments(page, size),
    });
};

export const useDocument = (documentId: string) => {
    return useQuery({
        queryKey: ["document", documentId],
        queryFn: () => getDocument(documentId),
        enabled: Boolean(documentId),
    });
};

export const useUploadDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadDocument,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["documents"],
            });
        },
    });
};
