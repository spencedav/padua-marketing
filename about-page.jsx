// =======================================================
// PADUA, Who we are
// One-page about: mission, values (EARS), why we exist, founders, offices
// =======================================================

const ABOUT_VALUES = [
  { letter: 'E', name: 'Empathy',    color: '#4a308c', body: 'We understand what advisers, licensees and their clients actually need, and we build for that.' },
  { letter: 'A', name: 'Agility',    color: '#ab2178', body: 'We move quickly without losing care. Better answers, faster turnarounds, continuous improvement.' },
  { letter: 'R', name: 'Reliability',color: '#f59436', body: 'Advice firms run on our work. We deliver on our SLAs, our compliance gates and our promises.' },
  { letter: 'S', name: 'Simplicity', color: '#eb2e4d', body: 'We strip friction out of the advice journey. Less complexity, more clarity for adviser and client.' },
];

function AboutHero() {
  return (
    <section className="about-hero" data-screen-label="about-hero">
      <div className="about-hero-bg" aria-hidden="true" />
      <div className="about-hero-scrim" aria-hidden="true" />
      <div className="container about-hero-inner">
        <div className="about-eyebrow">Our mission</div>
        <h1 className="about-h1">
          Empowering Advisers to build <em>stronger futures</em> for more Australians.
        </h1>
        <p className="about-hero-sub">
          Good advice helps Australians retire with confidence, protect their families, navigate uncertainty and make smarter decisions. The work advisers do is deeply important. At Padua, we exist to make more of it possible.
        </p>
      </div>
    </section>
  );
}

function AboutValues() {
  return (
    <section className="about-values" data-screen-label="values">
      <div className="container">
        <div className="about-section-head">
          <div className="eyebrow">Our values</div>
          <h2 className="section-title">EARS, the Padua Way.</h2>
          <p className="section-lede">Empathy. Agility. Reliability. Simplicity. <span className="padua-way">One way. Same way. Better way.</span> The values that shape who we hire, how we work and the standard we hold ourselves to.</p>
        </div>
        <div className="about-ears-wheel" role="img" aria-label="The EARS values as a circular river: Empathy, Agility, Reliability and Simplicity, the Padua Way (One way, Same way, Better way).">
          <EARSWheel />
        </div>
        <div className="about-values-grid">
          {ABOUT_VALUES.map((v) => (
            <div className="about-value" key={v.letter} style={{ '--value-color': v.color }}>
              <div className="about-value-letter">{v.letter}</div>
              <div className="about-value-name">{v.name}</div>
              <p className="about-value-body">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutBelief() {
  return (
    <section className="about-belief" data-screen-label="belief">
      <div className="container">
        <div className="about-section-head">
          <div className="eyebrow">Why we exist</div>
          <h2 className="section-title">Advice was never meant to feel like paperwork.</h2>
        </div>
        <div className="about-belief-grid">
          <div className="about-belief-text">
            <p>
              Demand for advice keeps rising. The supply of experienced advisers does not. Too many Australians who need quality advice can&rsquo;t access it; too many advisers are overwhelmed by administration, compliance and operational complexity.
            </p>
            <p>
              We don&rsquo;t believe the answer is replacing advisers. The answer is empowering them. More time with clients, less time in paperwork. More judgement, less re-keying. More relationships, less ticketing system.
            </p>
          </div>
          <figure className="about-quote">
            <blockquote>
              <p>&ldquo;80% of my business and the value I bring is driven by relationships and strategy. But 80% of my time is spent on administration, compliance and document flow.&rdquo;</p>
            </blockquote>
            <figcaption>An experienced Adviser, in conversation with Padua.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function AboutOffices() {
  return (
    <section className="about-offices" data-screen-label="offices">
      <div className="container">
        <div className="about-section-head">
          <div className="eyebrow">Where we work</div>
          <h2 className="section-title">Onshore. Two offices. One team.</h2>
        </div>
        <div className="about-offices-grid">
          <div className="about-office">
            <div className="about-office-tag">Head office</div>
            <div className="about-office-name">Sydney</div>
            <p>Our home base, close to the advice firms, licensees, platforms and super funds we partner with every day.</p>
          </div>
          <div className="about-office">
            <div className="about-office-tag">South Coast</div>
            <div className="about-office-name">Kiama</div>
            <p>Where much of our operations, technology and Advice Generation teams come together.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutCta() {
  return (
    <section className="about-cta" id="contact" data-screen-label="cta">
      <div className="container about-cta-inner">
        <h2 className="about-cta-title">
          Come and meet the team.
        </h2>
        <p className="about-cta-sub">A 30-minute conversation is the fastest way to see if Padua is the right partner for your firm.</p>
        <div className="about-cta-row">
          <a className="btn btn-cta-dark" href="Contact.html">Book a demo →</a>
          <a className="hero-link" href="Careers.html">See open roles</a>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  const [values, setTweak] = useTweaks(window.__PADUA_TWEAKS_DEFAULTS);
  return (
    <>
      <PaduaNav variant={values.navVariant} />
      <main className="about-page">
        <AboutHero />
        <AboutValues />
        <AboutBelief />
        <AboutOffices />
        <AboutCta />
      </main>
      <PaduaFooter />
      <TweaksPanel title="About page, tweaks">
        <TweakSection label="Top navigation">
          <TweakRadio
            label="Nav variant"
            value={values.navVariant}
            options={[
              { value: 'streams', label: '3 streams' },
              { value: 'grouped', label: 'Who we work with' },
            ]}
            onChange={(v) => setTweak('navVariant', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AboutPage />);
