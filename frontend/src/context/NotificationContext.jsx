// NOTIFICATION CONTEXT

import { createContext, useContext, useState } from 'react';
import ToastNotification from '../components/ToastNotification';

// Create Notification Context
const NotificationContext = createContext();

// Custom hook to use notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

// Notification Provider Component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Add a new notification
  const addNotification = ({ title, message, avatar, time }) => {
    const id = Date.now();
    const notification = { id, title, message, avatar, time };

    setNotifications((prev) => [...prev, notification]);

    // Play notification sound (optional)
    playNotificationSound();
  };

  // Remove a notification
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Play notification sound
  const playNotificationSound = () => {
    try {
      // Create a simple notification beep sound
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Could not play notification sound:', error);
    }
  };

  // Context value
  const value = {
    addNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {/* Render all notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            style={{ transform: `translateY(${index * 10}px)` }}
          >
            <ToastNotification
              notification={notification}
              onClose={() => removeNotification(notification.id)}
            />
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};