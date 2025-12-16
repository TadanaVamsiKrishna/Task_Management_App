import React from 'react';
import TaskCard from '@/components/Common/TaskCard';

const TaskList = ({ tasks, onDragStart }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">All Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No tasks created yet</p>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              draggable={true}
              isAdmin={true}
              onDragStart={() => onDragStart(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
