import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
    code: string;
    language?: string;
    isStreaming?: boolean;
}

const CodeBlock = ({ code, language = "text", isStreaming = false }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to copy code:", error);
        }
    };

    const normalizedLanguage = language.toLowerCase();

    return (
        <div className="my-4 overflow-hidden rounded-xl border border-white/10 bg-[#111111]">
            <div className="flex h-10 items-center justify-between border-b border-white/10 px-4">
                <span className="font-mono text-xs text-[#a5a39d]">{normalizedLanguage}</span>
                <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-[#a5a39d] transition hover:bg-white/10 hover:text-[#f8f5ee]"
                    aria-label={copied ? "Code copied" : "Copy code"}
                >
                    {copied ? (
                        <>
                            <FiCheck size={13} />
                            Copied
                        </>
                    ) : (
                        <>
                            <FiCopy size={13} />
                            Copy
                        </>
                    )}
                </button>
            </div>

            <div className="overflow-x-auto">
                <SyntaxHighlighter
                    language={normalizedLanguage}
                    style={oneDark}
                    customStyle={{
                        margin: 0,
                        padding: "1rem",
                        background: "transparent",
                        fontSize: "0.875rem",
                        lineHeight: "1.6",
                    }}
                    codeTagProps={{
                        style: {
                            fontFamily: '"DM Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
                        },
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>

            {isStreaming && <div className="px-4 pb-2 text-[10px] text-[#a5a39d]">Generating code...</div>}
        </div>
    );
};

export default CodeBlock;
