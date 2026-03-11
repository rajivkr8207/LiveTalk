function ChatMessage({ message, isOwnMessage, formatTime }) {
  if (message.type === 'system') {
    return (
      <div className="flex justify-center">
        <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
        {!isOwnMessage && (
          <div className="text-sm text-gray-600 mb-1 ml-2">
            {message.user}
          </div>
        )}
        <div
          className={`rounded-2xl px-4 py-2 ${
            isOwnMessage
              ? 'bg-green-600 text-white rounded-br-none'
              : 'bg-white text-gray-800 rounded-bl-none shadow'
          }`}
        >
          <p className="break-words">{message.text}</p>
          <div className={`text-xs mt-1 ${isOwnMessage ? 'text-green-100' : 'text-gray-500'}`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;