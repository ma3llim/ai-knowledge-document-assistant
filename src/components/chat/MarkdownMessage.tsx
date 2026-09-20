import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

interface MarkdownMessageProps {
    content: string;
    isStreaming?: boolean;
}

const MarkdownMessage = ({ content, isStreaming = false }: MarkdownMessageProps) => {
    return (
        <div className="w-full min-w-0 text-[15px] leading-7 text-[#e8e5df] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="mb-4 mt-8 text-2xl font-semibold leading-tight tracking-tight text-[#f8f5ee]                            ">
                            {children}
                        </h1>
                    ),

                    h2: ({ children }) => (
                        <h2 className="mb-3 mt-7 text-xl font-semibold leading-tight tracking-[-0.02em] text-[#f8f5ee]">{children}</h2>
                    ),

                    h3: ({ children }) => <h3 className="mb-2.5 mt-6 text-lg font-semibold leading-snug text-[#f8f5ee]">{children}</h3>,

                    h4: ({ children }) => <h4 className="mb-2 mt-5 text-base font-semibold leading-snug text-[#f8f5ee]">{children}</h4>,

                    p: ({ children }) => <p className="my-3.5 text-[15px] leading-7 text-[#e8e5df]">{children}</p>,

                    strong: ({ children }) => <strong className="font-semibold text-[#f8f5ee]">{children}</strong>,

                    em: ({ children }) => <em className="italic text-[#d1cec7]">{children}</em>,

                    del: ({ children }) => <del className="text-[#aaa69f]">{children}</del>,

                    ul: ({ children }) => <ul className="my-4 ml-6 list-disc space-y-1.5 pl-2 marker:text-[#77736d] ">{children}</ul>,

                    ol: ({ children }) => (
                        <ol className="my-4 ml-6 list-decimal space-y-1.5 pl-2 marker:font-medium marker:text-[#918c85]">{children}</ol>
                    ),

                    li: ({ children }) => <li className="pl-1 text-[15px] leading-7 text-[#e8e5df]">{children}</li>,

                    blockquote: ({ children }) => (
                        <blockquote className="my-5 border-l-2 border-[#cbb0f7]/40 pl-4 text-[15px] leading-7 text-[#bdb9b2] [&>p]:my-1">
                            {children}
                        </blockquote>
                    ),

                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wrap-break-word font-medium text-[#cbb0f7] underline decoration-[#cbb0f7]/40 underline-offset-4 transition-colors duration-150 hover:decoration-[#cbb0f7]"
                        >
                            {children}
                        </a>
                    ),

                    code: ({ children, className }) => {
                        const match = /language-([\w-]+)/.exec(className || "");
                        const code = String(children).replace(/\n$/, "");

                        if (!match) {
                            return (
                                <code className="rounded-md border border-white/10 bg-white/[0.07] px-1.5 py-0.5 font-mono text-[0.88em] font-medium text-[#d8c4ff] wrap-break-words">
                                    {children}
                                </code>
                            );
                        }
                        return <CodeBlock code={code} language={match[1]} isStreaming={isStreaming} />;
                    },

                    pre: ({ children }) => <div className="my-5 min-w-0">{children}</div>,

                    hr: () => <hr className="my-7 border-0 border-t border-white/10" />,

                    table: ({ children }) => (
                        <div className="my-5 w-full overflow-x-auto rounded-xl border border-white/10 bg-white/1.5">
                            <table className="min-w-full border-collapse text-left text-sm">{children}</table>
                        </div>
                    ),

                    thead: ({ children }) => <thead className="border-b border-white/10 bg-white/4">{children}</thead>,

                    tbody: ({ children }) => <tbody className="divide-y divide-white/6">{children}</tbody>,

                    tr: ({ children }) => <tr className="transition-colors hover:bg-white/2.5">{children}</tr>,

                    th: ({ children }) => (
                        <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#c0bdb8]">
                            {children}
                        </th>
                    ),

                    td: ({ children }) => <td className="px-4 py-3 align-top text-sm leading-6 text-[#d8d5cf]">{children}</td>,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownMessage;
