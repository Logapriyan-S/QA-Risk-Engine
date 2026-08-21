import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  PlayCircle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { api } from "../services/api";
import type { Testcase } from "../types";

export default function Testcases() {
  const [testcases, setTestcases] = useState<Testcase[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestcases = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/testcases/");
        setTestcases(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to load testcases", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestcases();
  }, []);

  const filteredTests = testcases.filter((tc) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      tc.title.toLowerCase().includes(query) ||
      String(tc.id).toLowerCase().includes(query);
    const matchesFilter = filter === "All" || tc.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Test Scenarios</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage, execute, and monitor automated test cases.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
            <Plus size={16} />
            New Testcase
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-500/20 transition-colors flex items-center gap-2">
            <PlayCircle size={16} />
            Run All Tests
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 p-1">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input
            type="text"
            placeholder="Search by scenario or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600"
          />
        </div>

        <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          {["All", "Pending", "Passed", "Failed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={clsx(
                "px-4 py-1.5 text-xs font-medium rounded-md transition-all",
                filter === status
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl shadow-black/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-950/50 border-b border-zinc-800 text-xs uppercase tracking-wider text-zinc-500">
              <th className="px-6 py-4 font-medium">Test ID</th>
              <th className="px-6 py-4 font-medium">Scenario</th>
              <th className="px-6 py-4 font-medium">Target Project</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Duration</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-zinc-500">
                  Loading testcases...
                </td>
              </tr>
            ) : filteredTests.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-zinc-500">
                  No testcases matched your current filters.
                </td>
              </tr>
            ) : (
              filteredTests.map((tc, index) => (
                <motion.tr
                  key={tc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-zinc-800/30 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-xs text-zinc-400">{tc.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-200">{tc.title}</td>
                  <td className="px-6 py-4 text-xs text-zinc-400">Project #{tc.project}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {tc.status === "Passed" && <CheckCircle2 size={16} className="text-emerald-500" />}
                      {tc.status === "Failed" && <XCircle size={16} className="text-rose-500" />}
                      {tc.status === "Pending" && <AlertCircle size={16} className="text-yellow-500" />}
                      <span
                        className={clsx(
                          "text-xs font-medium",
                          tc.status === "Passed"
                            ? "text-emerald-400"
                            : tc.status === "Failed"
                            ? "text-rose-400"
                            : "text-yellow-400"
                        )}
                      >
                        {tc.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-zinc-500">-</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
