import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Project } from "../types";
import { Plus, Trash2, FolderOpen, Calendar } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/projects/");
      setProjects(res.data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    try {
      await api.post("/projects/", { title, description });
      setTitle("");
      setDescription("");
      fetchProjects();
    } catch (error) {
      console.error("Error creating project", error);
    }
  };

  const deleteProject = async (id: number) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await api.delete(`/projects/${id}/`);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project", error);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* ===== Header ===== */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Project Registry
        </h1>
        <p className="text-sm text-zinc-400 mt-2">
          Manage and monitor all active security assessment projects.
        </p>
      </div>

      {/* ===== Create Form ===== */}
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20">
        <form
          onSubmit={createProject}
          className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6"
        >
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-6">
            Create New Project
          </h3>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 bg-zinc-950/80 border border-zinc-800 px-4 py-3 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all text-sm"
            />

            <input
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-[2] bg-zinc-950/80 border border-zinc-800 px-4 py-3 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all text-sm"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <Plus size={18} />
              Add Project
            </button>
          </div>
        </form>
      </div>

      {/* ===== Projects Table ===== */}
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20">
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-950/60 border-b border-zinc-800 text-zinc-500 font-semibold uppercase tracking-widest text-[10px]">
              <tr>
                <th className="p-5">Project Details</th>
                <th className="p-5">Created Date</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-800">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="p-10 text-center text-zinc-500">
                    Loading projects...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-10 text-center text-zinc-500">
                    No projects found. Create your first one above.
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-zinc-800/40 transition-colors"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400">
                          <FolderOpen size={18} />
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            {p.title}
                          </p>
                          <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-5 text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(p.created_at).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="p-5 text-right">
                      <button
                        onClick={() => deleteProject(p.id)}
                        className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Delete Project"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
