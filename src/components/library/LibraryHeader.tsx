import DocumentUpload from "./DocumentUpload";

const LibraryHeader = () => {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Library</h1>
                <p className="mt-1 text-sm text-muted-foreground">Manage the documents your AI assistant knows about.</p>
            </div>

            <DocumentUpload />
        </div>
    );
};

export default LibraryHeader;
