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
  div296: 'Division 296.html',
  siaa: 'SIAA 2026.html',
  empowerher: 'CFS EmpowerHer.html',
};

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
          <a className="article-back" href="News & Insights.html">← All news &amp; insights</a>

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

      {next && (
        <nav className="article-next" aria-label="Keep reading">
          <a className="article-next-link" href={ARTICLE_HREF[a.next]}>
            <span className="article-next-label">next</span>
            <span className="article-next-title">{next.title}</span>
            <span className="article-next-arrow" aria-hidden="true">→</span>
          </a>
        </nav>
      )}

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
