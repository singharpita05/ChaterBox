// CHAT INPUT COMPONENT

import { Send } from 'lucide-react';
import { useState } from 'react';

const ChatInput = ({ onSendMessage, onTyping, disabled = false }) => {
  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setMessage(e.target.value);
    
    // Trigger typing indicator if onTyping callback is provided
    if (onTyping && e.target.value.trim()) {
      onTyping();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage(''); // Clear input after sending
    }
  };

  // Handle Enter key press (send message)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-4 bg-white">
      <div className="flex items-center space-x-2">
        {/* Message input */}
        <input
          type="text"
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          disabled={disabled}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
        />

        {/* Send button */}
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;