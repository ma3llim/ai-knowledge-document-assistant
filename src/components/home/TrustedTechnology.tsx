import { SiReact, SiTypescript, SiRedux, SiTanstack, SiSpringboot, SiSpring, SiPostgresql, SiCloudflare } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import {
    TbVector,
    TbBrain,
    TbSearch,
    TbArrowsSort,
    TbShieldCheck,
    TbPlugConnected,
    TbActivityHeartbeat,
    TbFunction,
    TbRoute,
    TbMessageCircle,
} from "react-icons/tb";

const technologies = [
    { name: "React", icon: SiReact },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Redux Toolkit", icon: SiRedux },
    { name: "TanStack Query", icon: SiTanstack },
    { name: "Java", icon: FaJava },
    { name: "Spring Boot", icon: SiSpringboot },
    { name: "Spring AI", icon: SiSpring },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "pgvector", icon: TbVector },
    { name: "RAG", icon: TbBrain },
    { name: "Semantic Search", icon: TbSearch },
    { name: "Embeddings", icon: TbVector },
    { name: "Reranking", icon: TbArrowsSort },
    { name: "Guardrails", icon: TbShieldCheck },
    { name: "WebSocket", icon: TbPlugConnected },
    { name: "Streaming", icon: TbActivityHeartbeat },
    { name: "AWS SQS", icon: TbMessageCircle },
    { name: "AWS Lambda", icon: TbFunction },
    { name: "API Gateway", icon: TbRoute },
    { name: "Cloudflare R2", icon: SiCloudflare },
];

const TrustedTechnology = () => {
    return (
        <section className="group relative overflow-hidden border-y border-landing-border bg-[#17131F] py-4 backdrop-blur-2xl backdrop-saturate-150">
            <div className="relative flex overflow-hidden">
                <div className="flex shrink-0 animate-[marquee_30s_linear_infinite] items-center gap-9 whitespace-nowrap group-hover:paused">
                    {[...technologies, ...technologies].map((technology, index) => {
                        const Icon = technology.icon;

                        return (
                            <div key={`${technology.name}-${index}`} className="flex items-center gap-9">
                                <div className="flex items-center gap-2.5 transition-colors duration-300">
                                    {Icon && <Icon className="size-3.75 shrink-0" />}
                                    <span className="text-sm font-medium tracking-[-0.01em]">{technology.name}</span>
                                </div>
                                <span className="size-1 rounded-full bg-landing-primary/60" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TrustedTechnology;
