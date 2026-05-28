// =======================================================
// PADUA, Shared content data + small components
// All copy is verbatim from the source prototype.
// =======================================================

// ===== Brand logo (real Padua horizontal logo, height comes from CSS) =====
function PaduaLogo() {
  return (
    <a href="index.html" className="padua-logo" aria-label="Padua">
      <img
        src="assets/padua-logo.png"
        alt="Padua"
        className="padua-logo-img"
      />
    </a>
  );
}

// ===== Nav (shared structure, styled per-direction) =====
// Two variants:
//   "streams" , three audience links sit equal in the bar, each with a small
//                hover panel of 3 destinations
//   "grouped" , one "Who we work with" trigger opens a panel containing all
//                three audiences as cards
// Audience mega-menu data.
// Taxonomy per Brett's note: products live inside the Padua Advice Platform
// EXCEPT WealthAI + Wealth Data, which are standalone software.
const NAV_AUDIENCES = [
  {
    key: 'advisers',
    label: 'Advisers & Licensees',
    eyebrow: 'For advisers & licensees',
    blurb: 'Advice software, paraplanning and ongoing support for advice practices and licensees.',
    columns: [
      {
        kind: 'featured',
        badge: 'The Platform',
        title: 'Padua Portal',
        blurb: 'The integrated workflow that pulls platform, CRM and Xplan data into one end-to-end advice system, with compliance built in.',
        cta: 'Portal overview',
        href: 'Padua Portal.html',
      },
      {
        title: 'Modular Components',
        subtitle: 'Standalone or part of Padua Portal',
        cols: 2,
        items: [
          { h: 'SteveAI', p: 'AI advice assistant', href: 'SteveAI.html', tag: 'both' },
          { h: 'WealthX', p: 'Open banking', href: 'WealthX.html', tag: 'both' },
          { h: 'WealthAI', p: 'Video & statements', tag: 'both', href: 'WealthAI.html' },
          { h: 'WealthReview', p: 'Client dashboard', href: 'WealthReview.html', tag: 'both' },
          { h: 'WealthData', p: 'Adviser insights', tag: 'standalone', href: 'WealthData.html' },
        ],
      },
      {
        title: 'Advice Services',
        items: [
          { h: 'Paraplanning', p: 'Tech-enabled advice generation', href: 'Paraplanning.html' },
          { h: 'Transition Management', p: 'End-to-end client transition support', href: 'Transition Management.html' },
        ],
      },
    ],
    legend: [
      { tag: 'both', label: 'Works standalone & in Padua Portal' },
      { tag: 'standalone', label: 'Standalone only' },
    ],
  },
  {
    key: 'platforms',
    label: 'Platforms & Super Funds',
    eyebrow: 'For platforms & super funds',
    blurb: 'Member advice solutions and adviser tooling for platforms and super funds.',
    columns: [
      {
        kind: 'featured',
        badge: 'The Platform',
        title: 'Padua Portal',
        blurb: 'The integrated workflow embedded in your platform. End-to-end advice for both advised and non-advised members.',
        cta: 'Portal overview',
        href: 'Padua Portal - Platforms.html',
      },
      {
        title: 'Modular Components',
        subtitle: 'Standalone or part of Padua Portal',
        cols: 2,
        items: [
          { h: 'SteveAI', p: 'AI advice assistant', href: 'SteveAI.html', tag: 'both' },
          { h: 'WealthX', p: 'Open banking', href: 'WealthX.html', tag: 'both' },
          { h: 'WealthAI', p: 'Personalised member video', tag: 'both', href: 'WealthAI.html' },
          { h: 'WealthReview', p: 'Member dashboard', href: 'WealthReview.html', tag: 'both' },
          { h: 'WealthData', p: 'Behavioural insights', tag: 'standalone', href: 'WealthData.html' },
        ],
      },
      {
        title: 'Advice Services',
        items: [
          { h: 'Paraplanning', p: 'Tech-enabled advice generation', href: 'Paraplanning.html' },
          { h: 'Transition Management', p: 'End-to-end client transition support', href: 'Transition Management.html' },
        ],
      },
    ],
    legend: [
      { tag: 'both', label: 'Works standalone & in Padua Portal' },
      { tag: 'standalone', label: 'Standalone only' },
    ],
  },
  {
    key: 'investment',
    label: 'Investment Managers',
    eyebrow: 'For investment managers',
    blurb: 'Distribution, adviser engagement and research support for IMs and asset managers.',
    columns: [
      {
        title: 'Advice Services',
        items: [
          { h: 'Transition management', p: 'End-to-end implementation', href: 'Transition Management.html' },
        ],
      },
      {
        title: 'Standalone Software',
        items: [
          { h: 'WealthData', p: 'Adviser behaviour insights', href: 'WealthData.html' },
          { h: 'WealthAI', p: 'Branded client video', href: 'WealthAI.html' },
        ],
      },
    ],
  },
];

