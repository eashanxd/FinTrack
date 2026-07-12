import { useState } from "react";
import "./Transactions.css";
import TransactionSummary from "./TransactionSummary";
import TransactionFilters from "./TransactionFilters";
import TransactionTable from "./TransactionTable";
import Modal from "../Modal/Modal";
import AddTransactionForm from "../Modal/AddTransactionForm";

function Transactions({ transactions, summary, onAddTransaction, onDeleteTransaction }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTransaction = async (newTransaction) => {
    try {
      await onAddTransaction(newTransaction);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error in handleAddTransaction:', error);
      alert('Failed to add transaction. Please check the console for details.');
    }
  };

  return (
    <div className="transactions-page">
      <div className="transactions-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-header-content">
            <h1 className="page-title">Transactions</h1>
            <p className="page-subtitle">
              View and manage all your financial transactions in one place
            </p>
          </div>
          <button 
            className="btn-primary add-transaction-btn"
            onClick={() => setIsModalOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Transaction
          </button>
        </div>

        {/* Summary Row */}
        <TransactionSummary transactions={transactions} summary={summary} />

        {/* Filters */}
        <TransactionFilters />

        {/* Transaction Table */}
        <TransactionTable 
          transactions={transactions}
          onDeleteTransaction={onDeleteTransaction}
        />
      </div>

      {/* Add Transaction Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddTransactionForm
          onSave={handleAddTransaction}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default Transactions;
