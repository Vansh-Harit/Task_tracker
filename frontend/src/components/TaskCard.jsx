import React, { useState } from 'react';
import { Calendar, Edit, Trash2, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskCard = ({ task, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return { border: '1px solid rgba(16, 185, 129, 0.5)', color: '#6ee7b7' }; // Green
      case 'in-progress': return { border: '1px solid rgba(59, 130, 246, 0.5)', color: '#93c5fd' }; // Blue
      default: return { border: '1px solid rgba(156, 163, 175, 0.5)', color: '#d1d5db' }; // Grey
    }
  };

  const statusStyle = getStatusColor(task.status);

  return (
    <div className="task-card glass-panel" data-id={task._id}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span className={`badge priority-${task.priority}`}>
            {task.priority}
          </span>
          <span className="badge" style={statusStyle}>
            {task.status.replace('-', ' ')}
          </span>
        </div>
      </div>
      
      <p className="task-desc">{task.description || 'No description provided.'}</p>
      
      <div className="task-footer">
        <div className="task-date">
          <Calendar size={14} />
          <span>{formatDate(task.dueDate)}</span>
        </div>
        <div className="action-buttons">
          {showConfirm ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: '#fca5a5' }}>Are you sure?</span>
              <button onClick={() => onDelete(task._id)} className="icon-btn" style={{ color: '#ef4444' }} title="Confirm Delete">
                <Check size={16} />
              </button>
              <button onClick={() => setShowConfirm(false)} className="icon-btn" title="Cancel">
                <X size={16} />
              </button>
            </div>
          ) : (
            <>
              <Link to={`/edit/${task._id}`} className="icon-btn" title="Edit Task">
                <Edit size={18} />
              </Link>
              <button onClick={() => setShowConfirm(true)} className="icon-btn delete" title="Delete Task">
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
