import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

const OAuthFailure = () => {
    const navigate = useNavigate();

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/6 blur-[120px]" />
            </div>

            <section className="relative z-10 w-full max-w-105">
                <div className="rounded-[28px] border border-white/[0.14] bg-white/6 p-9 text-center shadow-2xl shadow-black/50 backdrop-blur-2xl">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-red-400/20 bg-red-400/10">
                        <AlertCircle className="h-7 w-7 text-red-400" />
                    </div>

                    <h1 className="mt-6 text-2xl font-semibold text-white">Something went wrong</h1>

                    <p className="mt-2 text-sm leading-6 text-zinc-400">We couldn't complete your sign-in. Please try again.</p>

                    <Button
                        type="button"
                        variant="outline"
                        className="mt-7 h-11 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                        onClick={() => navigate("/login")}
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
