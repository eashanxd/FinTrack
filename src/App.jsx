import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Transactions from "./components/Transactions/Transactions";
import Analytics from "./components/Analytics/Analytics";
import Settings from "./components/Settings/Settings";
import Auth from "./components/Auth/Auth";
import { useAuth } from "./contexts/AuthContext";
import { createTransaction, getTransactions, deleteTransaction as deleteTransactionDb } from "./services/transactions";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const { user, logout } = useAuth();
  
  // Shared transaction state
  const [transactions, setTransactions] = useState([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);

  const [summary, setSummary] = useState({
    totalBalance: 0,
    income: 0,
    expenses: 0,
    savings: 0,
  });

  // Fetch transactions when user logs in
  useEffect(() => {
    if (user) {
      fetchTransactions();
    } else {
      setTransactions([]);
      resetSummary();
    }
  }, [user]);

  const fetchTransactions = async () => {
    if (!user) return;
    
    try {
      setIsLoadingTransactions(true);
      const data = await getTransactions(user.$id);
      
      // Transform Appwrite documents to match the app's transaction format
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

      const formattedTransactions = data.map(doc => ({
        id: doc.$id,
        name: doc.name,
        category: doc.category,
        amount: doc.amount,
        date: doc.date,
        icon: iconMap[doc.category] || "📦",
      }));

      setTransactions(formattedTransactions);
      calculateSummary(formattedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  const calculateSummary = (transactionList) => {
    const income = transactionList
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactionList
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const totalBalance = income - expenses;
    const savings = totalBalance * 0.3; // Simplified savings calculation

    setSummary({
      totalBalance,
      income,
      expenses,
      savings,
    });
  };

  const resetSummary = () => {
    setSummary({
      totalBalance: 0,
      income: 0,
      expenses: 0,
      savings: 0,
    });
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleAddTransaction = async (newTransaction) => {
    if (!user) return;

    try {
      const formattedAmount = newTransaction.type === "expense"
        ? -Math.abs(newTransaction.amount)
        : Math.abs(newTransaction.amount);

      const transactionData = {
        name: newTransaction.description,
        category: newTransaction.category,
        amount: formattedAmount,
        date: newTransaction.date || new Date().toISOString(),
      };

      // Create transaction in Appwrite
      await createTransaction(transactionData, user.$id);

      // Refresh transactions from database
      await fetchTransactions();
    } catch (error) {
      console.error('Error creating transaction:', error);
      alert('Failed to add transaction. Please check the console for details.');
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    if (!user) return;

    try {
      // Delete transaction from Appwrite
      await deleteTransactionDb(transactionId);

      // Refresh transactions from database
      await fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    setCurrentPage("dashboard");
  };

  return (
    <>
      {!user ? (
        <Auth />
      ) : (
        <>
          <Navbar currentPage={currentPage} onNavigate={handleNavigate} onLogout={handleLogout} />
          {currentPage === "dashboard" && (
            <Dashboard 
              transactions={transactions}
              summary={summary}
              onAddTransaction={handleAddTransaction}
              currentUser={user}
            />
          )}
          {currentPage === "transactions" && (
            <Transactions 
              transactions={transactions}
              summary={summary}
              onAddTransaction={handleAddTransaction}
              onDeleteTransaction={handleDeleteTransaction}
            />
          )}
          {currentPage === "analytics" && (
            <Analytics 
              transactions={transactions}
              summary={summary}
            />
          )}
          {currentPage === "settings" && (
            <Settings />
          )}
        </>
      )}
    </>
  );
}

export default App;