import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

const OAuthFailure = () => {
    const navigate = useNavigate();

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0a0907] px-4">
            <section className="w-full max-w-105">
                <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-red-400/15 bg-red-400/5">
                        <AlertCircle className="h-6 w-6 text-red-400" />
                    </div>

                    <h1 className="mt-6 text-[30px] font-normal leading-[1.2] tracking-[-0.02em] text-[#f8f5ee]">Something went wrong</h1>
                    <p className="mx-auto mt-3 max-w-[320px] text-sm leading-6 text-[#a5a39d]">
                        We couldn't complete your sign-in. Please try again.
                    </p>

                    <Button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="mt-8 h-11 rounded-sm bg-[#e7e5e0] px-5 text-sm font-medium text-[#0a0907] shadow-none transition-colors duration-150 hover:bg-white hover:text-[#0a0907] hover:shadow-none"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to login
                    </Button>
                </div>
            </section>
        </main>
    );
};

export default OAuthFailure;
