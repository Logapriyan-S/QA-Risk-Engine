import React, { useState, useEffect } from "react";
import type { Risk } from "../types";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ShieldAlert,
  Filter,
} from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { api } from "../services/api";

export default function Risks() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRisks = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/risks/");
      setRisks(res.data);
    } catch (error) {
      console.error("Failed to load risks", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRisks();
  }, []);

  const filteredRisks = risks.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity =
      severityFilter === "All" || r.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-10 pb-16">
      {/* ===== Header ===== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Risk Registry
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            Identify and mitigate project vulnerabilities
          </p>
        </div>

        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white gap-2 shadow-lg">
          <Plus size={18} /> Identify New Risk
        </Button>
      </div>

      {/* ===== Filters Bar ===== */}
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-zinc-900/80 backdrop-blur-xl p-5 rounded-2xl border border-zinc-800">
          <div className="md:col-span-3 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search risks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <select
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white text-sm outline-none focus:border-indigo-500"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option value="All">All Severities</option>
              <option value="High">High Severity</option>
              <option value="Medium">Medium Severity</option>
              <option value="Low">Low Severity</option>
            </select>
          </div>
        </div>
      </div>

      {/* ===== Risks Table ===== */}
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20">
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-zinc-950/60 text-zinc-500 text-[10px] font-bold uppercase tracking-widest border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-4">Risk Identifier</th>
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-20 text-center text-zinc-500"
                    >
                      Retrieving security data...
                    </td>
                  </tr>
                ) : filteredRisks.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-20 text-center text-zinc-500"
                    >
                      No active risks found.
                    </td>
                  </tr>
                ) : (
                  filteredRisks.map((risk) => (
                    <tr
                      key={risk.id}
                      className="hover:bg-zinc-800/40 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-xl border ${
                              risk.severity === "High"
                                ? "bg-red-500/10 border-red-500/30 text-red-400"
                                : "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
                            }`}
                          >
                            <ShieldAlert size={18} />
                          </div>

                          <div>
                            <div className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                              {risk.title}
                            </div>
                            <div className="text-xs text-zinc-500 mt-1 max-w-xs truncate">
                              {risk.description}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <Badge
                          variant={
                            risk.severity === "High"
                              ? "danger"
                              : risk.severity === "Medium"
                              ? "warning"
                              : "success"
                          }
                        >
                          {risk.severity}
                        </Badge>
                      </td>

                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-zinc-950 text-zinc-400 border border-zinc-800">
                          {risk.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setSelectedRisk(risk)}
                            className="p-2 text-zinc-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===== Modal (Glass Theme) ===== */}
      <Modal
        isOpen={!!selectedRisk}
        onClose={() => setSelectedRisk(null)}
        title="Update Risk Analysis"
      >
        {selectedRisk && (
          <form className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase mb-2">
                Title
              </label>
              <input
                defaultValue={selectedRisk.title}
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <select className="bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <select className="bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500">
                <option>Open</option>
                <option>In Progress</option>
                <option>Closed</option>
              </select>
            </div>

            <textarea
              rows={4}
              defaultValue={selectedRisk.description}
              className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                onClick={() => setSelectedRisk(null)}
                className="bg-zinc-800 text-white"
              >
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
