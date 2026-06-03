import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { API, authHeaders } from '../../utils/api';

const tabs = ['Hero Slides', 'Impact Stats', 'Testimonials', 'Partners', 'Site Settings'];

export default function AdminContent() {
  const [content, setContent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = () => fetch(`${API}/api/admin/content`, { headers: authHeaders() }).then(r => r.json()).then(setContent);
  useEffect(() => { load(); }, []);

  const save = async (data: any) => {
    setSaving(true);
    await fetch(`${API}/api/admin/content`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(data) });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000); load();
  };

  if (!content) return <AdminLayout title="Site Content"><div className="admin-empty"><div className="admin-empty-icon">⏳</div><h4>Loading...</h4></div></AdminLayout>;

  const { heroSlides = [], stats = [], testimonials = [], partners = [], settings = {} } = content;

  // Hero Slides
  const updateSlide = (idx: number, key: string, val: string) => {
    const updated = [...heroSlides]; updated[idx] = { ...updated[idx], [key]: val };
    save({ heroSlides: updated });
  };
  const addSlide = () => save({ heroSlides: [...heroSlides, { id: Date.now(), bg: '/images/pic1.png' }] });
  const removeSlide = (idx: number) => save({ heroSlides: heroSlides.filter((_: any, i: number) => i !== idx) });

  // Stats
  const updateStat = (idx: number, key: string, val: string) => {
    const updated = [...stats]; updated[idx] = { ...updated[idx], [key]: val };
    save({ stats: updated });
  };
  const addStat = () => save({ stats: [...stats, { id: Date.now(), number: '0+', label: 'New Stat' }] });
  const removeStat = (idx: number) => save({ stats: stats.filter((_: any, i: number) => i !== idx) });

  // Testimonials
  const updateTest = (idx: number, key: string, val: string) => {
    const updated = [...testimonials]; updated[idx] = { ...updated[idx], [key]: val };
    save({ testimonials: updated });
  };
  const addTest = () => save({ testimonials: [...testimonials, { id: Date.now(), text: '', name: '', role: '', avatar: '' }] });
  const removeTest = (idx: number) => save({ testimonials: testimonials.filter((_: any, i: number) => i !== idx) });

  // Partners
  const updatePartner = (idx: number, key: string, val: string) => {
    const updated = [...partners]; updated[idx] = { ...updated[idx], [key]: val };
    save({ partners: updated });
  };
  const addPartner = () => save({ partners: [...partners, { id: Date.now(), src: '', alt: 'New Partner' }] });
  const removePartner = (idx: number) => save({ partners: partners.filter((_: any, i: number) => i !== idx) });

  // Settings
  const updateSettings = (key: string, val: string) => save({ settings: { ...settings, [key]: val } });

  return (
    <AdminLayout title="Site Content" subtitle="Manage all website content from one place">
      {saved && <div style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: '0.85rem' }}>✅ Content saved successfully!</div>}

      <div className="admin-tabs" style={{ maxWidth: 600 }}>
        {tabs.map((t, i) => (
          <button key={t} className={`admin-tab${activeTab === i ? ' active' : ''}`} onClick={() => setActiveTab(i)}>{t}</button>
        ))}
      </div>

      {/* Hero Slides */}
      {activeTab === 0 && (
        <div className="admin-table-card">
          <div className="admin-table-header"><h3>🖼️ Hero Slides ({heroSlides.length})</h3><button className="admin-btn admin-btn-primary admin-btn-sm" onClick={addSlide}>+ Add Slide</button></div>
          <div style={{ padding: 24 }}>
            {heroSlides.map((s: any, i: number) => (
              <div key={s.id} style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14, padding: 14, background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                <img src={s.bg} alt="" style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 6 }} onError={(e: any) => { e.target.src='/images/pic1.png'; }} />
                <input className="admin-form-control" value={s.bg} onChange={e => updateSlide(i, 'bg', e.target.value)} style={{ flex: 1 }} placeholder="Image path" />
                <button className="admin-btn-icon" onClick={() => removeSlide(i)} style={{ color: '#f87171' }}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      {activeTab === 1 && (
        <div className="admin-table-card">
          <div className="admin-table-header"><h3>📊 Impact Statistics ({stats.length})</h3><button className="admin-btn admin-btn-primary admin-btn-sm" onClick={addStat}>+ Add Stat</button></div>
          <div style={{ padding: 24 }}>
            {stats.map((s: any, i: number) => (
              <div key={s.id} style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 }}>
                <input className="admin-form-control" value={s.number} onChange={e => updateStat(i, 'number', e.target.value)} style={{ width: 100 }} placeholder="50+" />
                <input className="admin-form-control" value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} style={{ flex: 1 }} placeholder="Label" />
                <button className="admin-btn-icon" onClick={() => removeStat(i)} style={{ color: '#f87171' }}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials */}
      {activeTab === 2 && (
        <div className="admin-table-card">
          <div className="admin-table-header"><h3>💬 Testimonials ({testimonials.length})</h3><button className="admin-btn admin-btn-primary admin-btn-sm" onClick={addTest}>+ Add</button></div>
          <div style={{ padding: 24 }}>
            {testimonials.map((t: any, i: number) => (
              <div key={t.id} style={{ marginBottom: 20, padding: 18, background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                <div className="admin-form-row" style={{ marginBottom: 10 }}>
                  <input className="admin-form-control" value={t.name} onChange={e => updateTest(i, 'name', e.target.value)} placeholder="Name" />
                  <input className="admin-form-control" value={t.role} onChange={e => updateTest(i, 'role', e.target.value)} placeholder="Role" />
                </div>
                <textarea className="admin-form-control" value={t.text} onChange={e => updateTest(i, 'text', e.target.value)} placeholder="Testimonial text..." style={{ marginBottom: 10 }} />
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <input className="admin-form-control" value={t.avatar || ''} onChange={e => updateTest(i, 'avatar', e.target.value)} placeholder="Avatar image path (optional)" style={{ flex: 1 }} />
                  <button className="admin-btn-icon" onClick={() => removeTest(i)} style={{ color: '#f87171' }}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Partners */}
      {activeTab === 3 && (
        <div className="admin-table-card">
          <div className="admin-table-header"><h3>🤝 Partners ({partners.length})</h3><button className="admin-btn admin-btn-primary admin-btn-sm" onClick={addPartner}>+ Add Partner</button></div>
          <div style={{ padding: 24 }}>
            {partners.map((p: any, i: number) => (
              <div key={p.id} style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 }}>
                <img src={p.src} alt={p.alt} style={{ width: 60, height: 36, objectFit: 'contain', borderRadius: 4, background: 'white', padding: 4 }} onError={(e: any) => { e.target.style.display = 'none'; }} />
                <input className="admin-form-control" value={p.alt} onChange={e => updatePartner(i, 'alt', e.target.value)} style={{ width: 140 }} placeholder="Name" />
                <input className="admin-form-control" value={p.src} onChange={e => updatePartner(i, 'src', e.target.value)} style={{ flex: 1 }} placeholder="Logo path" />
                <button className="admin-btn-icon" onClick={() => removePartner(i)} style={{ color: '#f87171' }}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Site Settings */}
      {activeTab === 4 && (
        <div className="admin-table-card">
          <div className="admin-table-header"><h3>⚙️ Site Settings</h3></div>
          <div style={{ padding: 24, maxWidth: 600 }}>
            {[
              { key: 'orgName', label: 'Organization Name' },
              { key: 'tagline', label: 'Tagline' },
              { key: 'foundedYear', label: 'Founded Year' },
              { key: 'address', label: 'Address' },
              { key: 'phone', label: 'Phone' },
              { key: 'email', label: 'Primary Email' },
              { key: 'email2', label: 'Secondary Email' },
              { key: 'hours', label: 'Office Hours' },
              { key: 'facebook', label: 'Facebook URL' },
              { key: 'twitter', label: 'Twitter URL' },
              { key: 'instagram', label: 'Instagram URL' },
              { key: 'youtube', label: 'YouTube URL' },
            ].map(f => (
              <div className="admin-form-group" key={f.key}>
                <label className="admin-form-label">{f.label}</label>
                <input className="admin-form-control" value={settings[f.key] || ''} onChange={e => updateSettings(f.key, e.target.value)} />
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
