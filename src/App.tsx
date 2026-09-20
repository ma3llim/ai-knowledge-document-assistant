import { Toaster } from "./components/ui/sonner";
import { AppRoutes } from "./routes";

const App = () => {
    return (
        <>
            <AppRoutes />
            <Toaster position="top-right" richColors />
        </>
    );
};

export default App;
