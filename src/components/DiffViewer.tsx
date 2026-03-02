import type { DiffChunk } from "../utils/diffUtils";
interface Props {
  diff: DiffChunk[];
}
export default function DiffViewer({ diff }: Props) {
  return (
    <div className="w-full h-64 sm:h-80 md:h-112.5 p-6 bg-[#e9eef5] rounded-xl overflow-auto text-gray-800">
      {diff.map((chunk, index) => (
        <span
          key={index}
          className={
            chunk.type === "added"
              ? "bg-green-300 text-green-900"
              : chunk.type === "removed"
                ? "bg-red-300 text-red-900 line-through"
                : ""
          }
        >
          {chunk.value}
        </span>
      ))}
    </div>
  );
}
