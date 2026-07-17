import { account, ID } from "../lib/appwrite";

/**
 * Register a new user with Appwrite
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @param {string} name - User's display name
 * @returns {Promise<Object>} - Created user object
 */
export const register = async (email, password, name) => {
  try {
    await account.create(
  ID.unique(),
  email,
  password,
  name
);

await account.createEmailPasswordSession(email, password);

return await account.get();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * Login user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} - Session object
 */
export const login = async (email, password) => {
  try {
    // Remove existing session if one exists
    try {
      await account.deleteSession("current");
    } catch (err) {
      // Ignore if there is no active session
    }

    // Create a new session
    await account.createEmailPasswordSession(email, password);

    // Return the logged-in user
    return await account.get();
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * Logout current user
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Get current user session
 * @returns {Promise<Object|null>} - User object if authenticated, null otherwise
 */
export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    // No active session
    if (error.code === 401) {
      return null;
    }
    console.error('Get current user error:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns {Promise<boolean>} - True if authenticated, false otherwise
 */
export const isAuthenticated = async () => {
  try {
    await account.get();
    return true;
  } catch (error) {
    return false;
  }
};
