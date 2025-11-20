// MESSAGE SERVICES

import api from '../config/axios';

// Send a message
export const sendMessage = async (receiverId, content, messageType = 'text') => {
  try {
    const { data } = await api.post('/messages/send', {
      receiverId,
      content,
      messageType,
    });
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to send message',
    };
  }
};

// Get messages for a conversation
export const getMessages = async (conversationId) => {
  try {
    const { data } = await api.get(`/messages/${conversationId}`);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch messages',
    };
  }
};

// Mark messages as seen
export const markMessagesAsSeen = async (conversationId) => {
  try {
    const { data } = await api.put(`/messages/seen/${conversationId}`);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to mark messages as seen',
    };
  }
};