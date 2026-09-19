import { FiFileText } from "react-icons/fi";

export function DocumentSelectionSkeleton() {
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="relative w-full max-w-xs overflow-hidden rounded-xl border border-white/10 bg-[#111111] p-5">
                    <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.15s_linear_infinite] bg-linear-to-r from-transparent via-white/5.5 to-transparent" />

                    <div className="relative mb-5 flex size-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035]">
                        <FiFileText size={22} className="text-white/10" />
                    </div>

                    <div className="relative h-4 w-[75%] rounded-sm bg-white/7.5" />

                    <div className="relative mt-3 h-3 w-[48%] rounded-[3px] bg-white/4.5" />
                </div>
            ))}
        </div>
    );
}
