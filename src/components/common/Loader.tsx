import { LoaderCircle } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <LoaderCircle className="size-6 animate-spin" />
        </div>
    );
};

export default Loading;
