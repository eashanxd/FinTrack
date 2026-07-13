import { useMemo } from "react";
import "./Analytics.css";
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateNetBalance,
  calculateAverageTransaction,
  calculateSavingsRate,
} from "../../utils/analytics";

function KPICards({ transactions }) {
  const kpiData = useMemo(() => {
    const totalIncome = calculateTotalIncome(transactions);
    const totalExpenses = calculateTotalExpenses(transactions);
    const netBalance = calculateNetBalance(transactions);
    const avgTransaction = calculateAverageTransaction(transactions);
    const savingsRate = calculateSavingsRate(transactions);

    return [
      {
        title: "Total Income",
        value: `$${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        change: transactions.length > 0 ? null : null,
        trend: null,
        icon: "📈",
        color: "green",
      },
      {
        title: "Total Expenses",
        value: `$${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        change: transactions.length > 0 ? null : null,
        trend: null,
        icon: "📉",
        color: "red",
      },
      {
        title: "Net Balance",
        value: `$${netBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        change: transactions.length > 0 ? null : null,
        trend: null,
        icon: "💰",
        color: "blue",
      },
      {
        title: "Avg Transaction",
        value: `$${avgTransaction.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        change: transactions.length > 0 ? null : null,
        trend: null,
        icon: "📊",
        color: "purple",
      },
    ];
  }, [transactions]);

  return (
    <div className="kpi-cards">
      {kpiData.map((kpi, index) => (
        <div key={index} className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-icon">{kpi.icon}</span>
            {kpi.change && (
              <span className={`kpi-trend ${kpi.trend}`}>
                {kpi.trend === "up" ? "↑" : "↓"} {kpi.change}
              </span>
            )}
          </div>
          <div className="kpi-value">{kpi.value}</div>
          <div className="kpi-title">{kpi.title}</div>
        </div>
      ))}
    </div>
  );
}

export default KPICards;
