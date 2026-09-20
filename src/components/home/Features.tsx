const features = [
    {
        number: "01",
        title: "Understand Your Documents",
        description: "Upload your knowledge base and let the system extract, normalize, and structure your content automatically.",
        meta: "PDF · DOCX · XLSX · PPTX · CSV · TXT · MD",
        visual: "documents",
        className: "lg:col-span-2",
    },
    {
        number: "02",
        title: "Ask in Natural Language",
        description: "Ask questions the way you normally would. No keywords, filters, or complicated search syntax.",
        visual: "chat",
        className: "lg:col-span-1",
    },
    {
        number: "03",
        title: "RAG-Powered Answers",
        description: "Relevant document context is retrieved before the model generates its response.",
        visual: "rag",
        className: "lg:col-span-1",
    },
    {
        number: "04",
        title: "Smart Retrieval",
        description: "Semantic search finds meaningful matches even when your wording doesn't exactly match the document.",
        visual: "retrieval",
        className: "lg:col-span-1",
    },
    {
        number: "05",
        title: "Conversational Context",
        description: "Continue naturally with follow-up questions while recent conversation context stays available.",
        visual: "memory",
        className: "lg:col-span-1",
    },
    {
        number: "06",
        title: "Real-Time AI Streaming",
        description: "Watch responses arrive progressively through a real-time WebSocket connection.",
        visual: "streaming",
        className: "lg:col-span-2",
    },
];

const DocumentsVisual = () => (
    <div className="mt-6 flex h-24 items-end gap-3">
        {[
            { h: "h-20", rotate: "-rotate-6", opacity: "bg-white/[0.04]", delay: "0s" },
            { h: "h-24", rotate: "rotate-2", opacity: "bg-landing-primary/[0.10]", delay: "0.15s" },
            { h: "h-16", rotate: "rotate-6", opacity: "bg-white/[0.05]", delay: "0.3s" },
        ].map((item, index) => (
            <div
                key={index}
                style={{ animationDelay: item.delay }}
                className={`${item.h} ${item.rotate} ${item.opacity} relative w-20 animate-[feature-float_3.5s_ease-in-out_infinite] overflow-hidden rounded-lg border border-landing-border p-3 transition-transform duration-500 group-hover:-translate-y-1`}
            >
                <div className="mb-3 h-2 w-8 rounded bg-landing-primary/50" />

                <div className="space-y-1.5">
                    <div className="h-1.5 w-full rounded bg-white/10" />
                    <div className="h-1.5 w-4/5 rounded bg-white/6" />
                    <div className="h-1.5 w-5/6 rounded bg-white/6" />
                    <div className="h-1.5 w-3/5 rounded bg-white/4" />
                </div>
            </div>
        ))}
    </div>
);

const ChatVisual = () => (
    <div className="mt-6 flex h-24 flex-col justify-center gap-2.5">
        <div className="ml-auto w-[72%] animate-[feature-chat_4s_ease-in-out_infinite] rounded-xl rounded-br-sm bg-landing-primary/13 p-3">
            <div className="h-1.5 w-full rounded bg-landing-primary/35" />
            <div className="mt-2 h-1.5 w-2/3 rounded bg-landing-primary/20" />
        </div>

        <div className="flex gap-2 animate-[feature-chat-reply_4s_ease-in-out_infinite]">
            <div className="mt-1 h-6 w-6 shrink-0 rounded-md bg-landing-primary/15" />

            <div className="w-[82%] rounded-xl rounded-tl-sm border border-landing-border bg-landing-background/50 p-3">
                <div className="h-1.5 w-full rounded bg-white/10" />
                <div className="mt-2 h-1.5 w-5/6 rounded bg-white/6" />
                <div className="mt-2 h-1.5 w-3/5 rounded bg-white/5" />
            </div>
        </div>
    </div>
);

const RagVisual = () => (
    <div className="relative mt-6 flex h-24 items-center justify-center">
        <div className="absolute h-20 w-20 animate-[feature-pulse_3s_ease-in-out_infinite] rounded-full border border-landing-primary/20" />

        <div className="absolute h-14 w-14 animate-[feature-pulse_3s_ease-in-out_infinite_0.4s] rounded-full border border-landing-primary/30" />

        <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-landing-primary/15 ring-1 ring-landing-primary/25">
            <div className="h-2 w-2 animate-pulse rounded-full bg-landing-primary" />
        </div>

        {["left-4 top-3", "right-4 top-5", "left-8 bottom-2", "right-10 bottom-1"].map((position, index) => (
            <span
                key={position}
                style={{ animationDelay: `${index * 0.35}s` }}
                className={`absolute ${position} h-2 w-2 animate-[feature-node_2.5s_ease-in-out_infinite] rounded-full bg-white/20`}
            />
        ))}
    </div>
);

