import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="relative flex h-screen text-white overflow-hidden bg-zinc-950">
      
      {/* ===== Global Gradient Background ===== */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* ===== Sidebar ===== */}
      <div className="relative z-10">
        <Sidebar />
      </div>

      {/* ===== Main Content ===== */}
      <div className="flex-1 flex flex-col relative z-10">

        {/* Header */}
        <Header />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto px-8 py-8">
          <div className="max-w-7xl mx-auto">

            {/* Page Transition Wrapper */}
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>

          </div>
        </main>
      </div>
    </div>
  );
}
