import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./Analytics.css";

function WeeklySpendingChart() {
  const data = [
    { day: "Mon", spending: 120 },
    { day: "Tue", spending: 85 },
    { day: "Wed", spending: 200 },
    { day: "Thu", spending: 150 },
    { day: "Fri", spending: 280 },
    { day: "Sat", spending: 320 },
    { day: "Sun", spending: 180 },
  ];

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">Weekly Spending</h3>
        <span className="chart-badge">This week</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="day" stroke="#a1a1aa" />
          <YAxis stroke="#a1a1aa" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(22, 23, 29, 0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#fafafa",
            }}
          />
          <Bar dataKey="spending" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeeklySpendingChart;
