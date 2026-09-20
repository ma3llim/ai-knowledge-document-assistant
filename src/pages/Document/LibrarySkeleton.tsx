import { FiFileText } from "react-icons/fi";

import { DocumentCardSkeleton } from "./DocumentCardSkeleton";

export function LibrarySkeleton() {
    return (
        <div className="mx-auto flex w-full max-w-300 flex-1 flex-col px-6 py-8">
            <div className="flex flex-col gap-6">
                <div className="flex items-start justify-between gap-6">
                    <div>
                        <div className="h-9 w-28 rounded-md bg-white/[0.07]" />

                        <div className="mt-3 h-4 w-80 max-w-full rounded-sm bg-white/04.5" />
                    </div>

                    <div className="h-11 w-40 shrink-0 rounded-sm bg-white/[0.07]" />
                </div>

                <div className="relative flex items-center justify-between overflow-hidden rounded-xl border border-white/10 bg-[#111111] px-5 py-4">
                    <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.15s_linear_infinite] bg-linear-to-r from-transparent via-white/5.5 to-transparent" />

                    <div className="relative flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.035]">
                            <FiFileText className="size-4 text-white/10" />
                        </div>

                        <div>
                            <div className="h-4 w-36 rounded-sm bg-white/[0.07]" />
                            <div className="mt-2 h-3 w-52 rounded-sm bg-white/4.5" />
                        </div>
                    </div>

                    <div className="relative text-right">
                        <div className="ml-auto h-4 w-10 rounded-sm bg-white/[0.07]" />
                        <div className="mt-2 ml-auto h-3 w-16 rounded-sm bg-white/4.5" />
                    </div>
                </div>
            </div>

            <div className="mt-6 flex-1">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <DocumentCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
