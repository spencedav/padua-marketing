// =======================================================
// PADUA: Content listing page (News & Insights, Resources)
// One shared template, content selected via window.__PADUA_CONTENT
// =======================================================

const CONTENT_COPY_BY_KEY = {
  news: {
    title: 'News & Insights',
    intro: 'Articles, podcasts, events and conference moments from across the Padua team and our partners in the Australian advice industry.',
    items: [
      { kind: 'article',  title: 'Division 296: A practical guide',                                              href: 'https://www.financialstandard.com.au/', date: '4 May 2026', image: 'assets/division-296.jpg', source: 'Financial Standard', authors: 'Anne-Marie Esler & Rudy Haddad' },
      { kind: 'event',    title: 'Matt Esler speaks at SIAA 2026: the technology-enabled advice plenary',     href: 'https://www.linkedin.com/company/3641071/', date: '20 May 2026', image: 'assets/siaa2026-matt.jpg', source: 'SIAA Conference', authors: 'Park Hyatt Melbourne' },
      { kind: 'event',    title: 'Anne-Marie Esler on AI, Tech and the Emerging Client Experience',            href: 'https://www.linkedin.com/company/3641071/', date: '29 Apr – 1 May 2026', image: 'assets/empowerher-noosa.png', source: 'CFS EmpowerHer Summit', authors: 'Noosa' },
      { kind: 'podcast',  title: 'Unlocking the potential of your CRM with Matt Esler',                        href: '#', date: '' },
      { kind: 'article',  title: 'Given the tools, advisers recommend more diverse strategies',                href: '#', date: '' },
      { kind: 'article',  title: 'Achieving the unattainable triangle of advice generation: quality, time & value', href: '#', date: '' },
      { kind: 'article',  title: 'Perspective on long-term investing: questioning the \u2018time in\u2019 the market axiom', href: '#', date: '' },
      { kind: 'article',  title: 'The role of research houses in the advice process',                          href: '#', date: '' },
    ],
  },
  resources: {
    title: 'Whitepapers & Reports',
    intro: 'Federal Budget analysis, practical tax guides, market commentary and downloadable reports from across the Padua team.',
    items: [
      { kind: 'report', title: 'Federal Budget 2026–27: Padua branded analysis', href: 'assets/federal-budget-2026-27-branded.docx', date: '13 May 2026', authors: 'Rudy Haddad', image: 'assets/federal-budget-cover.png' },
      { kind: 'whitepaper', title: 'Federal Budget 2026–27: adviser whitepaper', href: 'assets/federal-budget-2026-27-whitepaper.docx', date: '12 May 2026', authors: 'Rudy Haddad', image: 'assets/federal-budget-whitepaper-cover.png' },
      { kind: 'whitepaper', title: 'EOFY superannuation strategies 2025–26', href: 'assets/eofy-super-strategies.pdf', date: '21 Apr 2026', authors: 'Rudy Haddad', image: 'assets/eofy-super-cover.png' },
      { kind: 'report',     title: 'Report placeholder',    href: '#', date: '' },
      { kind: 'report',     title: 'Report placeholder',    href: '#', date: '' },
      { kind: 'report',     title: 'Report placeholder',    href: '#', date: '' },
      { kind: 'whitepaper', title: 'Whitepaper placeholder', href: '#', date: '' },
    ],
  },
};

const CONTENT = CONTENT_COPY_BY_KEY[window.__PADUA_CONTENT || 'news'] || CONTENT_COPY_BY_KEY.news;

function ContentHero() {
  return (
    <section className="content-hero" data-screen-label="content-hero">
      <div className="container">
        <h1 className="content-h1">{CONTENT.title}</h1>
        {CONTENT.intro && <p className="content-intro">{CONTENT.intro}</p>}
      </div>
    </section>
  );
}

// Placeholder thumbnail: gradient based on item index so the grid reads as
// "real" until the user drops in actual cover images.
function ContentThumb({ index, kind }) {
  const palettes = [
    ['#1a1525', '#2a1a52', '#4a308c'],
    ['#7a2a3e', '#c1255b', '#e3712c'],
    ['#003e48', '#007282', '#008a93'],
    ['#fffdf8', '#faf6ee', '#f1ede4'],
    ['#5a3d10', '#d97d20', '#f5d534'],
    ['#4a0a1a', '#eb2e4d', '#f59436'],
    ['#003e48', '#007282', '#3a9aa8'],
    ['#3a1538', '#8a2068', '#c1255b'],
  ];
  const p = palettes[index % palettes.length];
  const isLight = index === 3;
  return (
    <div
      className={`content-thumb${isLight ? ' is-light' : ''}`}
      style={{
        background: `linear-gradient(135deg, ${p[0]} 0%, ${p[1]} 60%, ${p[2]} 100%)`,
      }}
      aria-hidden="true"
    >
      {kind && <span className="content-thumb-tag">{kind}</span>}
    </div>
  );
}

