import type { DiffChunk } from "../utils/diffUtils";

interface Props {
  value: string;
  onChange: (value: string) => void;
  diff: DiffChunk[] | null;
  label?: string;
}

export default function TextPanel({ value, onChange, diff, label }: Props) {
  return (
    <div className="flex flex-col gap-1 flex-1">
      {label && (
        <p className="text-sm font-semibold text-gray-600 mb-1">{label}</p>
      )}

      {diff !== null ? (
        // Diff result mode — read-only highlighted view
        <div className="w-full h-48 sm:h-56 md:h-96 p-6 bg-[#F0F7FF] rounded-xl overflow-auto text-[#383A48] whitespace-pre-wrap break-words leading-relaxed text-sm">
          {diff.map((chunk, index) => (
            <span
              key={index}
              className={
                chunk.type === "added"
                  ? "bg-green-200 text-green-900 rounded px-0.5"
                  : chunk.type === "removed"
                    ? "bg-red-200 text-red-900 line-through rounded px-0.5"
                    : ""
              }
            >
              {chunk.value}
            </span>
          ))}
        </div>
      ) : (
        // Edit mode — normal textarea
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="დაიწყე წერა..."
          className="w-full h-48 sm:h-56 md:h-96 p-6 bg-[#F0F7FF] rounded-xl resize-none outline-none text-[#383A4899] leading-relaxed text-sm"
        />
      )}
    </div>
  );
}
