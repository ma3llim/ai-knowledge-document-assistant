const pipeline = [
    {
        number: "01",
        title: "Document",
        description: "Your source files enter the processing pipeline.",
    },
    {
        number: "02",
        title: "Extract",
        description: "Content is extracted and normalized from each file.",
    },
    {
        number: "03",
        title: "Chunk",
        description: "Content is split into meaningful searchable pieces.",
    },
    {
        number: "04",
        title: "Embed",
        description: "Chunks are converted into vector representations.",
    },
    {
        number: "05",
        title: "Retrieve",
        description: "Relevant knowledge is found using semantic search.",
    },
    {
        number: "06",
        title: "Rerank",
        description: "Retrieved results are refined for better context.",
    },
    {
        number: "07",
        title: "Generate",
        description: "The LLM uses the retrieved context to answer.",
    },
];

const DocumentIntelligence = () => {
    return (
        <section className="relative overflow-hidden bg-landing-surface/40 py-16">
            <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-[700px] -translate-x-1/2 rounded-full bg-landing-primary/[0.05] blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="mb-5 flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-landing-primary" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-landing-primary">Document intelligence</span>
                        <span className="h-px w-8 bg-landing-primary" />
                    </div>
                    <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-landing-foreground sm:text-5xl">
                        From raw files
                        <br />
                        <span className="text-landing-muted">to searchable knowledge.</span>
                    </h2>

                    <p className="mt-5 text-sm leading-6 text-landing-muted sm:text-base">
                        Every document passes through a structured pipeline before it becomes available to the AI assistant.
                    </p>
                </div>

                <div className="relative mt-16 overflow-hidden rounded-2xl border border-landing-border bg-landing-background/60">
                    <div className="absolute left-0 right-0 top-0 h-px bg-landing-primary/20" />

                    <div className="grid divide-y divide-landing-border md:grid-cols-7 md:divide-x md:divide-y-0">
                        {pipeline.map((step, index) => (
                            <div key={step.number} className="group relative p-5 transition-colors duration-300 hover:bg-landing-panel">
                                <span className="font-mono text-[10px] tracking-[0.16em] text-landing-primary/70">{step.number}</span>

                                <h3 className="mt-5 text-sm font-semibold text-landing-foreground">{step.title}</h3>

                                <p className="mt-2 text-xs leading-5 text-landing-muted">{step.description}</p>

                                {index < pipeline.length - 1 && (
                                    <span className="absolute right-0 top-1/2 hidden h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-landing-primary/60 md:block" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DocumentIntelligence;
