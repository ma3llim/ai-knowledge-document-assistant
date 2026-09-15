import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { exchangeOAuthCode } from "@/services/api/authApi";
import { setAuth } from "@/store/authSlice";
import type { AppDispatch } from "@/store";
import { toast } from "sonner";

const OAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const code = searchParams.get("code");
        if (!code) {
            navigate("/oauth/failure", { replace: true });
            return;
        }

        const exchangeCode = async () => {
            try {
                const authData = await exchangeOAuthCode({ code });
                dispatch(setAuth(authData));

                toast.success("Login successful", {
                    description: `Welcome back, ${authData.user.name}!`,
                });

                navigate("/chat", { replace: true });
            } catch {
                navigate("/oauth/failure", { replace: true });
            }
        };

        exchangeCode();
    }, [searchParams, navigate, dispatch]);

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/8 blur-[120px]" />
            </div>

            <section className="relative z-10 w-full max-w-105">
                <div className="rounded-[28px] border border-white/[0.14] bg-white/6.5 p-9 text-center shadow-2xl shadow-black/50 backdrop-blur-2xl">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-white/6">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    </div>

                    <h1 className="mt-6 text-2xl font-semibold tracking-tight text-white">Signing you in</h1>

                    <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-zinc-400">
                        We're securely completing your authentication and preparing your workspace.
                    </p>

                    <div className="mt-7 flex items-center justify-center gap-2 text-xs text-zinc-500">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        Securely authenticating
                    </div>
                </div>
            </section>
        </main>
    );
};

export default OAuthCallback;
