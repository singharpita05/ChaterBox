// CONVERSATION SERVICES

import api from '../config/axios';

// Get all conversations for current user
export const getConversations = async () => {
  try {
    const { data } = await api.get('/conversations');
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch conversations',
    };
  }
};

// Create or get conversation with a user
export const createOrGetConversation = async (participantId) => {
  try {
    const { data } = await api.post('/conversations/create', {
      participantId,
    });
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to create conversation',
    };
  }
};

// Delete a conversation
export const deleteConversation = async (conversationId) => {
  try {
    const { data } = await api.delete(`/conversations/${conversationId}`);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to delete conversation',
    };
  }
};