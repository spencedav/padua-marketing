// =======================================================
// PADUA, Content listing app shell
// =======================================================
const CONTENT_DEFAULTS = window.__PADUA_TWEAKS_DEFAULTS;

function ContentApp() {
  const [values, setTweak] = useTweaks(CONTENT_DEFAULTS);
  return (
    <>
      <PaduaNav variant={values.navVariant} />
      <ContentPage />
      <PaduaFooter />
      <TweaksPanel title="Content page, tweaks">
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
root.render(<ContentApp />);
