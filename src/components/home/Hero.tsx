import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-landing-background">
            <div className="pointer-events-none absolute left-1/2 top-55 h-130 w-255 -translate-x-1/2 rounded-full bg-landing-primary/10 blur-[120px]" />
            <div className="pointer-events-none absolute right-45 top-45 h-80 w-[320px] rounded-full bg-landing-primary/6 blur-[100px]" />

            <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-10 text-center">
                <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-landing-foreground sm:text-6xl lg:text-7xl">
                    Turn your documents
                    <br />
                    <span className="text-landing-primary">into intelligent conversations.</span>
                </h1>
                <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-landing-muted sm:text-lg">
                    Upload your documents, ask questions in natural language, and get grounded answers powered by retrieval-augmented AI.
                </p>
                <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
                    <Link to={"/login"}>
                        <button className="inline-flex h-11 items-center justify-center rounded-lg bg-landing-primary px-6 text-sm font-semibold text-landing-primary-foreground shadow-[0_8px_30px_rgba(139,124,246,0.20)] transition-all duration-200 hover:bg-landing-primary-hover hover:shadow-[0_10px_36px_rgba(139,124,246,0.28)]">
                            Start exploring
                        </button>
                    </Link>
                    <button className="inline-flex h-11 items-center justify-center rounded-lg border border-landing-border bg-landing-surface/60 px-6 text-sm font-medium text-landing-foreground backdrop-blur-md transition-colors duration-200 hover:bg-landing-panel">
                        See how it works
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
