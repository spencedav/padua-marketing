// =======================================================
// PADUA — Our people
// Board + Executive Leadership. PersonCard renders the real
// headshot from assets/ if `p.photo` is set, falling back to a
// coloured-initials tile if not. Keep the JSX faithful to the
// design export — only paths differ where filenames don't match
// exactly between the design folder and what shipped to assets/.
// =======================================================

const BOARD = [
  { name: "Peter O'Connell",  role: 'Chairman & Non-Executive Director',                                  initials: 'PO', accent: '#1e3a5f', photo: 'assets/peter-oconnell-web.png', photoStyle: { objectPosition: 'center 25%' } },
  { name: 'Matthew Esler',    role: 'Managing Director & CEO, Co-Founder',                                 initials: 'ME', accent: '#4a308c', photo: 'assets/matt-esler.png' },
  { name: 'Anne-Marie Esler', role: 'Non-Executive Director & Industry Engagement Lead, Co-Founder',       initials: 'AE', accent: '#ab2178', photo: 'assets/anne-marie-esler.png' },
  { name: 'Gareth Turner',    role: 'Executive Director - Finance',                                        initials: 'GT', accent: '#007282', photo: 'assets/gareth-turner.png' },
  { name: 'Matthew Sheehan',  role: 'Non-Executive Director',                                              initials: 'MS', accent: '#2d6e6e', photo: 'assets/matt-sheehan-web.png', photoStyle: { objectPosition: 'center 20%' } },
];

const LEADERSHIP = [
  { name: 'Rudy Haddad',      role: 'Head of Research, Data & Technical Advice', initials: 'RH', accent: '#eb2e4d', photo: 'assets/rudy-haddad-web.jpg', photoStyle: { objectPosition: 'center 20%' } },
  { name: 'Erin Egan',        role: 'Head of HyperCare',                         initials: 'EE', accent: '#c1255b', photo: 'assets/erin-egan-web.jpg' },
  { name: 'Helen Roelofsen',  role: 'Head of Advice Guidance',                   initials: 'HR', accent: '#d97d20', photo: 'assets/helen-roelofsen-web.png' },
  { name: 'Joshua Marley',    role: 'Head of Advice Generation',                 initials: 'JM', accent: '#6e2a8a', photo: 'assets/josh-marley-web.png' },
  { name: 'Brett Canning',    role: 'Head of Sales & Relationship Management',   initials: 'BC', accent: '#f59436', photo: 'assets/brett-canning.png', photoStyle: { objectFit: 'contain', objectPosition: 'center bottom', transform: 'scale(0.96) translateY(8%)', transformOrigin: 'center bottom' } },
  { name: 'Simon Dawe',       role: 'Delivery Executive',                        initials: 'SD', accent: '#008a93', photo: 'assets/simon-dawe.png', photoStyle: { objectFit: 'contain' } },
  { name: 'Amir Moghimi',     role: 'Virtual Chief Technology Officer',          initials: 'AM', accent: '#b88a1f', photo: 'assets/amir-moghimi.png', photoStyle: { objectFit: 'contain' } },
];

function PersonCard({ p }) {
  return (
    <div className="our-person">
      {p.photo ? (
        <div className="our-person-photo our-person-photo-img" style={{ background: '#e8e4dd' }}>
          <img src={p.photo} alt={p.name} style={p.photoStyle ? p.photoStyle : (p.crop ? { objectPosition: `center ${p.crop}` } : undefined)} />
        </div>
      ) : (
        <div className="our-person-photo" style={{ background: p.accent }}>
          <span>{p.initials}</span>
        </div>
      )}
      <div className="our-person-name">{p.name}</div>
      <div className="our-person-role">{p.role}</div>
    </div>
  );
}

function OurPeoplePage() {
  const [values, setTweak] = useTweaks(window.__PADUA_TWEAKS_DEFAULTS);
  return (
    <>
      <PaduaNav variant={values.navVariant} />
      <main className="about-page">
        <section className="our-people-hero" data-screen-label="people-hero">
          <div className="container">
            <div className="about-eyebrow">Our people</div>
            <h1 className="about-h1">
              The people behind <em>Padua.</em>
            </h1>
            <p className="about-hero-sub">
              We're proud to introduce you to some of our talented people.
            </p>
          </div>
        </section>
        <section className="our-people-grid-section" data-screen-label="board">
          <div className="container">
            <h2 className="our-people-h2">Our Board</h2>
            <div className="our-people-grid">
              {BOARD.map((p) => (<PersonCard key={p.name} p={p} />))}
            </div>
          </div>
        </section>
        <section className="our-people-grid-section our-people-grid-section-alt" data-screen-label="leadership">
          <div className="container">
            <h2 className="our-people-h2">Our Executive Leadership Team</h2>
            <div className="our-people-grid">
              {LEADERSHIP.map((p) => (<PersonCard key={p.name} p={p} />))}
            </div>
          </div>
        </section>
      </main>
      <PaduaFooter />
      <TweaksPanel title="Our people page, tweaks">
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
root.render(<OurPeoplePage />);
