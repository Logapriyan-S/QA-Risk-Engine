import { useAuth } from "../../context/AuthContext";
import { User as UserIcon, LogOut, Bell } from "lucide-react";


export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 border-b border-zinc-800 bg-zinc-900 px-8 flex items-center justify-between">
      {/* Left Section */}
      <div>
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <p className="text-xs text-zinc-500">
          Welcome back, {user?.name || "User"}
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <button className="relative text-zinc-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-zinc-500 rounded-full"></span>
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-zinc-800"></div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold">
              {user?.name || "User"}
            </p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
              {user?.role || "Member"}
            </p>
          </div>

          <div className="bg-zinc-800 p-2 rounded-full border border-zinc-700">
            <UserIcon size={18} />
          </div>

          <button
            onClick={logout}
            className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
