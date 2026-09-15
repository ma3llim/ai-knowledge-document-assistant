import { BrowserRouter } from "react-router-dom";

type AppRouterProps = {
    children: React.ReactNode;
};

export function AppRouter({ children }: AppRouterProps) {
    return <BrowserRouter>{children}</BrowserRouter>;
}
