// =======================================================
// PADUA, Resource detail app shell
// =======================================================
const RESOURCE_DEFAULTS = window.__PADUA_TWEAKS_DEFAULTS;

function ResourceApp() {
  const [values, setTweak] = useTweaks(RESOURCE_DEFAULTS);
  return (
    <>
      <PaduaNav variant={values.navVariant} />
      <ResourcePage />
      <PaduaFooter />
      <TweaksPanel title="Resource page, tweaks">
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
root.render(<ResourceApp />);
