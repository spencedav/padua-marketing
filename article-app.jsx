// =======================================================
// PADUA, Article page app shell
// Tiny wrapper that mounts <PaduaNav/> + <ArticlePage/> + <PaduaFooter/>
// with the shared Tweaks panel. One instance per news-insights/{slug}.html.
// =======================================================

const ARTICLE_DEFAULTS = window.__PADUA_TWEAKS_DEFAULTS;

function ArticleApp() {
  const [values] = useTweaks(ARTICLE_DEFAULTS);
  return (
    <>
      <PaduaNav variant={values.navVariant} />
      <ArticlePage />
      <PaduaFooter />
      <TweaksPanel title="Article page, tweaks">
        {/* No article-specific tweaks today — host the panel for consistency
            with the rest of the site so editors can flip nav variants here. */}
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ArticleApp />);
