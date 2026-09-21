import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-landing-background">
            <div className="pointer-events-none absolute left-1/2 top-20 h-130 w-225 -translate-x-1/2 rounded-full bg-landing-primary/8 blur-[140px]" />
            <div className="pointer-events-none absolute -right-32 top-32 h-90 w-90 rounded-full bg-landing-primary/5 blur-[120px]" />
            <div className="pointer-events-none absolute -left-40 bottom-0 h-70 w-70 rounded-full bg-landing-primary/[0.035] blur-[110px]" />
            <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center sm:py-24 lg:py-28">
                <div className="mb-7 flex items-center gap-3">
                    <span className="h-px w-8 bg-landing-primary/60" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-landing-primary">
                        AI-powered document intelligence
                    </span>

                    <span className="h-px w-8 bg-landing-primary/60" />
                </div>

                <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-landing-foreground sm:text-6xl lg:text-7xl">
                    Turn your documents
                    <br />
                    <span className="text-landing-primary">into intelligent conversations.</span>
                </h1>

                <p className="mt-8 max-w-2xl text-pretty text-base leading-7 text-landing-muted sm:text-lg">
                    Upload your documents, ask questions in natural language, and get grounded answers powered by retrieval-augmented AI.
                </p>

                <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
                    <Link to="/login">
                        <button
                            type="button"
                            className="inline-flex h-12 items-center justify-center rounded-lg bg-landing-primary px-7 text-sm font-semibold text-landing-primary-foreground shadow-[0_10px_35px_rgba(139,124,246,0.20)] transition-all duration-200 hover:bg-landing-primary-hover hover:shadow-[0_12px_42px_rgba(139,124,246,0.30)]"
                        >
                            Start exploring
                            <span className="ml-2 text-base">→</span>
                        </button>
                    </Link>

                    <LinkScroll
                        to="document-intelligence"
                        smooth
                        duration={800}
                        offset={-48}
                        className="inline-flex h-12 items-center justify-center rounded-lg border border-landing-border bg-landing-surface/60 px-7 text-sm font-medium text-landing-foreground backdrop-blur-md transition-all duration-200 hover:border-landing-primary/30 hover:bg-landing-panel cursor-pointer"
                    >
                        See how it works
                        <span className="ml-2 text-landing-muted">↓</span>
                    </LinkScroll>
                </div>

                <div className="mt-7 flex items-center gap-2 text-xs text-landing-muted/60">
                    <span className="size-1.5 rounded-full bg-landing-primary/70" />
                    <span>Upload documents</span>
                    <span className="text-landing-border">•</span>
                    <span>Ask questions</span>
                    <span className="text-landing-border">•</span>
                    <span>Get grounded answers</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
