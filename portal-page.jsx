// =======================================================
// PADUA PORTAL, Product page sections
// All sections are toggleable + many have layout tweaks.
// =======================================================

// ===== small helper: scroll-reveal on intersection =====
function useReveal(threshold = 0.2) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ===== Page content (copy lives here so it's easy to edit) =====
// Two audiences share the same template, copy is selected at runtime
// from window.__PADUA_AUDIENCE (set in the HTML file before scripts load).
const PORTAL_COPY_BY_AUDIENCE = {
  advisers: {
    hero: {
      eyebrow: 'Padua Portal · for advisers & licensees',
      title: ['One platform for', <em key="em">end-to-end advice.</em>],
      sub: 'A connected technology stack that brings discovery, advice generation, compliance and presentation into one compliance-gated workflow. Built on more than 13 years at the forefront of Australian financial advice.',
      videoLength: '2 min · Product tour',
      videoCaption: 'See the Portal in action, for advisers & licensees',
    },
    what: {
      eyebrow: 'What it is',
      lead: 'A single, compliance-gated workspace that runs the entire advice journey end-to-end. Discovery, fact find, advice generation, presentation, audit and implementation all sit inside one continuous workflow.',
      cols: [
        {
          h: 'The full journey, integrated',
          p: 'Data flows in from platforms, IPSs, CRMs and Xplan through our secure API. SteveAI runs the fact find, WealthX adds open banking, WealthReview presents the dashboard, and WealthAI delivers personalised video SOAs.',
        },
        {
          h: 'Compliance baked into the workflow',
          p: 'Padua AQA (Advice Quality Assurance) runs three times during file prep, catching gaps and inconsistencies before they become rework and lifting advice construction standards. Padua RAFA (Regulatory Advice File Audit) then runs a full ASIC and AFCA-aligned audit before the advice reaches your client, and again after implementation, with supporting documentation sealed into secure cold storage.',
        },
        {
          h: 'Built on 13 years of advice tech',
          p: 'Next-generation tooling built on more than a decade at the forefront of Australian financial advice. Onshore, ISO 27001 certified, configured for ASIC and AFCA from the ground up.',
        },
      ],
    },
    benefits: {
      eyebrow: 'How it benefits advisers & licensees',
      title: 'Less admin. More advice.',
      lede: 'What sets Padua Portal apart for licensees and advice practices.',
      items: [
        { n: '01', key: 'integration', title: 'Integration', headline: 'Closed-loop integration', p: 'Secure data push and pull across your ecosystem. Platforms, IPSs, CRMs and Xplan connect to Padua through our secure API.' },
        { n: '02', key: 'efficiency',  title: 'Efficiency',  headline: 'Adviser efficiency at scale', p: 'Padua takes advisers on the road to servicing 300+ clients. WealthX alone saves over 30 minutes per fact find through open banking.' },
        { n: '03', key: 'engagement',  title: 'Engagement',  headline: 'Deeper client engagement',    p: 'Personalised video SOAs through WealthAI, plus a holistic, transparent wealth dashboard via WealthReview.' },
        { n: '04', key: 'compliance',  title: 'Compliance',  headline: 'Audit-ready by default',      p: 'Padua AQA stage gates run inside every file. Padua RAFA delivers an ASIC and AFCA-aligned audit before and after implementation, with secure cold storage on completion.' },
      ],
    },
    modules: {
      eyebrow: 'Padua Portal solutions',
      title: 'Three modules. One connected workflow.',
      sub: 'Use the Portal end-to-end, or bring in the modules that solve your sharpest problem first.',
      items: [
        { key: 'steveai', name: 'SteveAI', tagline: 'The AI advice assistant.', p: 'Pulls together fact-find data, modelling and strategy notes into a first-draft ROA in minutes, then learns your tone of voice as your team uses it.', cta: 'Explore SteveAI', href: 'SteveAI.html', accent: 'discover' },
        { key: 'wealthx', name: 'WealthX', tagline: 'Open banking, built in.', p: 'Pulls live cashflow, super and investment data from 100+ Australian institutions, so the fact-find writes itself and the modelling stays current.', cta: 'Explore WealthX', href: 'WealthX.html', accent: 'teal' },
        { key: 'wealthreview', name: 'WealthReview', tagline: 'The client dashboard.', p: 'A live, white-labelled view of every client\u2019s strategy, holdings and progress against goals, designed to make ongoing review effortless.', cta: 'Explore WealthReview', href: 'WealthReview.html', accent: 'review' },
      ],
    },
    faq: {
      eyebrow: 'Frequently asked',
      title: 'Questions advisers & licensees ask us.',
      items: [
        { q: 'How does the Portal actually work end-to-end?', a: 'The Portal runs the full advice journey as one continuous workflow. Discovery and open banking pull client data in, SteveAI runs the fact find and meeting notes, WealthReview presents the dashboard, and the Advice Optimiser drives strategy and product. Three quality-assurance gates and two regulatory audits sit inside the workflow before and after implementation. The final stage pushes data back into your platform, Xplan or CRM and into secure cold storage.' },
        { q: 'Does it work with our existing platform and CRM?', a: 'Yes. Padua connects to platforms, IPSs, CRMs and Xplan through our secure API. Xplan is the most widely used CRM across Australian advice firms and is a first-class integration. WealthX layers open banking on top, so client data flows in automatically rather than being keyed in twice.' },
        { q: 'How does compliance work inside the Portal?', a: 'Two named stage gates sit inside the workflow. Padua AQA (Advice Quality Assurance) runs three times during file prep, catching gaps and inconsistencies before they become rework, lifting advice construction standards and supporting consistent quality. Padua RAFA (Regulatory Advice File Audit) then runs a full ASIC and AFCA-aligned audit before the advice reaches the client, and again after implementation, giving licensees and compliance teams confidence in their compliance posture. Every file is audit-ready by default, then closed out into secure cold storage.' },
        { q: 'Can we use just one or two modules rather than the whole Portal?', a: 'Yes. Non-Padua advisers can extend their existing workflow with single modules: SteveAI, WealthX, WealthReview, WealthAI or our regulatory audit as a standalone service. No need to commit to the full Portal.' },
        { q: 'Can the Portal be rebranded for your licensee?', a: 'Yes. For Padua partners we white-label the Portal for both advisers and end clients, seamlessly aligning to your existing brand guidelines across the adviser workspace, the client dashboard and any video SOAs we generate.' },
        { q: 'How long does onboarding take?', a: 'Most licensees and practices are live within 2 to 4 weeks. We handle migration of your existing client files, configure the Portal to your processes and stage gates, and train your team in parallel.' },
      ],
    },
    cta: {
      title: ['See the Portal in', <em key="em"> your own workflow.</em>],
      sub: '30-minute demo, tailored to how your practice runs.',
      btn: 'Book a demo',
    },
  },

  platforms: {
    hero: {
      eyebrow: 'Padua Portal · for platforms & super funds',
      title: ['One platform for', <em key="em">end-to-end advice.</em>],
      sub: 'One connected advice workflow for platforms and super funds. Bring discovery, advice generation, compliance and presentation into a single compliance-gated journey, embedded in your ecosystem.',
      videoLength: '2 min · Product tour',
      videoCaption: 'See the Portal in action, for platforms & super funds',
    },
    what: {
      eyebrow: 'What it is',
      lead: 'A single, compliance-gated workflow that runs the entire advice journey end-to-end inside your platform. Discovery, fact find, advice generation, presentation, audit and implementation all sit inside one continuous workflow.',
      cols: [
        {
          h: 'Embedded in your platform',
          p: 'Closed-loop data push and pull with your platform, super fund infrastructure, IPSs, CRMs and Xplan through our secure API. End-to-end advice for both advised and non-advised members.',
        },
        {
          h: 'Compliance baked into the workflow',
          p: 'Padua AQA (Advice Quality Assurance) runs three times during file prep, catching gaps and inconsistencies before they become rework and lifting advice construction standards. Padua RAFA (Regulatory Advice File Audit) then runs a full ASIC and AFCA-aligned audit before the advice reaches your member, and again after implementation, with supporting documentation sealed into secure cold storage.',
        },
        {
          h: 'Built on 13 years of advice tech',
          p: 'Next-generation tooling built on more than a decade at the forefront of Australian financial advice. Onshore, ISO 27001 certified, configured for ASIC and AFCA from the ground up.',
        },
      ],
    },
    benefits: {
      eyebrow: 'How it benefits platforms & super funds',
      title: 'One workflow. Deeper engagement.',
      lede: 'What sets Padua Portal apart for platforms and super funds.',
      items: [
        { n: '01', key: 'integration', title: 'Integration', headline: 'Closed-loop with your platform', p: 'Secure data push and pull between Padua and your platform, IPSs, CRMs and Xplan through our secure API. Available for both advised and non-advised members.' },
        { n: '02', key: 'efficiency',  title: 'Efficiency',  headline: 'Adviser efficiency at scale',    p: 'Padua takes advisers on the road to servicing 300+ clients, and reduces reliance on expensive, disparate software subscriptions across your network.' },
        { n: '03', key: 'engagement',  title: 'Engagement',  headline: 'Holistic member experience',    p: 'Personalised video SOAs through WealthAI and a transparent wealth dashboard via WealthReview, white-labelled to your platform brand.' },
        { n: '04', key: 'compliance',  title: 'Compliance',  headline: 'Audit-ready by default',    p: 'Padua AQA stage gates inside the workflow plus Padua RAFA, an ASIC and AFCA-aligned audit before and after implementation, with secure cold storage and full record completeness on file closure.' },
      ],
    },
    modules: {
      eyebrow: 'Padua Portal solutions',
      title: 'Three modules. One connected workflow.',
      sub: 'Embed the full Portal in your platform, or bring in single modules to extend the workflow you already run.',
      items: [
        { key: 'steveai', name: 'SteveAI', tagline: 'The AI advice assistant.', p: 'Agentive AI that runs the fact find and concierge meeting, records transcripts and stays with the member throughout the entire advice journey.', cta: 'Explore SteveAI', href: 'SteveAI.html', accent: 'discover' },
        { key: 'wealthx', name: 'WealthX', tagline: 'Open banking, built in.', p: 'Securely integrates with the member\u2019s banks for direct bank feeds and transparent insights, saving over 30 minutes per fact find.', cta: 'Explore WealthX', href: 'WealthX.html', accent: 'teal' },
        { key: 'wealthreview', name: 'WealthReview', tagline: 'The member dashboard.', p: 'A live, white-labelled view of every member\u2019s strategy, holdings and progress against goals, populated with post-advice data.', cta: 'Explore WealthReview', href: 'WealthReview.html', accent: 'review' },
      ],
    },
    faq: {
      eyebrow: 'Frequently asked',
      title: 'Questions platforms & super funds ask us.',
      items: [
        { q: 'How does the Portal embed in our platform?', a: 'Padua connects to your platform, IPSs, CRMs and Xplan through our secure API. Data is pulled in at discovery, the advice journey runs end-to-end inside Padua, and at completion the API pushes data back into your platform and into secure cold storage. Available for both advised and non-advised members.' },
        { q: 'Can the Portal be white-labelled for our members?', a: 'Yes. For Padua partners we white-label the Portal for both advisers and end members, seamlessly aligning to your existing brand guidelines across the adviser workspace, the member dashboard and any video SOAs we generate.' },
        { q: 'Does it support both advised and non-advised members?', a: 'Yes. Our modules are available across both populations. Non-advised members can access WealthReview dashboards, WealthX open banking insights and WealthAI video content; advised members run through the full compliance-gated journey.' },
        { q: 'How does compliance work inside the Portal?', a: 'Two named stage gates sit inside the workflow. Padua AQA (Advice Quality Assurance) runs three times during file prep, catching gaps and inconsistencies before they become rework, lifting advice construction standards and supporting consistent quality. Padua RAFA (Regulatory Advice File Audit) then runs a full ASIC and AFCA-aligned audit before the advice reaches the member, and again after implementation, giving licensees and compliance teams confidence in their compliance posture. Every file is audit-ready by default, then closed out into secure cold storage.' },
        { q: 'Can non-Padua advisers in our network use single modules?', a: 'Yes. Advisers can extend their existing workflow with single modules: SteveAI, WealthX, WealthReview, WealthAI or our regulatory audit as a standalone service. No need to commit to the full Portal.' },
        { q: 'How long does onboarding take?', a: 'Most platform integrations are live within 4 to 8 weeks depending on scope. We handle API connectivity, configure the Portal to your processes and stage gates, and align the white-label experience to your brand.' },
      ],
    },
    cta: {
      title: ['See the Portal embedded in', <em key="em"> your platform.</em>],
      sub: '30-minute demo, tailored to how your platform and members work.',
      btn: 'Book a demo',
    },
  },
};

const PORTAL_COPY = PORTAL_COPY_BY_AUDIENCE[window.__PADUA_AUDIENCE || 'advisers'] || PORTAL_COPY_BY_AUDIENCE.advisers;

// =====================================================
// HERO, page-specific, video-centric, kiama backdrop
// =====================================================
function PortalHero({ layout = 'video-below' }) {
  const c = PORTAL_COPY.hero;
  const [scrollY, setScrollY] = React.useState(0);
  const [revealed, setRevealed] = React.useState(false);

  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY || 0);
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const heroScroll = Math.min(scrollY, 600);
  const bgTransform = `translate3d(0, ${heroScroll * 0.18}px, 0) scale(${1 + heroScroll * 0.00018})`;
  const videoTransform = `translate3d(0, ${heroScroll * -0.08}px, 0)`;

  return (
    <section
      className={`portal-hero portal-hero-${layout}${revealed ? ' is-revealed' : ''}`}
      data-screen-label="portal-hero"
    >
      <div className="portal-hero-bg" aria-hidden="true" style={{ transform: bgTransform }} />
      <div className="portal-hero-scrim" aria-hidden="true" />
      <div className="portal-hero-embers" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <i key={i} className={`portal-ember portal-ember-${i}`}></i>
        ))}
      </div>

      <div className="portal-hero-inner">
        <div className="portal-hero-text">
          <div className="portal-eyebrow">{c.eyebrow}</div>
          <h1 className="portal-h1">
            {c.title[0]} {c.title[1]}
          </h1>
          <p className="portal-hero-sub">{c.sub}</p>
        </div>

        <div className="portal-hero-video" id="video" style={{ transform: videoTransform }}>
          <PortalVideoFrame caption={c.videoCaption} length={c.videoLength} />
        </div>
      </div>
    </section>
  );
}

