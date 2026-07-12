import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import "./Analytics.css";

function ExpenseByCategoryChart() {
  const data = [
    { name: "Food & Dining", value: 850, color: "#6366f1" },
    { name: "Transportation", value: 420, color: "#8b5cf6" },
    { name: "Shopping", value: 680, color: "#ec4899" },
    { name: "Entertainment", value: 320, color: "#f59e0b" },
    { name: "Bills & Utilities", value: 540, color: "#10b981" },
    { name: "Healthcare", value: 280, color: "#3b82f6" },
  ];

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">Expense by Category</h3>
        <span className="chart-badge">This month</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(22, 23, 29, 0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#fafafa",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseByCategoryChart;
