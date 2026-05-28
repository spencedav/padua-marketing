// =======================================================
// PADUA, Main app
// Renders the editorial homepage (Direction A). The dual-direction
// system (A=editorial vs B=modular) was a pre-launch design-review
// tool — the modular direction was retired before launch and the
// dir-switcher UI removed with it.
// =======================================================

const DEFAULTS = window.__PADUA_TWEAKS_DEFAULTS;

function App() {
  const [values, setTweak] = useTweaks(DEFAULTS);

  const show = {
    showHero: values.showHero,
    showIntro: values.showIntro,
    showAbout: values.showAbout,
    showStreams: values.showStreams,
    showEcosystem: values.showEcosystem,
    showProof: values.showProof,
  };

  return (
    <>
      <DirectionA show={show} navVariant={values.navVariant} />

      {/* Tweaks panel, gated by edit-mode host, used in dev only.
          Lets the team toggle nav variant or hide sections without
          a redeploy. Invisible in production. */}
      <TweaksPanel title="Padua tweaks">
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

        <TweakSection label="Sections, show / hide">
          <TweakToggle label="Hero"                  value={values.showHero}      onChange={(v) => setTweak('showHero', v)} />
          <TweakToggle label="Intro"                 value={values.showIntro}     onChange={(v) => setTweak('showIntro', v)} />
          <TweakToggle label="About + EARS"          value={values.showAbout}     onChange={(v) => setTweak('showAbout', v)} />
          <TweakToggle label="Streams"               value={values.showStreams}   onChange={(v) => setTweak('showStreams', v)} />
          <TweakToggle label="Ecosystem"             value={values.showEcosystem} onChange={(v) => setTweak('showEcosystem', v)} />
          <TweakToggle label="Proof / testimonials"  value={values.showProof}     onChange={(v) => setTweak('showProof', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
