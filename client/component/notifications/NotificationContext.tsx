/* Author(s): Securella */
import React, { createContext, useContext, useState } from 'react';

export type Notification = {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
  timestamp: Date;
};

interface NotificationContextValue {
  notifications: Notification[];
  addNotification: (n: Notification) => void;    // accept full object
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextValue>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
  clearNotifications: () => {},
});

export const NotificationProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (n: Notification) =>
    setNotifications(prev => [n, ...prev]);

  const removeNotification = (id: string) =>
    setNotifications(prev => prev.filter(x => x.id !== id));

  const clearNotifications = () =>
    setNotifications([]);

  return (
    <NotificationContext.Provider value={{
      notifications, addNotification, removeNotification, clearNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
