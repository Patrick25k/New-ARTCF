import { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { API } from '../utils/api';

type EventCategory = 'all' | 'upcoming' | 'past';

const events = [
  { id: 1, day: '15', month: 'Jun', year: '2025', title: 'Empowering Youth Through Technology', type: 'Workshop', category: 'upcoming', location: 'Community Center, Kigali', time: '9:00 AM – 3:00 PM', audience: 'Ages 15–25', desc: 'Hands-on workshop teaching digital skills to young people in our community. Learn coding, digital tools, and online entrepreneurship.', badgeClass: 'badge-workshop' },
  { id: 2, day: '22', month: 'Jul', year: '2025', title: 'Annual Hope Gala Dinner', type: 'Fundraiser', category: 'upcoming', location: 'Serena Hotel, Kigali', time: '6:30 PM – 10:00 PM', audience: '$100 per ticket', desc: 'An elegant evening of dining and inspiration to support our education initiatives. A night of solidarity and hope.', badgeClass: 'badge-fundraiser' },
  { id: 3, day: '05', month: 'Aug', year: '2025', title: 'Community Leadership Training', type: 'Training', category: 'upcoming', location: 'ARTCF Training Center', time: '8:30 AM – 4:00 PM daily', audience: 'Certificate provided', desc: 'Three-day intensive training for emerging community leaders. Covers decision-making, public speaking, and community organizing.', badgeClass: 'badge-training' },
  { id: 4, day: '10', month: 'May', year: '2025', title: 'Community Health Fair', type: 'Health', category: 'past', location: 'City Park, Kigali', time: '8:00 AM – 4:00 PM', audience: '15+ health professionals', desc: 'Free health screenings, consultations, and wellness education for all ages. Served over 300 community members.', badgeClass: 'badge-health' },
  { id: 5, day: '22', month: 'Apr', year: '2025', title: 'Youth Innovation Forum', type: 'Forum', category: 'past', location: 'Innovation Hub, Kigali', time: '10:00 AM – 2:00 PM', audience: '12 speakers', desc: 'Young leaders sharing innovative solutions to community challenges, inspiring the next generation of changemakers.', badgeClass: 'badge-forum' },
  { id: 6, day: '08', month: 'Mar', year: '2025', title: "Women's Entrepreneurship Day", type: 'Women', category: 'past', location: 'Business Center, Kigali', time: '9:00 AM – 5:00 PM', audience: '50+ participants', desc: 'Workshops and networking for women entrepreneurs at all stages. Celebrated International Women\'s Day with inspiring sessions.', badgeClass: 'badge-women' },
];

export default function Events() {
  const [filter, setFilter] = useState<EventCategory>('all');
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const filtered = events.filter(e => filter === 'all' || e.category === filter);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubStatus('sending');
    try {
      const res = await fetch(`${API}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setSubStatus('success'); setEmail(''); }
      else setSubStatus('error');
    } catch {
      setSubStatus('error');
    }
  };

  return (
    <Layout title="Events" description="Join ARTCF's upcoming workshops, training sessions, fundraisers, and community events in Rwanda. Register now to get involved.">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>Events &amp; Activities</h1>
          <p>Join us for inspiring gatherings that create positive change in our communities across Rwanda.</p>
          <nav className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Events</span></nav>
        </div>
      </div>

      {/* Events Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
            <div>
              <span className="section-tag">Our Calendar</span>
              <h2 className="section-title" style={{ margin: 0 }}>All Events</h2>
            </div>
            <div className="filter-tabs" style={{ margin: 0 }}>
              {(['all', 'upcoming', 'past'] as EventCategory[]).map(f => (
                <button key={f} className={`filter-tab${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
                  {f === 'all' ? 'All Events' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-3">
            {filtered.map(ev => (
              <div key={ev.id} className="card">
                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <span className={`badge ${ev.badgeClass}`}>{ev.type}</span>
                    <span className={`badge ${ev.category === 'upcoming' ? 'badge-upcoming' : 'badge-past'}`}>
                      {ev.category === 'upcoming' ? '🟢 Upcoming' : '⚫ Past'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 14 }}>
                    <div className="event-date-badge" style={{ flexShrink: 0 }}>
                      <span className="day">{ev.day}</span>
                      <span className="month">{ev.month}</span>
                    </div>
                    <div>
                      <h4 className="card-title" style={{ marginBottom: 4 }}>{ev.title}</h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>{ev.year}</span>
                    </div>
                  </div>
                  <p className="card-text">{ev.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--gray)', display: 'flex', gap: 6 }}>📍 {ev.location}</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--gray)', display: 'flex', gap: 6 }}>🕐 {ev.time}</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--gray)', display: 'flex', gap: 6 }}>👥 {ev.audience}</span>
                  </div>
                </div>
                <div className="card-footer" style={{ display: 'flex', gap: 10 }}>
                  {ev.category === 'upcoming' ? (
                    <>
                      <Link href="/contact" className="btn-primary-solid btn-sm">Register →</Link>
                      <button className="btn-accent-outline btn-sm" style={{ background: 'none', cursor: 'pointer' }}>Details</button>
                    </>
                  ) : (
                    <button className="filter-tab" style={{ cursor: 'default', opacity: 0.6 }} disabled>Event Ended</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section section-bg">
        <div className="container">
          <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
            <span className="section-tag">Stay Updated</span>
            <h2 className="section-title">Never Miss an Event</h2>
            <p className="section-subtitle" style={{ marginBottom: 32 }}>Subscribe to our newsletter to receive announcements about upcoming events, workshops, and community gatherings.</p>
            {subStatus === 'success' && <div className="alert alert-success" style={{ marginBottom: 16 }}>✅ Thank you for subscribing!</div>}
            {subStatus === 'error' && <div className="alert alert-error" style={{ marginBottom: 16 }}>❌ Something went wrong. Please try again.</div>}
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 0, maxWidth: 500, margin: '0 auto' }}>
              <input type="email" placeholder="Your email address" className="form-control" style={{ borderRadius: '8px 0 0 8px', borderRight: 'none' }} required aria-label="Email address for newsletter" value={email} onChange={e => setEmail(e.target.value)} />
              <button type="submit" className="btn-submit" style={{ borderRadius: '0 8px 8px 0', width: 'auto', padding: '0 24px', whiteSpace: 'nowrap' }} disabled={subStatus === 'sending'}>{subStatus === 'sending' ? 'Subscribing...' : 'Subscribe'}</button>
            </form>
          </div>
        </div>
      </section>

      {/* Volunteer */}
      <section className="section">
        <div className="container">
          <div className="story-grid">
            <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              <img src="/images/pic8.png" alt="Volunteer" style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block', borderRadius: 'var(--radius)' }} onError={(e: any) => { e.target.src = '/images/pic1.png'; }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="section-tag">Get Involved</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: 'var(--primary)', fontWeight: 700, marginBottom: 16 }}>Want to Help With Events?</h2>
              <p style={{ color: 'var(--gray)', fontSize: '1rem', lineHeight: 1.8, marginBottom: 14 }}>We&apos;re always looking for enthusiastic volunteers to help make our events successful and impactful.</p>
              <p style={{ color: 'var(--gray)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: 24 }}>Whether you can help with setup, registration, logistics, or have special skills to contribute, we&apos;d love to have you on our volunteer team.</p>
              <Link href="/contact#volunteer" className="btn-primary-solid" style={{ alignSelf: 'flex-start' }}>Become a Volunteer →</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