const RetrievalVisual = () => (
    <div className="mt-6 flex h-24 flex-col justify-center space-y-2.5">
        {[92, 76, 61].map((width, index) => (
            <div key={index} className="flex items-center gap-3">
                <span className="w-5 text-[9px] text-landing-muted">0{index + 1}</span>

                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                    <div
                        style={{
                            width: `${width}%`,
                            animationDelay: `${index * 0.25}s`,
                        }}
                        className="h-full animate-[feature-bar_2.8s_ease-in-out_infinite] rounded-full bg-landing-primary/50"
                    />
                </div>

                <span className="text-[9px] text-landing-muted">{width}%</span>
            </div>
        ))}
    </div>
);

const MemoryVisual = () => (
    <div className="mt-6 flex h-24 flex-col justify-center space-y-2">
        <div className="animate-[feature-memory_4s_ease-in-out_infinite] rounded-lg border border-landing-border bg-landing-background/40 p-3">
            <div className="mb-2 text-[9px] uppercase tracking-[0.16em] text-landing-muted">Previous context</div>

            <div className="h-1.5 w-4/5 rounded bg-white/10" />
            <div className="mt-2 h-1.5 w-3/5 rounded bg-white/6" />
        </div>

        <div className="ml-8 animate-[feature-memory-reply_4s_ease-in-out_infinite] rounded-lg border border-landing-primary/20 bg-landing-primary/[0.07] p-3">
            <div className="mb-2 text-[9px] uppercase tracking-[0.16em] text-landing-primary/70">Follow-up</div>

            <div className="h-1.5 w-4/5 rounded bg-landing-primary/25" />
        </div>
    </div>
);

const StreamingVisual = () => (
    <div className="mt-6 flex h-24 flex-col justify-center rounded-xl border border-landing-border bg-landing-background/50 p-4">
        <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-landing-primary" />

            <span className="text-[10px] font-medium text-landing-muted">Generating response</span>
        </div>

        <div className="space-y-2">
            <div className="flex gap-1">
                <span className="h-2 w-16 rounded bg-white/15" />
                <span className="h-2 w-24 rounded bg-white/10" />
                <span className="h-2 w-10 animate-pulse rounded bg-landing-primary/35" />
            </div>

            <div className="flex gap-1">
                <span className="h-2 w-32 rounded bg-white/10" />
                <span className="h-2 w-20 rounded bg-white/10" />
                <span className="h-2 w-14 animate-pulse rounded bg-landing-primary/30" />
            </div>

            <div className="flex gap-1">
                <span className="h-2 w-20 rounded bg-white/10" />
                <span className="h-2 w-28 rounded bg-white/10" />
                <span className="h-2 w-2 animate-pulse rounded bg-landing-primary" />
            </div>
        </div>
    </div>
);

const FeatureVisual = ({ type }: { type: string }) => {
    switch (type) {
        case "documents":
            return <DocumentsVisual />;
        case "chat":
            return <ChatVisual />;
        case "rag":
            return <RagVisual />;
        case "retrieval":
            return <RetrievalVisual />;
        case "memory":
            return <MemoryVisual />;
        case "streaming":
            return <StreamingVisual />;
        default:
            return null;
    }
};

const Features = () => {
    return (
        <section className="relative overflow-hidden bg-landing-background">
            <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-175 -translate-x-1/2 rounded-full bg-landing-primary/5 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="mb-5 flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-landing-primary" />

                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-landing-primary">Capabilities</span>

                        <span className="h-px w-8 bg-landing-primary" />
                    </div>

                    <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-landing-foreground sm:text-5xl">
                        Everything you need to
                        <br />
                        <span className="text-landing-muted">talk to your documents.</span>
                    </h2>

                    <p className="mt-5 text-sm leading-6 text-landing-muted sm:text-base">
                        From document ingestion to real-time answers, every part of the experience is built around your knowledge.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <article
                            key={feature.number}
                            className="group relative overflow-hidden rounded-2xl border border-landing-border bg-landing-surface/70 p-6 transition-all duration-300 hover:border-landing-primary/25 hover:bg-landing-panel"
                        >
                            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-landing-primary/[0.07] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="relative">
                                <span className="font-mono text-[10px] tracking-[0.16em] text-landing-primary/70">{feature.number}</span>

                                <h3 className="mt-5 text-xl font-semibold tracking-tight text-landing-foreground">{feature.title}</h3>

                                <p className="mt-3 text-sm leading-6 text-landing-muted">{feature.description}</p>

                                {feature.meta && (
                                    <div className="mt-4 text-[10px] font-medium tracking-[0.08em] text-landing-muted/70">{feature.meta}</div>
                                )}

                                <FeatureVisual type={feature.visual} />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
