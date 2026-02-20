import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  AlertTriangle,
  ClipboardCheck,
  ShieldCheck,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", path: "/projects", icon: FolderKanban },
    { name: "Risks", path: "/risks", icon: AlertTriangle },
    { name: "Testcases", path: "/testcases", icon: ClipboardCheck },
  ];

  return (
    <div className="h-full w-64 relative p-[1px] bg-gradient-to-b from-indigo-500/20 via-purple-500/20 to-blue-500/20">
      <div className="h-full bg-zinc-900/80 backdrop-blur-xl border-r border-zinc-800 flex flex-col">

        {/* Logo */}
        <div className="px-6 py-6 border-b border-zinc-800 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <span className="font-semibold text-lg bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            RiskEngine
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                    : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
                }`}
              >
                <item.icon
                  size={18}
                  className={isActive ? "text-indigo-400" : "text-zinc-400 group-hover:text-indigo-400"}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom User */}
        <div className="px-4 py-4 border-t border-zinc-800">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-800/70 border border-zinc-700">
            <span className="text-sm text-zinc-300">Admin</span>
            <LogOut
              size={16}
              className="text-zinc-400 hover:text-indigo-400 cursor-pointer transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
