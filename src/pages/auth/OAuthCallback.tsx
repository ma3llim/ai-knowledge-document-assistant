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
        <main className="flex min-h-screen items-center justify-center bg-[#0a0907] px-4">
            <section className="w-full max-w-105">
                <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#181715]">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/15 border-t-white" />
                    </div>
                    <h1 className="mt-6 text-[30px] font-normal leading-[1.2] tracking-[-0.02em] text-[#f8f5ee]">Signing you in</h1>
                    <p className="mx-auto mt-3 max-w-[320px] text-sm leading-6 text-[#a5a39d]">
                        We're securely completing your authentication and preparing your workspace.
                    </p>
                    <div className="mt-7 flex items-center justify-center gap-2">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#cbb0f7]" />
                        <span className="text-xs text-[#a5a39d]">Preparing your workspace</span>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default OAuthCallback;
