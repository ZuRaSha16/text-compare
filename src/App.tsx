import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TextPanel from "./components/TextPanel";
import { compareTexts } from "./utils/diffUtils";
import type { DiffChunk } from "./utils/diffUtils";
import { Plus } from "lucide-react";

function App() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [originalDiff, setOriginalDiff] = useState<DiffChunk[] | null>(null);
  const [modifiedDiff, setModifiedDiff] = useState<DiffChunk[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCompare = () => {
    setLoading(true);
    setProgress(0);
    setOriginalDiff(null);
    setModifiedDiff(null);

    // Simulate progress steps
    const steps = [20, 45, 70, 90, 100];
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(interval);
        const result = compareTexts(original, modified);
        setOriginalDiff(result.filter((c) => c.type !== "added"));
        setModifiedDiff(result.filter((c) => c.type !== "removed"));
        setLoading(false);
      }
    }, 180);
  };

  const handleReset = () => {
    setOriginalDiff(null);
    setModifiedDiff(null);
    setOriginal("");
    setModified("");
    setProgress(0);
  };

  const isCompared = originalDiff !== null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 md:pt-10 md:p-10 bg-white">
        {/* Header controls */}
        <div className="flex flex-col gap-3 mb-6 md:flex-row md:justify-between md:items-center md:mb-8">
          <select className="border px-3 py-2 rounded-lg w-full md:w-auto">
            <option>ქართული</option>
            <option>English</option>
          </select>
          <button className="bg-[#383A4899] text-white text-[14px] justify-center py-2.5 px-4 h-10 flex items-center rounded-md gap-1 cursor-pointer opacity-100 hover:opacity-70 transition duration-200 w-full md:w-auto">
            <Plus size={20} />
            ახალის გახსნა
          </button>
        </div>

        {/* Text panels */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <TextPanel
              value={original}
              onChange={(v) => {
                setOriginal(v);
                if (isCompared) handleReset();
              }}
              diff={originalDiff}
              label="Source Text (A):"
            />
          </div>

          <div className="flex items-center justify-center text-2xl text-gray-400 py-1 md:py-0 md:px-2">
            <span className="md:hidden">↕</span>
            <span className="hidden md:inline">↔</span>
          </div>

          <div className="flex-1">
            <TextPanel
              value={modified}
              onChange={(v) => {
                setModified(v);
                if (isCompared) handleReset();
              }}
              diff={modifiedDiff}
              label="Target Text (B):"
            />
          </div>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center mt-8">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-5 flex items-center gap-4 w-full max-w-sm">
              <div className="w-9 h-9 rounded-full border-2 border-blue-500 flex items-center justify-center flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">
                  Converting...Thank you For your Patience
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-base font-semibold text-gray-700 w-10">
                    {progress}%
                  </span>
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats bar after compare */}
        {isCompared &&
          !loading &&
          (() => {
            const deletions = originalDiff!
              .filter((c) => c.type === "removed")
              .reduce((acc, c) => acc + c.value.length, 0);
            const insertions = modifiedDiff!
              .filter((c) => c.type === "added")
              .reduce((acc, c) => acc + c.value.length, 0);
            return (
              <div className="flex justify-center mt-6">
                <div className="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
                  ■ Comparison completed &nbsp;|&nbsp; Deletions:{" "}
                  <span className="text-red-500 font-medium">{deletions}</span>{" "}
                  &nbsp;|&nbsp; Insertions:{" "}
                  <span className="text-green-600 font-medium">
                    {insertions}
                  </span>
                </div>
              </div>
            );
          })()}

        {/* Compare / Clear Button */}
        {!loading && (
          <div className="flex justify-center mt-6 md:mt-8">
            {isCompared ? (
              <button
                onClick={handleReset}
                className="bg-[#383A4899] text-white w-full md:w-40 h-12 rounded-xl shadow-md cursor-pointer opacity-100 text-[14px] hover:opacity-70 transition duration-200"
              >
                გასუფთავება
              </button>
            ) : (
              <button
                onClick={handleCompare}
                disabled={!original.trim() || !modified.trim()}
                className="bg-[#4A6CF7] text-white w-full md:w-40 h-12 rounded-xl shadow-md cursor-pointer opacity-100 text-[14px] hover:opacity-80 transition duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                შედარება
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
