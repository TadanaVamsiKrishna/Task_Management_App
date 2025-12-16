import React from 'react';

const UserList = ({ users, onDragOver, onDropOnUser }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Users (Drop Zone)</h2>
      <div className="space-y-2">
        {users.length === 0 ? (
          <p className="text-gray-500 text-sm">No users registered yet</p>
        ) : (
          users.map(user => (
            <div
              key={user.username}
              onDragOver={onDragOver}
              onDrop={() => onDropOnUser(user.username)}
              className="p-3 bg-indigo-50 rounded-lg border-2 border-dashed border-indigo-300 hover:bg-indigo-100 transition-colors"
            >
              <p className="font-medium text-gray-800">{user.username}</p>
              <p className="text-xs text-gray-500">Drop tasks here to reassign</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
