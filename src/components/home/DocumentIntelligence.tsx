import {
    ArrowDown,
    ArrowUpDown,
    Binary,
    Brain,
    ClipboardList,
    Cloud,
    Database,
    FileSearch,
    FileText,
    Layers3,
    ListChecks,
    ListFilter,
    MessageCircle,
    MessageSquare,
    Scissors,
    Search,
    UserRound,
    Workflow,
} from "lucide-react";

type PipelineStep = {
    number: string;
    title: string;
    subtitle: string;
    description: string;
    type: "source" | "service" | "storage" | "queue" | "process" | "success";
    icon: React.ComponentType<{ className?: string }>;
    transferIcon?: React.ComponentType<{ className?: string }>;
};

const processingSteps: PipelineStep[] = [
    {
        number: "01",
        title: "User",
        subtitle: "Upload document",
        description: "A document enters the system.",
        type: "source",
        icon: UserRound,
        transferIcon: FileText,
    },
    {
        number: "02",
        title: "Document",
        subtitle: "Upload request",
        description: "The document is received by the application.",
        type: "process",
        icon: FileText,
        transferIcon: Cloud,
    },
    {
        number: "03",
        title: "Cloudflare R2",
        subtitle: "File storage",
        description: "The original document is stored securely.",
        type: "storage",
        icon: Cloud,
        transferIcon: ClipboardList,
    },
    {
        number: "04",
        title: "Processing Job",
        subtitle: "Job created",
        description: "A processing job is created for the document.",
        type: "service",
        icon: ClipboardList,
        transferIcon: Layers3,
    },
    {
        number: "05",
        title: "AWS SQS",
        subtitle: "Message queue",
        description: "The processing job is placed onto the queue.",
        type: "queue",
        icon: Layers3,
        transferIcon: Workflow,
    },
    {
        number: "06",
        title: "Ingestion Service",
        subtitle: "Background worker",
        description: "The queued document enters the ingestion pipeline.",
        type: "service",
        icon: Workflow,
        transferIcon: FileSearch,
    },
    {
        number: "07",
        title: "Extract",
        subtitle: "Content extraction",
        description: "Content is extracted and normalized.",
        type: "process",
        icon: FileSearch,
        transferIcon: Scissors,
    },
    {
        number: "08",
        title: "Chunk",
        subtitle: "Token splitting",
        description: "Content is divided into searchable chunks.",
        type: "process",
        icon: Scissors,
        transferIcon: Binary,
    },
    {
        number: "09",
        title: "Embedding",
        subtitle: "Vector generation",
        description: "Chunks are converted into vector representations.",
        type: "process",
        icon: Binary,
        transferIcon: Database,
    },
    {
        number: "10",
        title: "PostgreSQL",
        subtitle: "pgvector",
        description: "Chunks and vectors become searchable knowledge.",
        type: "storage",
        icon: Database,
    },
];

const retrievalSteps: PipelineStep[] = [
    {
        number: "01",
        title: "User Query",
        subtitle: "Ask a question",
        description: "The user asks something about their documents.",
        type: "source",
        icon: MessageSquare,
        transferIcon: Search,
    },
    {
        number: "02",
        title: "Retriever",
        subtitle: "Semantic search",
        description: "The query is matched against the document embeddings.",
        type: "service",
        icon: Search,
        transferIcon: ListFilter,
    },
    {
        number: "03",
        title: "Top 5",
        subtitle: "Relevant chunks",
        description: "The most relevant document chunks are retrieved.",
        type: "process",
        icon: ListFilter,
        transferIcon: ArrowUpDown,
    },
    {
        number: "04",
        title: "Reranker",
        subtitle: "Context refinement",
        description: "Retrieved chunks are reranked for better relevance.",
        type: "service",
        icon: ArrowUpDown,
        transferIcon: ListChecks,
    },
    {
        number: "05",
        title: "Top 3",
        subtitle: "Final context",
        description: "The strongest chunks are selected as final context.",
        type: "process",
        icon: ListChecks,
        transferIcon: Brain,
    },
    {
        number: "06",
        title: "LLM",
        subtitle: "Answer generation",
        description: "The model uses the retrieved context to generate an answer.",
        type: "service",
        icon: Brain,
        transferIcon: MessageCircle,
    },
    {
        number: "07",
        title: "Response",
        subtitle: "Stream to user",
        description: "The generated answer is streamed back to the user.",
        type: "success",
        icon: MessageCircle,
    },
];

