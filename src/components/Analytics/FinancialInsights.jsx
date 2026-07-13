import { useMemo } from "react";
import "./Analytics.css";
import { generateFinancialInsights } from "../../utils/analytics";

function FinancialInsights({ transactions }) {
  const insights = useMemo(() => {
    return generateFinancialInsights(transactions);
  }, [transactions]);

  const iconMap = {
    success: "✨",
    warning: "⚠️",
    danger: "🚨",
    info: "💡",
  };

  const typeMap = {
    success: "positive",
    warning: "warning",
    danger: "danger",
    info: "info",
  };

  return (
    <div className="financial-insights">
      <div className="section-header">
        <h3 className="section-title">Financial Insights</h3>
      </div>
      <div className="insights-list">
        {insights.map((insight, index) => (
          <div key={index} className={`insight-item insight-${typeMap[insight.type] || 'info'}`}>
            <span className="insight-icon">{iconMap[insight.type] || "💡"}</span>
            <div className="insight-content">
              <h4 className="insight-title">{insight.title}</h4>
              <p className="insight-description">{insight.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FinancialInsights;
