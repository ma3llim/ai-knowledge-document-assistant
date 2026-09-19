import productVideo from "@/assets/project-demo.mp4";

const VideoShowcase = () => {
    return (
        <section className="relative overflow-hidden bg-landing-background py-16">
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
                    <video className="relative h-full w-full rounded-md object-cover" controls playsInline preload="metadata">
                        <source src={productVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </section>
    );
};

export default VideoShowcase;
