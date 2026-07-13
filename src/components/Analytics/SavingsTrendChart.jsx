import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./Analytics.css";
import { calculateSavingsTrend } from "../../utils/analytics";

function SavingsTrendChart({ transactions }) {
  const data = useMemo(() => {
    return calculateSavingsTrend(transactions, 6);
  }, [transactions]);

  if (data.length === 0) {
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h3 className="chart-title">Savings Trend</h3>
        </div>
        <div className="chart-empty-state">
          <p>No savings data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">Savings Trend</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" stroke="#a1a1aa" />
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
          <Area
            type="monotone"
            dataKey="savings"
            stroke="#10b981"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#savingsGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SavingsTrendChart;
