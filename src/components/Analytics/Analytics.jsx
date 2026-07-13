import { useState, useMemo } from "react";
import "./Analytics.css";
import KPICards from "./KPICards";
import IncomeVsExpensesChart from "./IncomeVsExpensesChart";
import ExpenseByCategoryChart from "./ExpenseByCategoryChart";
import WeeklySpendingChart from "./WeeklySpendingChart";
import SavingsTrendChart from "./SavingsTrendChart";
import TopSpendingCategories from "./TopSpendingCategories";
import FinancialInsights from "./FinancialInsights";
import { filterByDateRange } from "../../utils/analytics";

function Analytics({ transactions, summary }) {
  const [dateRange, setDateRange] = useState("30d");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Filter transactions based on selected date range
  const filteredTransactions = useMemo(() => {
    let filtered = filterByDateRange(transactions, dateRange);
    
    if (categoryFilter === "income") {
      filtered = filtered.filter(t => t.amount > 0);
    } else if (categoryFilter === "expense") {
      filtered = filtered.filter(t => t.amount < 0);
    }
    
    return filtered;
  }, [transactions, dateRange, categoryFilter]);

  const hasData = filteredTransactions.length > 0;

  return (
    <div className="analytics-page">
      <div className="analytics-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-header-content">
            <h1 className="page-title">Analytics</h1>
            <p className="page-subtitle">
              Track your financial performance with detailed insights and trends
            </p>
          </div>
          <div className="page-header-filters">
            <select 
              className="date-range-select"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
              <option value="all">All time</option>
            </select>
            <select 
              className="category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All categories</option>
              <option value="income">Income only</option>
              <option value="expense">Expenses only</option>
            </select>
          </div>
        </div>

        {/* KPI Cards */}
        <KPICards transactions={filteredTransactions} />

        {/* Charts Grid */}
        {hasData ? (
          <div className="charts-grid">
            {/* Monthly Income vs Expenses */}
            <div className="chart-card chart-card-large">
              <IncomeVsExpensesChart transactions={filteredTransactions} />
            </div>

            {/* Expense by Category */}
            <div className="chart-card">
              <ExpenseByCategoryChart transactions={filteredTransactions} />
            </div>

            {/* Weekly Spending */}
            <div className="chart-card">
              <WeeklySpendingChart transactions={filteredTransactions} />
            </div>

            {/* Savings Trend */}
            <div className="chart-card">
              <SavingsTrendChart transactions={filteredTransactions} />
            </div>
          </div>
        ) : (
          <div className="charts-grid">
            <div className="chart-card chart-card-large">
              <div className="empty-state">
                <div className="empty-state-icon">📊</div>
                <h3 className="empty-state-title">No data to analyze</h3>
                <p className="empty-state-description">
                  {transactions.length === 0 
                    ? "Add transactions to see your financial analytics and charts."
                    : "No transactions match the selected filters."
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section */}
        {hasData ? (
          <div className="analytics-bottom-section">
            {/* Top Spending Categories */}
            <div className="analytics-card">
              <TopSpendingCategories transactions={filteredTransactions} />
            </div>

            {/* Financial Insights */}
            <div className="analytics-card">
              <FinancialInsights transactions={filteredTransactions} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Analytics;
