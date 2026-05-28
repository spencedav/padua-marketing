// =======================================================
// DIRECTION B, MODULAR SUNSET
// =======================================================

function DirectionB({ show, navVariant }) {
  const c = PADUA_CONTENT;
  const [activeTestimonial, setActiveTestimonial] = React.useState(0);

  return (
    <>
      <PaduaNav variant={navVariant} />

      {/* HERO */}
      {show.showHero && (
        <div className="hero-wrap" data-screen-label="hero">
          <section className="hero">
            <div className="hero-status">
              <div className="hero-status-left">
                <span><span className="hero-status-dot"></span>LIVE · v5.1</span>
                <span>EST. 2014</span>
                <span>SYDNEY · KIAMA</span>
              </div>
              <div>ISO 27001 · 100% ONSHORE</div>
            </div>

            <div className="hero-inner">
              <div className="hero-text">
                <h1>
                  Empowering advisers to build <em>stronger futures</em> for more Australians.
                </h1>
                <p className="hero-sub">
                  Through the <strong>Padua Advice Platform</strong>. A connected suite of software and services purpose-built for the Australian advice industry.
                </p>
                <div className="hero-cta-row">
                  <a className="btn btn-spectrum" href="#contact">Book a demo →</a>
                  <a className="hero-link" href="#watch">Watch the 2-minute video</a>
                </div>
              </div>

              <HeroCarousel pillars={c.pillars} />
            </div>
          </section>
        </div>
      )}

      {/* INTRO */}
      {show.showIntro && (
        <section className="intro s-paper" data-screen-label="intro">
          <div className="intro-inner">
            <div>
              <h2>
                The demand for <em>quality advice</em> has never been greater.
              </h2>
            </div>
            <div className="intro-body">
              <p>{c.intro.p1}</p>
              <p>{c.intro.p2}</p>
            </div>
          </div>
        </section>
      )}

      {/* ABOUT */}
      {show.showAbout && (
        <section className="s-warm" id="about" data-screen-label="about">
          <div className="container">
            <div className="about-grid">
              <div className="about-content">
                <div className="eyebrow">Who we are</div>
                <h2 className="section-title">{c.about.title}</h2>
                <p>{c.about.p1}</p>
                <p>{c.about.p2}</p>
                <div className="about-meta">
                  {c.about.meta.map((m) => (
                    <div className="about-meta-item" key={m.l}>
                      <div className="l">{m.l}</div>
                      <div className="v">{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="about-wheel">
                <EARSWheel />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WHO WE WORK WITH (Streams) */}
      {show.showStreams && (
        <section className="s-paper" data-screen-label="streams">
          <div className="container">
            <div className="streams-head">
              <div>
                <div className="eyebrow">Who we work with</div>
                <h2 className="section-title">{c.streams.title}</h2>
                <p className="section-lede">{c.streams.lede}</p>
              </div>
            </div>

            <div className="streams-panel">
              {c.streams.items.map((s) => (
                <a
                  key={s.h}
                  href={s.href || '#'}
                  className={`stream${s.featured ? ' stream-featured' : ''}`}
                >
                  <div className="stream-tag">{s.tag}</div>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                  <div className="stream-link">{s.cta}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ECOSYSTEM */}
      {show.showEcosystem && (
        <section className="s-ink" id="watch" data-screen-label="ecosystem">
          <div className="container">
            <div className="eco-hd">
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

            <div className="eco-portal">
              <PortalVideoCard />
              <div className="eco-portal-body">
                <div className="eyebrow">{c.ecosystem.portal.eyebrow}</div>
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
                <a className="eco-cta" href="#">{c.ecosystem.portal.cta}</a>
              </div>
            </div>

            <div className="eco-tier-label">
              <div className="eyebrow">Advice Services</div>
            </div>
            <div className="eco-tier-grid">
              {c.ecosystem.services.map((s) => (
                <div className="eco-card" key={s.h}>
                  <h4>{s.h}</h4>
                  <p>{s.p}</p>
                  <a className="eco-cta" href={s.href || '#'}>Learn more</a>
                </div>
              ))}
            </div>

            <div className="eco-tier-label">
              <div className="eyebrow">Standalone Products</div>
            </div>
            <div className="eco-tier-grid">
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
        <section className="s-warm" id="proof" data-screen-label="proof">
          <div className="container">
            <div className="eyebrow">{c.proof.eyebrow}</div>
            <h2 className="section-title">{c.proof.title}</h2>

            <div className="quote-grid">
              <div className="quote-card">
                <div className="quote-mark">“</div>
                <div className="quote-body">{c.proof.testimonials[activeTestimonial].quote}</div>
                <div className="quote-attribution">
                  <div className="quote-avatar">
                    {c.proof.testimonials[activeTestimonial].name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="quote-name">{c.proof.testimonials[activeTestimonial].name}</div>
                    <div className="quote-role">{c.proof.testimonials[activeTestimonial].role}</div>
                  </div>
                </div>
                <div className="quote-nav">
                  <span className="quote-nav-pager">
                    {String(activeTestimonial + 1).padStart(2, '0')} / {String(c.proof.testimonials.length).padStart(2, '0')}
                  </span>
                  {c.proof.testimonials.map((_, i) => (
                    <button
                      key={i}
                      className={`quote-dot${i === activeTestimonial ? ' active' : ''}`}
                      onClick={() => setActiveTestimonial(i)}
                      aria-label={`Testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="quote-firm-block">
                <div className="quote-firm-eyebrow">Client firm</div>
                <div className="quote-firm-name">{c.proof.testimonials[activeTestimonial].firm}</div>
                <div className="quote-firm-meta">
                  <span>Adviser support, end-to-end</span>
                  <span>Integrated with internal systems</span>
                  <span>Onshore delivery</span>
                </div>
              </div>
            </div>
          </div>

          <div className="logo-marquee-wrap">
            <div className="container">
              <div className="logo-intro">{c.proof.logosEyebrow}</div>
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

Object.assign(window, { DirectionB });

