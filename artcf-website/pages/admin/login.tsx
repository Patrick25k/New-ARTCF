import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { API } from '../../utils/api';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_name', data.name);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | ARTCF Rwanda</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="admin-login-page">
        <div className="admin-login-card">
          <div className="admin-login-logo">
            <div style={{ marginBottom: 12 }}>
              <img src="/images/ARTCF logo.jpeg" alt="ARTCF" style={{ height: 60, borderRadius: 12 }} onError={(e: any) => { e.target.style.display='none'; }} />
            </div>
            <span>ARTCF Admin</span>
            <p>Sign in to manage your website</p>
          </div>

          {error && <div className="admin-login-error">⚠ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label className="admin-form-label">Email Address</label>
              <input type="email" className="admin-form-control" placeholder="admin@artcf.org" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Password</label>
              <input type="password" className="admin-form-control" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="admin-login-btn" disabled={loading}>
              {loading ? '⏳ Signing in...' : '🔐 Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.75rem', color: '#4a5568' }}>
            Protected area. Authorized personnel only.
          </p>
        </div>
      </div>
    </>
  );
}
