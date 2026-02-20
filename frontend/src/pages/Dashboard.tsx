import { useEffect, useState } from "react";
import {
  FolderKanban,
  AlertTriangle,
  ClipboardCheck,
  Activity,
} from "lucide-react";
import { api } from "../services/api";

interface Stats {
  projects: number;
  risks: number;
  testcases: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    risks: 0,
    testcases: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, risksRes, testcasesRes] = await Promise.all([
          api.get("/projects/"),
          api.get("/risks/"),
          api.get("/testcases/"),
        ]);

        setStats({
          projects: projectsRes.data.length,
          risks: risksRes.data.length,
          testcases: testcasesRes.data.length,
        });
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const Card = ({
    title,
    value,
    Icon,
  }: {
    title: string;
    value: number | string;
    Icon: any;
  }) => (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between hover:border-zinc-700 transition-all">
      <div>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          {title}
        </p>
        <h2 className="text-3xl font-bold mt-2">
          {loading ? "—" : value}
        </h2>
      </div>

      <div className="p-3 rounded-xl bg-zinc-800">
        <Icon size={20} className="text-zinc-300" />
      </div>
    </div>
  );

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">System Overview</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Real-time analytics for Risk Intelligence Platform
        </p>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card
          title="Total Projects"
          value={stats.projects}
          Icon={FolderKanban}
        />
        <Card
          title="Active Risks"
          value={stats.risks}
          Icon={AlertTriangle}
        />
        <Card
          title="Test Scenarios"
          value={stats.testcases}
          Icon={ClipboardCheck}
        />
        <Card
          title="System Health"
          value={
            loading
              ? "—"
              : `${Math.max(
                  0,
                  100 - stats.risks
                )}%`
          }
          Icon={Activity}
        />
      </div>
    </div>
  );
}