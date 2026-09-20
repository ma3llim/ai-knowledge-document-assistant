import { SidebarMenuItem } from "@/components/ui/sidebar";

export function ConversationListSkeleton() {
    return (
        <>
            {Array.from({ length: 6 }).map((_, index) => (
                <SidebarMenuItem key={index}>
                    <div className="relative h-8 w-full overflow-hidden rounded-md bg-white/[0.035]">
                        <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.15s_linear_infinite] bg-linear-to-r from-transparent via-white/5.5 to-transparent" />

                        <div
                            className="absolute left-2 top-1/2 h-3 -translate-y-1/2 rounded-sm bg-white/6"
                            style={{ width: index % 3 === 0 ? "72%" : index % 3 === 1 ? "58%" : "65%" }}
                        />
                    </div>
                </SidebarMenuItem>
            ))}
        </>
    );
}
