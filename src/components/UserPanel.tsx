import user from "../assets/user.png";
import { MoreHorizontal } from "lucide-react";

export default function UserPanel() {
  return (
    <div className="mt-auto -mb-2 w-full">
      <div className="border border-[#9EB9FF33] mb-4 -mx-6" />
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
  );
}
