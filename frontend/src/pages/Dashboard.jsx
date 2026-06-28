import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs';
import { PlusCircle } from 'lucide-react';
import TaskList from '../components/TaskList';

const Dashboard = ({ tasks, filterStatus, sortBy, onFilterChange, onSortChange, onDeleteTask }) => {
  const isInitialMount = useRef(true);

  // AnimeJS staggered animation when tasks array changes
  useEffect(() => {
    // Only animate if tasks exist, and we avoid re-triggering if no tasks are present
    if (tasks.length > 0) {
      anime({
        targets: '.task-card-wrapper',
        translateY: [40, 0],
        opacity: [0, 1],
        delay: anime.stagger(50),
        easing: "spring(1, 80, 10, 0)",
      });
    }
    isInitialMount.current = false;
  }, [tasks]);

  const handleDelete = async (id) => {
    // The "Are you sure?" confirmation is handled inside TaskCard.
    const cardElement = document.querySelector(`.task-card[data-id="${id}"]`);
    if (cardElement) {
      // Animate the card shrinking/fading out before triggering global delete
      anime({
        targets: cardElement.parentElement,
        scale: [1, 0.8],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInOutQuad',
        complete: () => {
          onDeleteTask(id).catch(console.error);
        }
      });
    } else {
      onDeleteTask(id).catch(console.error);
    }
  };

  return (
    <div className="page-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Your Tasks</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your daily goals and objectives.</p>
        </div>
        <Link to="/create" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PlusCircle size={18} />
          New Task
        </Link>
      </div>

      <TaskList 
        tasks={tasks}
        filterStatus={filterStatus}
        sortBy={sortBy}
        onFilterChange={onFilterChange}
        onSortChange={onSortChange}
        onDeleteTask={handleDelete}
      />
    </div>
  );
};

export default Dashboard;
