import { useState, useRef } from "react";
import Sidebar, { type PageKey } from "./components/Sidebar";
import TextPanel from "./components/TextPanel";
import ComingSoon from "./components/ComingSoon";
import { compareTexts } from "./utils/diffUtils";
import type { DiffChunk } from "./utils/diffUtils";
import { Plus } from "lucide-react";
import { translations, type Lang } from "./utils/i18n";

type AppState = "editing" | "loading" | "compared";

function App() {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem("lang") as Lang) ?? "ka",
  );

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };
  const t = translations[lang];

  const [activePage, setActivePage] = useState<PageKey>("compare");
  const [visible, setVisible] = useState(true);
  const prevPage = useRef<PageKey>("compare");

  const handleNavigate = (page: PageKey) => {
    if (page === activePage) return;
    setVisible(false);
    setTimeout(() => {
      prevPage.current = page;
      setActivePage(page);
      setVisible(true);
    }, 180);
  };

  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [originalDiff, setOriginalDiff] = useState<DiffChunk[] | null>(null);
  const [modifiedDiff, setModifiedDiff] = useState<DiffChunk[] | null>(null);
  const [appState, setAppState] = useState<AppState>("editing");
  const [progress, setProgress] = useState(0);

  const handleCompare = () => {
    setAppState("loading");
    setProgress(0);

    const steps = [15, 30, 50, 70, 85, 100];
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
        setTimeout(() => setAppState("compared"), 400);
      }
    }, 200);
  };

  const handleNewSession = () => {
    setAppState("editing");
    setOriginalDiff(null);
    setModifiedDiff(null);
    setOriginal("");
    setModified("");
    setProgress(0);
  };

  const isDone = appState === "compared";

  const deletions =
    originalDiff
      ?.filter((c) => c.type === "removed")
      .reduce((acc, c) => acc + c.value.length, 0) ?? 0;
  const insertions =
    modifiedDiff
      ?.filter((c) => c.type === "added")
      .reduce((acc, c) => acc + c.value.length, 0) ?? 0;

  const comingSoonPages: Partial<Record<PageKey, string>> = {
    spellcheck: t.spellcheck,
    "voice-to-text": t.voiceToText,
    "text-to-voice": t.textToVoice,
    pdf: t.pdf,
  };

  const isComingSoon = activePage !== "compare";

  return (
    <div className="flex min-h-screen">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        lang={lang}
      />

      <div
        className="flex-1 p-4 pt-36 sm:p-6 sm:pt-40 lg:pt-10 lg:p-10 bg-white transition-all duration-200"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
        }}
      >
        {isComingSoon ? (
          <ComingSoon
            label={comingSoonPages[activePage]!}
            comingSoonText={t.comingSoon}
          />
        ) : (
          <>
            {/* Header controls */}
            <div className="flex flex-col gap-3 mb-3 md:flex-row md:justify-between md:items-center md:mb-5">
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <select
                  value={lang}
                  onChange={(e) => handleLangChange(e.target.value as Lang)}
                  className="border px-3 py-2 rounded-lg w-full md:w-auto cursor-pointer border-[#E0E0E0] text-[#383A48]"
                >
                  <option value="ka">{t.georgian}</option>
                  <option value="en">{t.english}</option>
                </select>
                <label className="flex items-center gap-2 text-sm text-[#383A48] cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded cursor-pointer"
                  />
                  {t.keepFormat}
                </label>
              </div>
              <button
                onClick={isDone ? handleNewSession : undefined}
                disabled={!isDone}
                className={`text-white text-[14px] justify-center py-2.5 px-4 h-10 flex items-center rounded-md gap-1 transition duration-200 w-full md:w-auto
                  ${
                    isDone
                      ? "bg-[#4A6CF7] cursor-pointer"
                      : "bg-[#383A4899] cursor-not-allowed opacity-100"
                  }`}
              >
                <Plus size={20} />
                {t.newSession}
              </button>
            </div>
            <div className="border border-[#EDEDED] w-full mb-8" />

            {/* loading state */}
            {appState === "loading" && (
              <div
                className="flex flex-col items-center justify-center gap-6"
                style={{ height: "calc(100vh - 450px)" }}
              >
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-6 flex items-center gap-4 w-full max-w-sm">
                  <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">{t.converting}</p>
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
                <button
                  disabled
                  className="bg-[#4A6CF7] text-white w-full md:w-40 h-12 rounded-xl shadow-md text-[14px] transition duration-200 disabled:bg-[#383A4899] disabled:cursor-not-allowed cursor-pointer"
                >
                  {t.compare_btn}
                </button>
              </div>
            )}

            {/* text panels */}
            {appState !== "loading" && (
              <>
                {appState === "compared" && (
                  <div className="flex justify-center mb-5">
                    <div className="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
                      {t.comparisonDone} &nbsp;|&nbsp; {t.deleted}:{" "}
                      <span className="text-[#B50022] font-medium">
                        {deletions}
                      </span>
                      &nbsp;|&nbsp; {t.added}:{" "}
                      <span className="text-[#3EBC5E] font-medium">
                        {insertions}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <TextPanel
                      value={original}
                      onChange={setOriginal}
                      diff={appState === "compared" ? originalDiff : null}
                      readOnly={appState === "compared"}
                      placeholder={t.placeholder}
                    />
                  </div>

                  <div className="flex items-center justify-center text-2xl text-[#323232] py-1 md:py-0 md:px-2">
                    <span className="md:hidden">↕</span>
                    <span className="hidden md:inline">↔</span>
                  </div>

                  <div className="flex-1">
                    <TextPanel
                      value={modified}
                      onChange={setModified}
                      diff={appState === "compared" ? modifiedDiff : null}
                      readOnly={appState === "compared"}
                      placeholder={t.placeholder}
                    />
                  </div>
                </div>

                <div className="flex justify-center mt-6 md:mt-8">
                  <button
                    onClick={handleCompare}
                    disabled={
                      appState === "compared" ||
                      !original.trim() ||
                      !modified.trim()
                    }
                    className="bg-[#4A6CF7] text-white w-full md:w-40 h-12 rounded-xl shadow-md text-[14px] transition duration-200 disabled:bg-[#383A4899] disabled:cursor-not-allowed cursor-pointer"
                  >
                    {t.compare_btn}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
