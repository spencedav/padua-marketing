// =======================================================
// PADUA, Modular component pages app shell
// =======================================================

const MODULE_DEFAULTS = window.__PADUA_TWEAKS_DEFAULTS;

function ModuleApp() {
  const [values, setTweak] = useTweaks(MODULE_DEFAULTS);

  return (
    <>
      <PaduaNav variant={values.navVariant} />
      <ModulePage values={values} />
      <PaduaFooter />

      <TweaksPanel title="Module page, tweaks">
        {(MODULE_DEFAULTS && MODULE_DEFAULTS.steveaiArt !== undefined) && (
          <TweakSection label="SteveAI hero artwork">
            <TweakRadio
              label="Style"
              value={values.steveaiArt}
              options={[
                { value: 'orbs', label: 'Floating orbs' },
                { value: 'notes', label: 'File notes' },
              ]}
              onChange={(v) => setTweak('steveaiArt', v)}
            />
          </TweakSection>
        )}
        <TweakSection label="Sections, show / hide">
          <TweakToggle label="Hero" value={values.showHero} onChange={(v) => setTweak('showHero', v)} />
          <TweakToggle label="Video" value={values.showVideo} onChange={(v) => setTweak('showVideo', v)} />
          <TweakToggle label="What it does" value={values.showWhat} onChange={(v) => setTweak('showWhat', v)} />
          <TweakToggle label="How it works" value={values.showFlow} onChange={(v) => setTweak('showFlow', v)} />
          <TweakToggle label="Key features" value={values.showFeatures} onChange={(v) => setTweak('showFeatures', v)} />
          <TweakToggle label="Quotes" value={values.showQuotes} onChange={(v) => setTweak('showQuotes', v)} />
          <TweakToggle label="FAQ" value={values.showFaq} onChange={(v) => setTweak('showFaq', v)} />
          <TweakToggle label="CTA" value={values.showCta} onChange={(v) => setTweak('showCta', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ModuleApp />);
