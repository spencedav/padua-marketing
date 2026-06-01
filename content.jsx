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
    href: 'padua-portal.html',
    columns: [
      {
        kind: 'featured',
        badge: 'The Platform',
        title: 'Padua Portal for licensees',
        blurb: 'The integrated workflow that pulls platform, CRM and Xplan data into one end-to-end advice system, with compliance built in.',
        cta: 'Portal overview',
        href: 'padua-portal.html',
      },
      {
        title: 'Modular Components',
        items: [
          { type: 'label', label: 'Part of the Padua Portal' },
          // SteveAI moved to last of this group: it's 'Coming soon' so we
          // don't want it to be the first thing visitors click in the nav.
          { h: 'WealthX', p: 'Open banking', href: 'WealthX.html' },
          { h: 'WealthAI', p: 'Video & statements', href: 'WealthAI.html' },
          { h: 'SteveAI', p: 'AI advice assistant', href: 'SteveAI.html' },
          { type: 'label', label: 'Standalone' },
          { h: 'WealthData', p: 'Adviser movement data', href: 'WealthData.html' },
        ],
      },
      {
        title: 'Advice Generation Services',
        items: [
          { h: 'Paraplanning', p: 'Tech-enabled advice generation', href: 'Paraplanning.html' },
          { h: 'Transition Management', p: 'End-to-end client transition support', href: 'transition-management.html' },
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
    href: 'padua-portal-platforms.html',
    columns: [
      {
        kind: 'featured',
        badge: 'The Platform',
        title: 'Padua Portal for platforms',
        blurb: 'The integrated workflow embedded in your platform. End-to-end advice for both advised and non-advised members.',
        cta: 'Portal overview',
        href: 'padua-portal-platforms.html',
      },
      {
        title: 'Modular Components',
        items: [
          { type: 'label', label: 'Part of the Padua Portal' },
          // SteveAI moved to last of this group: it's 'Coming soon' so we
          // don't want it to be the first thing visitors click in the nav.
          { h: 'WealthX', p: 'Open banking', href: 'WealthX.html' },
          { h: 'WealthAI', p: 'Personalised member video', href: 'WealthAI.html' },
          { h: 'SteveAI', p: 'AI advice assistant', href: 'SteveAI.html' },
          { type: 'label', label: 'Standalone' },
          { h: 'WealthData', p: 'Adviser movement data', href: 'WealthData.html' },
        ],
      },
      {
        title: 'Advice Generation Services',
        items: [
          { h: 'Paraplanning', p: 'Tech-enabled advice generation', href: 'Paraplanning.html' },
          { h: 'Transition Management', p: 'End-to-end client transition support', href: 'transition-management.html' },
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
    href: 'padua-portal-platforms.html',
    columns: [
      {
        title: 'Advice Generation Services',
        items: [
          { h: 'Transition management', p: 'End-to-end implementation', href: 'transition-management.html' },
        ],
      },
      {
        title: 'Standalone Software',
        items: [
          { h: 'WealthData', p: 'Adviser movement data', href: 'WealthData.html' },
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
      { h: 'Who we are', p: 'Our mission and values', href: 'who-we-are.html' },
      { h: 'Our people', p: 'The team behind Padua', href: 'our-people.html' },
      { h: 'Careers', href: 'Careers.html' },
    ],
  },
  {
    title: 'Content',
    items: [
      { h: 'News & insights', href: 'news-insights.html' },
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
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const closeTimer = React.useRef(0);
  const hamburgerRef = React.useRef(null);
  const drawerRef = React.useRef(null);
  const closeBtnRef = React.useRef(null);

  // Mobile drawer lifecycle: lock body scroll, allow Esc-to-close, auto-close
  // any time the viewport widens back past the mobile breakpoint (e.g. device
  // rotated to landscape on a tablet). Plus focus management — move focus into
  // the drawer on open, trap it inside, and return it to the hamburger on close.
  React.useEffect(() => {
    if (!mobileOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into the drawer once it's visible (small delay so the slide
    // transition can start before focus shifts).
    const focusTimer = window.setTimeout(() => {
      if (closeBtnRef.current) closeBtnRef.current.focus();
    }, 60);

    const onKey = (e) => {
      if (e.key === 'Escape') { setMobileOpen(false); return; }
      // Simple focus trap — Tab cycles within the drawer's focusable elements.
      if (e.key === 'Tab' && drawerRef.current) {
        const nodes = drawerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };
    const onResize = () => { if (window.innerWidth > 720) setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      // Return focus to the trigger when the drawer closes.
      if (hamburgerRef.current) hamburgerRef.current.focus();
    };
  }, [mobileOpen]);

  // Subtle shrink-on-scroll past ~24px
  React.useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Measure the actual rendered nav height and expose it as a CSS variable
  // (--padua-nav-h) so the mobile drawer can sit exactly below the nav
  // regardless of viewport, device, scrolled state or future style tweaks.
  // ResizeObserver picks up scroll-shrink + breakpoint changes automatically.
  React.useEffect(() => {
    const nav = document.querySelector('.nav');
    if (!nav) return undefined;
    const apply = () => {
      const h = Math.round(nav.getBoundingClientRect().height);
      if (h) document.documentElement.style.setProperty('--padua-nav-h', `${h}px`);
    };
    apply();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', apply);
      return () => window.removeEventListener('resize', apply);
    }
    const ro = new ResizeObserver(apply);
    ro.observe(nav);
    return () => ro.disconnect();
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
                      <a key={a.key} href={a.href || '#'} className="nav-dd-card" role="menuitem">
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

        {/* Mobile hamburger — only visible at ≤720px via CSS. Toggles the
            slide-in drawer below. Desktop behaviour is unchanged. */}
        <button
          ref={hamburgerRef}
          type="button"
          className={`nav-hamburger${mobileOpen ? ' is-open' : ''}`}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="padua-mobile-drawer"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {/* Soft backdrop tint while a dropdown is open, keeps focus on the panel */}
      <div className="nav-backdrop" aria-hidden="true" onMouseEnter={scheduleClose} />

      {/* Mobile drawer — portaled to document.body so it escapes the nav's
          stacking context (the nav uses backdrop-filter, which creates a
          containing block for position:fixed descendants — without the
          portal the drawer was getting trapped behind page content). */}
      {ReactDOM.createPortal(
      <div
        id="padua-mobile-drawer"
        className={`nav-mobile-overlay${mobileOpen ? ' is-open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className="nav-mobile-scrim"
          aria-label="Close menu"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={() => setMobileOpen(false)}
        />
        <aside
          ref={drawerRef}
          className="nav-mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          {/* Header: close X aligned right, 44px tap target. */}
          <div className="nav-mobile-header">
            <button
              ref={closeBtnRef}
              type="button"
              className="nav-mobile-close"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Body: scrollable group of nav links. */}
          <div className="nav-mobile-body">
            <div className="nav-mobile-section">
              <div className="nav-mobile-h">Who we work with</div>
              <a className="nav-mobile-link" href="padua-portal.html" onClick={() => setMobileOpen(false)}>Advisers &amp; Licensees</a>
              <a className="nav-mobile-link" href="padua-portal-platforms.html" onClick={() => setMobileOpen(false)}>Platforms &amp; Super Funds</a>
              <a className="nav-mobile-link" href="padua-portal-platforms.html" onClick={() => setMobileOpen(false)}>Investment Managers</a>
            </div>
            <div className="nav-mobile-section">
              <div className="nav-mobile-h">Padua Portal</div>
              <a className="nav-mobile-link" href="padua-portal.html" onClick={() => setMobileOpen(false)}>Portal overview</a>
              {/* SteveAI moved to last: it's 'Coming soon', don't lead with it. */}
              <a className="nav-mobile-link" href="WealthX.html" onClick={() => setMobileOpen(false)}>WealthX</a>
              <a className="nav-mobile-link" href="WealthAI.html" onClick={() => setMobileOpen(false)}>WealthAI</a>
              <a className="nav-mobile-link" href="WealthData.html" onClick={() => setMobileOpen(false)}>WealthData</a>
              <a className="nav-mobile-link" href="SteveAI.html" onClick={() => setMobileOpen(false)}>SteveAI</a>
            </div>
            <div className="nav-mobile-section">
              <div className="nav-mobile-h">Advice services</div>
              <a className="nav-mobile-link" href="Paraplanning.html" onClick={() => setMobileOpen(false)}>Paraplanning</a>
              <a className="nav-mobile-link" href="transition-management.html" onClick={() => setMobileOpen(false)}>Transition Management</a>
            </div>
            <div className="nav-mobile-section">
              <div className="nav-mobile-h">About</div>
              <a className="nav-mobile-link" href="who-we-are.html" onClick={() => setMobileOpen(false)}>Who we are</a>
              <a className="nav-mobile-link" href="our-people.html" onClick={() => setMobileOpen(false)}>Our people</a>
              <a className="nav-mobile-link" href="Careers.html" onClick={() => setMobileOpen(false)}>Careers</a>
            </div>
            <div className="nav-mobile-section">
              <div className="nav-mobile-h">Content</div>
              <a className="nav-mobile-link" href="news-insights.html" onClick={() => setMobileOpen(false)}>News &amp; Insights</a>
              <a className="nav-mobile-link" href="Resources.html" onClick={() => setMobileOpen(false)}>Resources</a>
            </div>
            <div className="nav-mobile-section">
              <div className="nav-mobile-h">Get in touch</div>
              <a className="nav-mobile-link" href="Contact.html" onClick={() => setMobileOpen(false)}>Contact</a>
              <a className="nav-mobile-link" href="Contact.html" onClick={() => setMobileOpen(false)}>Book a demo →</a>
            </div>
          </div>

          {/* Footer: pinned with divider above, primary "Adviser login" CTA. */}
          <div className="nav-mobile-footer">
            <a className="nav-mobile-login" href="https://home.paduasolutions.com/">Adviser login</a>
          </div>
        </aside>
      </div>,
      document.body
      )}
    </nav>
  );
}

// ===== EARS Circular River — Messenger edition ====================
// Four pillars at the cardinal points of the circular river. One elegant
// arrow ("messenger") orbits clockwise with a short comet trail behind it.
// As the messenger passes each station, the pillar pulses, its halo blooms,
// a ripple emits, and the matching ONE-WAY / SAME-WAY / BETTER-WAY label
// briefly lights up. Palette aligned to the official Padua spec:
// Empathy=Discover, Agility=Compare, Reliability=Recommend, Simplicity=Review.
// The trail / messenger use a brand-teal tint.
function EARSWheel() {
  const rippleLayer = React.useRef(null);
  const stationRefs = {
    empathy:     React.useRef(null),
    agility:     React.useRef(null),
    reliability: React.useRef(null),
    simplicity:  React.useRef(null),
  };
  const labelRefs = {
    oneWay:    React.useRef(null),
    sameWay:   React.useRef(null),
    betterWay: React.useRef(null),
  };

  // One source of truth for the orbit period — JS scheduler + SVG animation
  // both read from this so they cannot drift out of sync.
  const ORBIT_SECONDS = 16;

  React.useEffect(() => {
    const ORBIT_MS = ORBIT_SECONDS * 1000;
    const ns = 'http://www.w3.org/2000/svg';
    const colors = {
      empathy: '#4a308c', agility: '#ab2178', reliability: '#eb2e4d', simplicity: '#f59436',
    };
    const positions = {
      empathy:     [280, 60],
      agility:     [500, 280],
      reliability: [280, 500],
      simplicity:  [60, 280],
    };
    // Visit schedule along the orbit (0% = top, going clockwise).
    // Each station gets the label it "speaks to" — the mantra wakes up
    // in step with the messenger's tour.
    const visits = [
      { at: 0.00, station: 'empathy',     label: 'oneWay'    },
      { at: 0.25, station: 'agility',     label: 'sameWay'   },
      { at: 0.50, station: 'reliability', label: 'betterWay' },
      { at: 0.75, station: 'simplicity',  label: 'betterWay' },
    ];

    function greet(stationKey, labelKey) {
      // 1) Restart the station's greeting animation
      const station = stationRefs[stationKey].current;
      if (station) {
        station.classList.remove('is-greeting');
        // Force reflow so the animation actually restarts each pass
        void station.offsetWidth;
        station.classList.add('is-greeting');
        setTimeout(() => station.classList.remove('is-greeting'), 2300);
      }
      // 2) Highlight the matching mantra label
      Object.values(labelRefs).forEach((r) => r.current && r.current.classList.remove('is-active'));
      const label = labelRefs[labelKey].current;
      if (label) {
        label.classList.add('is-active');
        setTimeout(() => label.classList.remove('is-active'), 2000);
      }
      // 3) Emit a single ripple from the station
      const layer = rippleLayer.current;
      if (layer) {
        const [cx, cy] = positions[stationKey];
        const c = document.createElementNS(ns, 'circle');
        c.setAttribute('cx', cx);
        c.setAttribute('cy', cy);
        c.setAttribute('r', 48);
        c.setAttribute('stroke', colors[stationKey]);
        c.setAttribute('fill', 'none');
        c.setAttribute('class', 'river-greet-ripple');
        layer.appendChild(c);
        setTimeout(() => c.remove(), 1800);
      }
    }

    const timeouts = [];
    const intervals = [];
    visits.forEach((v) => {
      const t = setTimeout(() => {
        greet(v.station, v.label);
        intervals.push(setInterval(() => greet(v.station, v.label), ORBIT_MS));
      }, v.at * ORBIT_MS);
      timeouts.push(t);
    });
    return () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, []);

  // Palette-aligned station definitions. Halo + circ use brand-token vars
  // (resolve at paint); the ripple stroke uses the literal hex because
  // setAttribute() doesn't evaluate var().
  const stations = [
    { key: 'empathy',     name: 'Empathy',     cx: 280, cy: 60,  color: 'var(--discover)'  },
    { key: 'agility',     name: 'Agility',     cx: 500, cy: 280, color: 'var(--compare)'   },
    { key: 'reliability', name: 'Reliability', cx: 280, cy: 500, color: 'var(--recommend)' },
    { key: 'simplicity',  name: 'Simplicity',  cx: 60,  cy: 280, color: 'var(--review)'    },
  ];

  // 6 fading trail dots, each slightly behind the messenger on the same orbit.
  // We use SVG-native <animateTransform> with a negative `begin` to start each
  // dot mid-cycle, which gives the visible "lag" behind the messenger arrow.
  // (We moved away from CSS offset-path because Safari quirks parking <g>
  // elements at the SVG origin, which surfaced as a stray arrow OUTSIDE the
  // river spinning in place.)
  const trail = Array.from({ length: 6 }, (_, i) => ({
    r:       (4.5 - (i + 1) * 0.5).toFixed(1),
    opacity: (0.55 - (i + 1) * 0.08).toFixed(2),
    begin:   `${-(i + 1) * 0.12}s`,
  }));

  return (
    <div className="river-svg-wrap">
      <svg
        className="river-svg"
        viewBox="0 0 560 560"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Padua's EARS values as a circular river: a single messenger orbits the four pillars — Empathy, Agility, Reliability, Simplicity — greeting each in turn. One way, Same way, Better way."
      >
        <defs>
          {/* River gradient sweeps each station's brand colour around the loop */}
          <linearGradient id="river-grad" gradientUnits="userSpaceOnUse" x1="60" y1="280" x2="500" y2="280">
            <stop offset="0%"   stopColor="var(--review)"    stopOpacity="0.4" />
            <stop offset="25%"  stopColor="var(--discover)"  stopOpacity="0.45" />
            <stop offset="50%"  stopColor="var(--compare)"   stopOpacity="0.45" />
            <stop offset="75%"  stopColor="var(--recommend)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--review)"    stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="river-basin-depth" cx="50%" cy="50%" r="50%">
            <stop offset="80%"  stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.08" />
          </radialGradient>
          <linearGradient id="river-sheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#fff" stopOpacity="0.18" />
            <stop offset="50%"  stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer tick frame, faint, just for composition */}
        <g className="river-tick-ring">
          <circle cx="280" cy="280" r="258" fill="none" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="1 7" />
        </g>

        {/* Station halos (behind the river for the colour bleed effect) */}
        {stations.map((s, i) => (
          <circle
            key={`halo-${s.key}`}
            className={`river-halo h${i + 1}`}
            cx={s.cx}
            cy={s.cy}
            r="60"
            fill={s.color}
          />
        ))}

        {/* River bed: grad + basin depth + top sheen */}
        <circle cx="280" cy="280" r="220" fill="none" stroke="url(#river-grad)"        strokeWidth="24" opacity="0.6" />
        <circle cx="280" cy="280" r="220" fill="none" stroke="url(#river-basin-depth)" strokeWidth="24" />
        <circle cx="280" cy="280" r="220" fill="none" stroke="url(#river-sheen)"       strokeWidth="24" opacity="0.6" />

        {/* Comet trail — short fading dots lagging behind the messenger.
            Each dot sits at the top of the river circle (280, 60) and is
            rotated around the river centre (280, 280) via SVG animateTransform;
            negative `begin` delays put each one further behind the messenger. */}
        <g className="river-trail">
          {trail.map((d, i) => (
            <circle
              key={`trail-${i}`}
              className="river-trail-dot"
              cx="280"
              cy="60"
              r={d.r}
              fill="#3a9aa8"
              opacity={d.opacity}
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 280 280"
                to="360 280 280"
                dur={`${ORBIT_SECONDS}s`}
                begin={d.begin}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

        {/* The single messenger arrow.
            Arrow path is drawn at the top of the river (280, 60), tip pointing
            east — the tangent direction of clockwise motion at the top. Rotating
            the <g> around (280, 280) sweeps it cleanly around the circle. */}
        <g className="river-messenger">
          <path d="M 270 53 L 288 60 L 270 67 L 274 60 Z" fill="#3a9aa8" opacity="0.95" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 280 280"
            to="360 280 280"
            dur={`${ORBIT_SECONDS}s`}
            repeatCount="indefinite"
          />
        </g>

        {/* Greeting-ripple layer (populated imperatively on each station pass) */}
        <g ref={rippleLayer} />

        {/* Guiding labels with leader ticks — light up in step with the messenger */}
        <line className="river-tick" x1="455" y1="105" x2="478" y2="82" />
        <text ref={labelRefs.oneWay}    className="river-outer-q" x="478" y="72">ONE WAY</text>
        <line className="river-tick" x1="455" y1="455" x2="478" y2="478" />
        <text ref={labelRefs.sameWay}   className="river-outer-q" x="478" y="498">SAME WAY</text>
        <line className="river-tick" x1="105" y1="455" x2="82" y2="478" />
        <text ref={labelRefs.betterWay} className="river-outer-q" x="82" y="498">BETTER WAY</text>

        {/* Stations */}
        {stations.map((s) => (
          <g key={s.key} ref={stationRefs[s.key]} className="river-station">
            <ellipse className="river-station-shadow" cx={s.cx} cy={s.cy + 52} rx="42" ry="6" fill="#000" />
            <circle  className="river-station-circ"   cx={s.cx} cy={s.cy} r="48" fill={s.color} />
            <text    className="river-station-name"   x={s.cx} y={s.cy + 5}>{s.name}</text>
          </g>
        ))}

        {/* Centre disc — counter-breath, ties the loop together */}
        <g className="river-center">
          <ellipse cx="280" cy="362" rx="68" ry="8" fill="#000" opacity="0.06" />
          <circle cx="280" cy="280" r="82" fill="var(--paper)" stroke="var(--line)" strokeWidth="0.5" />
          <text className="river-center-ears" x="280" y="266">EARS?</text>
          <text className="river-center-how"  x="280" y="298">How?</text>
        </g>
      </svg>
    </div>
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
    p2: 'Our team combines experienced advice professionals, intelligent workflow and AI to give advisers the operational leverage they need. We live the EARS values in every engagement: Empathy, Agility, Reliability and Simplicity. <span class="padua-way">One way. Same way. Better way.</span>',
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
      // Per design: cards are clickable as a whole; the explicit
      // "Explore the portal / Explore solutions" CTA was redundant
      // with the card heading + hover affordance, so omitted.
      {
        tag: '',
        h: 'Advisers & Licensees',
        p: 'The Padua Advice Portal. A modular, AI-augmented advice platform with experienced Advice Guides supporting every step.',
        href: 'padua-portal.html',
        featured: true,
      },
      {
        tag: '',
        h: 'Platforms & Super Funds',
        p: 'Data integration, modelling tools, member engagement video and open banking technology for platform operators and super funds.',
        href: 'padua-portal-platforms.html',
      },
      {
        tag: '',
        h: 'Investment Managers',
        p: 'Fund administration tooling, investment analytics, market data and adviser advertising channels.',
        href: 'padua-portal-platforms.html',
      },
    ],
  },
  ecosystem: {
    eyebrow: 'The Padua ecosystem',
    title: 'Built for every part of the advice journey.',
    framing: 'A connected ecosystem of software and services. The Padua Portal sits at the centre, with Advice Generation Services and Standalone Products around it.',
    portal: {
      eyebrow: 'The rise of the advice platform',
      title: 'Padua Portal',
      h: 'The software platform we use, available to you too.',
      p: 'A connected suite of tools that maps the entire advice journey. Use the full Portal end-to-end, or pick the modules that fit alongside your existing systems.',
      flow: ['Pre-Discovery', 'Discovery', 'Advice Guidance', 'Advice Generation', 'Engagement', 'Compliance'],
      cta: 'Watch the 6-minute tour',
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
        href: 'transition-management.html',
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
        href: 'padua-portal-platforms.html',
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
          { label: 'Padua Advice Portal', href: 'padua-portal.html' },
          { label: 'Paraplanning services', href: 'Paraplanning.html' },
          { label: 'Transition management', href: 'transition-management.html' },
        ],
      },
      {
        // Was three links all pointing at the same /padua-portal-platforms page —
        // bad for SEO (duplicate destinations) and confusing for users (three
        // promises, one destination). Consolidated to one link whose label
        // captures the audience scope.
        h: 'Other streams',
        links: [
          { label: 'Platforms, super funds & managers', href: 'padua-portal-platforms.html' },
        ],
      },
      {
        h: 'Company',
        links: [
          { label: 'About Padua', href: 'who-we-are.html' },
          { label: 'News & insights', href: 'news-insights.html' },
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
            <div className="footer-cert footer-cert-badge" aria-label="ISO 27001 Certified">
              <img src="assets/iso-27001-certified.jpg" alt="ISO 27001 Certified — de.iterate" />
            </div>
            <div className="footer-cert">100% Onshore</div>
            <a
              className="footer-social"
              href="https://www.linkedin.com/company/padua-solutions/"
              target="_blank"
              rel="noopener"
              aria-label="Padua Solutions on LinkedIn"
              title="Padua Solutions on LinkedIn"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="footer-social-label">Follow us</span>
            </a>
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

function HeroCarousel({ pillars, autoAdvance = true, intervalMs = 6500 }) {
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
  // Connecting lines from the Padua core to each of the six nodes, drawn in
  // percentage space so the lines stay anchored to the visible node positions
  // regardless of how the .hub container is sized. preserveAspectRatio="none"
  // + vector-effect: non-scaling-stroke keeps the stroke crisp.
  return (
    <div className="hub">
      <svg className="hub-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="50" y1="50" x2="10" y2="6"  />
        <line x1="50" y1="50" x2="90" y2="6"  />
        <line x1="50" y1="50" x2="10" y2="94" />
        <line x1="50" y1="50" x2="90" y2="94" />
        <line x1="50" y1="50" x2="2"  y2="50" />
        <line x1="50" y1="50" x2="98" y2="50" />
      </svg>
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
// SHARED, Portal video card (plays the 6-minute platform tour)
// =====================================================
// Homepage "Padua Portal" eco section video card. Was a static placeholder
// thumb (simulated UI screenshot + fake bars). Now plays the real Padua
// Portal tour video on click. The simulated thumb stays as the paused
// poster underneath the <video> element so the card still has visual
// weight before the user clicks.
function PortalVideoCard() {
  const [playing, setPlaying] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const ref = React.useRef(null);
  const togglePlay = React.useCallback(() => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play(); else v.pause();
  }, []);
  return (
    <div className="portal-video">
      <div
        className={`portal-video-frame${playing ? ' is-playing' : ''}${ready ? ' is-ready' : ''}`}
        onClick={togglePlay}
        role="button"
        tabIndex={0}
        aria-label={playing ? 'Pause Padua Portal tour' : 'Play Padua Portal tour'}
      >
        <video
          ref={ref}
          src="assets/padua-portal-tour-platform.mp4"
          poster="assets/padua-portal-tour-platform-poster.jpg"
          playsInline
          preload="metadata"
          onLoadedMetadata={() => setReady(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
        <div className="portal-video-thumb" aria-hidden="true">
          {/* Placeholder thumb sits over the video as the paused poster.
              Fades out when .is-playing per portal-video CSS. */}
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
        <button
          className="portal-video-play"
          aria-label={playing ? 'Pause tour' : 'Play tour'}
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
        >
          {playing ? (
            <svg width="22" height="26" viewBox="0 0 22 26" fill="currentColor" aria-hidden="true">
              <rect x="2" y="1" width="6" height="24" rx="1"/>
              <rect x="14" y="1" width="6" height="24" rx="1"/>
            </svg>
          ) : (
            <svg width="22" height="26" viewBox="0 0 22 26" fill="currentColor" aria-hidden="true">
              <path d="M1 1 L21 13 L1 25 Z" />
            </svg>
          )}
        </button>
        <div className="portal-video-cap">6 min · See the platform in action</div>
      </div>
    </div>
  );
}

// =====================================================
// HOMEPAGE HERO VIDEO — click-to-play tile that lives in
// the right column of the hero grid (formerly HeroCarousel).
// Same playback pattern as the Portal page's PortalVideoFrame
// so behaviour is consistent across the site, but the markup
// is scoped to `.hero-video-card` so it inherits hero styling
// from dir-a.css rather than portal.css (which isn't loaded
// on the homepage).
// =====================================================
function HeroVideoCard({
  src = 'assets/padua-portal-tour-licensee.mp4',
  poster = 'assets/padua-portal-tour-licensee-poster.jpg',
  caption = 'THE PADUA PORTAL · 6-MIN TOUR',
  length = '6 min',
}) {
  const [hovered, setHovered] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const ref = React.useRef(null);
  const togglePlay = React.useCallback(() => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play(); else v.pause();
  }, []);
  return (
    <div
      className={`hero-video-card${hovered ? ' is-hovered' : ''}${playing ? ' is-playing' : ''}${ready ? ' is-ready' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={togglePlay}
      role="button"
      tabIndex={0}
      aria-label={playing ? 'Pause Padua Portal tour' : 'Play Padua Portal tour'}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        onLoadedMetadata={() => setReady(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <div className="hero-video-tint" aria-hidden="true" />
      <div className="hero-video-meta">
        <span className="hero-video-length">{length}</span>
      </div>
      <button
        type="button"
        className="hero-video-play"
        aria-label={playing ? 'Pause tour' : 'Play tour'}
        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
      >
        {playing ? (
          <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
            <circle cx="32" cy="32" r="31" fill="rgba(255,255,255,0.96)" />
            <rect x="22" y="20" width="6" height="24" fill="#1a1525" rx="1.2" />
            <rect x="36" y="20" width="6" height="24" fill="#1a1525" rx="1.2" />
          </svg>
        ) : (
          <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
            <circle cx="32" cy="32" r="31" fill="rgba(255,255,255,0.96)" />
            <path d="M26 20 L46 32 L26 44 Z" fill="#1a1525" />
          </svg>
        )}
      </button>
      <div className="hero-video-caption">{caption}</div>
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
  HeroVideoCard,
  PillarHub,
  PillarBars,
  PillarDevice,
  PillarAudit,
  PortalVideoCard,
  PADUA_CONTENT,
});
