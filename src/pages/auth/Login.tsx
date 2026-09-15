import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

const Login = () => {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-115 w-115 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/8 blur-[120px]" />
                <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-500/4 blur-[100px]" />
                <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-purple-500/4 blur-[100px]" />
            </div>

            <section className="relative z-10 w-full max-w-105">
                <div className="rounded-[28px] border border-white/[0.14] bg-white/6.5 p-8 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-9">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold tracking-tight text-white">Welcome back</h1>

                        <p className="mx-auto mt-2 max-w-xs text-sm leading-5 text-zinc-400">Sign in to continue to your AI documentation.</p>
                    </div>

                    <div className="mt-7">
                        <GoogleLoginButton />
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/8" />
                        <span className="text-[10px] font-medium tracking-[0.14em] text-zinc-500">SECURE</span>
                        <div className="h-px flex-1 bg-white/8" />
                    </div>
                    <p className="mt-3 text-center text-xs text-zinc-500">Secure authentication powered by Google.</p>
                </div>
            </section>
        </main>
    );
};

export default Login;
