import logo from "@/assets/logo.png";
import { Link } from "react-scroll";

const navigation = [
    { label: "Home", to: "hero" },
    { label: "Features", to: "features" },
    { label: "Demo", to: "product-demo" },
    { label: "Technology", to: "technology" },
    { label: "How It Works", to: "document-intelligence" },
];

const Brand = () => (
    <Link to="hero" smooth duration={800} className="flex cursor-pointer items-center gap-3">
        <img src={logo} alt="AI Knowledge" className="h-7 w-auto" />

        <span className="text-sm font-bold tracking-[-0.02em] text-white">AI Knowledge Document Assistant</span>
    </Link>
);

const Header = () => {
    return (
        <header className="sticky z-50 top-0 w-full overflow-hidden border-b border-white/30 bg-[#17131F] backdrop-blur-2xl backdrop-saturate-150">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-105 bg-landing-primary/35 blur-2xl" />

            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/15" />

            <div className="relative flex h-12 items-center justify-between px-5">
                <Brand />

                <nav className="hidden items-center gap-7 md:flex">
                    {navigation.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            smooth
                            duration={800}
                            offset={-48}
                            className="group relative cursor-pointer text-xs font-medium text-white"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
