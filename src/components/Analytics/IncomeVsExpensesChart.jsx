import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./Analytics.css";

function IncomeVsExpensesChart() {
  const data = [
    { month: "Jan", income: 4500, expenses: 3200 },
    { month: "Feb", income: 4800, expenses: 3400 },
    { month: "Mar", income: 5200, expenses: 3800 },
    { month: "Apr", income: 4900, expenses: 3100 },
    { month: "May", income: 5500, expenses: 4200 },
    { month: "Jun", income: 5800, expenses: 3900 },
  ];

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">Monthly Income vs Expenses</h3>
        <span className="chart-badge">Last 6 months</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" stroke="#a1a1aa" />
          <YAxis stroke="#a1a1aa" />
          <Tooltip
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
