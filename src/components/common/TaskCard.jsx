import React from 'react';
const TaskCard = ({ task, onComplete, onDragStart, draggable = false, isAdmin = false }) => {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      className={`task-card bg-white p-4 rounded-lg shadow-md border-l-4 ${
        task.status === 'completed' ? 'border-green-500 opacity-75' : 'border-indigo-500'
      } ${draggable ? 'cursor-move hover:shadow-lg transition-shadow' : ''}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            task.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {task.status === 'completed' ? 'Completed' : 'Pending'}
        </span>
      </div>
      <p className="text-gray-600 mb-3">{task.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Assigned to: <span className="font-medium">{task.assignedTo}</span></span>
        {!isAdmin && task.status !== 'completed' && (
          <button
            onClick={() => onComplete(task.id)}
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition duration-200 text-sm"
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;