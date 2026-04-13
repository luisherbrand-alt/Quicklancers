import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../App.jsx';
import { getConversations, saveConversations, sendChatMessage } from '../store.js';
import './Inbox.css';

function OrderCard({ msg }) {
  return (
    <div className="inbox-order-card">
      <div className="inbox-order-card__header">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
        <strong>New Service Purchase Notification</strong>
      </div>
      <p className="inbox-order-card__greeting">Hello,</p>
      <p className="inbox-order-card__text">You have received a new service purchase.</p>
      <div className="inbox-order-card__details">
        <p className="inbox-order-card__details-title">Order Details:</p>
        <ul>
          <li><span>Service:</span> {msg.gigTitle}</li>
          <li><span>Buyer:</span> {msg.buyerName}</li>
          <li><span>Order ID:</span> {msg.orderId}</li>
          <li><span>Date:</span> {msg.date}</li>
        </ul>
      </div>
      <p className="inbox-order-card__footer">
        Please review the order details and proceed with the next steps.
      </p>
      <p className="inbox-order-card__sign">Thank you for using Quicklancers.</p>
      <span className="inbox-msg__time">{msg.time}</span>
    </div>
  );
}

export default function Inbox() {
  const { user } = useAuth();
  const userId = user?.id;

  const [conversations, setConversations] = useState(() => getConversations(userId));
  const [activeId, setActiveId] = useState(() => getConversations(userId)[0]?.id || null);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Reload conversations when the logged-in account changes
  useEffect(() => {
    const convs = getConversations(userId);
    setConversations(convs);
    setActiveId(convs[0]?.id || null);
  }, [userId]);

  // Reload on window focus (another tab may have added a message)
  useEffect(() => {
    function onFocus() {
      setConversations(getConversations(userId));
    }
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [userId]);

  const active = conversations.find(c => c.id === activeId) || conversations[0];

  function sendMessage(e) {
    e.preventDefault();
    if (!input.trim() || !active || !user) return;

    const recipient = {
      id: active.otherId,
      name: active.name,
      initials: active.initials,
      avatarColor: active.avatarColor,
    };

    sendChatMessage(user, recipient, input.trim());

    // Refresh local state from store
    setConversations(getConversations(userId));
    setInput('');
    // Scroll to the new message
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  function openConversation(id) {
    setActiveId(id);
    const updated = conversations.map(c => c.id === id ? { ...c, unread: 0 } : c);
    setConversations(updated);
    saveConversations(userId, updated);
  }

  if (conversations.length === 0) {
    return (
      <div className="inbox-page inbox-page--empty">
        <div className="inbox-empty-state">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <h3>No conversations yet</h3>
          <p>When you contact a seller or place an order, your conversations will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="inbox-page">
      {/* Sidebar */}
      <div className="inbox-sidebar">
        <div className="inbox-sidebar__header">
          <h2>Inbox</h2>
        </div>
        {conversations.map(c => (
          <button
            key={c.id}
            className={`inbox-conv ${active?.id === c.id ? 'active' : ''}`}
            onClick={() => openConversation(c.id)}
          >
            <div className="avatar" style={{ width: 42, height: 42, background: c.avatarColor, fontSize: 14, flexShrink: 0 }}>
              {c.initials}
            </div>
            <div className="inbox-conv__body">
              <div className="inbox-conv__top">
                <span className="inbox-conv__name">{c.name}</span>
                <span className="inbox-conv__time">{c.time}</span>
              </div>
              <div className="inbox-conv__bottom">
                <span className="inbox-conv__preview">{c.lastMessage || 'No messages yet'}</span>
                {c.unread > 0 && <span className="inbox-badge">{c.unread}</span>}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Chat */}
      <div className="inbox-chat">
        {active ? (
          <>
            <div className="inbox-chat__header">
              <div className="avatar" style={{ width: 36, height: 36, background: active.avatarColor, fontSize: 13 }}>
                {active.initials}
              </div>
              <span className="inbox-chat__name">{active.name}</span>
            </div>

            <div className="inbox-chat__messages">
              {active.messages.length === 0 && (
                <p className="inbox-chat__no-messages">No messages yet. Say hello!</p>
              )}
              {active.messages.map(msg => {
                if (msg.from === 'system') {
                  return (
                    <div key={msg.id} className="inbox-msg inbox-msg--system">
                      <OrderCard msg={msg} />
                    </div>
                  );
                }
                const isMe = msg.from === String(user?.id);
                return (
                  <div key={msg.id} className={`inbox-msg ${isMe ? 'inbox-msg--me' : 'inbox-msg--them'}`}>
                    {!isMe && (
                      <div className="avatar" style={{ width: 28, height: 28, background: active.avatarColor, fontSize: 10, flexShrink: 0 }}>
                        {active.initials}
                      </div>
                    )}
                    <div className="inbox-msg__bubble">
                      <p>{msg.text}</p>
                      <span className="inbox-msg__time">{msg.time}</span>
                    </div>
                    {isMe && (
                      <div className="avatar" style={{ width: 28, height: 28, background: '#1dbf73', fontSize: 10, overflow: 'hidden', padding: 0, flexShrink: 0 }}>
                        {user?.avatar
                          ? <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          : user?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <form className="inbox-chat__input" onSubmit={sendMessage}>
              <input
                type="text"
                className="input"
                placeholder="Write a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" disabled={!input.trim()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </>
        ) : (
          <div className="inbox-empty-state">
            <p>Select a conversation</p>
          </div>
        )}
      </div>
    </div>
  );
}
