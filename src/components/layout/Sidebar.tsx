import { FiMenu, FiPlus, FiMessageSquare } from "react-icons/fi";

const Sidebar = () => {
    return (
        <aside className="flex w-64 shrink-0 flex-col border-r bg-muted/20">
            <div className="flex h-14 items-center justify-between px-3">
                <span className="text-sm font-semibold">Chats</span>

                <button type="button" className="rounded-md p-2 transition-colors hover:bg-muted">
                    <FiMenu className="h-4 w-4" />
                </button>
            </div>

            <div className="px-3">
                <button type="button" className="flex h-10 w-full items-center gap-2 rounded-lg border px-3 text-sm transition-colors hover:bg-muted">
                    <FiPlus className="h-4 w-4" />
                    New chat
                </button>
            </div>

            <div className="mt-4 flex-1 px-3">
                <p className="px-2 text-xs font-medium text-muted-foreground">Recent</p>

                <button type="button" className="mt-2 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-muted">
                    <FiMessageSquare className="h-4 w-4 shrink-0" />
                    <span className="truncate">Welcome conversation</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
