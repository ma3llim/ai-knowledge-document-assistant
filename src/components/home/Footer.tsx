const Footer = () => {
    return (
        <footer className="border-t border-landing-border bg-landing-background">
            <div className="mx-auto max-w-7xl px-6 py-5">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="text-sm font-bold tracking-[-0.02em] text-landing-foreground">AI Knowledge</div>
                        <p className="mt-1 text-xs text-landing-muted">Intelligent conversations with your documents.</p>
                    </div>

                    <div className="text-xs text-landing-muted">© {new Date().getFullYear()} AI Knowledge. All rights reserved.</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
