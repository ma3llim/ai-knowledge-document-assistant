import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

interface MarkdownMessageProps {
    content: string;
    isStreaming?: boolean;
}

const MarkdownMessage = ({ content, isStreaming = false }: MarkdownMessageProps) => {
    return (
        <div
            className="
                prose
                prose-invert
                prose-lg
                max-w-none
                prose-p:text-[#e8e5df]
                prose-p:leading-7
                prose-p:my-3.5
                prose-headings:font-semibold
                prose-headings:tracking-[-0.02em]
                prose-headings:text-[#f8f5ee]
                prose-strong:font-semibold
                prose-strong:text-[#f8f5ee]
                prose-em:text-[#d1cec7]
                prose-li:text-[#e8e5df]
                prose-li:leading-7
                prose-ul:my-4
                prose-ol:my-4
                prose-a:font-medium
                prose-a:text-[#cbb0f7]
                prose-a:decoration-[#cbb0f7]/40
                prose-a:underline-offset-4
                prose-code:font-mono
                prose-code:text-[#d8c4ff]
                prose-code:before:content-none
                prose-code:after:content-none
                prose-blockquote:border-[#cbb0f7]/40
                prose-blockquote:text-[#bdb9b2]
                prose-hr:border-white/10
                prose-th:text-[#c0bdb8]
                prose-td:text-[#d8d5cf]
            "
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="mb-5 mt-8 text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.03em] text-[#f8f5ee] first:mt-0">
                            {children}
                        </h1>
                    ),

                    h2: ({ children }) => (
                        <h2 className="mb-3.5 mt-7 text-[1.4rem] font-semibold leading-tight tracking-tight text-[#f8f5ee] first:mt-0">{children}</h2>
                    ),

                    h3: ({ children }) => (
                        <h3 className="mb-2.5 mt-6 text-[1.15rem] font-semibold leading-[1.35] tracking-[-0.015em] text-[#f8f5ee] first:mt-0">
                            {children}
                        </h3>
                    ),
                    p: ({ children }) => <p className="text-[15.5px] leading-7 text-[#e8e5df] last:mb-0">{children}</p>,

                    strong: ({ children }) => <strong className="font-semibold text-[#f8f5ee]">{children}</strong>,

                    em: ({ children }) => <em className="text-[#d1cec7] italic">{children}</em>,

                    ul: ({ children }) => <ul className="my-4 ml-5 list-disc space-y-1.5 pl-1 marker:text-[#8f8b84]">{children}</ul>,

                    ol: ({ children }) => <ol className="my-4 ml-5 list-decimal space-y-1.5 pl-1 marker:text-[#8f8b84]">{children}</ol>,

                    li: ({ children }) => <li className="pl-1 text-[15.5px] leading-7 text-[#e8e5df]">{children}</li>,

                    blockquote: ({ children }) => (
                        <blockquote className="my-5 border-l-2 border-[#cbb0f7]/40 pl-4 text-[15.5px] leading-7 text-[#bdb9b2]">
                            {children}
                        </blockquote>
                    ),

                    hr: () => <hr className="my-7 border-white/10" />,

                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-[#cbb0f7] underline decoration-[#cbb0f7]/40 underline-offset-4 transition-colors duration-150 hover:decoration-[#cbb0f7]"
                        >
                            {children}
                        </a>
                    ),

                    code: ({ children, className }) => {
                        const match = /language-(\w+)/.exec(className || "");

                        const code = String(children).replace(/\n$/, "");

                        if (!match) {
                            return (
                                <code className="rounded-md border border-white/10 bg-white/[0.07] px-1.5 py-0.5 font-mono text-[0.88em] font-medium text-[#d8c4ff]">
                                    {children}
                                </code>
                            );
                        }

                        return <CodeBlock code={code} language={match[1]} isStreaming={isStreaming} />;
                    },

                    table: ({ children }) => (
                        <div className="my-5 overflow-x-auto rounded-xl border border-white/10">
                            <table className="w-full border-collapse text-[14px]">{children}</table>
                        </div>
                    ),

                    thead: ({ children }) => <thead className="border-b border-white/10 bg-white/4">{children}</thead>,

                    th: ({ children }) => (
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#c0bdb8]">{children}</th>
                    ),

                    td: ({ children }) => (
                        <td className="border-b border-white/6 px-4 py-3 text-sm leading-6 text-[#d8d5cf] last:border-b-0">{children}</td>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownMessage;
