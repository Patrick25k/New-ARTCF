import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { API, authHeaders } from '../../utils/api';

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const load = () => fetch(`${API}/api/admin/subscribers`, { headers: authHeaders() })
    .then(r => r.json()).then(d => setSubscribers(d.subscribers || []));
  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`${API}/api/admin/subscribers/${deleteId}`, { method: 'DELETE', headers: authHeaders() });
    setDeleteId(null); load();
  };

  const copyAll = () => {
    const emails = subscribers.map(s => s.email).join(', ');
    navigator.clipboard.writeText(emails).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <AdminLayout title="Newsletter Subscribers" subtitle={`${subscribers.length} total subscribers`}>
      <div className="admin-table-card">
        <div className="admin-table-header">
          <h3>👥 Subscribers ({subscribers.length})</h3>
          <div className="admin-table-actions">
            <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={copyAll}>
              {copied ? '✅ Copied!' : '📋 Copy All Emails'}
            </button>
          </div>
        </div>
        {subscribers.length === 0 ? (
          <div className="admin-empty"><div className="admin-empty-icon">📭</div><h4>No subscribers yet</h4><p>Newsletter signups will appear here.</p></div>
        ) : (
          <table className="admin-table">
            <thead><tr><th>#</th><th>Email</th><th>Subscribed</th><th>Actions</th></tr></thead>
            <tbody>
              {subscribers.map((s, i) => (
                <tr key={s.id}>
                  <td style={{ color: 'var(--admin-muted)', fontSize: '0.78rem' }}>{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{s.email}</td>
                  <td style={{ color: 'var(--admin-muted)', fontSize: '0.82rem' }}>{new Date(s.subscribedAt).toLocaleString()}</td>
                  <td>
                    <button className="admin-btn-icon" onClick={() => setDeleteId(s.id)} style={{ color: '#f87171' }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {deleteId && (
        <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="admin-modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-body"><div className="admin-confirm"><div className="admin-confirm-icon">⚠️</div><h4>Remove Subscriber?</h4><p>This cannot be undone.</p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}><button className="admin-btn admin-btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button><button className="admin-btn admin-btn-danger" onClick={handleDelete}>Remove</button></div>
            </div></div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
