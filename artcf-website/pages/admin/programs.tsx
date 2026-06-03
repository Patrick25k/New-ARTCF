import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { API, authHeaders } from '../../utils/api';

const categories = ['education', 'healthcare', 'economic'] as const;
const catLabels: Record<string, string> = { education: '📚 Education', healthcare: '❤️ Healthcare', economic: '🌱 Economic' };
const emptyProgram = { img: '', title: '', desc: '', stats: ['', '', ''], category: 'education' };

export default function AdminPrograms() {
  const [programs, setPrograms] = useState<any>({});
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(emptyProgram);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [activeCat, setActiveCat] = useState('education');
  const [saving, setSaving] = useState(false);

  const load = () => fetch(`${API}/api/admin/programs`, { headers: authHeaders() }).then(r => r.json()).then(setPrograms);
  useEffect(() => { load(); }, []);

  const currentList = programs[activeCat] || [];

  const openCreate = () => { setEditing(null); setForm({ ...emptyProgram, category: activeCat }); setModal(true); };
  const openEdit = (p: any, cat: string) => { setEditing(p); setForm({ ...p, category: cat, stats: [...(p.stats || ['', '', ''])] }); setModal(true); };

  const handleSave = async () => {
    setSaving(true);
    const body = { ...form, stats: form.stats.filter((s: string) => s.trim()) };
    if (editing) {
      await fetch(`${API}/api/admin/programs/${editing.id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(body) });
    } else {
      await fetch(`${API}/api/admin/programs`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(body) });
    }
    setSaving(false); setModal(false); load();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`${API}/api/admin/programs/${deleteId}`, { method: 'DELETE', headers: authHeaders() });
    setDeleteId(null); load();
  };

  const set = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));
  const setStat = (i: number, v: string) => { const s = [...form.stats]; s[i] = v; while (s.length < 3) s.push(''); set('stats', s); };

  const totalCount = Object.values(programs).reduce((sum: number, arr: any) => sum + (arr?.length || 0), 0);

  return (
    <AdminLayout title="Programs Manager" subtitle={`${totalCount} programs across 3 categories`}>
      <div className="admin-tabs" style={{ maxWidth: 500 }}>
        {categories.map(c => (
          <button key={c} className={`admin-tab${activeCat === c ? ' active' : ''}`} onClick={() => setActiveCat(c)}>
            {catLabels[c]} ({(programs[c] || []).length})
          </button>
        ))}
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <h3>{catLabels[activeCat]} Programs</h3>
          <button className="admin-btn admin-btn-primary" onClick={openCreate}>+ New Program</button>
        </div>
        {currentList.length === 0 ? (
          <div className="admin-empty"><div className="admin-empty-icon">📋</div><h4>No programs in this category</h4></div>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Image</th><th>Title</th><th>Description</th><th>Key Stats</th><th>Actions</th></tr></thead>
            <tbody>
              {currentList.map((p: any) => (
                <tr key={p.id}>
                  <td><img src={p.img} alt="" style={{ width: 50, height: 36, objectFit: 'cover', borderRadius: 6 }} onError={(e: any) => { e.target.src = '/images/pic1.png'; }} /></td>
                  <td style={{ fontWeight: 600 }}>{p.title}</td>
                  <td style={{ color: 'var(--admin-muted)', fontSize: '0.82rem', maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.desc}</td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--admin-muted)' }}>{(p.stats || []).slice(0, 2).join(', ')}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="admin-btn-icon" onClick={() => openEdit(p, activeCat)} title="Edit">✏️</button>
                      <button className="admin-btn-icon" onClick={() => setDeleteId(p.id)} title="Delete" style={{ color: '#f87171' }}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editing ? 'Edit Program' : 'Create Program'}</h3>
              <button className="admin-modal-close" onClick={() => setModal(false)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group"><label className="admin-form-label">Title *</label><input className="admin-form-control" value={form.title} onChange={e => set('title', e.target.value)} /></div>
              <div className="admin-form-row">
                <div className="admin-form-group"><label className="admin-form-label">Image Path</label><input className="admin-form-control" value={form.img} onChange={e => set('img', e.target.value)} placeholder="/images/pic1.png" /></div>
                <div className="admin-form-group"><label className="admin-form-label">Category</label>
                  <select className="admin-form-control" value={form.category} onChange={e => set('category', e.target.value)}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-form-group"><label className="admin-form-label">Description</label><textarea className="admin-form-control" value={form.desc} onChange={e => set('desc', e.target.value)} /></div>
              <div className="admin-form-group"><label className="admin-form-label">Key Stats (one per line)</label>
                {[0, 1, 2].map(i => (<input key={i} className="admin-form-control" style={{ marginBottom: 6 }} value={form.stats[i] || ''} onChange={e => setStat(i, e.target.value)} placeholder={`Stat ${i + 1}`} />))}
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setModal(false)}>Cancel</button>
              <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : editing ? 'Save' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="admin-modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-body"><div className="admin-confirm"><div className="admin-confirm-icon">⚠️</div><h4>Delete Program?</h4><p>This cannot be undone.</p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}><button className="admin-btn admin-btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button><button className="admin-btn admin-btn-danger" onClick={handleDelete}>Delete</button></div>
            </div></div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
