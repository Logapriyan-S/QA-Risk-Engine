import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  AlertTriangle,
  ClipboardCheck,
  ShieldCheck,
  LogOut,
  Settings,
  User
} from "lucide-react";
import clsx from "clsx";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", path: "/projects", icon: FolderKanban },
    { name: "Risks", path: "/risks", icon: AlertTriangle },
    { name: "Testcases", path: "/testcases", icon: ClipboardCheck },
  ];

  return (
    <aside className="h-screen w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col flex-shrink-0 relative z-30">
      
      {/* Brand Logo */}
      <div className="h-16 flex items-center px-6 border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <span className="text-lg font-bold text-zinc-100 tracking-tight">
            Risk<span className="text-indigo-500">Engine</span>
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        <p className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
          Platform
        </p>
        
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
              )}
            >
              <item.icon
                size={18}
                className={clsx(
                  "transition-colors",
                  isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"
                )}
              />
              {item.name}
              
              {/* Active Indicator Dot */}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom User Section */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-950/50">
        <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-zinc-900 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
            <User size={16} className="text-zinc-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-zinc-200 group-hover:text-white">Admin User</p>
            <p className="text-xs text-zinc-500">admin@riskengine.ai</p>
          </div>
          <LogOut size={16} className="text-zinc-500 hover:text-rose-400 transition-colors" />
        </button>
      </div>
    </aside>
  );
}