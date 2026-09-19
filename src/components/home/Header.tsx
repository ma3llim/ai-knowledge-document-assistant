import logo from "@/assets/logo.png";

const Brand = () => (
    <div className="flex items-center gap-3">
        <img src={logo} alt="AI Knowledge" className="h-7 w-auto" />

        <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-[-0.02em] text-white">AI Knowledge Document Assistant</span>
        </div>
    </div>
);

const Header = () => {
    return (
        <header className="relative w-full overflow-hidden border-b border-white/30 bg-[#17131F] backdrop-blur-2xl backdrop-saturate-150">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-105 bg-landing-primary/35 blur-2xl                    " />

            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/15" />

            <div className="relative flex h-12 items-center px-5">
                <Brand />
            </div>
        </header>
    );
};

export default Header;
