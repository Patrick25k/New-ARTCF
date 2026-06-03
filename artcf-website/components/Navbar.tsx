import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    children: [
      { label: 'Who We Are & What We Do', href: '/about' },
      { label: 'Our Story', href: '/about#story' },
      { label: 'Our Mission & Vision', href: '/about#mission' },
      { label: 'Our Core Values', href: '/about#values' },
      { label: 'Our Partners', href: '/about#partners' },
      { label: 'Our Leadership Team', href: '/about#team' },
    ],
  },
  {
    label: 'Our Programs',
    children: [
      { label: 'Education Programs', href: '/programs#education' },
      { label: 'Healthcare Programs', href: '/programs#healthcare' },
      { label: 'Economic Empowerment', href: '/programs#economic' },
      { label: 'Impact Stories', href: '/programs#impact' },
    ],
  },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  {
    label: 'Get Involved',
    children: [
      { label: 'Donate', href: '/donate' },
      { label: 'Volunteer With Us', href: '/contact#volunteer' },
      { label: 'Partner With Us', href: '/contact#partner' },
    ],
  },
  {
    label: 'Publications',
    children: [
      { label: 'Annual Report 2024', href: '/about#reports' },
      { label: 'Annual Report 2019', href: '/about#reports' },
      { label: 'Annual Report 2017', href: '/about#reports' },
      { label: 'Financial Statements', href: '/about#reports' },
    ],
  },
  { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [router.pathname]);

  const isActive = (href?: string) => href && router.pathname === href;

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <a href="tel:+250788858468">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"/></svg>
            +250 788 858 468
          </a>
          <a href="mailto:artcfr@gmail.com">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            artcfr@gmail.com
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar" style={{ boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div className="container" style={{ position: 'relative' }}>
          <Link href="/" className="navbar-brand">
            <img src="/images/ARTCF logo.jpeg" alt="ARTCF Logo" onError={(e: any) => { e.target.style.display='none'; }} />
            <span>ARTCF</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="nav-links" id="nav-links" style={{ margin: 0, padding: 0 }}>
            {navItems.map((item) =>
              item.children ? (
                <li key={item.label} className="nav-item">
                  <button
                    className={`nav-link${item.children.some(c => isActive(c.href)) ? ' active' : ''}`}
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  >
                    {item.label} <span className="chevron">▾</span>
                  </button>
                  <div className="dropdown-menu">
                    {item.children.map((child) => (
                      <Link key={child.label} href={child.href} className="dropdown-item">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </li>
              ) : (
                <li key={item.label} className="nav-item">
                  <Link href={item.href!} className={`nav-link${isActive(item.href) ? ' active' : ''}`}>
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{
            position: 'absolute', top: '74px', left: 0, right: 0,
            background: 'white', padding: '16px 24px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            zIndex: 999, borderTop: '3px solid var(--accent)'
          }}>
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none',
                      padding: '12px 0', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', color: 'var(--text)', fontFamily: 'inherit'
                    }}
                  >
                    {item.label} <span>{openDropdown === item.label ? '▴' : '▾'}</span>
                  </button>
                  {openDropdown === item.label && (
                    <div style={{ paddingLeft: 16, borderLeft: '3px solid var(--accent)', marginBottom: 8 }}>
                      {item.children.map((child) => (
                        <Link key={child.label} href={child.href}
                          style={{ display: 'block', padding: '8px 0', fontSize: '0.88rem', color: 'var(--gray)', textDecoration: 'none' }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.label} href={item.href!}
                  style={{ display: 'block', padding: '12px 0', fontWeight: 600, fontSize: '0.95rem',
                    color: isActive(item.href) ? 'var(--accent)' : 'var(--text)', textDecoration: 'none',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                >
                  {item.label}
                </Link>
              )
            )}

          </div>
        )}
      </nav>
    </>
  );
}
