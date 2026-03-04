/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { AudioLines, File, Text, Mic, SpellCheck, Menu, X } from "lucide-react";
import UserPanel from "./UserPanel";

export type PageKey =
  | "compare"
  | "spellcheck"
  | "voice-to-text"
  | "text-to-voice"
  | "pdf";

interface SidebarProps {
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
}

const navItems: { key: PageKey; label: string; icon: React.ReactNode }[] = [
  { key: "spellcheck", label: "მართლმწერი", icon: <SpellCheck size={20} /> },
  { key: "compare", label: "ტექსტის შედარება", icon: <Text size={20} /> },
  { key: "voice-to-text", label: "ხმა → ტექსტი", icon: <Mic size={20} /> },
  {
    key: "text-to-voice",
    label: "ტექსტი → ხმა",
    icon: <AudioLines size={20} />,
  },
  { key: "pdf", label: "PDF კონვერტაცია", icon: <File size={20} /> },
];

function NavList({
  activePage,
  onNavigate,
}: {
  activePage: PageKey;
  onNavigate: (p: PageKey) => void;
}) {
  const activeIdx = navItems.findIndex((i) => i.key === activePage);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const activeIdxRef = useRef(activeIdx);
  const [ready, setReady] = useState(false);

  const updatePill = (idx: number, animate: boolean) => {
    const el = btnRefs.current[idx];
    const pill = pillRef.current;
    if (!el || !pill) return;
    pill.style.transition = animate
      ? "top 0.28s cubic-bezier(0.4, 0, 0.2, 1)"
      : "none";
    pill.style.top = `${el.offsetTop}px`;
    pill.style.height = `${el.offsetHeight}px`;
  };

  useEffect(() => {
    updatePill(activeIdxRef.current, false);
    setReady(true);
  }, []);

  useEffect(() => {
    activeIdxRef.current = activeIdx;
    if (ready) updatePill(activeIdx, true);
  }, [activeIdx, ready]);

  useEffect(() => {
    const observer = new ResizeObserver(() =>
      updatePill(activeIdxRef.current, false),
    );
    btnRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="relative -mx-3.5">
      <div
        ref={pillRef}
        className="absolute left-0 right-0 bg-white rounded-lg shadow-sm pointer-events-none"
        style={{ zIndex: 0, opacity: ready ? 1 : 0 }}
      />
      <div className="flex flex-col gap-2">
        {navItems.map((item, idx) => {
          const isActive = activePage === item.key;
          return (
            <button
              key={item.key}
              ref={(el) => {
                btnRefs.current[idx] = el;
              }}
              onClick={() => onNavigate(item.key)}
              className={`relative z-10 flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg whitespace-nowrap cursor-pointer transition-colors duration-200
                ${isActive ? "text-[#132450] font-semibold" : "text-white opacity-70"}`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleNavigate = (page: PageKey) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const activeItem = navItems.find((i) => i.key === activePage);

  return (
    <>
      {/* Mobile/Tablet Header */}
      <div className="fixed top-0 left-0 right-0 flex lg:hidden bg-[#132450] text-white w-full p-4 justify-between items-center z-40">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Enagram Logo" className="w-[42.65px]" />
          <h1 className="font-bold">ENAGRAM</h1>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="cursor-pointer"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile/Tablet Page Switcher Bar */}
      <div className="fixed top-18 left-0 right-0 z-30 lg:hidden bg-white border-b border-gray-100 px-4 py-5 shadow-sm">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-[#132450] font-semibold text-sm cursor-pointer"
          >
            <span className="text-[#4A6CF7]">{activeItem?.icon}</span>
            <span>{activeItem?.label}</span>
            <svg
              className={`w-4 h-4 text-gray-400 ml-0.5 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10 "
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute top-8 left-0 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 min-w-52.5 ">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      handleNavigate(item.key);
                      setDropdownOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors cursor-pointer
                      ${
                        activePage === item.key
                          ? "text-[#4A6CF7] font-semibold bg-blue-50"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile/Tablet Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-[#132450] text-white p-6 flex flex-col transform transition-transform duration-300 z-50 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex gap-4 mb-10">
          <img src={logo} alt="Enagram Logo" className="w-[42.65px]" />
          <h1 className="my-2 font-bold">ENAGRAM</h1>
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>
        <NavList activePage={activePage} onNavigate={handleNavigate} />
        <UserPanel />
      </div>

      {/* Desktop Sidebar - lg and above */}
      <div className="hidden lg:flex bg-[#132450] text-white w-60 max-h-screen flex-col p-6">
        <div className="flex gap-4 mb-10">
          <img src={logo} alt="Enagram Logo" className="w-[42.65px]" />
          <h1 className="my-2 font-bold">ENAGRAM</h1>
        </div>
        <NavList activePage={activePage} onNavigate={handleNavigate} />
        <UserPanel />
      </div>
    </>
  );
}
