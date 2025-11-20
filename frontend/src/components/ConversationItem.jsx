// CONVERSATION ITEM COMPONENT

import { useSocket } from '../context/SocketContext';

const ConversationItem = ({ conversation, isActive, onClick }) => {
  const { onlineUsers } = useSocket();

  // Check if other participant is online
  const isOnline = onlineUsers.includes(conversation.otherParticipant._id);

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    // Less than 24 hours - show time
    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    // Less than 7 days - show day
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }

    // Older - show date
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  // Get last message preview
  const getLastMessagePreview = () => {
    if (!conversation.lastMessage) {
      return 'No messages yet';
    }

    const msg = conversation.lastMessage;
    const prefix = msg.sender._id === conversation.otherParticipant._id ? '' : 'You: ';
    return `${prefix}${msg.content}`;
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-3 p-4 cursor-pointer border-b hover:bg-gray-50 transition ${
        isActive ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
      }`}
    >
      {/* Avatar with online indicator */}
      <div className="relative shrink-0">
        <img
          src={conversation.otherParticipant.avatar}
          alt={conversation.otherParticipant.username}
          className="w-14 h-14 rounded-full object-cover"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </div>

      {/* Conversation info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800 truncate">
            {conversation.otherParticipant.username}
          </h3>
          {conversation.lastMessage && (
            <span className="text-xs text-gray-500">
              {formatTime(conversation.updatedAt)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-600 truncate">
            {getLastMessagePreview()}
          </p>
          {conversation.unreadCount > 0 && (
            <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full ml-2">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;