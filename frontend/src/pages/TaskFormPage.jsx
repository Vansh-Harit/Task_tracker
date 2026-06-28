import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import anime from 'animejs';
import { ArrowLeft } from 'lucide-react';
import TaskForm from '../components/TaskForm';

const TaskFormPage = ({ tasks, onAddTask, onUpdateTask }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);

  // If editing, find the task from the global tasks array
  // If tasks is undefined (e.g. creating route), initialData will be undefined
  const initialData = id && tasks ? tasks.find(t => t._id === id) : null;

  useEffect(() => {
    // Animate page entry
    if (formRef.current) {
      anime({
        targets: formRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo'
      });
    }
  }, []);

  const handleSubmit = async (formData) => {
    try {
      if (id && onUpdateTask) {
        await onUpdateTask(id, formData);
      } else if (onAddTask) {
        await onAddTask(formData);
      }
      navigate('/');
    } catch (err) {
      // The error is handled and displayed globally in App.jsx,
      // so we just catch it here to prevent the navigation from occurring on failure
    }
  };

  return (
    <div className="page-wrapper" ref={formRef} style={{ opacity: 0, maxWidth: '600px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px', color: 'var(--text-muted)' }}>
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>
      
      <div className="glass-panel" style={{ padding: '32px' }}>
        <h1 style={{ marginBottom: '24px', fontSize: '1.75rem' }}>
          {id ? 'Edit Task' : 'Create New Task'}
        </h1>
        
        {/* If we are editing and the task hasn't loaded yet from global state, we could show a message */}
        {id && !initialData ? (
          <p style={{ color: 'var(--text-muted)' }}>Locating task data...</p>
        ) : (
          <TaskForm 
            initialData={initialData} 
            onSubmit={handleSubmit} 
          />
        )}
      </div>
    </div>
  );
};

export default TaskFormPage;