function ContentGrid() {
  const items = CONTENT.items || [];
  const [activeKind, setActiveKind] = React.useState('all');
  const [query, setQuery] = React.useState('');

  // Build chip definitions from the kinds actually present in the items
  const kinds = React.useMemo(() => {
    const counts = items.reduce((acc, it) => {
      const k = it.kind || 'other';
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});
    const order = ['article', 'podcast', 'event', 'webinar', 'report', 'whitepaper', 'other'];
    const labels = {
      article: 'Articles',
      podcast: 'Podcasts',
      event: 'Events',
      webinar: 'Webinars',
      report: 'Reports',
      whitepaper: 'Whitepapers',
      other: 'Other',
    };
    return order
      .filter((k) => counts[k])
      .map((k) => ({ key: k, label: labels[k], count: counts[k] }));
  }, [items]);

  // Filtered list
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (activeKind !== 'all' && it.kind !== activeKind) return false;
      if (!q) return true;
      const hay = `${it.title || ''} ${it.authors || ''} ${it.source || ''}`.toLowerCase();
      return hay.includes(q);
    });
  }, [items, activeKind, query]);

  const totalCount = items.length;
  const onClear = () => { setActiveKind('all'); setQuery(''); };

  return (
    <section className="content-grid-section" data-screen-label="content-grid">
      <div className="container">

        {/* Filter bar, chips on the left, search on the right */}
        <div className="content-filters" role="toolbar" aria-label="Filter content">
          <div className="content-chips" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeKind === 'all'}
              className={`content-chip${activeKind === 'all' ? ' is-active' : ''}`}
              onClick={() => setActiveKind('all')}
            >
              All <span className="content-chip-count">{totalCount}</span>
            </button>
            {kinds.map((k) => (
              <button
                type="button"
                role="tab"
                key={k.key}
                aria-selected={activeKind === k.key}
                className={`content-chip${activeKind === k.key ? ' is-active' : ''}`}
                onClick={() => setActiveKind(k.key)}
              >
                {k.label} <span className="content-chip-count">{k.count}</span>
              </button>
            ))}
          </div>
          <div className="content-search">
            <svg className="content-search-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="7" cy="7" r="5.2" fill="none" stroke="currentColor" strokeWidth="1.6"/>
              <line x1="11" y1="11" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            <input
              type="search"
              placeholder="Search by title, author, source…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search content"
            />
            {query && (
              <button type="button" className="content-search-clear" onClick={() => setQuery('')} aria-label="Clear search">×</button>
            )}
          </div>
        </div>

        <div className="content-grid">
          {filtered.map((it, i) => (
            <a key={`${it.title}-${i}`} href={it.href || '#'} className="content-card" target={it.href && it.href.startsWith('http') ? '_blank' : undefined} rel={it.href && it.href.startsWith('http') ? 'noopener' : undefined}>
              {it.image ? (
                <div className="content-thumb content-thumb-image">
                  <img src={it.image} alt="" />
                  {it.kind && <span className="content-thumb-tag">{it.kind}</span>}
                </div>
              ) : (
                <ContentThumb index={i} kind={it.kind} />
              )}
              <div className="content-card-body">
                <div className="content-card-meta">
                  {it.source && <span className="content-card-source">{it.source}</span>}
                  {it.date && <span className="content-card-date">{it.date}</span>}
                </div>
                <h3 className="content-card-title">{it.title}</h3>
                {it.authors && <span className="content-card-authors">{it.authors}</span>}
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && items.length > 0 && (
          <div className="content-empty-state">
            <p className="content-empty">No matches. Adjust your filter or search.</p>
            <button type="button" className="content-clear-btn" onClick={onClear}>Clear filters</button>
          </div>
        )}
        {items.length === 0 && (
          <p className="content-empty">More coming soon. Check back here regularly.</p>
        )}
      </div>
    </section>
  );
}

function ContentPage() {
  return (
    <main className="content-page">
      <ContentHero />
      <ContentGrid />
    </main>
  );
}

Object.assign(window, { ContentPage });
