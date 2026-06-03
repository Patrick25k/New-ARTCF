import { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

type GalleryFilter = 'all' | 'photos' | 'videos' | 'stories';

const photos = [
  { id: 1, src: '/images/pic1.png', title: 'Women Empowerment Program', caption: 'Community training session for women entrepreneurs in Kigali', category: 'Economic' },
  { id: 2, src: '/images/pic2.jpg', title: 'Savings Group Meeting', caption: 'A VSLA group meeting where members discuss financial literacy', category: 'Economic' },
  { id: 3, src: '/images/pic3.png', title: 'Community Gathering', caption: 'Annual community meeting bringing together program beneficiaries', category: 'Community' },
  { id: 4, src: '/images/s1.png', title: 'Healthcare Outreach', caption: 'Mobile health clinic providing free screenings in rural Rwanda', category: 'Healthcare' },
  { id: 5, src: '/images/s2.png', title: 'Adult Literacy Class', caption: 'Women learning reading and writing skills through our literacy program', category: 'Education' },
  { id: 6, src: '/images/s3.jpg', title: 'Leadership Workshop', caption: 'Emerging community leaders during a capacity-building workshop', category: 'Education' },
  { id: 7, src: '/images/s4.jpg', title: 'Agricultural Training', caption: 'Teaching sustainable farming practices to women cooperatives', category: 'Economic' },
  { id: 8, src: '/images/s5.jpg', title: 'Nutrition Program', caption: 'Community cooking demonstration promoting healthy eating habits', category: 'Healthcare' },
  { id: 9, src: '/images/s6.jpeg', title: 'Child Education Support', caption: 'Students receiving school supplies through our education initiative', category: 'Education' },
  { id: 10, src: '/images/s7.jpg', title: 'Digital Skills Training', caption: 'Young women learning computer skills at our technology center', category: 'Education' },
  { id: 11, src: '/images/pic8.png', title: 'Vocational Training', caption: 'Hands-on skills development for self-employment', category: 'Economic' },
  { id: 12, src: '/images/pic9.png', title: 'Maternal Health Care', caption: 'Prenatal care and health education for expecting mothers', category: 'Healthcare' },
  { id: 13, src: '/images/pic10.png', title: 'Nutrition Awareness', caption: 'Teaching families about balanced diets and child nutrition', category: 'Healthcare' },
  { id: 14, src: '/images/pic4.png', title: 'Community Meeting', caption: 'Village leaders discussing local development priorities', category: 'Community' },
  { id: 15, src: '/images/m1.jpg', title: 'Celebrating Family Program', caption: 'Families strengthening bonds through ARTCF counseling sessions', category: 'Community' },
];

const videos = [
  { id: 1, title: 'ARTCF Rwanda — Our Mission', desc: 'An overview of ARTCF\'s work empowering women through education, healthcare, and economic development across Rwanda.', url: 'https://www.youtube.com/watch?v=npvEdhGmVlo', thumbnail: '/images/pic1.png' },
  { id: 2, title: 'Women Leading Change', desc: 'Meet the women who have transformed their communities through ARTCF\'s programs and training initiatives.', url: 'https://www.youtube.com/watch?v=npvEdhGmVlo', thumbnail: '/images/pic3.png' },
  { id: 3, title: 'From Poverty to Progress', desc: 'Documentary following the journey of women who escaped poverty through the Kira Wigire savings program.', url: 'https://www.youtube.com/watch?v=npvEdhGmVlo', thumbnail: '/images/s2.png' },
];

const compassionStories = [
  {
    id: 1, img: '/images/PIC T.jpg', name: 'Bertilde Nyirankurikiyimana', location: 'Gishubi Sector',
    title: 'From Struggle to Self-Sufficiency',
    story: 'Bertilde, a mother of three children living in Gishubi sector, faced unimaginable hardship. Before joining the Kira Wigire program, it was very difficult for her to respond to all their needs — her children had dropped out of school, and the family lived without hope. After participating in the training organized by ARTCF in partnership with World Vision, everything changed. She transformed her mindset, learned financial literacy, and got a loan from the S4T group. With determination and the skills she gained, Bertilde built her own house, bought chickens and goats for income, and paid school fees for all her children. Today, she is an inspiration in her community.',
    highlight: 'Built her own house and sent all 3 children back to school'
  },
  {
    id: 2, img: '/images/PIC TE.jpg', name: 'Sibomuremyi Onesphore & Mukakalisa Thacienne', location: 'Kigali, Rwanda',
    title: 'Rebuilding a Family Together',
    story: 'Sibomuremyi and Mukakalisa were living in extreme poverty, made worse by conflict in their family. Their relationship was strained, resources were scarce, and hope seemed distant. Through World Vision\'s partnership with ARTCF, they participated in the "Celebrating Family" sessions — a program designed to strengthen family bonds and resolve conflicts. The training changed their mindset and their lives. They learned to communicate, plan together, and support each other. Now they are able to solve problems collaboratively and have become an exemplary couple in their community, inspiring others to seek help and build stronger families.',
    highlight: 'Transformed from family conflict to community role models'
  },
  {
    id: 3, img: '/images/s1.png', name: 'Marie Claire Uwimana', location: 'Muhanga District',
    title: 'Empowered Through Education',
    story: 'Marie Claire had never learned to read or write. As a farmer and mother of five, she felt trapped by her illiteracy — unable to read labels on medicine for her children, sign official documents, or manage her small business properly. When ARTCF\'s adult literacy program came to her village, she enrolled despite feeling embarrassed at her age. Within two years, Marie Claire could read, write, and do basic math. She now keeps financial records for her cooperative, reads bedtime stories to her grandchildren, and mentors other women in her community to join the program. "Learning to read," she says, "gave me eyes I never knew I was missing."',
    highlight: 'From illiteracy to managing cooperative finances'
  },
  {
    id: 4, img: '/images/s5.jpg', name: 'Jeannette Mukamana', location: 'Nyamasheke District',
    title: 'A Nutrition Champion',
    story: 'Jeannette\'s two-year-old daughter was severely malnourished. With limited knowledge of child nutrition and scarce resources, Jeannette didn\'t know how to help her child. ARTCF\'s nutrition program reached her village with cooking demonstrations, kitchen garden training, and health education. Jeannette learned to grow nutrient-rich vegetables, prepare balanced meals from locally available foods, and recognize signs of malnutrition. Within six months, her daughter\'s health dramatically improved. Today, Jeannette trains other mothers in her village, running weekly cooking demonstrations and sharing the knowledge that saved her daughter\'s life.',
    highlight: 'Daughter recovered from malnutrition; now trains other mothers'
  },
];

export default function Gallery() {
  const [filter, setFilter] = useState<GalleryFilter>('all');
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);
  const [expandedStory, setExpandedStory] = useState<number | null>(null);

  return (
    <Layout title="Gallery" description="Explore photos, videos, and compassion stories from ARTCF's programs empowering women and communities across Rwanda.">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>Gallery</h1>
          <p>Discover the impact of our work through photos, videos, and stories of transformation.</p>
          <nav className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Gallery</span></nav>
        </div>
      </div>

      {/* Filter Tabs */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
            <div>
              <span className="section-tag">Explore</span>
              <h2 className="section-title" style={{ margin: 0 }}>Our Gallery</h2>
            </div>
            <div className="filter-tabs" style={{ margin: 0 }}>
              {(['all', 'photos', 'videos', 'stories'] as GalleryFilter[]).map(f => (
                <button key={f} className={`filter-tab${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
                  {f === 'all' ? '🌟 All' : f === 'photos' ? '📸 Photos' : f === 'videos' ? '🎬 Videos' : '💛 Compassion Stories'}
                </button>
              ))}
            </div>
          </div>

          {/* ── PHOTO GALLERY ── */}
          {(filter === 'all' || filter === 'photos') && (
            <div style={{ marginBottom: 60 }}>
              {filter === 'all' && (
                <div style={{ marginBottom: 28 }}>
                  <span className="section-tag">Photography</span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 700, marginTop: 8 }}>Photo Gallery</h3>
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {photos.map(photo => (
                  <div key={photo.id} className="gallery-card" onClick={() => setLightbox({ src: photo.src, title: photo.title })}
                    style={{ borderRadius: 'var(--radius)', overflow: 'hidden', cursor: 'pointer', position: 'relative', boxShadow: 'var(--shadow)', transition: 'var(--transition)' }}>
                    <img src={photo.src} alt={photo.title}
                      style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                      onError={(e: any) => { e.target.src = '/images/pic1.png'; }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', padding: '40px 16px 16px', color: 'white' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{photo.title}</span>
                        <span className="badge badge-upcoming" style={{ fontSize: '0.65rem' }}>{photo.category}</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', opacity: 0.8 }}>{photo.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── VIDEOS ── */}
          {(filter === 'all' || filter === 'videos') && (
            <div style={{ marginBottom: 60 }}>
              {filter === 'all' && (
                <div style={{ marginBottom: 28 }}>
                  <span className="section-tag">Media</span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 700, marginTop: 8 }}>Videos</h3>
                </div>
              )}
              <div className="grid-3">
                {videos.map(video => (
                  <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ cursor: 'pointer' }}>
                      <div style={{ position: 'relative' }}>
                        <img src={video.thumbnail} alt={video.title} className="card-img" onError={(e: any) => { e.target.src = '/images/pic1.png'; }} />
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)', transition: 'var(--transition)' }}>
                          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', color: 'var(--dark)', boxShadow: '0 4px 20px rgba(240,165,0,0.5)' }}>▶</div>
                        </div>
                      </div>
                      <div className="card-body">
                        <h3 className="card-title">{video.title}</h3>
                        <p className="card-text">{video.desc}</p>
                        <span style={{ color: 'var(--accent-dark)', fontWeight: 700, fontSize: '0.85rem' }}>Watch on YouTube →</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* ── COMPASSION STORIES ── */}
          {(filter === 'all' || filter === 'stories') && (
            <div>
              {filter === 'all' && (
                <div style={{ marginBottom: 28 }}>
                  <span className="section-tag">Impact</span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 700, marginTop: 8 }}>Compassion Stories</h3>
                </div>
              )}
              <div style={{ display: 'grid', gap: 28 }}>
                {compassionStories.map(story => (
                  <div key={story.id} className="card" style={{ overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 0 }}>
                      <div style={{ position: 'relative' }}>
                        <img src={story.img} alt={story.name}
                          style={{ width: '100%', height: '100%', minHeight: 280, objectFit: 'cover' }}
                          onError={(e: any) => { e.target.src = '/images/pic1.png'; }} />
                        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                          <span style={{ background: 'var(--accent)', color: 'var(--dark)', padding: '4px 12px', borderRadius: 50, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                            ✨ {story.highlight}
                          </span>
                        </div>
                      </div>
                      <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column' }}>
                        <span className="section-tag" style={{ alignSelf: 'flex-start', marginBottom: 12 }}>Compassion Story</span>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: 'var(--primary)', fontWeight: 700, marginBottom: 8 }}>{story.title}</h3>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
                          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', color: 'var(--dark)' }}>
                            {story.name.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>{story.name}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>📍 {story.location}</div>
                          </div>
                        </div>
                        <p style={{ color: 'var(--gray)', fontSize: '0.92rem', lineHeight: 1.8, flex: 1 }}>
                          {expandedStory === story.id ? story.story : story.story.slice(0, 250) + '...'}
                        </p>
                        <button
                          onClick={() => setExpandedStory(expandedStory === story.id ? null : story.id)}
                          className="btn-accent-outline btn-sm"
                          style={{ alignSelf: 'flex-start', marginTop: 14, background: 'none', cursor: 'pointer' }}
                        >
                          {expandedStory === story.id ? 'Read Less ↑' : 'Read Full Story →'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section">
        <div className="container">
          <h2>Every Story Matters</h2>
          <p>Behind every number is a real person whose life has been transformed. Join us in writing more stories of hope.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact#volunteer" className="btn-primary">Get Involved →</Link>
            <Link href="/programs" className="btn-outline">Our Programs</Link>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, cursor: 'pointer', padding: 24 }}>
          <div style={{ position: 'relative', maxWidth: 900, width: '100%' }} onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.title}
              style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 12 }} />
            <div style={{ textAlign: 'center', marginTop: 16, color: 'white' }}>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', marginBottom: 4 }}>{lightbox.title}</h4>
            </div>
            <button onClick={() => setLightbox(null)}
              style={{ position: 'absolute', top: -16, right: -16, width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', color: 'var(--dark)', border: 'none', fontSize: '1.2rem', fontWeight: 700, cursor: 'pointer' }}>
              ✕
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
