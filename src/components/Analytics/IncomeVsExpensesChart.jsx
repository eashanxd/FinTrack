import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./Analytics.css";
import { groupByMonth, monthGroupsToChartData } from "../../utils/analytics";

function IncomeVsExpensesChart({ transactions }) {
  const data = useMemo(() => {
    const monthGroups = groupByMonth(transactions);
    return monthGroupsToChartData(monthGroups);
  }, [transactions]);

  if (data.length === 0) {
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h3 className="chart-title">Monthly Income vs Expenses</h3>
        </div>
        <div className="chart-empty-state">
          <p>No transaction data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">Monthly Income vs Expenses</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ fill: "#6366f1", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            name="Expenses"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeVsExpensesChart;
