import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* About */}
          <div>
            <Link href="/" className="footer-logo">
              <img src="/images/ARTCF logo.jpeg" alt="ARTCF" onError={(e: any) => { e.target.style.display='none'; }} />
              <span>ARTCF</span>
            </Link>
            <p className="footer-about">
              Association Rwandaise des Travailleurs Chrétiens Féminins.<br />
              Empowering women through sustainable development since 1988 in Rwanda.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/artcf.rwanda" target="_blank" rel="noopener noreferrer" title="Facebook">f</a>
              <a href="https://x.com/ArtcfArtcfr" target="_blank" rel="noopener noreferrer" title="Twitter">✕</a>
              <a href="https://www.instagram.com/artcf_r9/" target="_blank" rel="noopener noreferrer" title="Instagram">📷</a>
              <a href="https://www.youtube.com/watch?v=npvEdhGmVlo" target="_blank" rel="noopener noreferrer" title="YouTube">▶</a>
              <a href="#" title="LinkedIn">in</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><Link href="/">› Home</Link></li>
              <li><Link href="/about">› About Us</Link></li>
              <li><Link href="/programs">› Our Programs</Link></li>
              <li><Link href="/events">› Events</Link></li>
              <li><Link href="/gallery">› Gallery</Link></li>
              <li><Link href="/contact">› Contact Us</Link></li>
              <li><Link href="/about#reports">› Annual Reports</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="footer-heading">Contact Info</h5>
            <div className="footer-contact-item">
              <span>📍</span>
              <div>KG 3 Avenue, Kigali, Rwanda</div>
            </div>
            <div className="footer-contact-item">
              <span>📞</span>
              <div>+250 788 858 468</div>
            </div>
            <div className="footer-contact-item">
              <span>✉</span>
              <div>artcfr@gmail.com</div>
            </div>
            <div className="footer-contact-item">
              <span>✉</span>
              <div>artcf2004@yahoo.fr</div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="footer-heading">Newsletter</h5>
            <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>
              Subscribe to stay updated on our programs, events, and impact stories.
            </p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button type="button">Subscribe</button>
            </div>
            <div style={{ marginTop: 20 }}>
              <h6 style={{ color: 'white', fontWeight: 600, fontSize: '0.85rem', marginBottom: 10 }}>Partners</h6>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                {['USAID','WHO','UNICEF','World Bank'].map(p => (
                  <span key={p} style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.65)', padding: '3px 10px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600 }}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <p style={{ margin: 0 }}>© 2025 ARTCF – Association Rwandaise des Travailleurs Chrétiens Féminins. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
