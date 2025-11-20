// CHAT MESSAGE COMPONENT

import { Check, CheckCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ChatMessage = ({ message }) => {
  const { user } = useAuth();
  const isOwnMessage = message.sender._id === user._id;

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get status icon
  const getStatusIcon = () => {
    if (!isOwnMessage) return null;

    if (message.status === 'seen') {
      return <CheckCheck size={16} className="text-blue-500" />;
    } else if (message.status === 'delivered') {
      return <CheckCheck size={16} className="text-gray-400" />;
    } else {
      return <Check size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md`}>
        {/* Avatar for received messages */}
        {!isOwnMessage && (
          <img
            src={message.sender.avatar}
            alt={message.sender.username}
            className="w-8 h-8 rounded-full"
          />
        )}

        {/* Message bubble */}
        <div
          className={`px-4 py-2 rounded-2xl ${
            isOwnMessage
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-gray-200 text-gray-800 rounded-bl-none'
          }`}
        >
          {/* Message content */}
          <p className="wrap-break-word">{message.content}</p>

          {/* Timestamp and status */}
          <div className={`flex items-center justify-end space-x-1 mt-1`}>
            <span
              className={`text-xs ${
                isOwnMessage ? 'text-blue-100' : 'text-gray-500'
              }`}
            >
              {formatTime(message.createdAt)}
            </span>
            {getStatusIcon()}
          </div>
        </div>

        {/* Avatar for sent messages */}
        {isOwnMessage && (
          <img
            src={message.sender.avatar}
            alt={message.sender.username}
            className="w-8 h-8 rounded-full"
          />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;