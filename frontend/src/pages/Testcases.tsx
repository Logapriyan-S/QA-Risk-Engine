import React, { useState, useEffect } from "react";
import type { Testcase } from "../types";
import {
  Plus,
  Edit2,
  Trash2,
  ClipboardCheck,
  Filter,
  Beaker,
} from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { api } from "../services/api";

export default function Testcases() {
  const [testcases, setTestcases] = useState<Testcase[]>([]);
  const [filter, setFilter] = useState({ status: "All", priority: "All" });
  const [isLoading, setIsLoading] = useState(true);

  const fetchTestcases = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/testcases/");
      setTestcases(res.data);
    } catch (error) {
      console.error("Failed to load test cases", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestcases();
  }, []);

  const filtered = testcases.filter(
    (t) =>
      (filter.status === "All" || t.status === filter.status) &&
      (filter.priority === "All" || t.priority === filter.priority)
  );

  return (
    <div className="space-y-10 pb-16">
      {/* ===== Header ===== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Validation Suite
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            Execute and monitor security test scenarios
          </p>
        </div>

        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white gap-2 shadow-lg">
          <Plus size={18} /> New Validation
        </Button>
      </div>

      {/* ===== Filter Bar ===== */}
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20">
        <div className="flex flex-wrap gap-4 bg-zinc-900/80 backdrop-blur-xl p-5 rounded-2xl border border-zinc-800">
          <div className="flex-1 min-w-[200px] relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <select
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white text-sm outline-none focus:border-indigo-500"
              value={filter.status}
              onChange={(e) =>
                setFilter({ ...filter, status: e.target.value })
              }
            >
              <option value="All">All Statuses</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px] relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <select
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white text-sm outline-none focus:border-indigo-500"
              value={filter.priority}
              onChange={(e) =>
                setFilter({ ...filter, priority: e.target.value })
              }
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* ===== Testcase Grid ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-full py-20 text-center bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-zinc-800">
            <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-zinc-500">
              Syncing with validation engine...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-zinc-800">
            <ClipboardCheck className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500">
              No testcases found matching your criteria.
            </p>
          </div>
        ) : (
          filtered.map((tc) => (
            <div
              key={tc.id}
              className="relative rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20"
            >
              <div className="bg-zinc-900/80 backdrop-blur-xl p-6 rounded-2xl border border-zinc-800 hover:border-indigo-500/40 transition-all group">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <Badge
                      variant={
                        tc.priority === "High"
                          ? "danger"
                          : tc.priority === "Medium"
                          ? "warning"
                          : "default"
                      }
                      className="mb-3 text-[10px]"
                    >
                      {tc.priority} Priority
                    </Badge>

                    <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {tc.title}
                    </h4>
                  </div>

                  <div
                    className={`px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider border ${
                      tc.status === "Passed"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : tc.status === "Failed"
                        ? "bg-red-500/10 text-red-400 border-red-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {tc.status}
                  </div>
                </div>

                {/* Steps */}
                <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Beaker size={14} className="text-zinc-600" />
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      Execution Steps
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed italic">
                    {tc.steps}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
                      Expectation
                    </span>
                    <p className="text-xs font-semibold text-zinc-300 mt-1">
                      {tc.expected_result}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="p-2 text-zinc-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
