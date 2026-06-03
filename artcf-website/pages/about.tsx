import Layout from '../components/Layout';
import Link from 'next/link';

const values = [
  { icon: '⚖️', title: 'Faith & Justice', desc: 'The association works with all people concerned for sustainable development regardless of any religion.' },
  { icon: '🙌', title: 'Labor', desc: 'ARTCF is committed to be creative and constructively engage to make the greatest possible impact on eradicating women\'s poverty.' },
  { icon: '🌿', title: 'Hospitality & Caring', desc: 'ARTCF recognizes and appreciates the inherent value of each human being and the significance of diversity.' },
  { icon: '👥', title: 'Solidarity & Charity', desc: 'ARTCF members demonstrate Christian behavior by acting in a charitable way for all human beings in need, especially the most vulnerable.' },
];

const partners = [
  { src: '/images/USAID-Identity.svg', alt: 'USAID' },
  { src: '/images/WHO_logo.svg', alt: 'WHO' },
  { src: '/images/The_Global_Fund_logo.svg', alt: 'The Global Fund' },
  { src: '/images/UNAIDS.svg', alt: 'UNAIDS' },
  { src: '/images/USAID-Seal.svg', alt: 'USAID Seal' },
  { src: '/images/US_CDC_logo.svg', alt: 'US CDC' },
];

const reports = [
  { icon: '📄', title: 'Annual Report 2024', desc: 'A detailed overview of our programs, achievements, and financial statements from 2024.', file: '/documents/Annual Report Y 2024.pdf' },
  { icon: '📄', title: 'Annual Report 2019', desc: 'Overview of programs and achievements including the Alphabetisation des Adultes project.', file: '/documents/ARTCF Rapport Narratif du projet d\'Alphabetisation des Adultes.pdf' },
  { icon: '📄', title: 'Annual Report 2017', desc: 'Our comprehensive report detailing activities, impact, and financial information for 2017.', file: '/documents/Annual report 2017 (1).pdf' },
  { icon: '📊', title: 'Financial Statements', desc: 'Audited financial statements demonstrating our commitment to responsible stewardship.', file: '#' },
];

export default function About() {
  return (
    <Layout title="About Us" description="Learn about ARTCF's history, mission, vision, values, and the team behind our work empowering women in Rwanda since 1988.">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>About ARTCF</h1>
          <p>Learn about our history, mission, and the team behind our work empowering women since 1988.</p>
          <nav className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>About Us</span></nav>
        </div>
      </div>

      {/* Our Story */}
      <section className="section" id="story">
        <div className="container">
          <div className="story-grid">
            <div className="story-img" style={{ position: 'relative', zIndex: 0 }}>
              <img src="/images/pic8.png" alt="ARTCF Story" onError={(e: any) => { e.target.src='/images/pic1.png'; }} />
            </div>
            <div className="story-content">
              <span className="section-tag">Our Story</span>
              <h2>A Legacy of Empowering Women</h2>
              <p>Founded in 1988 and granted legal status as a non-governmental organisation in Rwanda in April 1991, ARTCF was created to improve life conditions of people by fighting poverty especially alongside poor women.</p>
              <p>ARTCF was set up by an initiative of a group of Rwandan women who identified difficulties women faced: raising children alone, lacking stable employment, and having no material or moral support.</p>
              <p>People living in poverty are largely women who live in rural areas and in some parts surrounding Kigali city. ARTCF works with them and their organizations to empower them to engage with duty bearers to respond to their needs.</p>
              <p>ARTCF facilitates the active participation and ownership of community members in all aspects of their development — reciprocal relationships, mutual accountability, shared decision-making, and a culture of dialogue.</p>
              <div style={{ marginTop: 28 }}>
                <Link href="/programs" className="btn-primary-solid">Our Programs →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section section-bg" id="mission">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Purpose</span>
            <h2 className="section-title">Our Mission &amp; Vision</h2>
            <p className="section-subtitle">Guiding principles that drive our work every day.</p>
          </div>
          <div className="grid-2">
            <div className="card" style={{ borderLeft: '5px solid var(--accent)' }}>
              <div className="card-body">
                <div style={{ fontSize: '2rem', marginBottom: 14 }}>🎯</div>
                <h3 className="card-title" style={{ fontSize: '1.3rem' }}>Our Mission</h3>
                <p className="card-text">ARTCF intervenes with workers living low life standards with focus on women to empower them by raising awareness of their ability to get out from socio-economic problems and to be financially and socially independent.</p>
                <p className="card-text">We believe in working alongside communities, respecting their knowledge and experiences, and co-creating solutions that lead to lasting change.</p>
              </div>
            </div>
            <div className="card" style={{ borderLeft: '5px solid var(--primary)' }}>
              <div className="card-body">
                <div style={{ fontSize: '2rem', marginBottom: 14 }}>🌟</div>
                <h3 className="card-title" style={{ fontSize: '1.3rem' }}>Our Vision</h3>
                <p className="card-text">A country without poverty and injustice in which every person enjoys the well-being both physically and spiritually.</p>
                <p className="card-text">We envision societies where education is accessible to all, healthcare is a right, and development is sustainable and equitable for women and their families.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section" id="values">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Stand For</span>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles that guide every aspect of our work with communities.</p>
          </div>
          <div className="grid-4">
            {values.map(v => (
              <div key={v.title} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section section-bg" id="partners">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Collaboration</span>
            <h2 className="section-title">Our Partners</h2>
            <p className="section-subtitle">We collaborate with organizations that share our vision and values for sustainable development.</p>
          </div>
          <div className="partners-row" style={{ marginBottom: 36 }}>
            {partners.map(p => (
              <img key={p.alt} src={p.src} alt={p.alt} className="partner-logo" />
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/contact#partner" className="btn-accent-outline">Become a Partner</Link>
          </div>
        </div>
      </section>

      {/* Annual Reports */}
      <section className="section" id="reports">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Transparency</span>
            <h2 className="section-title">Annual Reports &amp; Financials</h2>
            <p className="section-subtitle">We are committed to transparency and accountability in all our activities.</p>
          </div>
          <div className="grid-4">
            {reports.map(r => (
              <div key={r.title} className="report-card">
                <div className="report-icon">{r.icon}</div>
                <h5>{r.title}</h5>
                <p>{r.desc}</p>
                <a href={r.file} target="_blank" rel="noopener noreferrer" className="btn-accent-outline btn-sm">
                  {r.icon === '📊' ? 'View Financials' : 'Download PDF'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section">
        <div className="container">
          <h2>Join Our Mission</h2>
          <p>Together, we can create lasting change in communities across Rwanda.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/events" className="btn-primary">Upcoming Events →</Link>
            <Link href="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
