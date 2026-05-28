// =======================================================
// PADUA, Main app, Tweaks panel + direction switcher
// =======================================================

const DEFAULTS = window.__PADUA_TWEAKS_DEFAULTS;

function App() {
  const [values, setTweak] = useTweaks(DEFAULTS);

  // Keep body class in sync with direction tweak
  React.useEffect(() => {
    document.body.classList.toggle('dir-a', values.direction === 'a');
    document.body.classList.toggle('dir-b', values.direction === 'b');
  }, [values.direction]);

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
      {values.direction === 'a'
        ? <DirectionA show={show} navVariant={values.navVariant} />
        : <DirectionB show={show} navVariant={values.navVariant} />}

      {/* Direction switcher, always visible, persistent floating chip */}
      <div className="dir-switcher" role="tablist" aria-label="Design direction">
        <span className="dir-switcher-label">DIRECTION</span>
        <button
          className={`dir-switcher-btn${values.direction === 'a' ? ' active' : ''}`}
          onClick={() => setTweak('direction', 'a')}
          role="tab"
          aria-selected={values.direction === 'a'}
        >
          A · Editorial
        </button>
        <button
          className={`dir-switcher-btn${values.direction === 'b' ? ' active' : ''}`}
          onClick={() => setTweak('direction', 'b')}
          role="tab"
          aria-selected={values.direction === 'b'}
        >
          B · Modular
        </button>
      </div>

      {/* Tweaks panel, toggles via toolbar */}
      <TweaksPanel title="Padua tweaks">
        <TweakSection label="Direction">
          <TweakRadio
            label="Visual direction"
            value={values.direction}
            options={[
              { value: 'a', label: 'A · Editorial' },
              { value: 'b', label: 'B · Modular' },
            ]}
            onChange={(v) => setTweak('direction', v)}
          />
        </TweakSection>

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
          <TweakToggle label="Hero" value={values.showHero} onChange={(v) => setTweak('showHero', v)} />
          <TweakToggle label="Intro" value={values.showIntro} onChange={(v) => setTweak('showIntro', v)} />
          <TweakToggle label="About + EARS" value={values.showAbout} onChange={(v) => setTweak('showAbout', v)} />
          <TweakToggle label="Streams" value={values.showStreams} onChange={(v) => setTweak('showStreams', v)} />
          <TweakToggle label="Ecosystem" value={values.showEcosystem} onChange={(v) => setTweak('showEcosystem', v)} />
          <TweakToggle label="Proof / testimonials" value={values.showProof} onChange={(v) => setTweak('showProof', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
