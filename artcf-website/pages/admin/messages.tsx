import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { API, authHeaders } from '../../utils/api';

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [unread, setUnread] = useState(0);
  const [selected, setSelected] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');

  const load = () => fetch(`${API}/api/admin/messages`, { headers: authHeaders() })
    .then(r => r.json()).then(d => { setMessages(d.messages || []); setUnread(d.unread || 0); });
  useEffect(() => { load(); }, []);

  const filtered = filter === 'all' ? messages : filter === 'unread' ? messages.filter(m => !m.read) : messages.filter(m => m.read);

  const openMessage = async (msg: any) => {
    setSelected(msg);
    if (!msg.read) {
      await fetch(`${API}/api/admin/messages/${msg.id}/read`, { method: 'PUT', headers: authHeaders() });
      load();
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`${API}/api/admin/messages/${deleteId}`, { method: 'DELETE', headers: authHeaders() });
    setDeleteId(null); if (selected?.id === deleteId) setSelected(null); load();
  };

  return (
    <AdminLayout title="Messages" subtitle={`${unread} unread message${unread !== 1 ? 's' : ''}`}>
      <div className="admin-table-card">
        <div className="admin-table-header">
          <h3>📨 Inbox ({messages.length})</h3>
          <div className="admin-tabs" style={{ marginBottom: 0, maxWidth: 300 }}>
            {['all', 'unread', 'read'].map(f => (
              <button key={f} className={`admin-tab${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="admin-empty"><div className="admin-empty-icon">📭</div><h4>No messages</h4><p>Contact form submissions will appear here.</p></div>
        ) : (
          filtered.map(m => (
            <div key={m.id} className={`admin-msg-card${!m.read ? ' unread' : ''}`} onClick={() => openMessage(m)}>
              <div className="admin-msg-avatar">{m.name.charAt(0).toUpperCase()}</div>
              <div className="admin-msg-body">
                <div className="admin-msg-header">
                  <span className="admin-msg-name">{m.name}</span>
                  <span className="admin-msg-date">{new Date(m.createdAt).toLocaleString()}</span>
                </div>
                <div className="admin-msg-subject">{m.subject}</div>
                <div className="admin-msg-preview">{m.message}</div>
              </div>
              <button className="admin-btn-icon" onClick={e => { e.stopPropagation(); setDeleteId(m.id); }} style={{ color: '#f87171', flexShrink: 0 }}>🗑️</button>
            </div>
          ))
        )}
      </div>

      {/* Message Detail Modal */}
      {selected && (
        <div className="admin-modal-overlay" onClick={() => setSelected(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>📨 Message Details</h3>
              <button className="admin-modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
                <div><span style={{ color: 'var(--admin-muted)', fontSize: '0.78rem' }}>From</span><div style={{ fontWeight: 600 }}>{selected.name} &lt;{selected.email}&gt;</div></div>
                {selected.phone && <div><span style={{ color: 'var(--admin-muted)', fontSize: '0.78rem' }}>Phone</span><div>{selected.phone}</div></div>}
                <div><span style={{ color: 'var(--admin-muted)', fontSize: '0.78rem' }}>Type</span><div>{selected.type}</div></div>
                <div><span style={{ color: 'var(--admin-muted)', fontSize: '0.78rem' }}>Subject</span><div style={{ fontWeight: 600, color: 'var(--admin-accent)' }}>{selected.subject}</div></div>
                <div><span style={{ color: 'var(--admin-muted)', fontSize: '0.78rem' }}>Date</span><div>{new Date(selected.createdAt).toLocaleString()}</div></div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--admin-border)', borderRadius: 8, padding: 18 }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--admin-muted)', marginBottom: 8 }}>Message</div>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{selected.message}</div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => { setDeleteId(selected.id); setSelected(null); }}>🗑️ Delete</button>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="admin-btn admin-btn-primary">✉️ Reply via Email</a>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="admin-modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-body"><div className="admin-confirm"><div className="admin-confirm-icon">⚠️</div><h4>Delete Message?</h4><p>This cannot be undone.</p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}><button className="admin-btn admin-btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button><button className="admin-btn admin-btn-danger" onClick={handleDelete}>Delete</button></div>
            </div></div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
