// =======================================================
// PADUA: Resource detail page (Whitepapers & Reports)
// One shared template, resource selected via window.__PADUA_RESOURCE.
// Matches the article-page layout (back link, eyebrow, title, meta),
// then a document hero (cover + download/preview) and a top-line summary.
// =======================================================

const RESOURCE_COPY = {
  budgetReport: {
    kind: 'report',
    title: 'Federal Budget 2026–27: Padua branded analysis',
    date: '13 May 2026',
    author: 'Rudy Haddad',
    cover: 'assets/federal-budget-cover.png',
    coverStyle: 'gradient',
    coverLabel: 'Padua · Analysis',
    coverTitle: 'Federal Budget 2026–27',
    coverByline: 'Rudy Haddad · 13 May 2026',
    file: 'assets/federal-budget-2026-27-branded.docx',
    downloadName: 'Padua — Federal Budget 2026-27 Analysis.docx',
    fileLabel: 'Download the report',
    standfirst: 'The 2026–27 Budget is a tax-reform Budget: negative gearing, capital gains tax and discretionary trusts all move at once, with grandfathering rules that make Budget night (7:30pm AEST 12 May 2026) a key date for client records.',
    summaryTitle: 'Top-line summary',
    summaryIntro: 'A Padua-branded walk-through of the measures advisers need to action, each clearly tagged as legislated or proposed so you know what already has the force of law.',
    points: [
      ['Capital gains tax overhaul (proposed)', 'The 50% CGT discount is replaced with CPI cost-base indexation plus a 30% minimum tax on real gains from 1 July 2027. SMSFs and complying super funds are excluded; the main residence exemption and small-business concessions are preserved.'],
      ['Negative gearing (proposed)', 'Established residential property bought after Budget night can only offset rental losses against other residential income from 1 July 2027. Existing holdings, new builds, SMSFs and build-to-rent are unaffected.'],
      ['Personal tax cuts (legislated)', 'The second-bracket rate falls from 16% to 15% on 1 July 2026, then to 14% on 1 July 2027.'],
      ['Division 296 (legislated)', 'An additional tax on super earnings on the portion of a total super balance above $3 million, with a second threshold at $10 million. Operative from 1 July 2026.'],
    ],
    next: 'budgetWhitepaper',
  },
  budgetWhitepaper: {
    kind: 'whitepaper',
    title: 'Federal Budget 2026–27: adviser whitepaper',
    date: '12 May 2026',
    author: 'Rudy Haddad',
    cover: 'assets/federal-budget-whitepaper-cover.png',
    coverStyle: 'paper',
    coverLabel: 'Padua · Whitepaper',
    coverTitle: 'Federal Budget 2026–27',
    coverSub: 'A practical guide for advisers and their clients',
    coverByline: 'Rudy Haddad · 12 May 2026',
    file: 'assets/federal-budget-2026-27-whitepaper.docx',
    downloadName: 'Padua — Federal Budget 2026-27 Whitepaper.docx',
    fileLabel: 'Download the whitepaper',
    standfirst: 'A practical, client-ready guide to the 2026–27 Budget for advisers and their clients, covering the same measures as our internal summary in language you can share.',
    summaryTitle: 'Top-line summary',
    summaryIntro: 'The shareable companion to our Budget analysis. It frames the headline changes for client conversations, with each measure marked legislated or proposed.',
    points: [
      ['Built for client conversations', 'The same Budget detail as our internal summary, written so you can hand it straight to clients or lift sections into review meetings.'],
      ['The four big moving parts', 'Capital gains tax, negative gearing, discretionary trusts and the continuing personal tax cuts, with the grandfathering dates that matter most.'],
      ['Legislated vs proposed', 'Every measure is tagged so clients understand what is already law and what is still subject to the legislative process.'],
    ],
    next: 'eofySuper',
  },
  eofySuper: {
    kind: 'whitepaper',
    title: 'EOFY superannuation strategies 2025–26',
    date: '21 Apr 2026',
    author: 'Rudy Haddad',
    cover: 'assets/eofy-super-cover.png',
    coverStyle: 'paper',
    coverLabel: 'Padua · Whitepaper',
    coverTitle: 'EOFY Super strategies 2025–26',
    coverSub: 'Practical superannuation tactics before 30 June',
    coverByline: 'Rudy Haddad · 21 Apr 2026',
    file: 'assets/eofy-super-strategies.pdf',
    downloadName: 'Padua — EOFY Super Strategies 2025-26.pdf',
    fileLabel: 'Download the guide (PDF)',
    standfirst: 'The end of the financial year is a critical time to review a client’s superannuation position. Contribution caps, pension obligations and a number of time-sensitive strategies must be actioned before 30 June.',
    summaryTitle: 'Top-line summary',
    summaryIntro: 'A practical, client-ready checklist of the superannuation moves worth reviewing before 30 June 2026.',
    points: [
      ['Concessional contributions', 'The cap is $30,000 for 2025–26, rising to $32,500 from 1 July 2026, so now is the time to review salary-sacrifice arrangements against the new cap and employer SG.'],
      ['Carry-forward — last chance', 'Unused concessional cap from 2020–21 expires on 30 June 2026. Where the total super balance was under $500,000 at 30 June 2025, this is the final year to use it.'],
      ['Personal deductible contributions', 'A Notice of Intent must be lodged with, and acknowledged by, the fund before lodging the return or commencing a pension. Those aged 67–74 must meet the work test.'],
      ['Couples & pensions', 'Contribution splitting can move up to 85% of concessional contributions to a spouse, alongside minimum pension drawdown obligations to check before year end.'],
    ],
    next: 'budgetReport',
  },
};

