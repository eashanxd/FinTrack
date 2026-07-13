import { useMemo } from "react";
import "./Analytics.css";
import { getTopCategories } from "../../utils/analytics";

function TopSpendingCategories({ transactions }) {
  const categories = useMemo(() => {
    return getTopCategories(transactions, 5);
  }, [transactions]);

  const iconMap = {
    "Food & Dining": "🍔",
    "Transportation": "🚗",
    "Shopping": "🛒",
    "Entertainment": "🎬",
    "Bills & Utilities": "💡",
    "Healthcare": "🏥",
    "Salary": "💰",
    "Freelance": "💼",
    "Investments": "📈",
    "Gifts": "🎁",
    "Refunds": "💸",
    "Education": "📚",
    "Other": "📦",
  };

  if (categories.length === 0) {
    return (
      <div className="top-categories">
        <div className="section-header">
          <h3 className="section-title">Top Spending Categories</h3>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h3 className="empty-state-title">No spending categories</h3>
          <p className="empty-state-description">Add expense transactions to see your top spending categories.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="top-categories">
      <div className="section-header">
        <h3 className="section-title">Top Spending Categories</h3>
      </div>
      <div className="categories-list">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-info">
              <span className="category-icon">{iconMap[category.name] || "📦"}</span>
              <div className="category-details">
                <span className="category-name">{category.name}</span>
                <span className="category-amount">${category.value.toFixed(2)}</span>
              </div>
            </div>
            <div className="category-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
              <span className="category-percentage">{category.percentage.toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopSpendingCategories;
