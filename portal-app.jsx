// =======================================================
// PADUA PORTAL, App shell + Tweaks panel
// =======================================================

const PORTAL_DEFAULTS = window.__PADUA_TWEAKS_DEFAULTS;

function PortalApp() {
  const [values, setTweak] = useTweaks(PORTAL_DEFAULTS);

  return (
    <>
      <PaduaNav variant={values.navVariant} />
      <PortalPage values={values} />
      <PaduaFooter />

      <TweaksPanel title="Padua Portal, tweaks">
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

        <TweakSection label="Hero">
          <TweakRadio
            label="Layout"
            value={values.heroLayout}
            options={[
              { value: 'video-below', label: 'Video below' },
              { value: 'video-right', label: 'Video right' },
            ]}
            onChange={(v) => setTweak('heroLayout', v)}
          />
        </TweakSection>

        <TweakSection label="Modular components">
          <TweakRadio
            label="Layout"
            value={values.modulesLayout}
            options={[
              { value: 'stack', label: '3-up grid' },
              { value: 'rows', label: 'Alternating rows' },
            ]}
            onChange={(v) => setTweak('modulesLayout', v)}
          />
        </TweakSection>

        <TweakSection label="Sections, show / hide">
          <TweakToggle label="Hero" value={values.showHero} onChange={(v) => setTweak('showHero', v)} />
          <TweakToggle label="What it is" value={values.showWhat} onChange={(v) => setTweak('showWhat', v)} />
          <TweakToggle label="Benefits" value={values.showBenefits} onChange={(v) => setTweak('showBenefits', v)} />
          <TweakToggle label="Modular components" value={values.showModules} onChange={(v) => setTweak('showModules', v)} />
          <TweakToggle label="FAQ" value={values.showFaq} onChange={(v) => setTweak('showFaq', v)} />
          <TweakToggle label="CTA banner" value={values.showCta} onChange={(v) => setTweak('showCta', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PortalApp />);
