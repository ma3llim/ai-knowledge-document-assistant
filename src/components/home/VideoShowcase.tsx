import productVideo from "@/assets/product-demo.mp4";

const VideoShowcase = () => {
    return (
        <section className="relative overflow-hidden bg-landing-background py-28 sm:py-36">
            <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-175 -translate-x-1/2 rounded-full bg-landing-primary/6 blur-[120px]" />
            <div className="relative mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="mb-5 flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-landing-primary" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-landing-primary">See it in action</span>
                        <span className="h-px w-8 bg-landing-primary" />
                    </div>
                    <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-landing-foreground sm:text-5xl">
                        Your documents.
                        <br />
                        <span className="text-landing-muted">One intelligent workspace.</span>
                    </h2>

                    <p className="mt-5 text-sm leading-6 text-landing-muted sm:text-base">
                        See how AI Knowledge turns your documents into a conversational workspace.
                    </p>
                </div>

                <div className="relative mt-14">
                    <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-landing-primary/5 blur-3xl" />

                    <div className="group relative overflow-hidden rounded-2xl border border-landing-border bg-landing-surface shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
                        <div className="flex h-10 items-center border-b border-landing-border bg-landing-panel/70 px-4">
                            <div className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-white/20" />
                                <span className="h-2 w-2 rounded-full bg-white/20" />
                                <span className="h-2 w-2 rounded-full bg-white/20" />
                            </div>

                            <div className="mx-auto h-5 w-48 rounded-md border border-landing-border bg-landing-background/50 sm:w-64" />
                        </div>

                        <div className="relative aspect-video bg-black">
                            <video className="h-full w-full object-cover" controls playsInline preload="metadata">
                                <source src={productVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoShowcase;