const PipelineNode = ({ step }: { step: PipelineStep }) => {
    const Icon = step.icon;

    return (
        <div className="group relative mx-auto w-full max-w-sm">
            <div className="flex min-h-23 items-center gap-4 rounded-xl border border-landing-border bg-landing-background/85 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-landing-primary/40 hover:bg-landing-panel">
                <div
                    className={[
                        "flex size-10 shrink-0 items-center justify-center rounded-lg border",
                        "border-landing-border bg-landing-surface",
                        step.type === "source" && "border-landing-primary/30 bg-landing-primary/[0.07]",
                        step.type === "queue" && "border-amber-300/20 bg-amber-300/5",
                        step.type === "storage" && "border-landing-primary/25 bg-landing-primary/5",
                        step.type === "success" && "border-emerald-400/20 bg-emerald-400/5",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    <Icon className="size-4.5 text-landing-muted" />
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold tracking-tight text-landing-foreground">
                        {step.title}
                        <span className="mx-1.5 text-landing-muted/40">·</span>
                        <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-landing-muted/60">{step.subtitle}</span>
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-landing-muted">{step.description}</p>
                </div>
            </div>
        </div>
    );
};

const PipelineConnector = ({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) => {
    return (
        <div className="relative flex h-14 justify-center">
            <div className="h-full w-px bg-landing-border" />

            <div className="pipeline-transfer absolute left-1/2 top-1/2 z-10 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-landing-primary/30 bg-landing-background shadow-[0_0_20px_rgba(139,124,246,0.25)]">
                <Icon className="size-3.5 text-landing-primary" />
            </div>

            <ArrowDown className="absolute bottom-px left-1/2 size-3 -translate-x-1/2 text-landing-primary/50" />
        </div>
    );
};

const PipelineColumn = ({ label, title, description, steps }: { label: string; title: string; description: string; steps: PipelineStep[] }) => {
    return (
        <div className="relative">
            <div className="mx-auto mb-8 max-w-md text-center">
                <div className="flex items-center justify-center gap-2">
                    <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-landing-primary">{label}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-landing-foreground">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-landing-muted">{description}</p>
            </div>

            <div>
                {steps.map((step, index) => (
                    <div key={step.number}>
                        <PipelineNode step={step} />

                        {index < steps.length - 1 && step.transferIcon && <PipelineConnector icon={step.transferIcon} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

const DocumentIntelligence = () => {
    return (
        <section className="relative overflow-hidden bg-landing-surface/40 pt-20 sm:pt-24 pb-4">
            <div className="pointer-events-none absolute left-1/2 top-0 h-130 w-225 -translate-x-1/2 rounded-full bg-landing-primary/4.5 blur-[140px]" />

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="mb-5 flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-landing-primary" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-landing-primary">Document intelligence</span>
                        <span className="h-px w-8 bg-landing-primary" />
                    </div>

                    <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-landing-foreground sm:text-5xl">
                        From document <span className="text-landing-muted"> to intelligent answer.</span>
                    </h2>

                    <p className="mx-auto mt-5 text-sm leading-6 text-landing-muted sm:text-base">
                        See how documents become searchable knowledge and how that knowledge is transformed into grounded answers.
                    </p>
                </div>

                <div className="relative mx-auto mt-14 overflow-hidden rounded-2xl border border-landing-border bg-landing-background/60 py-6">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,124,246,0.07),transparent_48%)]" />

                    <div className="relative grid gap-14 lg:grid-cols-2 lg:gap-10">
                        <PipelineColumn
                            label="01 / Ingestion"
                            title="Document processing"
                            description="How a document moves from upload to searchable vector knowledge."
                            steps={processingSteps}
                        />

                        <PipelineColumn
                            label="02 / Retrieval"
                            title="Retrieval & generation"
                            description="How a question moves through retrieval, reranking, and answer generation."
                            steps={retrievalSteps}
                        />
                    </div>

                    <div className="pointer-events-none absolute bottom-10 left-1/2 top-10 hidden w-px -translate-x-1/2 bg-linear-to-b from-transparent via-landing-border to-transparent lg:block" />
                </div>
            </div>
        </section>
    );
};

export default DocumentIntelligence;
