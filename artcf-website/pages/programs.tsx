import Layout from '../components/Layout';
import Link from 'next/link';

const educationPrograms = [
  { img: '/images/s2.png', title: "Women's Literacy Program", desc: 'Adult literacy classes for women who missed out on formal education, empowering them with reading and writing skills.', stats: ['2,000+ women educated since 1988', 'Basic numeracy and life skills', 'Community-based learning centers'] },
  { img: '/images/s6.jpeg', title: 'Child Education Support', desc: 'Supporting children\'s education through school fee assistance, supplies, and after-school programs.', stats: ['5,000+ children supported', 'Mentorship programs', 'Parental engagement initiatives'] },
  { img: '/images/pic8.png', title: 'Vocational Training', desc: 'Practical skills training in various trades to help women gain employment or start their own businesses.', stats: ['1,500+ women trained annually', 'Tailoring, handicrafts, and more', 'Business startup support'] },
  { img: '/images/s7.jpg', title: 'Digital Literacy', desc: 'Technology training to help women gain essential digital skills for the modern workplace and economy.', stats: ['Basic computer skills', 'Internet and mobile technology', 'Online safety education'] },
];

const healthcarePrograms = [
  { img: '/images/pic9.png', title: 'Maternal Health', desc: 'Prenatal care, safe delivery support, and postnatal care for mothers and newborns.', stats: ['100+ mothers served annually', 'Community health workers', 'Health education programs'] },
  { img: '/images/pic8.png', title: 'HIV/AIDS Support', desc: 'Testing, treatment support, and counseling for women and families affected by HIV/AIDS.', stats: ['Prevention education', 'Support groups', 'Stigma reduction programs'] },
  { img: '/images/pic10.png', title: 'Nutrition Programs', desc: 'Addressing malnutrition through education, supplemental feeding, and agricultural support for families.', stats: ['Child nutrition initiatives', 'Cooking demonstrations', 'Home gardening projects'] },
];

const economicPrograms = [
  { img: '/images/pic2.jpg', title: 'Savings Groups (VSLA)', desc: 'Community savings and loan groups to help women access capital and build financial security.', stats: ['200+ groups established', 'Financial literacy training', 'Small business loans'] },
  { img: '/images/pic1.png', title: "Women's Cooperatives", desc: 'Supporting the formation of women\'s cooperatives for collective economic empowerment and growth.', stats: ['50+ cooperatives formed', 'Agricultural cooperatives', 'Artisan collectives'] },
  { img: '/images/pic9.png', title: 'Market Access', desc: 'Helping women entrepreneurs connect to markets for their products and services globally.', stats: ['Business development training', 'Market linkages', 'E-commerce support'] },
  { img: '/images/pic8.png', title: 'Leadership Training', desc: 'Empowering women with leadership skills to take active roles in their communities and workplaces.', stats: ['Public speaking', 'Decision-making skills', 'Community organizing'] },
];

const impactStories = [
  { img: '/images/PIC T.jpg', quote: 'A Partner called Bertilde Nyirankurikiyimana, mother of three children living in Gishubi sector. Before joining Kira Wigire program, it was very difficult for her to respond to all their needs in the family where her children dropped out of school. After participating in the training organized by ARTCF in partnership with World Vision she changed her mindset. She got a loan from the S4T group, built her own house, bought chickens and goats, and paid school fees for her children.', name: 'Bertilde Nyirankurikiyimana', location: 'Gishubi Sector' },
  { img: '/images/PIC TE.jpg', quote: 'We, SIBOMUREMYI Onesphore and MUKAKALISA Thacienne, were living in extreme poverty because of conflict in our family. After reaching out through World Vision in partnership with ARTCF, participating in different trainings changed our mindset. Now we are able to solve our problems and are exemplary in our community because of the Celebrating Family sessions.', name: 'Sibomuremyi & Mukakalisa', location: 'Kigali, Rwanda' },
];

function ProgramRow({ img, title, desc, stats }: { img: string; title: string; desc: string; stats: string[] }) {
  return (
    <div className="program-row">
      <img src={img} alt={title} onError={(e: any) => { e.target.src = '/images/pic1.png'; }} />
      <div className="program-row-body">
        <h4>{title}</h4>
        <p>{desc}</p>
        <ul className="check-list">
          {stats.map(s => <li key={s}>{s}</li>)}
        </ul>
        <Link href="/contact" className="btn-accent-outline btn-sm">Learn More →</Link>
      </div>
    </div>
  );
}

