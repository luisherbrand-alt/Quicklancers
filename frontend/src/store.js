// Per-user conversation storage
// Conversations are stored under ql_conversations_<userId> so each account
// has its own inbox. When a message is sent, it is delivered to both the
// sender's and the recipient's store, so switching accounts shows the correct
// thread for each side.

function convKey(userId) {
  return `ql_conversations_${userId}`;
}

export function getConversations(userId) {
  if (!userId) return [];
  try { return JSON.parse(localStorage.getItem(convKey(userId)) || '[]'); } catch { return []; }
}

export function saveConversations(userId, convs) {
  if (!userId) return;
  localStorage.setItem(convKey(userId), JSON.stringify(convs));
}

// Deterministic conversation ID shared between two users
function sharedConvId(id1, id2) {
  return `conv_${[String(id1), String(id2)].sort().join('_')}`;
}

// Append a message to one participant's conversation store
function _upsertMessage(userId, otherUser, newMsg, isUnread, previewText) {
  const convs = getConversations(userId);
  const convId = sharedConvId(userId, otherUser.id);
  const idx = convs.findIndex(c => c.id === convId);
  const preview = previewText || newMsg.text || '';

  if (idx >= 0) {
    const updated = [...convs];
    updated[idx] = {
      ...updated[idx],
      messages: [...updated[idx].messages, newMsg],
      lastMessage: preview,
      time: 'Just now',
      unread: isUnread ? (updated[idx].unread || 0) + 1 : (updated[idx].unread || 0),
    };
    saveConversations(userId, updated);
  } else {
    const newConv = {
      id: convId,
      otherId: String(otherUser.id),
      name: otherUser.name,
      initials: otherUser.initials || otherUser.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '??',
      avatarColor: otherUser.avatarColor || '#1dbf73',
      lastMessage: preview,
      time: 'Just now',
      unread: isUnread ? 1 : 0,
      messages: [newMsg],
    };
    saveConversations(userId, [newConv, ...convs]);
  }
}

// Send a text message — delivered to both sender and recipient
export function sendChatMessage(senderUser, recipientUser, text) {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const newMsg = { id: Date.now(), from: String(senderUser.id), text, time: now };
  _upsertMessage(senderUser.id, recipientUser, newMsg, false, text);
  _upsertMessage(recipientUser.id, senderUser, newMsg, true, text);

  // Notification for the recipient
  const recipientNotifs = getNotifications(recipientUser.id);
  recipientNotifs.unshift({
    id: Date.now() + 1,
    type: 'message',
    title: `New message from ${senderUser.name}`,
    desc: text.length > 60 ? text.slice(0, 60) + '…' : text,
    time: 'Just now',
    read: false,
    avatarColor: senderUser.avatarColor || '#1dbf73',
    initials: senderUser.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '??',
  });
  saveNotifications(recipientUser.id, recipientNotifs);
}

// ─── Notifications ─────────────────────────────────────────────────────────────

export function getNotifications(userId) {
  if (!userId) return [];
  try { return JSON.parse(localStorage.getItem(`ql_notifications_${userId}`) || '[]'); } catch { return []; }
}

export function saveNotifications(userId, notifs) {
  if (!userId) return;
  localStorage.setItem(`ql_notifications_${userId}`, JSON.stringify(notifs));
}

// ─── Orders ────────────────────────────────────────────────────────────────────

function generateOrderId() {
  const last = parseInt(localStorage.getItem('ql_last_order_id') || '1000', 10);
  const next = last + 1;
  localStorage.setItem('ql_last_order_id', String(next));
  return `QL-${next}`;
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Returns the generated orderId so callers can pass it to the email endpoint
export function addOrderConversation(buyer, seller, gigTitle) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const orderId = generateOrderId();

  const orderMsg = {
    id: Date.now(),
    from: 'system',
    orderId,
    gigTitle,
    buyerName: buyer.name,
    date: formatDate(now),
    time: timeStr,
  };

  const previewText = `New Service Purchase — Order ${orderId}`;

  // Deliver to both buyer and seller
  _upsertMessage(buyer.id, seller, orderMsg, false, previewText);
  _upsertMessage(seller.id, buyer, orderMsg, true, previewText);

  // Notification → seller gets the order notification
  const sellerNotifs = getNotifications(seller.id);
  sellerNotifs.unshift({
    id: Date.now(),
    type: 'order',
    title: `New service purchase — Order ${orderId}`,
    desc: `${buyer.name} purchased "${gigTitle}"`,
    time: 'Just now',
    read: false,
    avatarColor: '#1dbf73',
    initials: buyer.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '??',
  });
  saveNotifications(seller.id, sellerNotifs);

  // Notification → buyer gets a purchase confirmation
  const buyerNotifs = getNotifications(buyer.id);
  buyerNotifs.unshift({
    id: Date.now() + 1,
    type: 'order',
    title: `Order placed — ${orderId}`,
    desc: `You purchased "${gigTitle}"`,
    time: 'Just now',
    read: false,
    avatarColor: seller.avatarColor || '#1dbf73',
    initials: seller.initials || seller.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '??',
  });
  saveNotifications(buyer.id, buyerNotifs);

  return orderId;
}
