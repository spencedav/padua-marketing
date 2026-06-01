// =======================================================
// PADUA: Article detail page (News & Insights)
// One shared template, article selected via window.__PADUA_ARTICLE
// Light-touch layout: back link, eyebrow, title, date, hero image,
// short body, and a single "next" link (low maintenance, no CTA).
// =======================================================

const ARTICLE_COPY = {
  div296: {
    kind: 'article',
    title: 'Division 296: a practical guide',
    date: '4 May 2026',
    meta: 'Financial Standard · Anne-Marie Esler & Rudy Haddad',
    image: 'assets/division-296.jpg',
    fit: 'contain',
    zoomable: true,
    standfirst: 'Padua co-founder Anne-Marie Esler and Rudy Haddad break down the new Division 296 tax for Financial Standard, what it is, who it affects, and how it is calculated.',
    body: [
      'Now law, Division 296 applies a new, additional tax on superannuation earnings for individuals with a total superannuation balance over $3 million. It sits on top of the existing 15% fund-level tax and is levied directly on the individual.',
      'The practical guide walks through total superannuation balance, how earnings are calculated, who is exempt, and what happens on death, with worked examples for balances over $3 million and over $10 million.',
    ],
    link: null,
    next: 'siaa',
  },
  siaa: {
    kind: 'event',
    title: 'Matt Esler at SIAA 2026',
    date: '19–20 May 2026 · Park Hyatt Melbourne',
    meta: 'SIAA 2026 · speaker spotlight',
    image: 'assets/siaa-matt-speaking.jpg',
    fit: 'cover',
    gallery: ['assets/siaa-matt-speaking-2.jpg', 'assets/siaa-panel.jpg'],
    standfirst: 'Padua Managing Director and CEO Matt Esler joined the speaker line-up at SIAA 2026.',
    body: [
      'SIAA 2026 was the annual conference of the Stockbrokers and Investment Advisers Association (SIAA), the leading event for Australia\u2019s stockbroking, investment advice and financial services profession.',
      'Matt spoke in the technology-enabled advice plenary, on how connected technology is reshaping the way advice is produced and delivered in Australia.',
    ],
    link: null,
    next: 'empowerher',
  },
  empowerher: {
    kind: 'event',
    title: 'Anne-Marie Esler at the CFS EmpowerHer Summit',
    date: '29 April – 1 May 2026 · Noosa',
    meta: 'CFS EmpowerHer Summit',
    image: 'assets/empowerher-noosa.png',
    fit: 'contain',
    standfirst: 'Padua co-founder Anne-Marie Esler joined the CFS EmpowerHer Summit in Noosa.',
    body: [
      'Anne-Marie spoke on AI, technology and the emerging client experience, and what the next wave of advice technology means for advisers and their clients.',
    ],
    link: null,
    next: 'div296',
  },
};

const ARTICLE = ARTICLE_COPY[window.__PADUA_ARTICLE] || ARTICLE_COPY.div296;

const ARTICLE_HREF = {
  div296: 'division-296.html',
  siaa: 'siaa-2026.html',
  empowerher: 'cfs-empowerher.html',
};

const FA_KIND_LABEL = {
  article: 'Article',
  event: 'Event',
  podcast: 'Podcast',
  webinar: 'Webinar',
  report: 'Report',
  whitepaper: 'Whitepaper',
};

function formatBridgedDateFA(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Normalise an ARTICLE_COPY entry into a related-card shape.
function featureToCard(key, entry) {
  return {
    title: entry.title,
    kind: entry.kind || 'article',
    date: entry.date || '',
    href: ARTICLE_HREF[key] || '#',
    excerpt: (entry.standfirst || '').slice(0, 140),
  };
}

// Normalise a bridged PADUA_ARTICLES entry into the same shape.
function bridgedToCard(a) {
  return {
    title: a.title,
    kind: a.kind || 'article',
    date: formatBridgedDateFA(a.date),
    href: '/news-insights/' + a.slug,
    excerpt: a.excerpt || '',
  };
}

// Bottom-of-page "Keep reading" — 3 related cards. Pool = the two
// other ARTICLE_COPY entries plus the bridged PADUA_ARTICLES (if
// articles.jsx is loaded). Prefer items with matching kind; fall
// back to fill 3 from the rest.
function FeatureArticleRelated() {
  const currentKey = window.__PADUA_ARTICLE;
  const others = Object.entries(ARTICLE_COPY)
    .filter(([key]) => key !== currentKey)
    .map(([key, entry]) => featureToCard(key, entry));
  const bridged = (typeof window !== 'undefined' && window.PADUA_ARTICLES)
    ? window.PADUA_ARTICLES.map(bridgedToCard)
    : [];
  const pool = [...others, ...bridged];
  if (!pool.length) return null;
  const currentKind = ARTICLE.kind || 'article';
  const sameKind = pool.filter((p) => p.kind === currentKind).slice(0, 3);
  const fill = pool.filter((p) => p.kind !== currentKind).slice(0, 3 - sameKind.length);
  const related = [...sameKind, ...fill].slice(0, 3);
  if (!related.length) return null;
  return (
    <section className="article-related" data-screen-label="article-related">
      <div className="container">
        <div className="article-related-head">
          <div className="eyebrow">Keep reading</div>
        </div>
        <div className="article-related-grid">
          {related.map((c) => (
            <a key={c.href} className="article-related-card" href={c.href}>
              <div className="article-related-meta">
                <span className="article-related-kind">{FA_KIND_LABEL[c.kind] || 'Insight'}</span>
                {c.date && <span className="article-related-date">{c.date}</span>}
              </div>
              <h3 className="article-related-title">{c.title}</h3>
              {c.excerpt && <p className="article-related-excerpt">{c.excerpt}</p>}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticlePage() {
  const a = ARTICLE;
  const next = ARTICLE_COPY[a.next];
  const [zoomed, setZoomed] = React.useState(false);
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setZoomed(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <main className="article-page">
      <article className="article">
        <div className="container article-inner">
          <a className="article-back" href="news-insights.html">← All news &amp; insights</a>

          <div className="article-eyebrow">{a.kind}</div>
          <h1 className="article-h1">{a.title}</h1>
          <div className="article-date">{a.date}{a.meta ? <span className="article-meta"> · {a.meta}</span> : null}</div>

          <div
            className={`article-hero article-hero-${a.fit}${a.zoomable ? ' is-zoomable' : ''}`}
            onClick={a.zoomable ? () => setZoomed(true) : undefined}
          >
            <img src={a.image} alt={a.title} />
            {a.zoomable && <span className="article-zoom-hint">click to zoom</span>}
          </div>

          {a.standfirst && <p className="article-standfirst">{a.standfirst}</p>}
          {a.body && a.body.map((p, i) => <p className="article-body" key={i}>{p}</p>)}

          {a.gallery && (
            <div className="article-gallery">
              {a.gallery.map((src, i) => (
                <img key={i} src={src} alt={a.title} loading="lazy" />
              ))}
            </div>
          )}

          {a.link && (
            <a className="article-link" href={a.link.href} target="_blank" rel="noopener">{a.link.label} →</a>
          )}
        </div>
      </article>

      <FeatureArticleRelated />

      {a.zoomable && zoomed && (
        <div className="article-lightbox" onClick={() => setZoomed(false)} role="dialog" aria-label={a.title}>
          <img src={a.image} alt={a.title} />
          <button className="article-lightbox-close" aria-label="Close" onClick={() => setZoomed(false)}>×</button>
        </div>
      )}
    </main>
  );
}

Object.assign(window, { ArticlePage });
