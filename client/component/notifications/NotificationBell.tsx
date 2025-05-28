/* Author(s): Securella */
import React, { useState, useRef, useEffect } from 'react';
import { useNotifications } from './NotificationContext';
import './NotificationBell.css';

export const NotificationBell: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close when clicking outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="notif-bell" ref={ref}>
      <button onClick={() => setOpen(o => !o)} className="bell-btn">
        🔔
        {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
      </button>
      {open && (
        <div className="notif-dropdown">
          {notifications.length === 0
            ? <div className="notif-empty">No notifications</div>
            : notifications.map(n => (
                <div key={n.id} className={`notif-item ${n.type}`}>
                  <span>{n.message}</span>
                  <button onClick={() => removeNotification(n.id)}>×</button>
                </div>
              ))
          }
        </div>
      )}
    </div>
  );
};
