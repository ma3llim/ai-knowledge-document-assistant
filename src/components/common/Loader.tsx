import { LoaderCircle } from "lucide-react";

const Loader = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <LoaderCircle className="size-6 animate-spin" />
        </div>
    );
};

export default Loader;
