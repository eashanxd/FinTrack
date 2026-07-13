/**
 * Analytics Utility Functions
 * 
 * Helper functions to calculate financial analytics from transaction data.
 * All functions are pure and don't modify the input data.
 */

/**
 * Calculate total income from transactions
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Total income
 */
export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Calculate total expenses from transactions
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Total expenses (absolute value)
 */
export const calculateTotalExpenses = (transactions) => {
  return transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
};

/**
 * Calculate net balance (income - expenses)
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Net balance
 */
export const calculateNetBalance = (transactions) => {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Calculate average transaction value
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Average transaction value
 */
export const calculateAverageTransaction = (transactions) => {
  if (transactions.length === 0) return 0;
  const total = transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  return total / transactions.length;
};

/**
 * Find highest expense transaction
 * @param {Array} transactions - Array of transaction objects
 * @returns {Object|null} Highest expense transaction or null
 */
export const findHighestExpense = (transactions) => {
  const expenses = transactions.filter(t => t.amount < 0);
  if (expenses.length === 0) return null;
  return expenses.reduce((max, t) => (t.amount < max.amount ? t : max), expenses[0]);
};

/**
 * Find highest income transaction
 * @param {Array} transactions - Array of transaction objects
 * @returns {Object|null} Highest income transaction or null
 */
export const findHighestIncome = (transactions) => {
  const incomes = transactions.filter(t => t.amount > 0);
  if (incomes.length === 0) return null;
  return incomes.reduce((max, t) => (t.amount > max.amount ? t : max), incomes[0]);
};

/**
 * Calculate savings rate (percentage of income saved)
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Savings rate as percentage
 */
export const calculateSavingsRate = (transactions) => {
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);
  
  if (income === 0) return 0;
  const savings = income - expenses;
  return (savings / income) * 100;
};

/**
 * Group transactions by category
 * @param {Array} transactions - Array of transaction objects
 * @param {string} type - Transaction type ('income' or 'expense')
 * @returns {Object} Object with category names as keys and total amounts as values
 */
export const groupByCategory = (transactions, type = 'expense') => {
  const filtered = type === 'expense' 
    ? transactions.filter(t => t.amount < 0)
    : transactions.filter(t => t.amount > 0);
  
  return filtered.reduce((acc, t) => {
    const category = t.category || 'Other';
    const amount = Math.abs(t.amount);
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});
};

/**
 * Convert category groups to chart data format
 * @param {Object} categoryGroups - Object with category totals
 * @param {Array} colors - Array of color hex codes
 * @returns {Array} Array of objects suitable for charts
 */
export const categoryGroupsToChartData = (categoryGroups, colors) => {
  return Object.entries(categoryGroups).map(([name, value], index) => ({
    name,
    value,
    color: colors[index % colors.length],
  })).sort((a, b) => b.value - a.value);
};

/**
 * Group transactions by month
 * @param {Array} transactions - Array of transaction objects
 * @returns {Object} Object with month keys and income/expense totals
 */
export const groupByMonth = (transactions) => {
  return transactions.reduce((acc, t) => {
    const date = new Date(t.date);
    const monthKey = date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
    
    if (!acc[monthKey]) {
      acc[monthKey] = { income: 0, expenses: 0 };
    }
    
    if (t.amount > 0) {
      acc[monthKey].income += t.amount;
    } else {
      acc[monthKey].expenses += Math.abs(t.amount);
    }
    
    return acc;
  }, {});
};

/**
 * Convert month groups to chart data format
 * @param {Object} monthGroups - Object with month data
 * @returns {Array} Array of objects suitable for charts
 */
export const monthGroupsToChartData = (monthGroups) => {
  return Object.entries(monthGroups).map(([month, data]) => ({
    month,
    income: data.income,
    expenses: data.expenses,
  }));
};

/**
 * Group transactions by day for spending trend
 * @param {Array} transactions - Array of transaction objects
 * @param {number} days - Number of days to include
 * @returns {Array} Array of daily spending data
 */
