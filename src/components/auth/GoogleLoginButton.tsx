import { Button } from "@/components/ui/button";
import { ENV } from "@/config/env";
import { AUTH_ENDPOINTS } from "@/constants/auth";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
    const handleGoogleLogin = () => {
        window.location.href = `${ENV.API_BASE_URL}${AUTH_ENDPOINTS.GOOGLE_LOGIN}`;
    };
    return (
        <Button type="button" variant="outline" className="h-11 w-full" onClick={handleGoogleLogin}>
            <FcGoogle className="mr-2 h-5 w-5" />
            Continue with Google
        </Button>
    );
};

export default GoogleLoginButton;
