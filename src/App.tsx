import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TextPanel from "./components/TextPanel";
import DiffViewer from "./components/DiffViewer";
import { compareTexts } from "./utils/diffUtils";
import type { DiffChunk } from "./utils/diffUtils";
import { Plus } from "lucide-react";

function App() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [diff, setDiff] = useState<DiffChunk[]>([]);

  const handleCompare = () => {
    const result = compareTexts(original, modified);
    setDiff(result);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 pt-20 md:pt-10 md:p-10 bg-gray-100">
        <div className="flex justify-between items-center mb-8">
          <select className="border px-3 py-2 rounded-lg">
            <option>ქართული</option>
            <option>English</option>
          </select>
          <button className="bg-[#383A4899] text-white text-[14px] justify-center py-2.5 w-37.5 h-10.5 flex rounded-md gap-1 cursor-pointer opacity-100 hover:opacity-70 transition transition-200">
            <Plus size={20} />
            ახალის გახსნა
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <TextPanel value={original} onChange={setOriginal} />
          </div>
          <div className="hidden md:flex items-center justify-center text-3xl text-gray-400 px-2">
            ↔
          </div>
          <div className="flex-1">
            <TextPanel value={modified} onChange={setModified} />
          </div>
        </div>
        {/* Compare Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleCompare}
            className="bg-[#383A4899] text-white  w-35.5 h-12 rounded-xl shadow-md cursor-pointer opacity-100 text-[14px] hover:opacity-70 transition transition-200"
          >
            შედარება
          </button>
        </div>
        {/* Result */}
        {diff.length > 0 && (
          <div className="mt-10">
            <DiffViewer diff={diff} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
