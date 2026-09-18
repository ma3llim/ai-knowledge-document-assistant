import { Button } from "@/components/ui/button";
import { ENV } from "@/config/env";
import { AUTH_ENDPOINTS } from "@/constants/auth";
import { FcGoogle } from "react-icons/fc";
import logo from "@/assets/logo.png";

const Login = () => {
    const handleGoogleLogin = () => {
        window.location.href = `${ENV.API_BASE_URL}${AUTH_ENDPOINTS.GOOGLE_LOGIN}`;
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0a0907] px-4">
            <section className="w-full max-w-105">
                <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 text-center">
                    <div className="mb-2 flex justify-center">
                        <img src={logo} alt="AI Knowledge & Document Assistant" className="h-16 w-16 object-contain" />
                    </div>
                    <h1 className="text-[30px] font-normal leading-[1.2] tracking-[-0.02em] text-[#f8f5ee]">Welcome back</h1>
                    <p className="mx-auto mt-3 max-w-[320px] text-sm leading-6 text-[#a5a39d]">
                        Sign in to continue to your AI Knowledge &amp; Document Assistant.
                    </p>
                    <div className="mt-2">
                        <Button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="h-11 w-full rounded-md border border-white/10 bg-[#e7e5e0] text-sm font-medium text-[#0a0907] shadow-none transition-colors duration-150 hover:bg-white hover:text-[#0a0907] hover:shadow-none"
                        >
                            <FcGoogle className="mr-2.5 h-6 w-6" />
                            Continue with Google
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Login;
