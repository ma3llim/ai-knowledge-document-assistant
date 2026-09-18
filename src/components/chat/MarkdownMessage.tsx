import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

interface MarkdownMessageProps {
    content: string;
    isStreaming?: boolean;
}

const MarkdownMessage = ({ content, isStreaming = false }: MarkdownMessageProps) => {
    return (
        <div className="text-sm leading-7 text-[#f8f5ee]">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => <h1 className="mb-4 mt-6 text-2xl font-semibold tracking-tight first:mt-0">{children}</h1>,

                    h2: ({ children }) => <h2 className="mb-3 mt-5 text-xl font-semibold tracking-tight first:mt-0">{children}</h2>,

                    h3: ({ children }) => <h3 className="mb-2 mt-4 text-lg font-semibold first:mt-0">{children}</h3>,

                    p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,

                    strong: ({ children }) => <strong className="font-semibold text-[#f8f5ee]">{children}</strong>,

                    em: ({ children }) => <em className="italic">{children}</em>,

                    ul: ({ children }) => <ul className="mb-4 ml-5 list-disc space-y-1.5">{children}</ul>,

                    ol: ({ children }) => <ol className="mb-4 ml-5 list-decimal space-y-1.5">{children}</ol>,

                    li: ({ children }) => <li className="pl-1">{children}</li>,

                    blockquote: ({ children }) => (
                        <blockquote className="my-4 border-l-2 border-white/20 pl-4 italic text-[#c0bdb8]">{children}</blockquote>
                    ),

                    hr: () => <hr className="my-6 border-white/10" />,

                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#cbb0f7] underline underline-offset-2 hover:opacity-80"
                        >
                            {children}
                        </a>
                    ),

                    code: ({ children, className }) => {
                        const match = /language-(\w+)/.exec(className || "");

                        const code = String(children).replace(/\n$/, "");

                        if (!match) {
                            return <code className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-[#cbb0f7]">{children}</code>;
                        }

                        return <CodeBlock code={code} language={match[1]} isStreaming={isStreaming} />;
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownMessage;
