// =======================================================
// PADUA, Article detail page
// Renders a single news/insight/podcast/report article from the
// PADUA_ARTICLES_BY_SLUG lookup built in articles.jsx. Which article
// to render is set by the host HTML via window.__PADUA_ARTICLE.
// =======================================================

const ARTICLE_SLUG = (typeof window !== 'undefined' && window.__PADUA_ARTICLE) || null;
const ARTICLE = (typeof window !== 'undefined' && window.PADUA_ARTICLES_BY_SLUG && window.PADUA_ARTICLES_BY_SLUG[ARTICLE_SLUG]) || null;

// Format an ISO date into "5 May 2025" — same convention as the listing page.
function formatArticleDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Map our `kind` enum to a friendly label used in the eyebrow.
const KIND_LABEL = {
  article: 'Article',
  podcast: 'Podcast',
  event: 'Event',
  webinar: 'Webinar',
  report: 'Report',
  whitepaper: 'Whitepaper',
};

function ArticleHero() {
  if (!ARTICLE) return null;
  const kindLabel = KIND_LABEL[ARTICLE.kind] || 'Insight';
  return (
    <section className="article-hero" data-screen-label="article-hero">
      <div className="container">
        <a className="article-back" href="/News%20%26%20Insights">
          <span aria-hidden="true">←</span> All news &amp; insights
        </a>
        <div className="article-eyebrow">{kindLabel}</div>
        <h1 className="article-title">{ARTICLE.title}</h1>
        <div className="article-meta">
          {ARTICLE.date && <time dateTime={ARTICLE.date}>{formatArticleDate(ARTICLE.date)}</time>}
          {ARTICLE.author && <span className="article-meta-author">{ARTICLE.author}</span>}
          {ARTICLE.source && <span className="article-meta-source">{ARTICLE.source}</span>}
        </div>
      </div>
    </section>
  );
}

function ArticleHeroImage() {
  if (!ARTICLE || !ARTICLE.hero_image_url) return null;
  return (
    <div className="article-hero-image">
      <div className="container">
        <img src={ARTICLE.hero_image_url} alt="" loading="eager" />
      </div>
    </div>
  );
}

function ArticleBody() {
  if (!ARTICLE) return null;
  return (
    <section className="article-body" data-screen-label="article-body">
      <div className="container">
        <div
          className="article-prose"
          dangerouslySetInnerHTML={{ __html: ARTICLE.body_html || '<p>(No content available.)</p>' }}
        />
      </div>
    </section>
  );
}

// Three related articles: same kind first, then by date, excluding self.
function ArticleRelated() {
  if (!ARTICLE || !window.PADUA_ARTICLES) return null;
  const all = window.PADUA_ARTICLES.filter((a) => a.slug !== ARTICLE.slug);
  const sameKind = all.filter((a) => a.kind === ARTICLE.kind).slice(0, 3);
  const fill = all.filter((a) => a.kind !== ARTICLE.kind).slice(0, 3 - sameKind.length);
  const related = [...sameKind, ...fill].slice(0, 3);
  if (!related.length) return null;
  return (
    <section className="article-related" data-screen-label="article-related">
      <div className="container">
        <div className="article-related-head">
          <div className="eyebrow">Keep reading</div>
        </div>
        <div className="article-related-grid">
          {related.map((a) => (
            <a key={a.slug} className="article-related-card" href={`/news-insights/${a.slug}`}>
              <div className="article-related-meta">
                <span className="article-related-kind">{KIND_LABEL[a.kind] || 'Insight'}</span>
                {a.date && <span className="article-related-date">{formatArticleDate(a.date)}</span>}
              </div>
              <h3 className="article-related-title">{a.title}</h3>
              {a.excerpt && <p className="article-related-excerpt">{a.excerpt}</p>}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticleCta() {
  return (
    <section className="article-cta" data-screen-label="article-cta">
      <div className="container">
        <h2 className="article-cta-title">Want to see how Padua works in your firm?</h2>
        <p className="article-cta-sub">A 30-minute conversation is the fastest way to see if we&rsquo;re the right partner.</p>
        <a className="btn btn-cta-dark" href="/Contact">Book a demo →</a>
      </div>
    </section>
  );
}

function ArticleNotFound() {
  return (
    <section className="article-hero" data-screen-label="article-missing">
      <div className="container">
        <a className="article-back" href="/News%20%26%20Insights">
          <span aria-hidden="true">←</span> All news &amp; insights
        </a>
        <div className="article-eyebrow">Not found</div>
        <h1 className="article-title">We couldn&rsquo;t find that article.</h1>
        <p className="article-missing-p">
          It may have been moved or renamed. Browse the full list to find what you were looking for.
        </p>
      </div>
    </section>
  );
}

function ArticlePage() {
  if (!ARTICLE) {
    return (
      <main className="article-page">
        <ArticleNotFound />
      </main>
    );
  }
  return (
    <main className="article-page">
      <ArticleHero />
      <ArticleHeroImage />
      <ArticleBody />
      <ArticleRelated />
      <ArticleCta />
    </main>
  );
}

Object.assign(window, { ArticlePage });