// Big play-button video card. Uses the surfer image as a stand-in poster
// frame until a real video upload is available.
function PortalVideoFrame({ caption, length }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className={`portal-video-frame${hovered ? ' is-hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`Play video: ${caption}`}
    >
      <div className="portal-video-poster" aria-hidden="true" />
      <div className="portal-video-tint" aria-hidden="true" />
      <div className="portal-video-meta">
        <span className="portal-video-length">{length}</span>
      </div>
      <button type="button" className="portal-video-play" aria-label="Play video">
        <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
          <circle cx="32" cy="32" r="31" fill="rgba(255,255,255,0.96)" />
          <path d="M26 20 L46 32 L26 44 Z" fill="#1a1525" />
        </svg>
      </button>
      <div className="portal-video-caption">{caption}</div>
    </div>
  );
}

// =====================================================
// WHAT IT IS
// =====================================================
function PortalWhat() {
  const c = PORTAL_COPY.what;
  const [ref, visible] = useReveal(0.25);
  return (
    <section
      ref={ref}
      className={`portal-section portal-what${visible ? ' is-in-view' : ''}`}
      data-screen-label="what"
    >
      <div className="container">
        <div className="portal-what-grid">
          <div className="portal-what-lead">
            <div className="eyebrow">{c.eyebrow}</div>
            <p className="portal-lead-copy">{c.lead}</p>
          </div>
          <div className="portal-what-cols">
            {c.cols.map((col) => (
              <div className="portal-what-col" key={col.h}>
                <h3>{col.h}</h3>
                <p>{col.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================================================
// BENEFITS, 4 stat-style cards
// =====================================================
function PortalBenefits() {
  const c = PORTAL_COPY.benefits;
  const [ref, visible] = useReveal(0.18);
  return (
    <section
      ref={ref}
      className={`portal-section portal-benefits${visible ? ' is-in-view' : ''}`}
      data-screen-label="benefits"
    >
      <div className="container">
        <div className="portal-section-head">
          <div className="eyebrow">{c.eyebrow}</div>
          <h2 className="section-title">{c.title}</h2>
          {c.lede && <p className="section-lede">{c.lede}</p>}
        </div>
        <div className="portal-pillar-grid">
          {c.items.map((it, i) => (
            <div
              className={`portal-pillar portal-pillar-${it.key}`}
              key={it.key}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="portal-pillar-head">
                <span className="portal-pillar-n">{it.n}</span>
                <span className="portal-pillar-title">{it.title}</span>
              </div>
              <div className="portal-pillar-body">
                <h3 className="portal-pillar-headline">{it.headline}</h3>
                <p className="portal-pillar-p">{it.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================
// MODULAR COMPONENTS, Apple-style cards
// =====================================================
function PortalModules({ layout = 'stack' }) {
  const c = PORTAL_COPY.modules;
  const [ref, visible] = useReveal(0.15);
  return (
    <section
      ref={ref}
      className={`portal-section portal-modules portal-modules-${layout}${visible ? ' is-in-view' : ''}`}
      data-screen-label="modules"
    >
      <div className="container">
        <div className="portal-section-head">
          <div className="eyebrow">{c.eyebrow}</div>
          <h2 className="section-title">{c.title}</h2>
          <p className="section-lede">{c.sub}</p>
        </div>
        <div className="portal-modules-grid">
          {c.items.map((m) => (
            <PortalModuleCard key={m.key} module={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PortalModuleCard({ module: m }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href={m.href}
      className={`portal-module portal-module-${m.accent}${hovered ? ' is-hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="portal-module-bg" aria-hidden="true" />
      <ModuleArtwork accent={m.accent} hovered={hovered} />

      <div className="portal-module-top">
        <div className="portal-module-name">{m.name}</div>
        <div className="portal-module-tag">{m.tagline}</div>
      </div>

      <div className="portal-module-bottom">
        <p>{m.p}</p>
        <span className="portal-module-cta">
          {m.cta}
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M2 7 L12 7 M7 2 L12 7 L7 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </a>
  );
}

// Abstract motion artwork inside each module card, distinct per product.
function ModuleArtwork({ accent, hovered }) {
  if (accent === 'discover') {
    // SteveAI, floating orbs / neural feel
    return (
      <div className={`portal-art portal-art-steve${hovered ? ' is-hovered' : ''}`} aria-hidden="true">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
        <span className="orb orb-4" />
        <span className="orb orb-5" />
      </div>
    );
  }
  if (accent === 'teal') {
    // WealthX, flowing data lines
    return (
      <div className={`portal-art portal-art-wx${hovered ? ' is-hovered' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 320 200" preserveAspectRatio="none">
          <path className="wx-line wx-l1" d="M -20 140 Q 80 80 160 110 T 340 60" />
          <path className="wx-line wx-l2" d="M -20 170 Q 80 130 160 150 T 340 110" />
          <path className="wx-line wx-l3" d="M -20 110 Q 80 50 160 80 T 340 40" />
          <g className="wx-dots">
            <circle cx="60" cy="110" r="3" />
            <circle cx="140" cy="120" r="3" />
            <circle cx="220" cy="90" r="3" />
            <circle cx="290" cy="70" r="3" />
          </g>
        </svg>
      </div>
    );
  }
  // WealthReview, dashboard widgets
  return (
    <div className={`portal-art portal-art-wr${hovered ? ' is-hovered' : ''}`} aria-hidden="true">
      <div className="wr-card wr-card-1">
        <span className="wr-bar wr-bar-1" />
        <span className="wr-bar wr-bar-2" />
        <span className="wr-bar wr-bar-3" />
      </div>
      <div className="wr-card wr-card-2">
        <svg viewBox="0 0 100 40" preserveAspectRatio="none">
          <path d="M 0 30 L 20 20 L 40 25 L 60 10 L 80 18 L 100 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </div>
      <div className="wr-card wr-card-3">
        <span className="wr-pill" />
        <span className="wr-pill" />
      </div>
    </div>
  );
}

// =====================================================
// FAQ, smooth accordion
// =====================================================
function PortalFaq() {
  const c = PORTAL_COPY.faq;
  const [open, setOpen] = React.useState(0);
  const [ref, visible] = useReveal(0.15);
  return (
    <section
      ref={ref}
      className={`portal-section portal-faq${visible ? ' is-in-view' : ''}`}
      data-screen-label="faq"
    >
      <div className="container">
        <div className="portal-faq-container">
          <div className="portal-faq-head">
            <div className="eyebrow">{c.eyebrow}</div>
            <h2 className="section-title">{c.title}</h2>
          </div>
          <ul className="portal-faq-list">
            {c.items.map((it, i) => (
              <FaqRow
                key={it.q}
                item={it}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FaqRow({ item, isOpen, onToggle }) {
  const bodyRef = React.useRef(null);
  const [maxHeight, setMaxHeight] = React.useState(0);
  React.useEffect(() => {
    if (!bodyRef.current) return;
    setMaxHeight(isOpen ? bodyRef.current.scrollHeight : 0);
  }, [isOpen]);
  return (
    <li className={`portal-faq-row${isOpen ? ' is-open' : ''}`}>
      <button type="button" className="portal-faq-q" onClick={onToggle} aria-expanded={isOpen}>
        <span>{item.q}</span>
        <span className="portal-faq-icon" aria-hidden="true">
          <span /><span />
        </span>
      </button>
      <div className="portal-faq-a-wrap" style={{ maxHeight }}>
        <div className="portal-faq-a" ref={bodyRef}>
          <p>{item.a}</p>
        </div>
      </div>
    </li>
  );
}

// =====================================================
// CTA BANNER, full-bleed sunset
// =====================================================
function PortalCta() {
  const c = PORTAL_COPY.cta;
  const [ref, visible] = useReveal(0.3);
  return (
    <section
      ref={ref}
      className={`portal-cta${visible ? ' is-in-view' : ''}`}
      id="contact"
      data-screen-label="cta"
    >
      <div className="portal-cta-bg" aria-hidden="true" />
      <div className="portal-cta-scrim" aria-hidden="true" />
      <div className="container portal-cta-inner">
        <h2 className="portal-cta-title">
          {c.title[0]}
          {c.title[1]}
        </h2>
        <p className="portal-cta-sub">{c.sub}</p>
        <a className="btn btn-cta-light" href="Contact.html">{c.btn} →</a>
      </div>
    </section>
  );
}

// =====================================================
// PAGE root, composes the sections, respects tweaks
// =====================================================
function PortalPage({ values }) {
  return (
    <main className="portal-page">
      {values.showHero && <PortalHero layout={values.heroLayout} />}
      {values.showWhat && <PortalWhat />}
      {values.showBenefits && <PortalBenefits />}
      {values.showModules && <PortalModules layout={values.modulesLayout} />}
      {values.showFaq && <PortalFaq />}
      {values.showCta && <PortalCta />}
    </main>
  );
}

Object.assign(window, { PortalPage });
