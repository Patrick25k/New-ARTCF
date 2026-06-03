import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title, description }: LayoutProps) {
  const pageTitle = title ? `${title} | ARTCF Rwanda` : 'ARTCF Rwanda – Empowering Women for Sustainable Development';
  const metaDesc = description || 'ARTCF is a Rwandan NGO dedicated to empowering women through education, healthcare, and economic programs since 1988.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'ARTCF Rwanda',
    alternateName: 'Association Rwandaise des Travailleurs Chrétiens Féminins',
    url: 'https://artcf.rw',
    logo: 'https://artcf.rw/images/ARTCF logo.jpeg',
    description: 'ARTCF is a Rwandan NGO dedicated to empowering women through education, healthcare, and economic development since 1988.',
    foundingDate: '1988',
    address: { '@type': 'PostalAddress', streetAddress: 'KG 3 Avenue', addressLocality: 'Kigali', addressCountry: 'RW' },
    contactPoint: { '@type': 'ContactPoint', telephone: '+250-788-858-468', email: 'artcfr@gmail.com', contactType: 'customer support' },
    sameAs: ['https://www.facebook.com/artcf.rwanda', 'https://x.com/ArtcfArtcfr', 'https://www.instagram.com/artcf_r9/'],
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ARTCF Rwanda" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <link rel="icon" href="/images/ARTCF logo.jpeg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
