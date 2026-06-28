import React, { useState, useEffect } from 'react';

const TaskForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
  });

  const [errors, setErrors] = useState({});

  // Pre-fill form if editing an existing task
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'pending',
        priority: initialData.priority || 'medium',
        // Convert ISO date string to YYYY-MM-DD for the date input
        dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear inline error as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // Validate title presence
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    // Validate due date is not in the past (only if provided)
    if (formData.dueDate) {
      // Parse the input date as local time to avoid timezone offset issues
      const selectedDate = new Date(formData.dueDate + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to midnight for accurate date-only comparison

      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Pass the fully validated and controlled data back to the parent component
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* Title Field */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem' }}>Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.5rem', borderColor: errors.title ? 'red' : '#ccc' }}
        />
        {errors.title && <span style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.title}</span>}
      </div>

      {/* Description Field */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          style={{ width: '100%', padding: '0.5rem', borderColor: '#ccc' }}
        />
      </div>

      {/* Status Field */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="status" style={{ display: 'block', marginBottom: '0.5rem' }}>Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.5rem', borderColor: '#ccc' }}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Priority Field */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="priority" style={{ display: 'block', marginBottom: '0.5rem' }}>Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.5rem', borderColor: '#ccc' }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Due Date Field */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="dueDate" style={{ display: 'block', marginBottom: '0.5rem' }}>Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.5rem', borderColor: errors.dueDate ? 'red' : '#ccc' }}
        />
        {errors.dueDate && <span style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.dueDate}</span>}
      </div>

      {/* Submit Button */}
      <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
        {initialData ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
