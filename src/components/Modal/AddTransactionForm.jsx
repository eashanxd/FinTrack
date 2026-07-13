import { useState } from "react";
import "./Modal.css";

function AddTransactionForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = {
    expense: [
      "Food & Dining",
      "Transportation",
      "Shopping",
      "Entertainment",
      "Bills & Utilities",
      "Healthcare",
      "Education",
      "Other",
    ],
    income: [
      "Salary",
      "Freelance",
      "Investments",
      "Gifts",
      "Refunds",
      "Other",
    ],
  };

  const paymentMethods = [
    "Credit Card",
    "Debit Card",
    "Bank Transfer",
    "Cash",
    "PayPal",
    "Other",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Please enter a description";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        await onSave({
          ...formData,
          amount: parseFloat(formData.amount),
          id: Date.now(),
        });
        
        // Clear form after successful submission
        setFormData({
          type: "expense",
          amount: "",
          category: "",
          description: "",
          date: new Date().toISOString().split('T')[0],
          paymentMethod: "",
        });
        setErrors({});
      } catch (error) {
        console.error('Error submitting transaction:', error);
        setError('Failed to submit transaction. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <form className="add-transaction-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2 className="form-title">Add Transaction</h2>
        <button type="button" className="close-btn" onClick={onCancel} aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="form-content">
        {/* Transaction Type */}
        <div className="form-group">
          <label className="form-label">Transaction Type</label>
          <div className="type-toggle">
            <button
              type="button"
              className={`type-btn ${formData.type === "expense" ? "type-btn-active" : ""}`}
              onClick={() => handleChange({ target: { name: "type", value: "expense" } })}
            >
              Expense
            </button>
            <button
              type="button"
              className={`type-btn ${formData.type === "income" ? "type-btn-active" : ""}`}
              onClick={() => handleChange({ target: { name: "type", value: "income" } })}
            >
              Income
            </button>
          </div>
        </div>

        {/* Amount */}
        <div className="form-group">
          <label className="form-label">Amount *</label>
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className={`form-input ${errors.amount ? "form-input-error" : ""}`}
              step="0.01"
              min="0"
            />
          </div>
          {errors.amount && <span className="form-error">{errors.amount}</span>}
        </div>

        {/* Category */}
        <div className="form-group">
          <label className="form-label">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`form-select ${errors.category ? "form-input-error" : ""}`}
          >
            <option value="">Select category</option>
            {categories[formData.type].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <span className="form-error">{errors.category}</span>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">Description *</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className={`form-input ${errors.description ? "form-input-error" : ""}`}
          />
          {errors.description && <span className="form-error">{errors.description}</span>}
        </div>

        {/* Date */}
        <div className="form-group">
          <label className="form-label">Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`form-input ${errors.date ? "form-input-error" : ""}`}
          />
          {errors.date && <span className="form-error">{errors.date}</span>}
        </div>

        {/* Payment Method */}
        <div className="form-group">
          <label className="form-label">Payment Method *</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className={`form-select ${errors.paymentMethod ? "form-input-error" : ""}`}
          >
            <option value="">Select payment method</option>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          {errors.paymentMethod && <span className="form-error">{errors.paymentMethod}</span>}
        </div>

        {/* Form Actions */}
        <div className="form-footer">
          <button type="button" className="btn-secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <svg className="loading-spinner" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3"/>
                  <path d="M8 1C8 1 8 4 8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Transaction"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddTransactionForm;
