import productVideo from "@/assets/project-demo.mp4";

const VideoShowcase = () => {
    return (
        <section className="relative overflow-hidden bg-landing-background pt-16 pb-4">
            <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-175 -translate-x-1/2 rounded-full bg-landing-primary/6 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-10 max-w-3xl text-center">
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-landing-primary" />

                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-landing-primary">Project Demo</span>

                        <span className="h-px w-8 bg-landing-primary" />
                    </div>

                    <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-landing-foreground sm:text-5xl">
                        See the application in action.
                    </h2>
                </div>

                <div className="relative">
                    <div className="pointer-events-none absolute -inset-5 rounded-[28px] bg-landing-primary/5 blur-3xl" />
                    <div className="relative overflow-hidden rounded-lg border border-landing-border bg-landing-surface/40">
                        <video className="block aspect-video w-full object-cover" controls playsInline preload="metadata">
                            <source src={productVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoShowcase;
