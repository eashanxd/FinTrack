import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./Analytics.css";
import { groupByDay } from "../../utils/analytics";

function WeeklySpendingChart({ transactions }) {
  const data = useMemo(() => {
    return groupByDay(transactions, 7);
  }, [transactions]);

  if (data.length === 0 || data.every(d => d.amount === 0)) {
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h3 className="chart-title">Weekly Spending</h3>
        </div>
        <div className="chart-empty-state">
          <p>No spending data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">Weekly Spending</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" stroke="#a1a1aa" />
          <YAxis stroke="#a1a1aa" />
          <Tooltip
            formatter={(value) => `$${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: "rgba(22, 23, 29, 0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#fafafa",
            }}
          />
          <Bar dataKey="amount" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeeklySpendingChart;
