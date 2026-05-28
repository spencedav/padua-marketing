// =======================================================
// PADUA, Contact page
// Just a hero + Brett's HubSpot calendar embed
// =======================================================

function ContactPage() {
  const [values, setTweak] = useTweaks(window.__PADUA_TWEAKS_DEFAULTS);
  return (
    <>
      <PaduaNav variant={values.navVariant} />
      <main className="contact-page">
        <section className="contact-hero" data-screen-label="contact-hero">
          <div className="container">
            <div className="contact-eyebrow">Talk to us</div>
            <h1 className="contact-h1">
              Book a time with <em>Brett.</em>
            </h1>
            <p className="contact-sub">
              Pick a slot that suits you. 30-minute call, tailored to your firm, platform or licensee. We&rsquo;ll come prepared.
            </p>
          </div>
        </section>
        <section className="contact-meetings" data-screen-label="meetings">
          <div className="container">
            {/* HubSpot Meetings Embed, Brett Canning */}
            <div className="meetings-iframe-container" data-src="https://meetings-ap1.hubspot.com/brett-canning?embed=true"></div>
          </div>
        </section>
      </main>
      <PaduaFooter />
      <TweaksPanel title="Contact page, tweaks">
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
root.render(<ContactPage />);
