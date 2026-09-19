import { FiFileText, FiMoreHorizontal } from "react-icons/fi";

export function DocumentCardSkeleton() {
    return (
        <article className="group relative flex min-h-47.5 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-5">
            <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.15s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/5.5 to-transparent" />
            <div className="relative flex items-start justify-between gap-4">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
                    <FiFileText className="size-5 text-white/12" />
                </div>

                <div className="flex size-8 items-center justify-center rounded-md text-white/10">
                    <FiMoreHorizontal className="size-4" />
                </div>
            </div>

            <div className="relative mt-5 min-w-0">
                <div className="h-4 w-[72%] rounded-sm bg-white/8.5" />

                <div className="mt-2 h-3 w-[42%] rounded-[3px] bg-white/5" />
            </div>

            <div className="relative mt-auto flex items-center justify-between pt-6">
                <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-white/10" />

                    <div className=" h-3 w-14 rounded-[3px] bg-white/5.5" />
                </div>

                <div className="h-3 w-20 rounded-[3px] bg-white/4.5" />
            </div>
        </article>
    );
}
