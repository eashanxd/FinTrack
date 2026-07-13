import "./Dashboard.css";
import SummaryCard from "./SummaryCard";
import SpendingOverview from "./SpendingOverview";
import RecentTransactions from "./RecentTransactions";
import BudgetGoals from "./BudgetGoals";

function Dashboard({ transactions, summary, currentUser, onAddTransaction }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const userName = currentUser?.name || "John";

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <h1 className="welcome-title">Welcome back, {userName} 👋</h1>
            <p className="welcome-date">{today}</p>
            {transactions.length === 0 ? (
              <p className="welcome-summary">
                Get started by adding your first transaction to begin tracking your finances.
              </p>
            ) : (
              <p className="welcome-summary">
                You have {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} recorded.
              </p>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <SummaryCard
            title="Total Balance"
            value={`$${summary.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            change={transactions.length > 0 ? "+12.4%" : null}
            trend={transactions.length > 0 ? "up" : null}
            icon="balance"
          />
          <SummaryCard
            title="Income"
            value={`$${summary.income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            change={transactions.length > 0 ? "+8.2%" : null}
            trend={transactions.length > 0 ? "up" : null}
            icon="income"
          />
          <SummaryCard
            title="Expenses"
            value={`$${summary.expenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            change={transactions.length > 0 ? "-2.1%" : null}
            trend={transactions.length > 0 ? "down" : null}
            icon="expenses"
          />
          <SummaryCard
            title="Savings"
            value={`$${summary.savings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            change={transactions.length > 0 ? "+15.3%" : null}
            trend={transactions.length > 0 ? "up" : null}
            icon="savings"
          />
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* Spending Overview */}
          <div className="dashboard-card spending-card">
            <SpendingOverview transactions={transactions} />
          </div>

          {/* Recent Transactions */}
          <div className="dashboard-card transactions-card">
            <RecentTransactions transactions={transactions} />
          </div>

          {/* Budget Goals */}
          <div className="dashboard-card budget-card">
            <BudgetGoals />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
