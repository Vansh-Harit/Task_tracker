import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks = [], filterStatus, sortBy, onFilterChange, onSortChange, onDeleteTask }) => {
  return (
    <div>
      {/* Controls Container */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label htmlFor="filterStatus" style={{ margin: 0 }}>Status:</label>
          <select 
            id="filterStatus" 
            value={filterStatus} 
            onChange={(e) => onFilterChange(e.target.value)}
            style={{ width: 'auto', padding: '8px 12px' }}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label htmlFor="sortBy" style={{ margin: 0 }}>Sort By:</label>
          <select 
            id="sortBy" 
            value={sortBy} 
            onChange={(e) => onSortChange(e.target.value)}
            style={{ width: 'auto', padding: '8px 12px' }}
          >
            <option value="">Default</option>
            <option value="dueDate">Due Date</option>
            <option value="createdAt">Created Date</option>
          </select>
        </div>
      </div>

      {/* Tasks Grid or Empty State */}
      {tasks.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '16px' }}>
            No tasks found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map(task => (
            <div key={task._id} style={{ opacity: 0 }} className="task-card-wrapper">
              <TaskCard task={task} onDelete={onDeleteTask} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
