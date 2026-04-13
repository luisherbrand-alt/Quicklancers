import { useState, useEffect } from 'react';
import { useAuth } from '../App.jsx';
import { getNotifications, saveNotifications } from '../store.js';
import './Notifications.css';

const TYPE_ICON = {
  message: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  order: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  review: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

export default function Notifications() {
  const { user } = useAuth();
  const userId = user?.id;

  const [notifications, setNotifications] = useState(() => getNotifications(userId));
  const unreadCount = notifications.filter(n => !n.read).length;

  // Reload when account switches
  useEffect(() => {
    setNotifications(getNotifications(userId));
  }, [userId]);

  useEffect(() => {
    function onFocus() { setNotifications(getNotifications(userId)); }
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [userId]);

  function markAllRead() {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    saveNotifications(userId, updated);
  }

  function markRead(id) {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    saveNotifications(userId, updated);
  }

  return (
    <div className="notif-page container">
      <div className="notif-header">
        <div>
          <h1 className="notif-title">Notifications</h1>
          {unreadCount > 0 && <span className="notif-count">{unreadCount} unread</span>}
        </div>
        {unreadCount > 0 && (
          <button className="btn btn-outline btn-sm" onClick={markAllRead}>Mark all as read</button>
        )}
      </div>

      <div className="notif-list">
        {notifications.length === 0 && (
          <div className="notif-empty">
            <p>No notifications yet</p>
          </div>
        )}
        {notifications.map(n => (
          <div
            key={n.id}
            className={`notif-item ${!n.read ? 'notif-item--unread' : ''}`}
            onClick={() => markRead(n.id)}
          >
            <div className="notif-item__avatar">
              <div className="avatar" style={{ width: 44, height: 44, background: n.avatarColor, fontSize: 14 }}>
                {n.initials}
              </div>
              <div className={`notif-item__type-icon notif-item__type-icon--${n.type}`}>
                {TYPE_ICON[n.type] || TYPE_ICON.message}
              </div>
            </div>
            <div className="notif-item__body">
              <p className="notif-item__title">{n.title}</p>
              <p className="notif-item__desc">{n.desc}</p>
              <span className="notif-item__time">{n.time}</span>
            </div>
            {!n.read && <div className="notif-item__dot" />}
          </div>
        ))}
      </div>
    </div>
  );
}
