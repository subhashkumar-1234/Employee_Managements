import React, { useState } from 'react';

const initialTasks = [
  { id: 1, title: 'Complete user dashboard UI mockup', priority: 'High' },
  { id: 2, title: 'Connect components to AppContext', priority: 'Medium' },
  { id: 3, title: 'Implement Image Upload with previews', priority: 'High' },
  { id: 4, title: 'Design responsive CSS layouts', priority: 'Low' },
  { id: 5, title: 'Integrate browser localStorage sync', priority: 'High' },
  { id: 6, title: 'Verify production builds and tests', priority: 'Medium' }
];

const CheckboxPage = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedIds, setSelectedIds] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');

  const handleSelectToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllToggle = () => {
    if (selectedIds.length === tasks.length) {
      // Unselect all
      setSelectedIds([]);
    } else {
      // Select all
      setSelectedIds(tasks.map((t) => t.id));
    }
  };

  const handleDeleteSelected = () => {
    setTasks((prev) => prev.filter((t) => !selectedIds.includes(t.id)));
    setSelectedIds([]);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      priority: newTaskPriority
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle('');
  };

  const handleReset = () => {
    setTasks(initialTasks);
    setSelectedIds([]);
  };

  const isAllSelected = tasks.length > 0 && selectedIds.length === tasks.length;

  return (
    <div className="view-container">
      <h1 className="view-title">Checkbox Multi-Select Dashboard</h1>
      <p className="view-description">
        Demonstrating master selection, item toggling, and bulk operations.
      </p>

      {/* Task Creation Form */}
      <form onSubmit={handleAddTask} className="task-form">
        <div className="form-group-row">
          <input
            type="text"
            className="form-control flex-2"
            placeholder="Add new dashboard task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <select
            className="form-control flex-1"
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <button type="submit" className="btn btn-primary" disabled={!newTaskTitle.trim()}>
            Add Task
          </button>
        </div>
      </form>

      {/* Bulk Operations Toolbar */}
      <div className="checkbox-toolbar">
        <div className="select-all-wrapper">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAllToggle}
              disabled={tasks.length === 0}
            />
            <span className="checkmark"></span>
            <strong>Select All ({selectedIds.length} / {tasks.length} selected)</strong>
          </label>
        </div>

        <div className="toolbar-actions">
          <button
            className="btn btn-danger btn-sm"
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0}
          >
            Delete Selected ({selectedIds.length})
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleReset}>
            Reset List
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="task-list-wrapper">
        {tasks.length === 0 ? (
          <div className="empty-tasks text-center">
            All tasks cleared! Click "Reset List" to restore defaults.
          </div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => {
              const isChecked = selectedIds.includes(task.id);
              return (
                <div key={task.id} className={`task-item ${isChecked ? 'completed-row' : ''}`}>
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleSelectToggle(task.id)}
                    />
                    <span className="checkmark"></span>
                    <span className="task-title-text">{task.title}</span>
                  </label>
                  <span className={`badge-priority ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckboxPage;
