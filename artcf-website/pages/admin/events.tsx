import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { API, authHeaders } from '../../utils/api';

const emptyEvent = { day: '', month: '', year: '2025', title: '', type: 'Workshop', category: 'upcoming', location: '', time: '', audience: '', desc: '', badgeClass: 'badge-workshop' };
const typeOptions = ['Workshop', 'Fundraiser', 'Training', 'Health', 'Forum', 'Women', 'Conference'];
const badgeMap: Record<string, string> = { Workshop: 'badge-workshop', Fundraiser: 'badge-fundraiser', Training: 'badge-training', Health: 'badge-health', Forum: 'badge-forum', Women: 'badge-women', Conference: 'badge-workshop' };

export default function AdminEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyEvent);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');
  const [saving, setSaving] = useState(false);

  const load = () => fetch(`${API}/api/admin/events`, { headers: authHeaders() }).then(r => r.json()).then(d => setEvents(d.events || []));
  useEffect(() => { load(); }, []);

  const filtered = filter === 'all' ? events : events.filter(e => e.category === filter);

  const openCreate = () => { setEditing(null); setForm(emptyEvent); setModal(true); };
  const openEdit = (ev: any) => { setEditing(ev); setForm({ ...ev }); setModal(true); };

  const handleSave = async () => {
    setSaving(true);
    const body = { ...form, badgeClass: badgeMap[form.type] || 'badge-workshop' };
    if (editing) {
      await fetch(`${API}/api/admin/events/${editing.id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(body) });
    } else {
      await fetch(`${API}/api/admin/events`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(body) });
    }
    setSaving(false); setModal(false); load();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`${API}/api/admin/events/${deleteId}`, { method: 'DELETE', headers: authHeaders() });
    setDeleteId(null); load();
  };

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  return (
    <AdminLayout title="Events Manager" subtitle="Create, edit, and manage all events">
      <div className="admin-table-card">
        <div className="admin-table-header">
          <h3>📅 All Events ({filtered.length})</h3>
          <div className="admin-table-actions">
            <div className="admin-tabs" style={{ marginBottom: 0 }}>
              {['all', 'upcoming', 'past'].map(f => (
                <button key={f} className={`admin-tab${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
                  {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <button className="admin-btn admin-btn-primary" onClick={openCreate}>+ New Event</button>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="admin-empty"><div className="admin-empty-icon">📅</div><h4>No events found</h4><p>Create your first event to get started.</p></div>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Date</th><th>Title</th><th>Type</th><th>Location</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(ev => (
                <tr key={ev.id}>
                  <td><strong>{ev.day} {ev.month}</strong> <span style={{ color: 'var(--admin-muted)', fontSize: '0.78rem' }}>{ev.year}</span></td>
                  <td style={{ fontWeight: 600 }}>{ev.title}</td>
                  <td><span className={`admin-badge admin-badge-${ev.category}`}>{ev.type}</span></td>
                  <td style={{ color: 'var(--admin-muted)', fontSize: '0.82rem' }}>{ev.location}</td>
                  <td><span className={`admin-badge admin-badge-${ev.category}`}>{ev.category}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="admin-btn-icon" onClick={() => openEdit(ev)} title="Edit">✏️</button>
                      <button className="admin-btn-icon" onClick={() => setDeleteId(ev.id)} title="Delete" style={{ color: '#f87171' }}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create/Edit Modal */}
      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editing ? 'Edit Event' : 'Create New Event'}</h3>
              <button className="admin-modal-close" onClick={() => setModal(false)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label className="admin-form-label">Event Title *</label>
                <input className="admin-form-control" value={form.title} onChange={e => set('title', e.target.value)} placeholder="Event title" />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group"><label className="admin-form-label">Day *</label><input className="admin-form-control" value={form.day} onChange={e => set('day', e.target.value)} placeholder="15" /></div>
                <div className="admin-form-group"><label className="admin-form-label">Month *</label><input className="admin-form-control" value={form.month} onChange={e => set('month', e.target.value)} placeholder="Jun" /></div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group"><label className="admin-form-label">Year</label><input className="admin-form-control" value={form.year} onChange={e => set('year', e.target.value)} /></div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Type</label>
                  <select className="admin-form-control" value={form.type} onChange={e => set('type', e.target.value)}>
                    {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group"><label className="admin-form-label">Location</label><input className="admin-form-control" value={form.location} onChange={e => set('location', e.target.value)} placeholder="Kigali, Rwanda" /></div>
                <div className="admin-form-group"><label className="admin-form-label">Time</label><input className="admin-form-control" value={form.time} onChange={e => set('time', e.target.value)} placeholder="9:00 AM – 3:00 PM" /></div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group"><label className="admin-form-label">Audience</label><input className="admin-form-control" value={form.audience} onChange={e => set('audience', e.target.value)} placeholder="Open to all" /></div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Status</label>
                  <select className="admin-form-control" value={form.category} onChange={e => set('category', e.target.value)}>
                    <option value="upcoming">Upcoming</option><option value="past">Past</option>
                  </select>
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Description</label>
                <textarea className="admin-form-control" value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="Event description..." />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setModal(false)}>Cancel</button>
              <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Event'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="admin-modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-body">
              <div className="admin-confirm">
                <div className="admin-confirm-icon">⚠️</div>
                <h4>Delete Event?</h4>
                <p>This action cannot be undone.</p>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                  <button className="admin-btn admin-btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
                  <button className="admin-btn admin-btn-danger" onClick={handleDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
