import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CheckSquare } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import TaskFormPage from './pages/TaskFormPage';
import { getAllTasks, createTask, updateTask, deleteTask } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initial fetch
  useEffect(() => {
    fetchTasks(filterStatus, sortBy);
  }, []); // Only run on mount, handlers will fetch when filter/sort changes

  const fetchTasks = async (status = filterStatus, sort = sortBy) => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (status) params.status = status;
      if (sort) params.sortBy = sort;
      const data = await getAllTasks(params);
      setTasks(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    fetchTasks(status, sortBy);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    fetchTasks(filterStatus, sort);
  };

  const handleCreateTask = async (taskData) => {
    setLoading(true);
    setError('');
    try {
      const newTask = await createTask(taskData);
      // Depending on the filter/sort, we might just prepend it, or we could refetch,
      // but requirements state: update locally without re-fetching
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      setError(err.message);
      throw err; // throw to let the form know it failed (so it doesn't navigate)
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    setLoading(true);
    setError('');
    try {
      const updatedTask = await updateTask(id, taskData);
      setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    setLoading(true);
    setError('');
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Global Loading Spinner */}
        {loading && (
          <div className="spinner-overlay">
            <div className="spinner"></div>
          </div>
        )}

        <nav className="nav-bar glass-panel">
          <Link to="/" className="nav-logo">
            <CheckSquare size={28} />
            <span>TaskTracker</span>
          </Link>
          <div style={{ color: 'var(--text-muted)' }}>
            Workspace
          </div>
        </nav>
        
        {/* Global Error Banner */}
        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '16px', borderRadius: '8px', marginBottom: '24px', border: '1px solid rgba(239, 68, 68, 0.5)' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  tasks={tasks}
                  filterStatus={filterStatus}
                  sortBy={sortBy}
                  onFilterChange={handleFilterChange}
                  onSortChange={handleSortChange}
                  onDeleteTask={handleDeleteTask}
                />
              } 
            />
            <Route 
              path="/create" 
              element={<TaskFormPage onAddTask={handleCreateTask} />} 
            />
            <Route 
              path="/edit/:id" 
              element={
                <TaskFormPage 
                  tasks={tasks} 
                  onUpdateTask={handleUpdateTask} 
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