const RESOURCE = RESOURCE_COPY[window.__PADUA_RESOURCE] || RESOURCE_COPY.budgetReport;

const RESOURCE_HREF = {
  budgetReport: 'federal-budget-report.html',
  budgetWhitepaper: 'federal-budget-whitepaper.html',
  eofySuper: 'eofy-super-strategies.html',
};

function ResourcePage() {
  const r = RESOURCE;
  const next = RESOURCE_COPY[r.next];
  return (
    <main className="article-page">
      <article className="article">
        <div className="container article-inner">
          <a className="article-back" href="Resources.html">← All whitepapers &amp; reports</a>

          <div className="article-eyebrow">{r.kind}</div>
          <h1 className="article-h1">{r.title}</h1>
          <div className="article-date">{r.date}<span className="article-meta"> · {r.author}</span></div>

          <div className="resource-hero">
            <a className={`resource-cover resource-cover-${r.coverStyle}`} href={r.file} download={r.downloadName} aria-label={`Download ${r.title}`}>
              <span className="resource-cover-label">{r.coverLabel}</span>
              <span className="resource-cover-title">{r.coverTitle}</span>
              {r.coverSub && <span className="resource-cover-sub">{r.coverSub}</span>}
              <span className="resource-cover-byline">{r.coverByline}</span>
              <span className="resource-cover-hint">Click to download ↓</span>
            </a>
            <div className="resource-hero-side">
              <p className="resource-standfirst">{r.standfirst}</p>
              <a className="btn btn-spectrum resource-dl" href={r.file} download={r.downloadName}>{r.fileLabel} ↓</a>
            </div>
          </div>

          <section className="resource-summary">
            <h2 className="resource-summary-title">{r.summaryTitle}</h2>
            <p className="resource-summary-intro">{r.summaryIntro}</p>
            <ul className="resource-points">
              {r.points.map((p, i) => (
                <li className="resource-point" key={i}>
                  <span className="resource-point-h">{p[0]}</span>
                  <span className="resource-point-p">{p[1]}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>

      {next && (
        <nav className="article-next" aria-label="More resources">
          <a className="article-next-link" href={RESOURCE_HREF[r.next]}>
            <span className="article-next-label">next</span>
            <span className="article-next-title">{next.title}</span>
            <span className="article-next-arrow" aria-hidden="true">→</span>
          </a>
        </nav>
      )}
    </main>
  );
}

Object.assign(window, { ResourcePage });
