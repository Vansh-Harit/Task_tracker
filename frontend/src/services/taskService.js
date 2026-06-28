import axios from 'axios';

// Helper to safely resolve the base URL regardless of the bundler (Vite vs Webpack/CRA)
const getBaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }
  // Default fallback for local development if environment variables are not set
  return 'http://localhost:5000/api/tasks';
};

// Create a configured axios instance
const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Reusable helper to execute requests and extract the data or throw meaningful errors.
 * Assumes the backend follows the structured format: { success, message, data }
 */
const handleRequest = async (request) => {
  try {
    const response = await request();
    // Return just the core data payload so components don't have to deal with nested response objects
    return response.data.data;
  } catch (error) {
    // If the backend returned a structured error response, extract that message
    const message = error.response?.data?.message || error.message || 'An unknown error occurred';
    throw new Error(message);
  }
};

export const getAllTasks = (params = {}) => {
  // params can include { status: 'pending', sortBy: 'dueDate' }
  return handleRequest(() => apiClient.get('/', { params }));
};

export const getTaskById = (id) => {
  return handleRequest(() => apiClient.get(`/${id}`));
};

export const createTask = (taskData) => {
  return handleRequest(() => apiClient.post('/', taskData));
};

export const updateTask = (id, taskData) => {
  return handleRequest(() => apiClient.put(`/${id}`, taskData));
};

export const deleteTask = (id) => {
  return handleRequest(() => apiClient.delete(`/${id}`));
};