export default function Programs() {
  return (
    <Layout title="Our Programs" description="Explore ARTCF's education, healthcare, and economic empowerment programs that create lasting change for women and communities in Rwanda.">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>Our Programs</h1>
          <p>Discover how we are making a difference in communities across Rwanda through integrated development programs.</p>
          <nav className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Our Programs</span></nav>
        </div>
      </div>

      {/* Approach Overview */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">How We Work</span>
            <h2 className="section-title">Our Integrated Approach</h2>
            <p className="section-subtitle">At ARTCF, we believe in sustainable, community-driven solutions that address the root causes of poverty through education, healthcare, and economic empowerment.</p>
          </div>
          <div className="grid-3">
            {[
              { icon: '📚', title: 'Education', desc: 'Providing access to quality education and learning resources for women and children.' },
              { icon: '❤️', title: 'Healthcare', desc: 'Improving access to essential healthcare services for women and families.' },
              { icon: '🌱', title: 'Economic Empowerment', desc: 'Creating sustainable economic opportunities through savings groups, cooperatives, and market access.' },
            ].map(c => (
              <div key={c.title} className="mission-card">
                <div className="mission-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="section section-bg" id="education">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'left', marginBottom: 36 }}>
            <span className="section-tag">Learning</span>
            <h2 className="section-title">Education Programs</h2>
            <p className="section-subtitle" style={{ margin: 0, textAlign: 'left' }}>Our education initiatives focus on providing quality learning opportunities for women and children.</p>
          </div>
          {educationPrograms.map(p => <ProgramRow key={p.title} {...p} />)}
        </div>
      </section>

      {/* Healthcare */}
      <section className="section" id="healthcare">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'left', marginBottom: 36 }}>
            <span className="section-tag">Wellbeing</span>
            <h2 className="section-title">Healthcare Programs</h2>
            <p className="section-subtitle" style={{ margin: 0, textAlign: 'left' }}>Our healthcare initiatives aim to improve access to quality healthcare services for women and families.</p>
          </div>
          {healthcarePrograms.map(p => <ProgramRow key={p.title} {...p} />)}
        </div>
      </section>

      {/* Economic Empowerment */}
      <section className="section section-bg" id="economic">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'left', marginBottom: 36 }}>
            <span className="section-tag">Livelihoods</span>
            <h2 className="section-title">Economic Empowerment Programs</h2>
            <p className="section-subtitle" style={{ margin: 0, textAlign: 'left' }}>Creating sustainable livelihoods for women workers in Rwanda through financial inclusion and market access.</p>
          </div>
          {economicPrograms.map(p => <ProgramRow key={p.title} {...p} />)}
        </div>
      </section>

      {/* Impact Stories */}
      <section className="section" id="impact">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Real Stories</span>
            <h2 className="section-title">Impact Stories</h2>
            <p className="section-subtitle">Real stories of change from the women we serve in Rwanda.</p>
          </div>
          <div className="grid-2">
            {impactStories.map(s => (
              <div key={s.name} className="testimonial-card">
                <p className="testimonial-text">&ldquo;{s.quote}&rdquo;</p>
                <div className="testimonial-author">
                  <img src={s.img} alt={s.name} className="testimonial-avatar" onError={(e: any) => { e.target.style.display = 'none'; }} />
                  <div className="testimonial-info">
                    <h5>{s.name}</h5>
                    <span>{s.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Take Action</span>
            <h2 className="section-title">Get Involved</h2>
            <p className="section-subtitle">There are many ways you can support our programs and make a difference in Rwanda.</p>
          </div>
          <div className="grid-3">
            {[
              { icon: '📅', title: 'Attend Events', desc: 'Join our upcoming events to learn more and support our cause directly.', btn: 'View Events', href: '/events' },
              { icon: '🤲', title: 'Volunteer', desc: 'Share your skills and time to support our programs in Rwanda.', btn: 'Volunteer', href: '/contact#volunteer' },
              { icon: '🤝', title: 'Partner With Us', desc: 'Organizations can partner with us to create greater impact in Rwanda.', btn: 'Contact Us', href: '/contact#partner' },
            ].map(c => (
              <div key={c.title} className="mission-card">
                <div className="mission-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div style={{ marginTop: 16 }}>
                  <Link href={c.href} className="btn-primary-solid btn-sm">{c.btn}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section">
        <div className="container">
          <h2>Join Our Mission</h2>
          <p>Be part of empowering women workers in Rwanda through sustainable development.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/events" className="btn-primary">Upcoming Events →</Link>
            <Link href="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
