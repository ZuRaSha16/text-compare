import { useState } from "react";
import logo from "../assets/logo.png";
import user from "../assets/user.png";

import {
  AudioLines,
  File,
  Text,
  Mic,
  SpellCheck,
  MoreHorizontal,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 flex md:hidden bg-[#132450] text-white w-full p-4 justify-between items-center z-40">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Enagram Logo" className="w-[42.65px]" />
          <h1 className="font-bold">ENAGRAM</h1>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-[#132450] text-white p-6 flex flex-col transform transition-transform duration-300 z-50 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex gap-4 mb-10">
          <img src={logo} alt="Enagram Logo" className="w-[42.65px]" />
          <h1 className="my-2 font-bold">ENEGRAM</h1>
          <button onClick={() => setMobileOpen(false)} className="ml-auto">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-6 -mx-3.5">
          <button className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg opacity-70 hover:opacity-100 hover:bg-white/10 transition-all duration-200">
            <SpellCheck size={20} />
            მართლმწერი
          </button>
          <button className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg bg-white text-[#132450] font-semibold shadow-sm">
            <Text size={20} />
            ტექსტის შედარება
          </button>
          <button className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg opacity-70 hover:opacity-100 hover:bg-white/10 transition-all duration-200">
            <Mic size={20} />
            ხმა → ტექსტი
          </button>
          <button className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg opacity-70 hover:opacity-100 hover:bg-white/10 transition-all duration-200">
            <AudioLines size={20} />
            ტექსტი → ხმა
          </button>
          <button className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg opacity-70 hover:opacity-100 hover:bg-white/10 transition-all duration-200">
            <File size={20} />
            PDF კონვერტაცია
          </button>
        </nav>

        {/* User Panel */}
        <div className="mt-auto mb-1 w-full">
          <div className="border border-[#9EB9FF33] mb-4 -mx-6"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={user} alt="user" className="w-5 h-5 rounded-full" />
              <h1 className="text-white text-[14px]">თამარ ონიანი</h1>
            </div>
            <MoreHorizontal
              size={24}
              className="cursor-pointer opacity-100 hover:opacity-70 transition-opacity"
            />
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex bg-[#132450] text-white w-60 max-h-screen flex-col p-6">
        <div className="flex gap-4 mb-10">
          <img src={logo} alt="Enagram Logo" className="w-[42.65px]" />
          <h1 className="my-2 font-bold">ENEGRAM</h1>
        </div>

        <nav className="space-y-6 -mx-3.5">
          <button className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg opacity-70 hover:opacity-100 hover:bg-white/10 transition-all duration-200">
            <SpellCheck size={20} />
            მართლმწერი
          </button>
          <button className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg bg-white text-[#132450] font-semibold shadow-sm">
            <Text size={20} />
            ტექსტის შედარება
          </button>
          <button className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg opacity-70 hover:opacity-100 hover:bg-white/10 transition-all duration-200">
            <Mic size={20} />
            ხმა → ტექსტი
          </button>
          <button className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg opacity-70 hover:opacity-100 hover:bg-white/10 transition-all duration-200">
            <AudioLines size={20} />
            ტექსტი → ხმა
          </button>
          <button className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg opacity-70 hover:opacity-100 hover:bg-white/10 transition-all duration-200">
            <File size={20} />
            PDF კონვერტაცია
          </button>
        </nav>

        <div className="mt-auto mb-1 w-full">
          <div className="border border-[#9EB9FF33] mb-4 -mx-6"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={user} alt="user" className="w-5 h-5 rounded-full" />
              <h1 className="text-white text-[14px]">თამარ ონიანი</h1>
            </div>
            <MoreHorizontal
              size={24}
              className="cursor-pointer opacity-100 hover:opacity-70 transition-opacity"
            />
          </div>
        </div>
      </div>
    </>
  );
}
