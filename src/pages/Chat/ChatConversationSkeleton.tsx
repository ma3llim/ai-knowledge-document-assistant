import { Skeleton } from "@/components/ui/skeleton";

export function ChatConversationSkeleton() {
    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6">
            <div className="flex justify-start">
                <div className="relative w-3/5 max-w-2xl overflow-hidden rounded-2xl bg-[#111111] px-4 py-3">
                    <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.15s_linear_infinite] bg-linear-to-r from-transparent via-white/5.5 to-transparent" />

                    <div className="relative space-y-2">
                        <Skeleton className="h-3 w-[92%] bg-white/5.5" />
                        <Skeleton className="h-3 w-[78%] bg-white/5.5" />
                        <Skeleton className="h-3 w-[55%] bg-white/5.5" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <div className="relative w-48 overflow-hidden rounded-2xl bg-[#111111] px-4 py-3">
                    <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.15s_linear_infinite] bg-linear-to-r from-transparent via-white/5.5 to-transparent" />

                    <Skeleton className="relative h-3 w-full bg-white/5.5" />
                </div>
            </div>

            <div className="flex justify-start">
                <div className="relative w-2/3 max-w-2xl overflow-hidden rounded-2xl bg-[#111111] px-4 py-3">
                    <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.15s_linear_infinite] bg-linear-to-r from-transparent via-white/5.5 to-transparent" />

                    <div className="relative space-y-2">
                        <Skeleton className="h-3 w-[88%] bg-white/5.5" />
                        <Skeleton className="h-3 w-[95%] bg-white/5.5" />
                        <Skeleton className="h-3 w-[70%] bg-white/5.5" />
                        <Skeleton className="h-3 w-[45%] bg-white/5.5" />
                    </div>
                </div>
            </div>
        </div>
    );
}
