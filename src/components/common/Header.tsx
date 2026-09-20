import { Sparkles } from "lucide-react";

const Header = () => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 px-6 pt-5">
            <div
                className="
                    mx-auto
                    flex
                    h-16
                    max-w-7xl
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-landing-border/80
                    bg-landing-surface/80
                    px-5
                    shadow-2xl
                    backdrop-blur-xl
                "
            >
                {/* Logo */}
                <a href="/" className="group flex items-center gap-3">
                    <div
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-landing-primary
                            text-landing-primary-foreground
                            shadow-[0_0_24px_var(--landing-glow)]
                            transition-transform
                            duration-200
                            group-hover:scale-105
                        "
                    >
                        <Sparkles className="h-4 w-4" strokeWidth={2.2} />
                    </div>

                    <div className="leading-none">
                        <span
                            className="
                                text-sm
                                font-semibold
                                tracking-tight
                                text-landing-foreground
                            "
                        >
                            AI Knowledge
                        </span>

                        <span
                            className="
                                mt-1
                                block
                                text-[10px]
                                font-medium
                                uppercase
                                tracking-[0.18em]
                                text-landing-muted
                            "
                        >
                            Document Assistant
                        </span>
                    </div>
                </a>

                {/* Login */}
                <button
                    type="button"
                    className="
                        rounded-xl
                        border
                        border-landing-border
                        bg-landing-panel/80
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-landing-foreground
                        transition-all
                        duration-200

                        hover:border-landing-primary/50
                        hover:bg-landing-primary/10
                        hover:text-landing-primary-hover
                    "
                >
                    Login
                </button>
            </div>
        </header>
    );
};

export default Header;
