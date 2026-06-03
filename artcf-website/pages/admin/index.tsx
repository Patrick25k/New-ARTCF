import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Link from 'next/link';
import { API, getToken } from '../../utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch(`${API}/api/admin/stats`, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setStats)
      .catch(() => {});
  }, []);

  if (!stats) return <AdminLayout title="Dashboard" subtitle="Loading..."><div className="admin-empty"><div className="admin-empty-icon">⏳</div><h4>Loading dashboard...</h4></div></AdminLayout>;

  return (
    <AdminLayout title="Dashboard" subtitle="Overview of your website activity">
      {/* Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">📅</div>
          <div className="admin-stat-number">{stats.events.total}</div>
          <div className="admin-stat-label">Total Events</div>
          <div className="admin-stat-sub">{stats.events.upcoming} upcoming</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">📋</div>
          <div className="admin-stat-number">{stats.programs.total}</div>
          <div className="admin-stat-label">Programs</div>
          <div className="admin-stat-sub">Across 3 categories</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">📨</div>
          <div className="admin-stat-number">{stats.messages.total}</div>
          <div className="admin-stat-label">Messages</div>
          <div className="admin-stat-sub">{stats.messages.unread} unread</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">👥</div>
          <div className="admin-stat-number">{stats.subscribers.total}</div>
          <div className="admin-stat-label">Subscribers</div>
          <div className="admin-stat-sub">Newsletter signups</div>
        </div>
      </div>

      <div className="admin-grid-2">
        {/* Recent Messages */}
        <div className="admin-table-card">
          <div className="admin-table-header">
            <h3>📨 Recent Messages</h3>
            <Link href="/admin/messages" className="admin-btn admin-btn-secondary admin-btn-sm">View All</Link>
          </div>
          {stats.recentMessages.length === 0 ? (
            <div className="admin-empty" style={{ padding: 40 }}><div className="admin-empty-icon">📭</div><h4>No messages yet</h4><p>Messages from the contact form will appear here.</p></div>
          ) : (
            stats.recentMessages.map((m: any) => (
              <div key={m.id} className={`admin-msg-card${!m.read ? ' unread' : ''}`}>
                <div className="admin-msg-avatar">{m.name.charAt(0).toUpperCase()}</div>
                <div className="admin-msg-body">
                  <div className="admin-msg-header">
                    <span className="admin-msg-name">{m.name}</span>
                    <span className="admin-msg-date">{new Date(m.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="admin-msg-subject">{m.subject}</div>
                  <div className="admin-msg-preview">{m.message}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Recent Subscribers */}
        <div className="admin-table-card">
          <div className="admin-table-header">
            <h3>👥 Recent Subscribers</h3>
            <Link href="/admin/subscribers" className="admin-btn admin-btn-secondary admin-btn-sm">View All</Link>
          </div>
          {stats.recentSubscribers.length === 0 ? (
            <div className="admin-empty" style={{ padding: 40 }}><div className="admin-empty-icon">📭</div><h4>No subscribers yet</h4><p>Newsletter signups will appear here.</p></div>
          ) : (
            <table className="admin-table">
              <thead><tr><th>Email</th><th>Date</th></tr></thead>
              <tbody>
                {stats.recentSubscribers.map((s: any) => (
                  <tr key={s.id}><td>{s.email}</td><td>{new Date(s.subscribedAt).toLocaleDateString()}</td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: 24 }}>
        <div className="admin-table-card">
          <div className="admin-table-header"><h3>⚡ Quick Actions</h3></div>
          <div style={{ padding: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/admin/events" className="admin-btn admin-btn-primary">📅 Manage Events</Link>
            <Link href="/admin/programs" className="admin-btn admin-btn-primary">📋 Manage Programs</Link>
            <Link href="/admin/content" className="admin-btn admin-btn-secondary">🎨 Edit Site Content</Link>
            <Link href="/admin/messages" className="admin-btn admin-btn-secondary">📨 View Messages</Link>
            <a href="/" target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn-secondary">🌐 View Website</a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
