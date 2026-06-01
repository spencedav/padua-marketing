// =======================================================
// DIRECTION A, EDITORIAL SUNSET (refined)
// =======================================================

function DirectionA({ show, navVariant }) {
  const c = PADUA_CONTENT;
  const [activeTestimonial, setActiveTestimonial] = React.useState(0);
  const [scrollY, setScrollY] = React.useState(0);
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  const [revealed, setRevealed] = React.useState(false);
  const [quoteInView, setQuoteInView] = React.useState(false);
  const heroRef = React.useRef(null);
  const quoteRef = React.useRef(null);

  // Smooth scroll-driven parallax on the hero (rAF-throttled)
  React.useEffect(() => {
    let raf = 0;
    let last = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        if (Math.abs(y - last) > 0.5) {
          last = y;
          setScrollY(y);
        }
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Mouse parallax, track cursor against the hero element, normalize to -1..1
  React.useEffect(() => {
    let raf = 0;
    const onMove = (e) => {
      if (raf) return;
      const hero = heroRef.current;
      if (!hero) return;
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        // Only react while cursor is roughly within the hero band
        if (e.clientY > r.bottom + 100 || e.clientY < r.top - 100) {
          raf = 0;
          return;
        }
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2)));
        const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2)));
        setMouse({ x: nx, y: ny });
        raf = 0;
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Fade-up on mount
  React.useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Quote card reveal on scroll-into-view
  React.useEffect(() => {
    const node = quoteRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setQuoteInView(true);
      return undefined;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setQuoteInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // Auto-advance testimonials once the quote section is in view (paired with
  // the 6s dot-fill animation so they stay in lockstep).
  React.useEffect(() => {
    if (!quoteInView) return undefined;
    const id = setInterval(() => {
      setActiveTestimonial((t) => (t + 1) % PADUA_CONTENT.proof.testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [quoteInView]);

  // Generic scroll-reveal, animates any element with [data-reveal] when
  // it enters the viewport (matches the pattern used on the Padua Portal
  // page so the homepage breathes the same way as you scroll).
  React.useEffect(() => {
    const nodes = document.querySelectorAll('.dir-a [data-reveal]');
    if (!nodes.length || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((n) => n.classList.add('is-revealed'));
      return undefined;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  // Compose transforms: scroll parallax + subtle mouse parallax + reveal opacity
  // Cap the scroll value so the photo never translates past its container's
  // top/bottom buffer (set in dir-a.css: top: -260px / bottom: -120px).
  const heroScroll = Math.min(scrollY, 900);
  const r = revealed ? 1 : 0;
  // "Fall into" feel: dominant scale, light translate. Origin is center-center
  // (set in CSS) so the zoom feels like the camera dollying forward rather
  // than the photo sliding past.
  const photoTransform =
    `translate3d(${mouse.x * -10}px, ${heroScroll * 0.12 + mouse.y * -8}px, 0) ` +
    `scale(${1 + heroScroll * 0.00055})`;
  const scrimOpacity = Math.min(1, 0.95 + heroScroll * 0.0005);
  const textTransform = `translate3d(${mouse.x * 4}px, ${heroScroll * -0.12}px, 0)`;
  const textOpacity = Math.max(0, 1 - heroScroll * 0.0014) * r;
  const carouselTransform =
    `translate3d(${mouse.x * -6}px, ${heroScroll * -0.18 + mouse.y * 3}px, 0)`;
  const carouselOpacity = Math.max(0, 1 - heroScroll * 0.0014) * r;

  return (
    <>
      <PaduaNav variant={navVariant} />

      {/* HERO, Kiama sunset photo, smaller heading, carousel right */}
      {show.showHero && (
        <section
          ref={heroRef}
          className={`hero${revealed ? ' is-revealed' : ''}`}
          data-screen-label="hero"
        >
          <div
            className="hero-photo"
            aria-hidden="true"
            style={{ transform: photoTransform }}
          >
            <div className="hero-photo-zoom" aria-hidden="true"></div>
          </div>
          <div
            className="hero-scrim"
            aria-hidden="true"
            style={{ opacity: scrimOpacity }}
          ></div>
          <div className="hero-embers" aria-hidden="true">
            {Array.from({ length: 14 }).map((_, i) => (
              <i key={i} className={`ember ember-${i}`}></i>
            ))}
          </div>
          <div className="hero-inner">
            <div
              className="hero-text"
              style={{ transform: textTransform, opacity: textOpacity }}
            >
              <h1>
                Empowering advisers to build <em>stronger futures</em> for more Australians.
              </h1>
              <p className="hero-sub">
                Through the <strong>Padua Advice Platform</strong>. A connected suite of software and services purpose-built for the Australian advice industry.
              </p>
            </div>

            <div
              className="hero-carousel-wrap"
              style={{ transform: carouselTransform, opacity: carouselOpacity }}
            >
              <HeroVideoCard />
            </div>
          </div>
          <div className="hero-loc">SUNRISE · KIAMA</div>
        </section>
      )}

      {/* INTRO */}
      {show.showIntro && (
        <section className="intro s-paper" data-screen-label="intro">
          <div className="intro-inner" data-reveal>
            <h2>
              The demand for <em>quality advice</em> has never been greater.
            </h2>
            <div className="intro-cols">
              <p>{c.intro.p1}</p>
              <p>{c.intro.p2}</p>
            </div>
          </div>
        </section>
      )}

      {/* WHO WE ARE (About) */}
      {show.showAbout && (
        <section className="s-warm" id="about" data-screen-label="about">
          <div className="container">
            <div className="about-grid" data-reveal>
              <div className="about-wheel">
                <EARSWheel />
              </div>
              <div className="about-content">
                <div className="eyebrow">Who we are</div>
                <h2 className="section-title">{c.about.title}</h2>
                <p>{c.about.p1}</p>
                <p dangerouslySetInnerHTML={{ __html: c.about.p2 }} />
                <a className="btn btn-outline" href="who-we-are.html">{c.about.cta} →</a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WHO WE WORK WITH (Streams), 3-card grid */}
      {show.showStreams && (
        <section className="s-paper" data-screen-label="streams">
          <div className="container">
            <div className="streams-head" data-reveal>
              <div>
                <div className="eyebrow">Who we work with</div>
                <h2 className="section-title">{c.streams.title}</h2>
                <p className="section-lede">{c.streams.lede}</p>
              </div>
            </div>

            <div className="streams-grid" data-reveal>
              {c.streams.items.map((s) => (
                <a className={`stream${s.featured ? ' stream-featured' : ''}`} key={s.h} href={s.href || '#'}>
                  {s.tag && <div className="stream-tag">{s.tag}</div>}
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                  {s.cta && <span className="stream-link">{s.cta}</span>}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHAT WE OFFER (Ecosystem), light bg, video card */}
      {show.showEcosystem && (
        <section className="s-warm" id="watch" data-screen-label="ecosystem">
          <div className="container">
            <div className="eco-hd" data-reveal>
              <div>
                <div className="eyebrow">What we offer</div>
                <h2 className="section-title">
                  Built for every part of the <em>advice journey</em>.
                </h2>
              </div>
              <p className="eco-framing">
                A connected ecosystem of software and services. The Padua Portal sits at the centre, with <em>Advice Services</em> and Standalone Products around it.
              </p>
            </div>

            <div className="eco-portal" data-reveal>
              <PortalVideoCard />
              <div className="eco-portal-body">
                <div className="eyebrow">{c.ecosystem.portal.eyebrow}</div>
                {c.ecosystem.portal.title && <h2 className="eco-portal-title">{c.ecosystem.portal.title}</h2>}
                <h3>{c.ecosystem.portal.h}</h3>
                <p>{c.ecosystem.portal.p}</p>
                <div className="eco-flow">
                  {c.ecosystem.portal.flow.map((chip, i) => (
                    <React.Fragment key={chip}>
                      <span className="eco-chip">{chip}</span>
                      {i < c.ecosystem.portal.flow.length - 1 && <span className="eco-arrow">→</span>}
                    </React.Fragment>
                  ))}
                </div>
                <a className="eco-cta" href="padua-portal.html">{c.ecosystem.portal.cta}</a>
              </div>
            </div>

            <div className="eco-tier-label" data-reveal>
              <div className="eyebrow">Advice Services</div>
            </div>
            <div className="eco-tier-grid" data-reveal>
              {c.ecosystem.services.map((s) => (
                <div className="eco-card" key={s.h}>
                  <h4>{s.h}</h4>
                  <p>{s.p}</p>
                  <a className="eco-cta" href={s.href || '#'}>Learn more</a>
                </div>
              ))}
            </div>

            <div className="eco-tier-label" data-reveal>
              <div className="eyebrow">Standalone Products</div>
            </div>
            <div className="eco-tier-grid" data-reveal>
              {c.ecosystem.standalone.map((s) => (
                <div className="eco-card" key={s.h}>
                  <h4>{s.h}</h4>
                  <p>{s.p}</p>
                  <a className="eco-cta" href={s.href || '#'}>Learn more</a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHAT OUR CLIENTS SAY */}
      {show.showProof && (
        <section className="s-paper" id="proof" data-screen-label="proof">
          <div className="container">
            <div data-reveal>
              <div className="eyebrow">What our clients say</div>
              <h2 className="section-title">{c.proof.title}</h2>
            </div>

            <div
              ref={quoteRef}
              className={`quote-card${quoteInView ? ' is-in-view' : ''}`}
            >
              <div className="quote-mark" aria-hidden="true">“</div>
              <div className="quote-stage" key={activeTestimonial}>
                <div className="quote-body">{c.proof.testimonials[activeTestimonial].quote}</div>
                <div className="quote-attribution">
                  <div>
                    <div className="quote-name">{c.proof.testimonials[activeTestimonial].name}</div>
                    <div className="quote-role">{c.proof.testimonials[activeTestimonial].role}</div>
                  </div>
                  <div className="quote-divider"></div>
                  <div className="quote-firm">{c.proof.testimonials[activeTestimonial].firm}</div>
                </div>
              </div>
              <div className="quote-nav" role="tablist">
                {c.proof.testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`quote-dot${i === activeTestimonial ? ' active' : ''}`}
                    onClick={() => setActiveTestimonial(i)}
                    aria-selected={i === activeTestimonial}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="logo-marquee-wrap">
            <div className="container" data-reveal>
              <div className="eyebrow">{c.proof.logosEyebrow}</div>
              <p className="logo-intro">{c.proof.logosIntro}</p>
            </div>
            <div className="logo-marquee">
              <div className="logo-track">
                {[...c.proof.logos, ...c.proof.logos].map((logo, i) => (
                  <img className="logo-img" key={i} src={logo.src} alt={logo.name} aria-hidden={i >= c.proof.logos.length} loading="lazy" />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <PaduaFooter />
    </>
  );
}

Object.assign(window, { DirectionA });
