const technologies = [
    "React",
    "TypeScript",
    "Redux Toolkit",
    "TanStack Query",
    "Java",
    "Spring Boot",
    "Spring AI",
    "PostgreSQL",
    "pgvector",
    "RAG",
    "Semantic Search",
    "Embeddings",
    "Reranking",
    "Guardrails",
    "WebSocket",
    "Streaming",
    "AWS SQS",
    "AWS Lambda",
    "API Gateway",
    "Cloudflare R2",
];

const TrustedTechnology = () => {
    return (
        <section className="relative overflow-hidden border-y border-landing-border bg-landing-surface/30 py-4">
            <div className="relative flex overflow-hidden">
                <div className="flex shrink-0 animate-[marquee_35s_linear_infinite] items-center gap-10 whitespace-nowrap">
                    {[...technologies].map((technology, index) => (
                        <div key={`${technology}-${index}`} className="flex items-center gap-10">
                            <span className="text-sm font-medium tracking-[-0.01em] transition-colors duration-300 hover:text-landing-foreground">
                                {technology}
                            </span>

                            <span className="size-1 rounded-full bg-landing-primary" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedTechnology;