// About dropdown, grouped into sections. Light on entries because content
// publishing cadence is modest (1 piece/week, no events programme).
const NAV_ABOUT_SECTIONS = [
  {
    title: 'Company',
    items: [
      { h: 'Who we are', p: 'Our mission and values', href: 'Who we are.html' },
      // No redesign "Our people" page yet → fall back to the existing page.
      { h: 'Our people', href: 'about/our-people.html' },
      { h: 'Careers', href: 'Careers.html' },
    ],
  },
  {
    title: 'Content',
    items: [
      { h: 'News & insights', href: 'News & Insights.html' },
      { h: 'Resources', p: 'Whitepapers & reports', href: 'Resources.html' },
    ],
  },
  // (Trust / "Security & compliance" section removed — no page exists for it
  //  in either the redesign or the old site, so it had nowhere to link.)
];

// Tiny chevron used on dropdown triggers
function NavCaret() {
  return (
    <svg className="nav-caret" width="9" height="6" viewBox="0 0 9 6" aria-hidden="true">
      <path d="M1 1l3.5 3.5L8 1" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PaduaNav({ variant = 'streams' }) {
  const [openKey, setOpenKey] = React.useState(null);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState(null);
  const closeTimer = React.useRef(0);

  // Subtle shrink-on-scroll past ~24px
  React.useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy, only triggers active state for sections that have
  // a corresponding nav link (About, Insights). Audience links stay neutral
  // because this is a single-page site and they're not anchored to sections.
  React.useEffect(() => {
    const ids = ['about', 'proof']; // proof carries "Insights" feel for now
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length || typeof IntersectionObserver === 'undefined') return undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that's intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        if (visible[0]) setActiveSection(visible[0].target.id);
        else if (entries.every((e) => !e.isIntersecting)) {
          // If nothing intersecting AND we've scrolled past top, leave last; else clear
          if ((window.scrollY || 0) < 200) setActiveSection(null);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0.01 }
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  // Hover-open with a small close delay so users can travel from trigger
  // to panel without it slamming shut.
  const open = (key) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = 0;
    }
    setOpenKey(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenKey(null), 140);
  };

  // Close on Escape
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpenKey(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navClass = `nav nav-${variant}${scrolled ? ' is-scrolled' : ''}${openKey ? ' has-open' : ''}`;

  return (
    <nav className={navClass} onMouseLeave={scheduleClose}>
      <div className="nav-inner">
        <PaduaLogo />

        <div className="nav-links">
          {variant === 'streams' && (
            <>
              {NAV_AUDIENCES.map((a) => (
                <div
                  key={a.key}
                  className={`nav-item has-dropdown${openKey === a.key ? ' is-open' : ''}`}
                  onMouseEnter={() => open(a.key)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    className="nav-link nav-trigger"
                    aria-expanded={openKey === a.key}
                    aria-haspopup="true"
                    onFocus={() => open(a.key)}
                    onClick={() => setOpenKey(openKey === a.key ? null : a.key)}
                  >
                    {a.label}
                    <NavCaret />
                  </button>
                  <div className="nav-dropdown nav-dropdown-mega" role="menu">
                    <div className="nav-dropdown-inner">
                      <div
                        className="nav-dd-mega-grid"
                        style={{ gridTemplateColumns: a.columns.map((c) => {
                          if (c.kind === 'featured') return '260px';
                          if (c.cols === 2) return '360px';
                          return '230px';
                        }).join(' ') }}
                      >
                        {a.columns.map((col) => (
                          col.kind === 'featured' ? (
                            <a key="featured" href={col.href} className="nav-dd-featured">
                              <div className="nav-dd-featured-h">{col.title}</div>
                              {col.badge && <span className="nav-dd-featured-badge">{col.badge}</span>}
                              {col.blurb && <p className="nav-dd-featured-p">{col.blurb}</p>}
                              {col.cta && (
                                <span className="nav-dd-featured-cta">
                                  {col.cta}
                                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                                    <path d="M2 7 L12 7 M7 2 L12 7 L7 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </span>
                              )}
                            </a>
                          ) : (
                          <div className={`nav-dd-mega-col${col.cols === 2 ? ' nav-dd-mega-col-2up' : ''}`} key={col.title + (col.subtitle || '')}>
                            <div className="nav-dd-mega-col-h">
                              {col.title}
                              {col.subtitle && (
                                <span className="nav-dd-mega-col-sub">{col.subtitle}</span>
                              )}
                            </div>
                            <ul className="nav-dd-list">
                              {col.items.map((it, i) => (
                                it.type === 'label' ? (
                                  <li key={`label-${i}`} className="nav-dd-sublabel" aria-hidden="true">
                                    <span className="nav-dd-sublabel-line"></span>
                                    <span className="nav-dd-sublabel-text">{it.label}</span>
                                  </li>
                                ) : (
                                  <li key={it.h}>
                                    <a href={it.href || '#'} className="nav-dd-item" role="menuitem">
                                      <span className="nav-dd-h">
                                        {it.h}
                                        {it.tag && (
                                          <span className={`nav-dd-tag nav-dd-tag-${it.tag}`}>
                                            {it.tag === 'both' ? 'Both' : 'Standalone'}
                                          </span>
                                        )}
                                      </span>
                                      {it.p && <span className="nav-dd-p">{it.p}</span>}
                                    </a>
                                  </li>
                                )
                              ))}
                            </ul>
                          </div>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {variant === 'grouped' && (
            <div
              className={`nav-item has-dropdown${openKey === 'work' ? ' is-open' : ''}`}
              onMouseEnter={() => open('work')}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className="nav-link nav-trigger"
                aria-expanded={openKey === 'work'}
                aria-haspopup="true"
                onFocus={() => open('work')}
                onClick={() => setOpenKey(openKey === 'work' ? null : 'work')}
              >
                Who we work with
                <NavCaret />
              </button>
              <div className="nav-dropdown nav-dropdown-wide" role="menu">
                <div className="nav-dropdown-inner">
                  <div className="nav-dd-grid">
                    {NAV_AUDIENCES.map((a) => (
                      <a key={a.key} href="#" className="nav-dd-card" role="menuitem">
                        <div className="nav-dd-card-h">{a.label}</div>
                        <div className="nav-dd-card-p">{a.blurb}</div>
                        <div className="nav-dd-card-cta">Explore →</div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className={`nav-item has-dropdown${openKey === 'about' ? ' is-open' : ''}`}
            onMouseEnter={() => open('about')}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className={`nav-link nav-trigger${activeSection === 'about' ? ' active' : ''}`}
              aria-expanded={openKey === 'about'}
              aria-haspopup="true"
              onFocus={() => open('about')}
              onClick={() => setOpenKey(openKey === 'about' ? null : 'about')}
            >
              About
              <NavCaret />
            </button>
            <div className="nav-dropdown nav-dropdown-sections" role="menu">
              <div className="nav-dropdown-inner">
                {NAV_ABOUT_SECTIONS.map((section, si) => (
                  <div className="nav-dd-section" key={section.title}>
                    <div className="nav-dd-section-h">{section.title}</div>
                    <ul className="nav-dd-list">
                      {section.items.map((it) => (
                        <li key={it.h}>
                          <a href={it.href || '#'} className="nav-dd-item" role="menuitem">
                            <span className="nav-dd-h">{it.h}</span>
                            {it.p && <span className="nav-dd-p">{it.p}</span>}
                          </a>
                        </li>
                      ))}
                    </ul>
                    {si < NAV_ABOUT_SECTIONS.length - 1 && <div className="nav-dd-divider" aria-hidden="true" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <a href="Contact.html" className="nav-link">
            Contact
          </a>
        </div>

        <div className="nav-actions">
          <a href="https://home.paduasolutions.com/" className="btn btn-ghost-dark">Sign in</a>
          <a href="Contact.html" className="btn btn-spectrum">Book a demo</a>
        </div>
      </div>

      {/* Soft backdrop tint while a dropdown is open, keeps focus on the panel */}
      <div className="nav-backdrop" aria-hidden="true" onMouseEnter={scheduleClose} />
    </nav>
  );
}

// ===== EARS Wheel SVG (shared, used by About in both directions) =====
function EARSWheel() {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      className={`ears-wheel${inView ? ' is-in-view' : ''}`}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Padua's EARS values: Empathy, Agility, Reliability, Simplicity"
    >
      {/* Quadrants, each gets a class for individual build animation */}
      <g className="wheel-quadrants">
        <path className="wheel-q wheel-q-e" d="M 200 200 L 200 30 A 170 170 0 0 1 370 200 Z" fill="#4a308c"/>
        <path className="wheel-q wheel-q-a" d="M 200 200 L 370 200 A 170 170 0 0 1 200 370 Z" fill="#ab2178"/>
        <path className="wheel-q wheel-q-r" d="M 200 200 L 200 370 A 170 170 0 0 1 30 200 Z" fill="#eb2e4d"/>
        <path className="wheel-q wheel-q-s" d="M 200 200 L 30 200 A 170 170 0 0 1 200 30 Z" fill="#f59436"/>
      </g>

      {/* Dividers */}
      <g className="wheel-dividers">
        <line x1="200" y1="40" x2="200" y2="360" className="wheel-divider"/>
        <line x1="40" y1="200" x2="360" y2="200" className="wheel-divider"/>
      </g>

      {/* Letters */}
      <g className="wheel-labels">
        <text x="280" y="115" className="wheel-letter">E</text>
        <text x="280" y="285" className="wheel-letter">A</text>
        <text x="120" y="285" className="wheel-letter">R</text>
        <text x="120" y="115" className="wheel-letter">S</text>
        <text x="280" y="150" className="wheel-name">EMPATHY</text>
        <text x="280" y="245" className="wheel-name">AGILITY</text>
        <text x="120" y="245" className="wheel-name">RELIABILITY</text>
        <text x="120" y="150" className="wheel-name">SIMPLICITY</text>
      </g>

      {/* Hub, gentle pulse */}
      <g className="wheel-hub">
        <circle className="wheel-hub-ring" cx="200" cy="200" r="46" fill="none" stroke="#1a1525" strokeOpacity="0.08" strokeWidth="1"/>
        <circle cx="200" cy="200" r="46" fill="white"/>
        <text x="200" y="195" className="wheel-hub-label">OUR</text>
        <text x="200" y="212" className="wheel-hub-label">VALUES</text>
      </g>
    </svg>
  );
}

// ===== Content payload, shared between directions =====
const PADUA_CONTENT = {
  hero: {
    eyebrow: 'PADUA · The Australian advice platform',
    h1Lead: 'Empowering advisers to build ',
    h1Em: 'stronger futures',
    h1Tail: ' for more Australians.',
    sub: 'Through the Padua Advice Platform. A connected suite of software and services purpose-built for the Australian advice industry.',
    location: 'Sunrise, Kiama',
  },
  pillars: [
    {
      n: '01',
      key: 'integration',
      eyebrow: '01 · INTEGRATION',
      title: 'Connects to the tools you already use.',
      desc: 'Xplan, your CRM, platforms, open banking. Padua plugs into your stack so data flows in without re-keying, and implementation flows back out.',
    },
    {
      n: '02',
      key: 'efficiency',
      eyebrow: '02 · EFFICIENCY',
      title: 'Take advisers on the road to 300+ clients.',
      desc: 'AI-augmented fact find, advice optimisation and paraplanning. Scale adviser capacity without scaling the team.',
    },
    {
      n: '03',
      key: 'engagement',
      eyebrow: '03 · ENGAGEMENT',
      title: 'Bring clients into their own advice.',
      desc: 'Firm-branded video advice, WealthReview dashboards, holistic wealth view. The moments that turn advice into understanding.',
    },
    {
      n: '04',
      key: 'compliance',
      eyebrow: '04 · COMPLIANCE',
      title: 'Auditable, archived, advice-ready.',
      desc: 'ASIC and AFCA aligned assurance workflows. Every step captured. Every document version stored. ISO 27001 certified, 100% onshore.',
    },
  ],
  intro: {
    h2Lead: 'The demand for ',
    h2Em: 'quality advice',
    h2Tail: ' has never been greater.',
    p1: 'Demand for financial advice is rising. The supply of experienced advisers is constrained. Too many Australians who need quality advice cannot access it, and too many advisers who want to help more people find themselves overwhelmed by administration, compliance and operational complexity.',
    p2: "We don't replace advisers. We empower them. We take on the operational weight that surrounds advice, so advisers can spend more time on relationships, strategy and the human work that defines great advice.",
  },
  about: {
    eyebrow: 'About Padua',
    title: 'Helping advisers do their best work, so more Australians can access quality advice.',
    p1: 'We are 100% onshore, Australian owned, and ISO 27001 certified. Your client data never leaves Australia.',
    p2: 'Our team combines experienced advice professionals, intelligent workflow and AI to give advisers the operational leverage they need. We live the EARS values in every engagement: Empathy, Agility, Reliability and Simplicity. <span class="padua-way">One way. Same way. Better way.</span>',
    cta: 'Read our story',
    meta: [
      { l: 'Founded', v: '2014' },
      { l: 'Ownership', v: 'Australian' },
      { l: 'Certification', v: 'ISO 27001' },
    ],
  },
  streams: {
    eyebrow: 'Who we work with',
    title: 'Purpose-built for every part of the advice ecosystem.',
    lede: 'Pick the stream that fits your business. Each is built on the same core platform, with workflows, tools and data tailored to what you need.',
    items: [
      {
        tag: '',
        h: 'Advisers & Licensees',
        p: 'The Padua Advice Portal. A modular, AI-augmented advice platform with experienced Advice Guides supporting every step.',
        cta: 'Explore the portal',
        href: 'Padua Portal.html',
        featured: true,
      },
      {
        tag: '',
        h: 'Platforms & Super Funds',
        p: 'Data integration, modelling tools, member engagement video and open banking technology for platform operators and super funds.',
        cta: 'Explore solutions',
        href: 'product-providers.html',
      },
      {
        tag: '',
        h: 'Investment Managers',
        p: 'Fund administration tooling, investment analytics, market data and adviser advertising channels.',
        cta: 'Explore solutions',
        href: 'product-providers.html',
      },
    ],
  },
  ecosystem: {
    eyebrow: 'The Padua ecosystem',
    title: 'Built for every part of the advice journey.',
    framing: 'A connected ecosystem of software and services. The Padua Portal sits at the centre, with Advice Services and Standalone Products around it.',
    portal: {
      eyebrow: 'The Padua Portal · The rise of the advice platform',
      h: 'The software platform we use, available to you too.',
      p: 'A connected suite of tools that maps the entire advice journey. Use the full Portal end-to-end, or pick the modules that fit alongside your existing systems.',
      flow: ['WealthX', 'WealthReview', 'SteveAI', 'WealthAI'],
      cta: 'Watch the 2-minute tour',
    },
    services: [
      {
        h: 'Paraplanning',
        p: 'Onshore paraplanners and Advice Guides prepare SOAs, research and modelling. The fastest path to scaling your advice capacity without scaling your team.',
        href: 'Paraplanning.html',
      },
      {
        h: 'Transition Management',
        p: 'End-to-end support for moving clients between platforms and providers. Implementation handled, reporting clear, clients kept informed throughout.',
        href: 'Transition Management.html',
      },
    ],
    standalone: [
      {
        h: 'WealthData',
        p: 'Adviser, superannuation and SMSF insights powering smarter decisions across the advice industry.',
        href: 'WealthData.html',
      },
      {
        h: 'Media & Advertising',
        p: "Reach Australia's advice market through Padua's owned channels and adviser networks.",
        href: 'product-providers.html',
      },
    ],
  },
  difference: {
    eyebrow: 'The Padua difference',
    title: 'What you get when you work with us.',
    lede: 'Three promises that show up on every plan, every transition, every interaction.',
    cards: [
      {
        h: 'Better quality',
        stat: '100% onshore advice professionals',
        p: "Onshore advice professionals tailor every deliverable to your clients' specific needs.",
        color: 'purple',
      },
      {
        h: 'More efficient',
        stat: '300+ clients per adviser',
        p: 'AI-augmented workflows that scale adviser capacity without scaling the team.',
        color: 'red',
      },
      {
        h: 'Always compliant',
        stat: 'ISO 27001 certified',
        p: '100% Australian-owned, ASIC and AFCA aligned, secure cold storage retention.',
        color: 'amber',
      },
    ],
    proof: [
      { n: '100%', l: 'Onshore delivery' },
      { n: 'ISO 27001', l: 'Certified & Australian-owned' },
      { n: 'ASIC & AFCA', l: 'Aligned assurance workflows' },
    ],
  },
  proof: {
    eyebrow: 'What our clients say',
    title: 'Hear it from the advisers and licensees who use Padua every day.',
    testimonials: [
      {
        quote: "We've been able to leverage Padua's expertise and interactive software, with our internal offering, to ensure we provide our clients with quality advice, in an efficient manner. Their efficiency has played a key role in the quality of our service offering to our clients.",
        name: 'Sarah Humm',
        role: 'National Adviser Support Manager',
        firm: 'Findex',
      },
      {
        quote: 'Padua sits at the centre of how we deliver advice. The integration into our CRM means our advisers can spend their time on what matters: their clients. We\u2019ve scaled capacity without compromising on quality.',
        name: 'Placeholder Name',
        role: 'Head of Advice',
        firm: 'Client Firm',
      },
      {
        quote: "The compliance assurance workflows give us confidence. ASIC and AFCA aligned, every step audited, every document archived. It's the kind of foundation our business needed to grow.",
        name: 'Placeholder Name',
        role: 'Compliance Director',
        firm: 'Client Firm',
      },
    ],
    logosEyebrow: 'Trusted across Australian advice',
    logosIntro: 'Working with leading licensees, platforms, super funds and investment managers.',
    // Real partner logos (carried over from the prior site) — images read
    // more professional than text pills. White-on-light logos omitted.
    logos: [
      { name: 'Invest Blue',  src: 'https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65432bc7c2c651309362b971_Invest-Blue-logo.png' },
      { name: 'Count',        src: 'https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65432967106c4a51312feed5_count-logo.svg' },
      { name: 'Fitzpatricks', src: 'https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65432b303137cb430dca61eb_Fitzpatricks.png' },
      { name: 'Findex',       src: 'https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/656fe30d79afcd6c258603aa_findex-logo.svg' },
      { name: 'Emerge',       src: 'https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65432bf4453f23c395598081_emerge-paper.png' },
      { name: 'Finchley Kent',src: 'https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/67e60ac854180ce450ef9d0d_Finchley_Kent_Logo%20copy.png' },
      { name: 'LFG',          src: 'https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/67e60b13efcc5d785d51f02a_LFG-Transparent.png' },
    ],
  },
  contact: {
    eyebrow: 'Get in touch',
    title: "Let's talk about your practice.",
    lede: "Whether you want a quick walkthrough of the platform or to talk through a specific workflow, we'd love to hear from you.",
    offices: [
      { tag: 'Head Office', addr: 'Level 14, 323 Castlereagh Street, Sydney NSW 2000' },
      { tag: 'Regional', addr: '2 Manning Street, Kiama NSW 2533' },
      { tag: 'Satellites', addr: 'Melbourne · Brisbane · Perth' },
      { tag: 'Email', addr: 'hello@paduasolutions.com.au' },
    ],
  },
  footer: {
    blurb: "Padua Solutions is Australia's tech-enabled financial advice infrastructure. Combining experienced onshore advice professionals, intelligent workflow and AI to help advisers help more Australians.",
    cols: [
      {
        h: 'Advisers & Licensees',
        links: [
          { label: 'Padua Advice Portal', href: 'Padua Portal.html' },
          { label: 'Paraplanning services', href: 'Paraplanning.html' },
          { label: 'Transition management', href: 'Transition Management.html' },
        ],
      },
      {
        h: 'Other streams',
        links: [
          { label: 'Platforms & Super Funds', href: 'product-providers.html' },
          { label: 'Investment Managers', href: 'product-providers.html' },
          { label: 'Media & Advertising', href: 'product-providers.html' },
        ],
      },
      {
        h: 'Company',
        links: [
          { label: 'About Padua', href: 'Who we are.html' },
          { label: 'Our people', href: 'about/our-people.html' },
          { label: 'News & insights', href: 'News & Insights.html' },
          { label: 'Careers', href: 'Careers.html' },
          { label: 'Contact', href: 'Contact.html' },
        ],
      },
    ],
    legal: '© 2026 Padua Solutions Pty Ltd. ABN 93 167 243 745. All rights reserved.',
    acknowledgement: 'Padua acknowledges the Traditional Owners of the lands on which we work, the Wodi Wodi people on Dharawal country and the Gadigal people of the Eora Nation. We acknowledge their continuing connection to land, waters, and community. We pay our respects to the people, the cultures, and the Elders past and present.',
  },
};

// Triangle SVGs for the Difference cards (used by both directions)
function DiffTriangle({ color }) {
  const gradients = {
    purple: ['#4a308c', '#2a1a5c'],
    red: ['#eb2e4d', '#a8203a'],
    amber: ['#f59436', '#d97d20'],
  };
  const [c1, c2] = gradients[color] || gradients.purple;
  const id = `tri-${color}`;
  return (
    <svg viewBox="0 0 200 174" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <path
        d="M100 8 L188 162 L12 162 Z"
        fill={`url(#${id})`}
        stroke={`url(#${id})`}
        strokeWidth="16"
        strokeLinejoin="round"
      />
      <g transform="translate(100 110)">
        <circle r="22" fill="white" />
        {color === 'purple' && (
          <path d="M-9 0 L-2 7 L10 -6" stroke={c1} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )}
        {color === 'red' && (
          <g fill={c1}>
            <rect x="-12" y="-2" width="5" height="10" rx="1" />
            <rect x="-4" y="-7" width="5" height="15" rx="1" />
            <rect x="4" y="-12" width="5" height="20" rx="1" />
          </g>
        )}
        {color === 'amber' && (
          <g>
            <path d="M0 -12 L10 -8 L10 2 Q10 9 0 12 Q-10 9 -10 2 L-10 -8 Z" fill={c2} />
            <path d="M-4 0 L-1 3 L5 -4" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </g>
    </svg>
  );
}

// Diff small icons (used by direction B - inside coloured rounded square)
function DiffIcon({ color }) {
  if (color === 'purple') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );
  }
  if (color === 'red') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <rect x="3" y="14" width="4" height="7" rx="1" />
        <rect x="10" y="9" width="4" height="12" rx="1" />
        <rect x="17" y="4" width="4" height="17" rx="1" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M12 2L4 5v7c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5l-8-3z" />
    </svg>
  );
}

// PaduaFooter (used by both directions; styled per-direction)
function PaduaFooter() {
  const f = PADUA_CONTENT.footer;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <PaduaLogo />
            <p>{f.blurb}</p>
          </div>
          {f.cols.map((col) => (
            <div className="footer-col" key={col.h}>
              <h4>{col.h}</h4>
              {col.links.map((l) => (
                <a key={l.label} href={l.href || '#'}>{l.label}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bot">
          <p>{f.legal}</p>
          <div className="footer-bot-right">
            <div className="footer-cert">ISO 27001 Certified</div>
            <div className="footer-cert">100% Onshore</div>
            <a href="privacy-policy.html">Privacy</a>
            <a href="terms.html">Terms</a>
          </div>
        </div>
        <p className="acknowledgement">{f.acknowledgement}</p>
      </div>
    </footer>
  );
}

// =====================================================
// SHARED, Hero carousel + pillar visuals (used by both A and B)
// =====================================================

function HeroCarousel({ pillars, autoAdvance = true, intervalMs = 4800 }) {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    if (!autoAdvance) return undefined;
    const id = setInterval(() => setActive((p) => (p + 1) % pillars.length), intervalMs);
    return () => clearInterval(id);
  }, [autoAdvance, intervalMs, pillars.length]);

  const p = pillars[active];
  return (
    <div className="pillar-card" role="region" aria-label="Padua pillars">
      <div className="pillar-card-head">
        <span className="pillar-eyebrow">{p.eyebrow}</span>
        <span className="pillar-eyebrow">{String(active + 1).padStart(2, '0')} / {String(pillars.length).padStart(2, '0')}</span>
      </div>
      <div className="pillar-card-title">{p.title}</div>
      <div className="pillar-card-desc">{p.desc}</div>

      <div className="pillar-card-vis">
        {p.key === 'integration' && <PillarHub />}
        {p.key === 'efficiency' && <PillarBars />}
        {p.key === 'engagement' && <PillarDevice />}
        {p.key === 'compliance' && <PillarAudit />}
      </div>

      <div className="pillar-tabs">
        {pillars.map((_, i) => (
          <button
            key={i}
            className={`pillar-tab${i === active ? ' active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Pillar ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function PillarHub() {
  return (
    <div className="hub">
      <div className="hub-core">Padua</div>
      <span className="hub-node hub-node-1">Xplan</span>
      <span className="hub-node hub-node-2">Your CRM</span>
      <span className="hub-node hub-node-3">Platforms</span>
      <span className="hub-node hub-node-4">Open banking</span>
      <span className="hub-node hub-node-5">WealthX</span>
      <span className="hub-node hub-node-6">WealthData</span>
    </div>
  );
}

function PillarBars() {
  return (
    <div className="bars">
      <div className="bar"><span className="bar-label">Adviser A</span><i className="bar-fill" style={{ '--w': '42%' }}></i></div>
      <div className="bar"><span className="bar-label">Adviser B</span><i className="bar-fill" style={{ '--w': '58%' }}></i></div>
      <div className="bar"><span className="bar-label">Adviser C</span><i className="bar-fill" style={{ '--w': '78%' }}></i></div>
      <div className="bar bar-highlight"><span className="bar-label">With Padua</span><i className="bar-fill" style={{ '--w': '96%' }}></i></div>
    </div>
  );
}

function PillarDevice() {
  return (
    <div className="device">
      <div className="device-bar">
        <span className="device-dot"></span>
        <span className="device-dot"></span>
        <span className="device-dot"></span>
        <span className="device-title">WEALTHREVIEW · YOUR PLAN</span>
      </div>
      <div className="device-body">
        <div className="device-stat">
          <span className="device-stat-label">PORTFOLIO</span>
          <span className="device-stat-val">$487,200</span>
        </div>
        <div className="device-stat device-stat-accent">
          <span className="device-stat-label">ON TRACK</span>
          <span className="device-stat-val">94%</span>
        </div>
      </div>
    </div>
  );
}

function PillarAudit() {
  return (
    <div className="audit">
      <div className="audit-head">AUDIT TRAIL · CLIENT A.S.</div>
      <div className="audit-row"><span className="audit-dot"></span><span className="audit-label">Fact find submitted</span><span className="audit-meta">v1 · 09:14</span></div>
      <div className="audit-row"><span className="audit-dot"></span><span className="audit-label">Strategy generated</span><span className="audit-meta">v1 · 09:18</span></div>
      <div className="audit-row"><span className="audit-dot"></span><span className="audit-label">Paraplanner review</span><span className="audit-meta">v2 · 14:02</span></div>
      <div className="audit-row"><span className="audit-dot audit-dot-end"></span><span className="audit-label">SOA delivered</span><span className="audit-meta">v3 · 16:40</span></div>
    </div>
  );
}

// =====================================================
// SHARED, Portal video card (placeholder for 2-minute video)
// =====================================================
function PortalVideoCard() {
  return (
    <div className="portal-video">
      <div className="portal-video-frame">
        <div className="portal-video-thumb" aria-hidden="true">
          {/* Placeholder: simulated UI screenshot of Padua Portal */}
          <div className="portal-video-thumb-inner">
            <div className="portal-video-thumb-bar">
              <span></span><span></span><span></span>
              <span className="portal-video-thumb-title">THE PADUA PORTAL · LIVE TOUR</span>
            </div>
            <div className="portal-video-thumb-body">
              <div className="portal-video-thumb-row pv-row-1"></div>
              <div className="portal-video-thumb-row pv-row-2"></div>
              <div className="portal-video-thumb-row pv-row-3"></div>
            </div>
          </div>
        </div>
        <button className="portal-video-play" aria-label="Play 2-minute tour">
          <svg width="22" height="26" viewBox="0 0 22 26" fill="currentColor" aria-hidden="true">
            <path d="M1 1 L21 13 L1 25 Z" />
          </svg>
        </button>
        <div className="portal-video-cap">2 min · See the platform in action</div>
      </div>
    </div>
  );
}

// Share to window scope so other Babel scripts can read them
Object.assign(window, {
  PaduaLogo,
  PaduaNav,
  PaduaFooter,
  EARSWheel,
  DiffTriangle,
  DiffIcon,
  HeroCarousel,
  PillarHub,
  PillarBars,
  PillarDevice,
  PillarAudit,
  PortalVideoCard,
  PADUA_CONTENT,
});
