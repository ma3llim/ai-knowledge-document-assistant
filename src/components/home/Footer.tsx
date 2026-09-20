import logo from "@/assets/logo.png";

const Footer = () => {
    return (
        <footer className="border-t border-white/30 bg-[#17131F] backdrop-blur-2xl backdrop-saturate-150">
            <div className="mx-auto container py-4">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2.5">
                        <img src={logo} alt="AI Knowledge" className="h-7 w-auto" />

                        <span className="text-sm font-bold leading-none tracking-[-0.02em] text-landing-foreground">AI Knowledge</span>
                    </div>

                    <div className="text-xs text-landing-muted">© {new Date().getFullYear()} AI Knowledge. All rights reserved.</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
