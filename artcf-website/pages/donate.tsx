import Layout from '../components/Layout';
import Link from 'next/link';

const ways = [
  {
    icon: '🏦',
    title: 'Bank Transfer',
    desc: 'Send a direct bank transfer to our official account.',
    details: [
      { label: 'Bank', value: 'Bank of Kigali (BK)' },
      { label: 'Account Name', value: 'ARTCF Rwanda' },
      { label: 'Account Number', value: '00040-18732601-75' },
      { label: 'Branch', value: 'Kigali, Rwanda' },
      { label: 'SWIFT Code', value: 'BKIGRWRW' },
    ],
  },
  {
    icon: '📱',
    title: 'Mobile Money',
    desc: 'Donate instantly via MTN MoMo or Airtel Money.',
    details: [
      { label: 'MTN MoMo', value: '+250 788 858 468' },
      { label: 'Account Name', value: 'ARTCF Rwanda' },
    ],
  },
  {
    icon: '✉️',
    title: 'Contact for Other Methods',
    desc: 'For international wire transfers, cheques, or in-kind donations, contact us directly.',
    details: [
      { label: 'Email', value: 'artcfr@gmail.com' },
      { label: 'Phone', value: '+250 788 858 468' },
    ],
  },
];

const impacts = [
  { amount: 'RWF 5,000', impact: 'Provides school supplies for one child for a term' },
  { amount: 'RWF 20,000', impact: 'Funds a health consultation for a family in need' },
  { amount: 'RWF 50,000', impact: 'Supports a woman in a savings & loan group for 3 months' },
  { amount: 'RWF 100,000', impact: 'Trains a community leader in sustainable development skills' },
];

export default function Donate() {
  return (
    <Layout
      title="Donate"
      description="Support ARTCF Rwanda's mission to empower women. Your donation funds education, healthcare, and economic development programs across Rwanda."
    >
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>Support Our Mission</h1>
          <p>Your generosity empowers women and transforms communities across Rwanda.</p>
          <nav className="breadcrumb">
            <Link href="/">Home</Link><span>/</span><span>Donate</span>
          </nav>
        </div>
      </div>

      {/* Impact Section */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Your Impact</span>
            <h2 className="section-title">Every Contribution Matters</h2>
            <p className="section-subtitle">See what your donation can achieve for communities in Rwanda.</p>
          </div>
          <div className="grid-2" style={{ maxWidth: 800, margin: '0 auto' }}>
            {impacts.map(item => (
              <div key={item.amount} className="mission-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 16, textAlign: 'left' }}>
                <div style={{ background: 'var(--accent)', color: 'var(--dark)', borderRadius: 8, padding: '8px 14px', fontWeight: 700, fontSize: '0.95rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {item.amount}
                </div>
                <p style={{ margin: 0, color: 'var(--gray)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Donate */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Ways to Give</span>
            <h2 className="section-title">How to Donate</h2>
            <p className="section-subtitle">Choose the method that works best for you. All donations go directly toward our programs.</p>
          </div>
          <div className="grid-3">
            {ways.map(way => (
              <div key={way.title} className="card">
                <div className="card-body">
                  <div className="mission-icon" style={{ fontSize: '2.2rem', marginBottom: 12 }}>{way.icon}</div>
                  <h3 className="card-title">{way.title}</h3>
                  <p className="card-text" style={{ marginBottom: 20 }}>{way.desc}</p>
                  <div style={{ borderTop: '1px solid var(--light)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {way.details.map(d => (
                      <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', gap: 8 }}>
                        <span style={{ color: 'var(--gray)' }}>{d.label}</span>
                        <span style={{ fontWeight: 600, color: 'var(--primary)', textAlign: 'right' }}>{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-tag light">Our Commitment</span>
            <h2 className="section-title white">Full Transparency</h2>
            <p className="section-subtitle white">ARTCF is committed to responsible stewardship of every donation received.</p>
          </div>
          <div className="stats-grid">
            {[
              { number: '85%', label: 'Goes to Programs' },
              { number: '10%', label: 'Operations' },
              { number: '5%', label: 'Fundraising' },
              { number: '35+', label: 'Years of Service' },
            ].map(s => (
              <div key={s.label} className="stat-box">
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', marginTop: 32, fontSize: '0.9rem' }}>
            Annual financial reports are available on request. Contact us at artcfr@gmail.com
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section">
        <div className="container">
          <h2>Have Questions About Donating?</h2>
          <p>Our team is happy to assist with any questions about your contribution or how it will be used.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">Contact Us →</Link>
            <Link href="/programs" className="btn-outline">See Our Programs</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
