import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

const heroSlides = [
  { id: 'pic1', bg: '/images/pic1.png' },
  { id: 'pic2', bg: '/images/pic2.jpg' },
  { id: 'pic3', bg: '/images/pic3.png' },
];

const programs = [
  {
    img: '/images/pic10.png',
    tag: 'Nutrition',
    title: 'Fighting Malnutrition',
    desc: 'Helping children and families eat healthy foods so they can grow strong and stay healthy.',
  },
  {
    img: '/images/pic9.png',
    tag: 'Education',
    title: 'Adult Literacy',
    desc: 'Giving adults the skills they need to work, help their children, and understand information.',
  },
  {
    img: '/images/pic2.jpg',
    tag: 'Economic',
    title: 'Voluntary Saving & Loan Groups',
    desc: 'Helping people manage money, start small businesses, or handle emergencies effectively.',
  },
];

const stats = [
  { number: '50+', label: 'Communities Served' },
  { number: '10K+', label: 'Lives Impacted' },
  { number: '100+', label: 'Projects Completed' },
  { number: '25+', label: 'Ongoing Projects' },
];

const events = [
  { day: '10', month: 'May', title: 'Community Health Workshop', location: 'Kigali, Rwanda', time: '9:00 AM – 3:00 PM', desc: 'Hands-on workshop to promote hygiene, nutrition, and preventive care in local villages.' },
  { day: '15', month: 'Jun', title: 'Youth Empowerment Summit', location: 'Musanze District', time: '8:30 AM – 4:00 PM', desc: 'Regional conference to inspire young leaders with skills for community development.' },
  { day: '22', month: 'Jul', title: 'Environmental Awareness Drive', location: 'Huye, Southern Province', time: '8:00 AM – 2:00 PM', desc: 'Community tree planting and clean-up to support sustainable practices.' },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout title="Home" description="ARTCF is dedicated to empowering women in Rwanda through education, healthcare, and economic development.">
      {/* ── HERO ── */}
      <section className="hero">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`hero-slide${idx === currentSlide ? ' active' : ''}`}
            style={{ backgroundImage: `url('${slide.bg}')` }}
          />
        ))}
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content animate-up">
            <span className="hero-tag">Since 1988</span>
            <h1>Empowering Women For Sustainable Development</h1>
            <p>ARTCF is dedicated to creating positive change through community‑driven initiatives and sustainable development programs across Rwanda.</p>
            <div className="hero-btns">
              <Link href="/programs" className="btn-primary">Our Programs →</Link>
              <Link href="/contact" className="btn-outline">Get Involved</Link>
            </div>
          </div>
        </div>
        <div className="hero-indicators">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              className={`hero-dot${idx === currentSlide ? ' active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES ── */}
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {[
              { icon: '🤝', title: 'Our Mission', text: 'ARTCF intervenes to empower women living in low standards by raising awareness of their ability to get out from socio-economic problems and to be financially and socially independent.' },
              { icon: '👁️', title: 'Our Vision', text: 'A country without poverty and injustice in which every person enjoys well-being both physically and spiritually — a future where women lead communities.' },
              { icon: '💛', title: 'Our Values', text: 'Labor, Faith & Justice, Solidarity & Charity, Sustainability, Hospitality, Simplicity and Caring — principles that guide every action we take.' },
            ].map(item => (
              <div key={item.title} className="mission-card">
                <div className="mission-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT STATS ── */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-tag light">Our Impact</span>
            <h2 className="section-title white">Making a Difference</h2>
            <p className="section-subtitle white">Over the years, ARTCF has made significant contributions to communities across Rwanda.</p>
          </div>
          <div className="stats-grid">
            {stats.map(s => (
              <div key={s.label} className="stat-box">
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROGRAMS ── */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Do</span>
            <h2 className="section-title">Featured Programs</h2>
            <p className="section-subtitle">Explore some of our key initiatives making a real difference in Rwandan communities.</p>
          </div>
          <div className="grid-3">
            {programs.map(p => (
              <div key={p.title} className="card">
                <img src={p.img} alt={p.title} className="card-img" onError={(e: any) => { e.target.src='/images/pic1.png'; }} />
                <div className="card-body">
                  <span className="card-tag">{p.tag}</span>
                  <h3 className="card-title">{p.title}</h3>
                  <p className="card-text">{p.desc}</p>
                  <div style={{ marginTop: 'auto' }}>
                    <Link href="/programs" className="btn-accent-outline btn-sm">Learn More →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/programs" className="btn-primary-solid">View All Programs</Link>
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Calendar</span>
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-subtitle">Join us in our upcoming activities to connect, learn, and create change together.</p>
          </div>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {events.map(ev => (
              <div key={ev.title} className="event-row">
                <div className="event-date-badge">
                  <span className="day">{ev.day}</span>
                  <span className="month">{ev.month}</span>
                </div>
                <div className="event-info">
                  <h4>{ev.title}</h4>
                  <div className="event-meta">
                    <span>📍 {ev.location}</span>
                    <span>🕐 {ev.time}</span>
                  </div>
                  <p>{ev.desc}</p>
                </div>
                <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
                  <Link href="/events" className="btn-accent-outline btn-sm">Details</Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href="/events" className="btn-primary-solid">All Events →</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Impact Stories</span>
            <h2 className="section-title">Lives We&apos;ve Changed</h2>
            <p className="section-subtitle">Hear from the women and communities whose lives have been transformed.</p>
          </div>
          <div className="grid-2">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "ARTCF&apos;s education program has transformed our community. Children now have access to quality education and resources they never had before. Our women have become leaders."
              </p>
              <div className="testimonial-author">
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem', color: 'var(--dark)' }}>S</div>
                <div className="testimonial-info">
                  <h5>Sarah Johnson</h5>
                  <span>Community Leader, Kigali</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Before joining the Kira Wigire program, it was very difficult for me to respond to all the needs in my family. After participating in ARTCF&apos;s training, I built my own house and paid school fees for my children."
              </p>
              <div className="testimonial-author">
                <img src="/images/PIC T.jpg" alt="Bertilde" className="testimonial-avatar" onError={(e: any) => { e.target.style.display='none'; }} />
                <div className="testimonial-info">
                  <h5>Bertilde Nyirankurikiyimana</h5>
                  <span>Program Beneficiary, Gishubi Sector</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="section-sm">
        <div className="container">
          <div className="section-header" style={{ marginBottom: 32 }}>
            <span className="section-tag">Partnerships</span>
            <h2 className="section-title">Our Partners</h2>
          </div>
          <div className="partners-row">
            {[
              { src: '/images/USAID-Identity.svg', alt: 'USAID' },
              { src: '/images/WHO_logo.svg', alt: 'WHO' },
              { src: '/images/The_Global_Fund_logo.svg', alt: 'The Global Fund' },
              { src: '/images/UNAIDS.svg', alt: 'UNAIDS' },
            ].map(p => (
              <img key={p.alt} src={p.src} alt={p.alt} className="partner-logo" />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-section">
        <div className="container">
          <h2>Join Us in Making It Happen</h2>
          <p>Be part of our journey to empower more communities and promote sustainable development across Rwanda.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">Get Involved →</Link>
            <Link href="/programs" className="btn-outline">Our Programs</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
