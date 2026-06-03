import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { API, getToken } from '../utils/api';

const navSections = [
  {
    title: 'Main',
    items: [
      { icon: '📊', label: 'Dashboard', href: '/admin' },
      { icon: '📨', label: 'Messages', href: '/admin/messages', badgeKey: 'unreadMessages' },
      { icon: '👥', label: 'Subscribers', href: '/admin/subscribers' },
    ],
  },
  {
    title: 'Content',
    items: [
      { icon: '📅', label: 'Events', href: '/admin/events' },
      { icon: '📋', label: 'Programs', href: '/admin/programs' },
      { icon: '🎨', label: 'Site Content', href: '/admin/content' },
    ],
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const router = useRouter();
  const [adminName, setAdminName] = useState('Admin');
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.replace('/admin/login'); return; }

    fetch(`${API}/api/admin/verify`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => { setAdminName(d.admin?.name || 'Admin'); setLoading(false); })
      .catch(() => { localStorage.removeItem('admin_token'); router.replace('/admin/login'); });

    fetch(`${API}/api/admin/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => setUnreadMessages(d.messages?.unread || 0))
      .catch(() => {});
  }, [router]);

  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }));
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  const handleLogout = () => { localStorage.removeItem('admin_token'); router.replace('/admin/login'); };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#f4f6fa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4900a', fontSize: '1.2rem', fontFamily: 'Inter, sans-serif' }}>
      Loading...
    </div>
  );

  const badges: Record<string, number> = { unreadMessages };

  return (
    <>
      <Head>
        <title>{title} | ARTCF Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="admin-wrapper">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <Link href="/admin" className="admin-sidebar-brand">
            <img src="/images/ARTCF logo.jpeg" alt="ARTCF" onError={(e: any) => { e.target.style.display='none'; }} />
            <div>
              <span>ARTCF</span>
              <small>Admin Panel</small>
            </div>
          </Link>
          <nav className="admin-nav">
            {navSections.map(sec => (
              <div key={sec.title}>
                <div className="admin-nav-section">{sec.title}</div>
                {sec.items.map(item => (
                  <Link key={item.href} href={item.href}
                    className={`admin-nav-link${router.pathname === item.href ? ' active' : ''}`}>
                    <span className="admin-nav-icon">{item.icon}</span>
                    {item.label}
                    {item.badgeKey && badges[item.badgeKey] > 0 && (
                      <span className="admin-nav-badge">{badges[item.badgeKey]}</span>
                    )}
                  </Link>
                ))}
              </div>
            ))}
            <div className="admin-nav-section" style={{ marginTop: 16 }}>Website</div>
            <a href="/" target="_blank" rel="noopener noreferrer" className="admin-nav-link">
              <span className="admin-nav-icon">🌐</span>View Website
            </a>
          </nav>
          <div className="admin-sidebar-footer">
            <button className="admin-logout-btn" onClick={handleLogout}>
              <span>🚪</span> Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="admin-main">
          <header className="admin-topbar">
            <div className="admin-topbar-left">
              <h2>{title}</h2>
              {subtitle && <p>{subtitle}</p>}
            </div>
            <div className="admin-topbar-right">
              <span className="admin-topbar-time">{now}</span>
              <div className="admin-avatar">{adminName.charAt(0).toUpperCase()}</div>
            </div>
          </header>
          <div className="admin-content">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
