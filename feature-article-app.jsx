// =======================================================
// PADUA, Article detail app shell
// =======================================================
const ARTICLE_DEFAULTS = window.__PADUA_TWEAKS_DEFAULTS;

function ArticleApp() {
  const [values, setTweak] = useTweaks(ARTICLE_DEFAULTS);
  return (
    <>
      <PaduaNav variant={values.navVariant} />
      <ArticlePage />
      <PaduaFooter />
      <TweaksPanel title="Article page, tweaks">
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
root.render(<ArticleApp />);
