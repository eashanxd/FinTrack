import { databases } from '../lib/appwrite';
import { Query } from 'appwrite';

/**
 * Transaction Database Service
 * 
 * Handles all transaction CRUD operations using Appwrite Databases.
 * All transactions are associated with the authenticated user's ID.
 */

// Database and Collection IDs
// These should be configured in your Appwrite project
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'default';
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_TRANSACTIONS_COLLECTION_ID || 'transactions';

/**
 * Create a new transaction document in Appwrite
 * @param {Object} transaction - Transaction data
 * @param {string} transaction.name - Transaction description
 * @param {string} transaction.category - Transaction category
 * @param {number} transaction.amount - Transaction amount (positive for income, negative for expense)
 * @param {string} transaction.date - Transaction date
 * @param {string} userId - Authenticated user's ID
 * @returns {Promise<Object>} - Created transaction document
 */
export const createTransaction = async (transaction, userId) => {
  try {
    const document = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      'unique()', // Auto-generate document ID
      {
        name: transaction.name,
        category: transaction.category,
        amount: transaction.amount,
        date: transaction.date || new Date().toISOString(),
        userId: userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
    return document;
  } catch (error) {
    console.error('Create transaction error:', error);
    throw error;
  }
};

/**
 * Get all transactions for the authenticated user
 * @param {string} userId - Authenticated user's ID
 * @returns {Promise<Array>} - Array of transaction documents
 */
export const getTransactions = async (userId) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.equal('userId', userId),
        Query.orderDesc('createdAt'),
      ]
    );
    return response.documents;
  } catch (error) {
    console.error('Get transactions error:', error);
    throw error;
  }
};

/**
 * Update an existing transaction
 * @param {string} id - Document ID
 * @param {Object} transaction - Updated transaction data
 * @returns {Promise<Object>} - Updated transaction document
 */
export const updateTransaction = async (id, transaction) => {
  try {
    const document = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      id,
      {
        name: transaction.name,
        category: transaction.category,
        amount: transaction.amount,
        date: transaction.date,
        updatedAt: new Date().toISOString(),
      }
    );
    return document;
  } catch (error) {
    console.error('Update transaction error:', error);
    throw error;
  }
};

/**
 * Delete a transaction
 * @param {string} id - Document ID
 * @returns {Promise<void>}
 */
export const deleteTransaction = async (id) => {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
  } catch (error) {
    console.error('Delete transaction error:', error);
    throw error;
  }
};

/**
 * Get a single transaction by ID
 * @param {string} id - Document ID
 * @returns {Promise<Object>} - Transaction document
 */
export const getTransactionById = async (id) => {
  try {
    const document = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
    return document;
  } catch (error) {
    console.error('Get transaction by ID error:', error);
    throw error;
  }
};

/**
 * Get transactions by category for a user
 * @param {string} userId - Authenticated user's ID
 * @param {string} category - Category to filter by
 * @returns {Promise<Array>} - Array of transaction documents
 */
export const getTransactionsByCategory = async (userId, category) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.equal('userId', userId),
        Query.equal('category', category),
        Query.orderDesc('createdAt'),
      ]
    );
    return response.documents;
  } catch (error) {
    console.error('Get transactions by category error:', error);
    throw error;
  }
};

/**
 * Get transactions within a date range for a user
 * @param {string} userId - Authenticated user's ID
 * @param {string} startDate - Start date (ISO string)
 * @param {string} endDate - End date (ISO string)
 * @returns {Promise<Array>} - Array of transaction documents
 */
export const getTransactionsByDateRange = async (userId, startDate, endDate) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.equal('userId', userId),
        Query.greaterThanEqual('createdAt', startDate),
        Query.lessThanEqual('createdAt', endDate),
        Query.orderDesc('createdAt'),
      ]
    );
    return response.documents;
  } catch (error) {
    console.error('Get transactions by date range error:', error);
    throw error;
  }
};
