import { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { API } from '../utils/api';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', type: 'general' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) { setStatus('success'); setFormData({ name: '', email: '', phone: '', subject: '', message: '', type: 'general' }); }
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <Layout title="Contact Us" description="Get in touch with ARTCF Rwanda. Send us a message, volunteer, become a partner, or learn how to donate to support our mission.">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We&apos;d love to hear from you. Reach out to get involved, ask questions, or partner with us.</p>
          <nav className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Contact Us</span></nav>
        </div>
      </div>

      {/* Contact Section */}
      <section className="section" id="contact">
        <div className="container">
          <div className="contact-grid">
            {/* Left: Info */}
            <div className="contact-info-box">
              <h3>Get In Touch</h3>
              <p>We are here to answer any questions you may have. Reach out to us and we will respond as soon as we can.</p>

              <div className="contact-item">
                <div className="contact-item-icon">📍</div>
                <div className="contact-item-text">
                  <h6>Our Office</h6>
                  <p>KG 3 Avenue, Kigali, Rwanda</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">📞</div>
                <div className="contact-item-text">
                  <h6>Phone</h6>
                  <p>+250 788 858 468</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">✉</div>
                <div className="contact-item-text">
                  <h6>Email</h6>
                  <p>artcfr@gmail.com</p>
                  <p>artcf2004@yahoo.fr</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">🕐</div>
                <div className="contact-item-text">
                  <h6>Office Hours</h6>
                  <p>Mon–Fri: 8:00 AM – 5:00 PM</p>
                </div>
              </div>

              <div className="social-links">
                <a href="https://www.facebook.com/artcf.rwanda" target="_blank" rel="noopener noreferrer" className="social-link">f</a>
                <a href="https://x.com/ArtcfArtcfr" target="_blank" rel="noopener noreferrer" className="social-link">✕</a>
                <a href="https://www.instagram.com/artcf_r9/" target="_blank" rel="noopener noreferrer" className="social-link">📷</a>
                <a href="https://www.youtube.com/watch?v=npvEdhGmVlo" target="_blank" rel="noopener noreferrer" className="social-link">▶</a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="form-card">
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', color: 'var(--primary)', marginBottom: 8, fontWeight: 700 }}>Send Us a Message</h3>
              <p style={{ color: 'var(--gray)', fontSize: '0.9rem', marginBottom: 28 }}>Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

              {status === 'success' && (
                <div className="alert alert-success">✅ Thank you! Your message has been sent. We&apos;ll respond within 24 hours.</div>
              )}
              {status === 'error' && (
                <div className="alert alert-error">❌ Something went wrong. Please try emailing us directly at artcfr@gmail.com</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input type="text" name="name" className="form-control" placeholder="Your full name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input type="email" name="email" className="form-control" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" name="phone" className="form-control" placeholder="+250 7XX XXX XXX" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Inquiry Type</label>
                    <select name="type" className="form-control" value={formData.type} onChange={handleChange} aria-label="Inquiry type">
                      <option value="general">General Inquiry</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="partner">Partnership</option>
                      <option value="donate">Donation</option>
                      <option value="media">Media</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject *</label>
                  <input type="text" name="subject" className="form-control" placeholder="What is your message about?" value={formData.subject} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea name="message" className="form-control" placeholder="Tell us how we can help you..." value={formData.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? '⌛ Sending...' : '📩 Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Cards */}
      <section className="section section-bg" id="volunteer">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Take Action</span>
            <h2 className="section-title">Ways to Get Involved</h2>
            <p className="section-subtitle">Join our mission in the way that suits you best.</p>
          </div>
          <div className="grid-3">
            {[
              { id: 'volunteer', icon: '🤲', title: 'Volunteer', desc: 'Share your skills—teaching, healthcare, logistics, or communications—to support our field programs across Rwanda.', cta: 'Volunteer Now' },
              { id: 'partner', icon: '🤝', title: 'Partner With Us', desc: 'Organizations, universities, and corporations can partner with ARTCF to amplify impact and scale our programs.', cta: 'Become a Partner' },
              { id: 'gallery', icon: '📸', title: 'View Gallery', desc: 'Explore photos, videos, and compassion stories from our programs and communities across Rwanda.', cta: 'Visit Gallery' },
            ].map(c => (
              <div key={c.id} id={c.id} className="mission-card">
                <div className="mission-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div style={{ marginTop: 16 }}>
                  {c.id === 'gallery' ? (
                    <Link href="/gallery" className="btn-primary-solid btn-sm">{c.cta}</Link>
                  ) : (
                    <button
                      className="btn-primary-solid btn-sm"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      {c.cta}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section style={{ height: 420, position: 'relative', overflow: 'hidden' }}>
        <iframe
          title="ARTCF Rwanda Office Location"
          src="https://maps.google.com/maps?q=KG+3+Avenue+Kigali+Rwanda&output=embed&z=15"
          width="100%"
          height="100%"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label="Map showing ARTCF Rwanda office at KG 3 Avenue, Kigali"
        />
      </section>
    </Layout>
  );
}
