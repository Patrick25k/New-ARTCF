import Layout from '../components/Layout';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Layout title="Page Not Found" description="The page you are looking for could not be found.">
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '6rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1, fontFamily: "'Playfair Display', serif" }}>404</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: 'var(--primary)', margin: '16px 0 12px', fontWeight: 700 }}>Page Not Found</h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
            Sorry, the page you are looking for does not exist or may have been moved.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-primary-solid">Go Home</Link>
            <Link href="/contact" className="btn-accent-outline">Contact Us</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