export const groupByDay = (transactions, days = 30) => {
  const result = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateKey = date.toISOString().split('T')[0];
    
    const dayTransactions = transactions.filter(t => 
      t.date && t.date.startsWith(dateKey)
    );
    
    const dayTotal = dayTransactions.reduce((sum, t) => 
      sum + Math.abs(t.amount), 0
    );
    
    result.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      amount: dayTotal,
    });
  }
  
  return result;
};

/**
 * Calculate savings trend over time
 * @param {Array} transactions - Array of transaction objects
 * @param {number} months - Number of months to include
 * @returns {Array} Array of monthly savings data
 */
export const calculateSavingsTrend = (transactions, months = 6) => {
  const monthGroups = groupByMonth(transactions);
  const chartData = monthGroupsToChartData(monthGroups);
  
  // Get last N months
  const sortedData = chartData.slice(-months);
  
  return sortedData.map(data => ({
    month: data.month,
    savings: data.income - data.expenses,
  }));
};

/**
 * Get top spending categories
 * @param {Array} transactions - Array of transaction objects
 * @param {number} limit - Maximum number of categories to return
 * @returns {Array} Array of top categories with amounts and percentages
 */
export const getTopCategories = (transactions, limit = 5) => {
  const categoryGroups = groupByCategory(transactions, 'expense');
  const totalExpenses = calculateTotalExpenses(transactions);
  
  const chartData = categoryGroupsToChartData(categoryGroups, [
    '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'
  ]);
  
  return chartData.slice(0, limit).map(item => ({
    ...item,
    percentage: totalExpenses > 0 ? (item.value / totalExpenses) * 100 : 0,
  }));
};

/**
 * Filter transactions by date range
 * @param {Array} transactions - Array of transaction objects
 * @param {string} range - Date range ('today', '7d', '30d', '90d', '1y', 'all')
 * @returns {Array} Filtered transactions
 */
export const filterByDateRange = (transactions, range) => {
  const now = new Date();
  let startDate;
  
  switch (range) {
    case 'today':
      startDate = new Date(now.setHours(0, 0, 0, 0));
      break;
    case '7d':
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case '30d':
      startDate = new Date(now.setDate(now.getDate() - 30));
      break;
    case '90d':
      startDate = new Date(now.setDate(now.getDate() - 90));
      break;
    case '1y':
      startDate = new Date(now.setFullYear(now.getFullYear() - 1));
      break;
    case 'all':
    default:
      return transactions;
  }
  
  return transactions.filter(t => new Date(t.date) >= startDate);
};

/**
 * Generate financial insights based on transaction data
 * @param {Array} transactions - Array of transaction objects
 * @returns {Array} Array of insight objects
 */
export const generateFinancialInsights = (transactions) => {
  const insights = [];
  
  if (transactions.length === 0) {
    return [{
      type: 'info',
      title: 'Start Tracking',
      message: 'Add transactions to get personalized financial insights.',
    }];
  }
  
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const savingsRate = calculateSavingsRate(transactions);
  const highestExpense = findHighestExpense(transactions);
  const topCategories = getTopCategories(transactions, 3);
  
  // Savings rate insight
  if (savingsRate > 20) {
    insights.push({
      type: 'success',
      title: 'Great Savings Rate',
      message: `You're saving ${savingsRate.toFixed(1)}% of your income. Keep it up!`,
    });
  } else if (savingsRate > 0) {
    insights.push({
      type: 'warning',
      title: 'Room for Improvement',
      message: `Your savings rate is ${savingsRate.toFixed(1)}%. Try to increase it to 20%.`,
    });
  } else {
    insights.push({
      type: 'danger',
      title: 'Negative Savings',
      message: `You're spending more than you earn. Review your expenses.`,
    });
  }
  
  // Highest expense insight
  if (highestExpense) {
    insights.push({
      type: 'info',
      title: 'Largest Expense',
      message: `Your biggest expense was $${Math.abs(highestExpense.amount).toFixed(2)} for ${highestExpense.category}.`,
    });
  }
  
  // Top category insight
  if (topCategories.length > 0) {
    insights.push({
      type: 'info',
      title: 'Top Spending Category',
      message: `${topCategories[0].name} accounts for ${topCategories[0].percentage.toFixed(1)}% of your expenses.`,
    });
  }
  
  return insights;
};
