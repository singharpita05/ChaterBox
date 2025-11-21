// PUSH NOTICATION SERVICE

import api from '../config/axios';

// Check if browser supports push notifications
export const isPushNotificationSupported = () => {
  return 'serviceWorker' in navigator && 'PushManager' in window;
};

// Request notification permission
export const requestNotificationPermission = async () => {
  if (!isPushNotificationSupported()) {
    console.log('Push notifications not supported');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

// Check current notification permission status
export const getNotificationPermission = () => {
  if (!isPushNotificationSupported()) {
    return 'unsupported';
  }
  return Notification.permission;
};

// Show a browser notification
export const showBrowserNotification = (title, options = {}) => {
  if (!isPushNotificationSupported()) {
    return null;
  }

  if (Notification.permission === 'granted') {
    return new Notification(title, {
      icon: '/logo.png', // Add your app logo here
      badge: '/badge.png', // Add your app badge here
      vibrate: [200, 100, 200],
      tag: 'chatterbox-message',
      requireInteraction: false,
      ...options,
    });
  }

  return null;
};

// Register service worker for push notifications
export const registerServiceWorker = async () => {
  if (!isPushNotificationSupported()) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
};

// Subscribe to push notifications
export const subscribeToPushNotifications = async () => {
  if (!isPushNotificationSupported()) {
    return { success: false, error: 'Push notifications not supported' };
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    // Check if already subscribed
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      // Subscribe to push notifications
      // Note: You'll need to generate VAPID keys for production
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          import.meta.env.VITE_VAPID_PUBLIC_KEY || ''
        ),
      });
    }

    // Send subscription to backend
    const result = await api.post('/notifications/subscribe', subscription);

    return { success: true, data: result.data };
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
    return { success: false, error: error.message };
  }
};

// Unsubscribe from push notifications
export const unsubscribeFromPushNotifications = async () => {
  if (!isPushNotificationSupported()) {
    return { success: false, error: 'Push notifications not supported' };
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
      // Notify backend
      await api.post('/notifications/unsubscribe');
    }

    return { success: true };
  } catch (error) {
    console.error('Error unsubscribing from push notifications:', error);
    return { success: false, error: error.message };
  }
};

// Helper function to convert VAPID key
const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};