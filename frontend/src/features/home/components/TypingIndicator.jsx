// TypingIndicator.jsx
import React from 'react';

function TypingIndicator({ users }) {
  const getTypingText = () => {
    const count = users.length;
    if (count === 1) return `${users[0]} is typing`;
    if (count === 2) return `${users[0]} and ${users[1]} are typing`;
    return `${count} people are typing`;
  };

  return (
    <div className="flex items-center space-x-2 text-gray-500 text-sm ml-2">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <span>{getTypingText()}</span>
    </div>
  );
}

export default TypingIndicator;