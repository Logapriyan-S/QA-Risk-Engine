import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

/* ================= PIE (Risk Severity) ================= */

export function RiskSeverityChart() {
  const data = [
    { name: "High", value: 6 },
    { name: "Medium", value: 10 },
    { name: "Low", value: 4 },
  ];

  const COLORS = ["#ef4444", "#facc15", "#22c55e"];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg h-80">
      <h3 className="text-sm text-zinc-400 mb-4">Risk Severity Distribution</h3>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={90}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ================= BAR (Testcase Status) ================= */

export function TestcaseStatusChart() {
  const data = [
    { name: "Passed", value: 30 },
    { name: "Failed", value: 5 },
    { name: "Pending", value: 12 },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg h-80">
      <h3 className="text-sm text-zinc-400 mb-4">Testcase Status Overview</h3>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
