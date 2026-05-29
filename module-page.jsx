// =======================================================
// PADUA, Modular component product pages
// One template, three modules (SteveAI · WealthX · WealthReview)
// Module is selected at runtime via window.__PADUA_MODULE
// =======================================================

// Tiny utility, scroll reveal on intersection
function useModuleReveal(threshold = 0.18) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return undefined;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            obs.disconnect();
          }
        });
      },
      { threshold }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, seen];
}

// Per-module copy. Same structural keys across all three so the template
// renders consistently, change the copy without touching layout.
const MODULE_COPY_BY_KEY = {
  steveai: {
    key: 'steveai',
    accent: 'discover',           // purple
    accentName: 'SteveAI',
    productName: 'SteveAI',
    productTagline: 'The AI assistant for advice.',
    eyebrow: 'Modular component · Inside Padua Portal',
    intro: 'An AI assistant that runs the advice journey alongside your team. SteveAI records meetings, builds the fact find, hosts the advice guidance and presents the advice. Always there, always learning.',
    cta_demo: 'Book a SteveAI demo',
    cta_portal: 'See SteveAI inside the Portal',

    what: {
      eyebrow: 'What it does',
      lead: 'SteveAI is the advice assistant that never misses a meeting. It listens, captures, prompts and presents, freeing your advisers to focus on the conversation, not the keyboard.',
      cols: [
        { stat: '24/7', label: 'Always-on advice assistant', p: 'Available at every client interaction across the Portal workflow.' },
        { stat: '100%', label: 'Captured & transcribed', p: 'Every meeting recorded, transcribed and turned into a structured file note.' },
        { stat: 'AI', label: 'Proactive, not passive', p: 'SteveAI prompts clients for missing information instead of waiting to be asked.' },
      ],
    },

    flow: {
      eyebrow: 'How it works',
      title: 'A continuous presence across the advice journey.',
      sub: 'SteveAI stays with the client at every stage of the Portal workflow.',
      steps: [
        { n: '01', h: 'Discovery', p: 'Records the initial client conversation, transcribes it and structures the data into your fact-find templates.' },
        { n: '02', h: 'Advice guidance', p: 'Hosts the advice guidance session, captures clarifications and prompts for any information that\u2019s still missing.' },
        { n: '03', h: 'Advice generation', p: 'Feeds clean structured data into the Advice Optimiser and SOA generation, accelerating drafting without skipping detail.' },
        { n: '04', h: 'Advice presentation', p: 'Presents the advice with the client at the final meeting, then carries forward into review.' },
      ],
    },

    features: {
      eyebrow: 'What SteveAI does for you',
      title: 'Built for the way advice actually gets made.',
      items: [
        { h: 'Meeting recording & transcription', p: 'Captures every meeting verbatim, time-coded and searchable.' },
        { h: 'Auto-generated file notes', p: 'Turns the transcript into a structured file note aligned to your firm\u2019s template.' },
        { h: 'Proactive client prompts', p: 'Notices gaps in the fact find and asks the client, directly, on their terms.' },
        { h: 'Lives inside the Portal', p: 'A persistent assistant across discovery, advice guidance, advice generation and presentation.' },
        { h: 'Tone-of-voice aware', p: 'Learns your firm\u2019s language so file notes and advice text sound like you wrote them.' },
        { h: 'Audit-friendly', p: 'Full conversation transcripts and structured notes make every advice file audit-ready.' },
      ],
    },

    faq: {
      eyebrow: 'Frequently asked',
      title: 'Questions advisers ask about SteveAI.',
      items: [
        { q: 'Is SteveAI replacing my paraplanner?', a: 'No. SteveAI accelerates the work that sits around the meeting, recording, transcription, file notes, structured data capture. Your paraplanners and advisers stay in the loop on every advice decision.' },
        { q: 'Where does the audio go?', a: 'All recordings, transcripts and file notes are stored onshore in Australia, inside an ISO 27001 certified environment, governed by the Portal\u2019s standard compliance controls.' },
        { q: 'Can clients opt out of recording?', a: 'Yes. Consent is captured at the start of every session and the meeting can run with transcription disabled if the client prefers.' },
        { q: 'Can I use SteveAI without the rest of the Portal?', a: 'Yes. SteveAI is available as a standalone module for non-Padua advisers who want to extend their existing workflow.' },
      ],
    },
  },

  wealthx: {
    key: 'wealthx',
    accent: 'teal',
    accentName: 'WealthX',
    productName: 'WealthX',
    productTagline: 'Open banking, built for advice.',
    eyebrow: 'Modular component · Inside Padua Portal',
    intro: 'Verified client income, expenses, balances and mortgage data, pulled straight from the bank. Your fact find starts with the truth, not a guess.',
    press: { label: 'As featured on', outlet: '9News Money', detail: 'Channel 9\u2019s Money program' },
    video: {
      src: 'assets/wealthx-launch.mp4',
      caption: 'The Padua \u00d7 WealthX launch announcement',
      length: 'Launch video',
    },
    cta_demo: 'Book a WealthX demo',
    cta_portal: 'See WealthX inside the Portal',

    what: {
      eyebrow: 'What it does',
      lead: 'Padua WealthX is an open banking solution for advisers and their clients. A free cashflow mobile app for clients, with verified cashflow, property and mortgage data flowing into the Padua Advice Platform through Australia\u2019s Consumer Data Right framework.',
      cols: [
        { stat: '15-30 min', label: 'Saved per client, per fact find', p: 'Less time entering data by hand, more time on the conversation.' },
        { stat: '$1,500+', label: 'Saved per month, per practice', p: 'For many advice firms, the time saved translates to over $1,500 in monthly savings.' },
        { stat: 'CDR', label: 'Accredited open banking', p: 'Built on Australia\u2019s Consumer Data Right, with verified data flowing directly from the client\u2019s bank.' },
      ],
    },

    flow: {
      eyebrow: 'How it works',
      title: 'Verified client data, straight from the bank.',
      sub: 'A clean, consented open-banking flow embedded inside the Padua Advice Platform.',
      steps: [
        { n: '01', h: 'Client consent', p: 'The client authorises Padua WealthX through Australia\u2019s accredited Consumer Data Right framework, with full transparency on what\u2019s shared.' },
        { n: '02', h: 'Verified data in', p: 'Cashflow, income, expenses, property valuations and mortgage data flow directly from the bank, automatically categorised.' },
        { n: '03', h: 'Into the fact find', p: 'Verified, categorised data lands in the Padua fact find with no re-keying and no guesswork.' },
        { n: '04', h: 'Always live', p: 'Bank feeds keep modelling, WealthReview and ongoing review current between meetings, not stale at the anniversary.' },
      ],
    },

    features: {
      eyebrow: 'How WealthX shows up in your day',
      title: 'Designed for Australian advice.',
      items: [
        { h: 'Accredited open banking', p: 'Built on Australia\u2019s Consumer Data Right framework. Open banking, not data scraping.' },
        { h: 'Categorised income & expenses', p: 'Every transaction automatically and perfectly categorised, ready for modelling.' },
        { h: 'Property & mortgage data', p: 'Real-time property valuations and mortgage information for stronger advice inputs.' },
        { h: 'Free client cashflow app', p: 'Clients get a free mobile cashflow app, deepening engagement between reviews.' },
        { h: 'Embedded in the Portal', p: 'Data flows straight into Padua\u2019s fact find, modelling and WealthReview modules.' },
        { h: 'Consent transparency', p: 'Clients can see, manage and revoke access at any time, from inside the Portal.' },
      ],
    },

    faq: {
      eyebrow: 'Frequently asked',
      title: 'Questions advisers ask about WealthX.',
      items: [
        { q: 'Is this safe for clients?', a: 'Yes. Padua WealthX uses Australia\u2019s accredited Consumer Data Right (open banking) framework. Clients explicitly consent, can scope what\u2019s shared and revoke access at any time. It\u2019s open banking, not data scraping.' },
        { q: 'What data does it actually pull?', a: 'Categorised income and expenses, account balances, property valuations and mortgage information, all flowing directly from the bank in real time.' },
        { q: 'What does it cost?', a: 'Minimum $50 per adviser per month for access to 50 clients, then $1 per client thereafter. Priced to make open banking accessible for every advice firm. For comparison (ex GST): WealthX $1 per client monthly with a $50 minimum; Moneysoft $10 per client monthly with a $200 minimum; MyProsperity $14.95 per client monthly with a $1,500 minimum. Annual cost at 500 clients: WealthX $6,000, Moneysoft $60,000, MyProsperity $89,700.' },
        { q: 'Can we use it without the rest of the Portal?', a: 'Yes. Padua WealthX runs standalone for advice firms outside the Padua Advice Platform. Slot it into your existing systems or use the full Portal end-to-end.' },
      ],
    },
    quotes: {
      eyebrow: 'What partners are saying',
      title: 'On the Padua \u00d7 WealthX partnership.',
      items: [
        {
          lead: 'This integration creates the foundation for the advice platform of tomorrow, one where advice, not a product, is at the centre, supported by unified data, seamless workflow, and intelligent automation.',
          body: 'The ability to merge planning and broking into a single source of truth accelerates outcomes and fundamentally shifts how services are delivered. The overwhelming support in our capital raise speaks volumes: the market sees this vision and is responding with confidence.',
          name: 'Matthew Esler',
          role: 'CEO of Padua Solutions',
        },
        {
          lead: 'Planners and brokers already maintain tight referral relationships and many practices already include both services. This integration allows them to truly operate as one, with data flowing between systems, reducing handovers, speeding up decisions, and delivering a significantly enhanced client experience.',
          body: 'It\u2019s a game-changer that aligns perfectly with industry direction.',
          name: 'Clint Howen',
          role: 'Co-founder of WealthX',
        },
        {
          lead: 'This partnership is emblematic of where the industry is headed, towards more connected, efficient, and advice-centric ecosystems.',
          body: 'Integrating planning and broking at the system level changes the competitive landscape, and that is precisely why we continue backing Padua\u2019s vision.',
          name: 'Matthew Sheehan',
          role: 'Investment Director at Acorn Capital and Director of Padua Solutions',
        },
      ],
    },
  },

  wealthreview: {
    key: 'wealthreview',
    accent: 'review',
    accentName: 'WealthReview',
    productName: 'WealthReview',
    productTagline: 'Make client reviews count.',
    eyebrow: 'Modular component · Inside Padua Portal',
    intro: 'A smarter way to review and manage your clients\u2019 financial position. WealthReview brings every dimension of a client\u2019s wealth into one engaging, structured view, so reviews are more productive for both you and your clients.',
    cta_demo: 'Explore WealthReview',
    cta_portal: 'See WealthReview inside the Portal',

    what: {
      eyebrow: 'What it does',
      lead: 'Client reviews shouldn\u2019t be time-consuming or hard to bring to life. WealthReview turns the annual review pack into a living, branded dashboard. Built on your existing fact-find data, so reviews start ready, not blank.',
      cols: [
        { stat: '1 view', label: 'Everything in one place', p: 'Family, entities, goals, cashflow, capital, retirement, protection and portfolio in a single structured dashboard.' },
        { stat: 'Less', label: 'Admin and rework', p: 'Pre-populated from your existing Padua fact-find data, so every review starts ready, not blank.' },
        { stat: 'Yours', label: 'Personalised branding', p: 'Personalised to reflect your business and client experience across every touchpoint.' },
      ],
    },

    flow: {
      eyebrow: 'How it works',
      title: 'A smarter way to run client reviews.',
      sub: 'Built on the data you already have, structured for the conversations that matter.',
      steps: [
        { n: '01', h: 'Built on your data', p: 'Pulls directly from your existing Padua Discover fact-find, so the dashboard is populated from day one.' },
        { n: '02', h: 'One holistic view', p: 'Family, goals, cashflow, capital, retirement, protection, portfolio and asset allocation, all in one place.' },
        { n: '03', h: 'Productive meetings', p: 'Structured cards keep the review conversation focused on what matters most for each client.' },
        { n: '04', h: 'Branded for your business', p: 'Personalised branding reflects your firm or platform across every adviser and client interaction.' },
      ],
    },

    features: {
      eyebrow: 'Inside the dashboard',
      title: 'Every dimension of wealth, in one structured view.',
      items: [
        { h: 'Family & entities', p: 'Clients, dependants and entities organised into one clear dashboard view.' },
        { h: 'Goals & objectives', p: 'Visualise progress against each client goal, retirement, lifestyle, property and beyond.' },
        { h: 'Cashflow & capital', p: 'Income, expenses, net cashflow, assets and liabilities surfaced at a glance.' },
        { h: 'Retirement & protection', p: 'Super, income, asset and protection coverage all in one snapshot.' },
        { h: 'Portfolio & allocation', p: 'Portfolio value, net flows, returns, growth, income and asset allocation, cleanly summarised.' },
        { h: 'Personalised branding', p: 'White-labelled to reflect your firm or platform across every touchpoint.' },
      ],
    },

    faq: {
      eyebrow: 'Frequently asked',
      title: 'Questions advisers ask about WealthReview.',
      items: [
        { q: 'What data does WealthReview use?', a: 'WealthReview is built on your existing Padua Discover fact-find data, so client information flows in automatically. With WealthX layered on top, bank feeds and platform data keep balances live between reviews.' },
        { q: 'Can we brand it for our firm or platform?', a: 'Yes. WealthReview is personalised by default, reflecting your business across colours, typography and copy. For platforms and super funds, we white-label across both adviser and member experiences.' },
        { q: 'What does the dashboard actually show?', a: 'Family, entities, goals, cashflow, capital, retirement, protection, portfolio snapshot and asset allocation, every dimension of a client\u2019s wealth in one structured view.' },
        { q: 'Can we use it without the rest of the Portal?', a: 'Yes. WealthReview can run standalone for non-Padua advisers, fed by Discover fact-find data or by an external data feed of your choosing.' },
      ],
    },
  },

  paraplanning: {
    key: 'paraplanning',
    accent: 'magenta',
    accentName: 'Paraplanning',
    productName: 'Paraplanning',
    productTagline: 'Australian-based advice experts.',
    eyebrow: 'Advice services · Paraplanning',
    intro: 'Paraplanning and advice generation by an onshore Australian team. Experienced advice guides, paraplanners and quality assurance specialists, supported by Padua technology on every file.',
    panelImage: 'assets/paraplanner-2.jpg',
    triangle: true,
    cta_demo: 'Find out more',
    cta_portal: 'See paraplanning inside the Portal',

    what: {
      eyebrow: 'The Padua advantage',
      lead: 'The triangle most paraplanners say is unattainable. Better quality, better turnaround and better value, at the same time. Not just one or two.',
      cols: [
        { stat: 'Better', label: 'Quality', p: 'Experienced advice guides and paraplanners applying Australian best practice on every file.' },
        { stat: 'Better', label: 'Turnaround', p: 'Average turnaround of 5 business days, with unparalleled visibility on where every file is in production.' },
        { stat: 'Better', label: 'Value', p: 'Lower total cost per advice than in-house teams, traditional outsourcers or tech-only platforms.' },
      ],
    },

    flow: {
      eyebrow: 'Our four value drivers',
      title: 'Time, cost, quality and engagement.',
      sub: 'The four levers Padua pulls to make advice better. The language is lifted directly from the proposal so the conversation stays consistent.',
      steps: [
        { n: '01', h: 'Time', p: 'Reducing the time to generate advice. Both our turnaround and the time advisers save on their side via advice guides, integrations and digital fact-finds.' },
        { n: '02', h: 'Cost', p: 'Lowering the cost of advice production through technology leverage and operational scale.' },
        { n: '03', h: 'Quality', p: 'Improving advice quality and compliance, with quality assurance gates built into every file.' },
        { n: '04', h: 'Engagement', p: 'Enhancing client engagement through consistent, timely delivery and personalised supporting content.' },
      ],
    },

    features: {
      eyebrow: 'The team behind every file',
      title: 'A dedicated team of Australian advice experts.',
      items: [
        { h: 'Advice Guides', p: 'Your dedicated specialist who navigates the journey alongside you, from initial strategy conversation through to final sign-off.' },
        { h: 'Quality Assurance team', p: 'Quality assurance specialists who pre-vet every file at three stage gates before it reaches your adviser.' },
        { h: 'Paraplanners', p: 'A bench of intermediate and senior paraplanners drafting advice against your firm\u2019s templates and tone of voice.' },
        { h: 'Relationship Management', p: 'A dedicated relationship manager owning the commercial side, with regular reporting and continuous improvement.' },
        { h: 'Data, Research & Technical Advice', p: 'Specialists keeping you abreast of the latest regulatory, tax and technical developments.' },
        { h: 'Technology & Cyber Security', p: 'An Australian engineering team protecting your client data with ISO 27001-certified infrastructure.' },
      ],
    },

    quotes: {
      eyebrow: 'In their own words',
      title: 'Why this matters.',
      items: [
        {
          lead: 'Padua met every commitment that Matthew made, but what really impressed us was that our Advisers were being tested technically and strategically by the skill of Padua\u2019s Paraplanners.',
          body: 'The SOAs along with the actual advice we were able to provide to our clients was enhanced.',
          name: 'Jason Harwood',
          role: 'Director & CEO, Lifewealth Group',
        },
        {
          lead: 'The Padua staff are professional, friendly and always available to make the document production process as seamless and enjoyable as possible.',
          body: 'Invest Blue wholeheartedly recommends Padua Solutions to any other financial planning businesses looking for exceptional, precise and prompt advice document production services.',
          name: 'Nick Stannard',
          role: 'Head of Advice & Compliance, Invest Blue',
        },
      ],
    },

    everest: {
      eyebrow: 'An entire support system',
      title: 'Behind every Advice Guide, an entire team.',
      lead: 'Behind every successful Everest ascent sits an enormous support infrastructure. Support climbers fixing ropes and ladders, logistics teams moving equipment, route planners studying conditions, camps prepared in advance and operational teams coordinating every stage. The climber interacts most directly with their guide, but the success of the journey depends on a much broader ecosystem working behind the scenes.',
      outro: 'Padua operates the same way. While the Advice Guide forms the primary relationship with you, they are supported by extensive operational and technology infrastructure across our firm.',
      support: [
        'Advice Generation teams',
        'Research capability',
        'Advice Enablement specialists',
        'Workflow & operational support',
        'Advanced technology platforms',
        'AI initiatives (SteveAI and beyond)',
        'Continuous efficiency programmes',
      ],
    },

    faq: {
      eyebrow: 'Frequently asked',
      title: 'Questions advisers ask about Padua paraplanning.',
      items: [
        { q: 'How does the Advice Guide work?', a: 'Your Advice Guide is your single point of accountability across the whole journey. They take the initial 5\u201310 minute strategy conversation, coordinate the file through Padua\u2019s operational infrastructure and advice generation teams, and personally perform the final quality assurance review on the SOA. Same person, start to finish.' },
        { q: 'What\u2019s the typical turnaround?', a: 'Average turnaround across the year is approximately 5 business days. You get unparalleled visibility on where your file is in production, so you can confidently schedule follow-up meetings and maintain momentum with clients.' },
        { q: 'How does compliance work?', a: 'Two named stage gates sit inside every file. Padua AQA (Advice Quality Assurance) runs three times during file prep, identifying gaps and inconsistencies in advice documents, reducing admin rework, improving advice construction standards and supporting consistent quality. Padua RAFA (Regulatory Advice File Audit) then runs a full ASIC and AFCA-aligned audit before the advice reaches the client, and again after implementation, giving licensees and compliance teams confidence. Every file is audit-ready by default.' },
        { q: 'Will the SOAs match our firm\u2019s style?', a: 'Yes. We configure the team to your templates, tone of voice and quality standards before any file goes live. Most firms can\u2019t tell internal from Padua-drafted advice once we\u2019re settled in.' },
        { q: 'What is the impact on adviser capacity?', a: 'Firms using Padua paraplanning are already seeing meaningful uplifts in advice throughput and revenue, often materially improving adviser productivity. The aim is not just cheaper documents, it\u2019s unlocking adviser capacity to see more clients and operate at their highest value.' },
        { q: 'How is Padua different from traditional paraplanning outsourcers?', a: 'Traditional outsourcers typically mean longer turnaround, inconsistent compliance and one-size-fits-all templates. Padua is 100% onshore, Australian-based, configured to your templates and tone of voice, with quality assurance built into every advice file.' },
      ],
    },
  },

  transition: {
    key: 'transition',
    accent: 'amber',
    accentName: 'Transition management',
    productName: 'Transition Management',
    productTagline: 'Ready. Set. Go.',
    eyebrow: 'Advice services · Transition management',
    intro: 'Take the hassle out of transitioning your clients\u2019 investments, consolidating platforms, and purchasing or selling a book. Our technology creates the efficiency and scalability; our team project-manages the entire transition for you.',
    cta_demo: 'Book a transition demo',
    cta_portal: '',
    chartFlourishId: '21548567',
    chartCaption: 'Sample, Fee comparison across in-scope platforms',

    what: {
      eyebrow: 'Book Analysis Services',
      lead: 'Before anything moves, the Padua team analyses every client account in the book. We prepare a structured workbook using platform and portfolio data, covering account details, key assumptions, fee comparisons, transition considerations and client-level indicators. The result is a clear, data-backed view of the book before implementation planning begins.',
      cols: [
        { stat: 'On\u00a0your\u00a0mark', label: 'Fee comparison', p: 'A platform fee comparison in $ and %, existing platforms versus the recommended scenario. Cost and benefit enhancements made obvious.' },
        { stat: 'Ready', label: 'Analysis', p: 'A detailed account-by-account analysis: existing versus recommended, tax impact and CRM data gaps, summarised in interactive charts.' },
        { stat: 'Insights', label: 'Decision-ready', p: 'Transition effectiveness insights handed to your advisers as visualisations, not spreadsheets.' },
      ],
    },

    flow: {
      eyebrow: 'Transition Management Services',
      title: 'Ready. Set. Go.',
      sub: 'A framework that takes a transition from analysis through to implementation with no advice downtime.',
      steps: [
        { n: '01', h: 'On your mark, Fee comparison', p: 'A clear $ and % comparison of existing platforms and investments versus the recommended scenario. The conversation starts with real numbers.' },
        { n: '02', h: 'Ready, Analysis', p: 'Account-by-account analysis, tax impact and CRM gap identification, summarised in interactive dashboards your advisers can actually use.' },
        { n: '03', h: 'Set, Engagement', p: 'Placeholder. The Set / engagement section is being refreshed, final language pending from Brett.' },
        { n: '04', h: 'Go, Implementation', p: 'We produce the implementation pack for each client, SOA, applications and transition documentation. We integrate with your CRM to push back into the client folder, and you monitor progress on a dashboard.' },
      ],
    },

    features: {
      eyebrow: 'What every transition customer gets',
      title: 'Less adviser effort. Faster ROI. Better client experience.',
      items: [
        { h: 'Fee comparison upfront', p: 'A clear dollar and percent comparison of existing versus recommended, so the advice firm starts with real numbers.' },
        { h: 'Interactive analysis dashboards', p: 'Per-client and per-book transition effectiveness, summarised in charts and graphs rather than spreadsheets.' },
        { h: 'Implementation packs', p: 'A complete set of SOA, product research and implementation support prepared for every client by the Padua team.' },
        { h: 'CRM integration', p: 'We push completed advice and implementation documentation back into the client folder, where the integration is supported.' },
        { h: 'Dashboard progress view', p: 'A user-friendly, dashboard-style view of every transition across the book. Advisers and licensees always know where things stand.' },
        { h: 'Project-managed end-to-end', p: 'A dedicated Australian transition lead runs the work from On Your Mark through to Go-Live.' },
      ],
    },

    faq: {
      eyebrow: 'Frequently asked',
      title: 'Questions firms ask about transition management.',
      items: [
        { q: 'What does the fee comparison cover?', a: 'A side-by-side $ and % comparison of existing platforms and investments against the recommended scenario, across every client in scope. It identifies cost and benefit enhancements from moving platform or investment strategy.' },
        { q: 'What does the Ready / Analysis stage produce?', a: 'A detailed analysis of each client account, existing platform and investments versus any recommended scenario, highlighting specific tax and other impacts of transitioning, plus CRM and portfolio data gaps. Delivered as interactive charts and graphs.' },
        { q: 'How does Go / Implementation work?', a: 'We produce the implementation pack for each client (SOA, applications, transition documentation), push completed work back into your CRM where the integration is supported, and give you a dashboard view of progress across the entire book.' },
        { q: 'Will there be advice downtime?', a: 'No. We run the analysis, engagement and implementation in parallel with your existing workflow. Advice keeps going while the transition is delivered.' },
        { q: 'Who owns the project?', a: 'A dedicated Padua transition lead. Australian-based, accountable end-to-end, from On Your Mark through Go-Live.' },
      ],
    },
  },

  wealthdata: {
    key: 'wealthdata',
    accent: 'navy',
    accentName: 'WealthData',
    productName: 'WealthData',
    productTagline: 'The source of truth on Australia\u2019s financial advice market.',
    eyebrow: 'Software \u00b7 Standalone',
    intro: 'Adviser movement data, licensee benchmarking and superannuation insights, drawn weekly from ASIC\u2019s Financial Adviser Register. Trusted by licensees, platforms, super funds and product providers across the country.',
    cta_demo: 'Subscribe',
    cta_portal: '',
    person: {
      name: 'Colin Williams',
      role: 'WealthData founder',
      photo: 'assets/colin-williams.jpg',
      email: 'colin.williams@paduasolutions.com',
      cta: 'Talk to Colin',
    },

    what: {
      eyebrow: 'What it does',
      lead: 'Professional research, data and consulting for businesses operating in wealth and financial advice. Three core offerings, all built on the most complete view of the Australian advice market.',
      cols: [
        { stat: 'Movement', label: 'Adviser & skills benchmarking', p: 'Broad-based and tailored reports that licensees, platforms and product providers use for strategic planning, board updates and stakeholder reporting.' },
        { stat: 'Listings', label: 'AFSL and licensee data', p: 'A comprehensive list of every Financial Advice Licensee in Australia, with core benchmarking data, key contacts, and filtering by licensee, state, postcode and our proprietary star-rating system.' },
        { stat: 'Consulting', label: 'Professional consulting', p: 'Over 30 years of experience across every corner of wealth and financial advice, available for events, advice conferences, training days and strategic engagements.' },
      ],
    },

    flow: {
      eyebrow: 'How it works',
      title: 'From ASIC register to strategic insight.',
      sub: 'Weekly cadence, decision-ready.',
      steps: [
        { n: '01', h: 'ASIC Financial Adviser Register', p: 'Every week, WealthData pulls the latest data from ASIC\u2019s Financial Adviser Register, the single source of truth for who is licensed to provide personal advice in Australia.' },
        { n: '02', h: 'Clean, enrich, benchmark', p: 'Raw register data is cleaned, deduplicated and enriched with licensee structure, peer-group classifications and skills benchmarks. Star ratings make advisers comparable like-for-like.' },
        { n: '03', h: 'Weekly dashboards and reports', p: 'Subscribers access weekly dashboards through the Members Lounge, plus tailored reports built to brief. Free dashboards also publish openly for adviser movement, client segmentation, super and SMSF stats.' },
        { n: '04', h: 'Strategic consulting on demand', p: 'When the data raises a question, Colin is available for 45-minute consultations, board briefings, conference speaking and bespoke project work.' },
      ],
    },

    features: {
      eyebrow: 'What\u2019s in the platform',
      title: 'Three layers, one weekly cadence.',
      items: [
        { h: 'Adviser movement data', p: 'Track every adviser movement across the Australian profession, refreshed weekly from ASIC.' },
        { h: 'Licensee benchmarking', p: 'Compare your licensee against the full national network or selected peer groups across size, growth and skills mix.' },
        { h: 'AFSL listings', p: 'Comprehensive Financial Advice Licensee directory with key contacts, filterable by state, postcode and star rating.' },
        { h: 'Super & SMSF stats', p: 'Free public dashboards for super fund stats, SMSF stats and client segmentation insights.' },
        { h: 'Members Lounge / Blue Book', p: 'Subscriber-only access to deeper data, historical movement trends and tailored reports on request.' },
        { h: 'Professional consulting', p: 'Colin Williams works directly with clients on tailored research, board reports, strategic planning and conference speaking.' },
      ],
    },

    faq: {
      eyebrow: 'Frequently asked',
      title: 'Questions about WealthData.',
      items: [
        { q: 'What data sits behind WealthData?', a: 'Every dataset starts with ASIC\u2019s Financial Adviser Register, refreshed weekly. We layer on licensee structure, peer-group classifications, skills benchmarks and our proprietary star ratings to make the data usable for strategic decisions, not just compliance.' },
        { q: 'Who uses WealthData?', a: 'Licensees, dealer groups, platforms, super funds, investment managers, insurance companies and adviser service providers. Anyone whose business depends on understanding where advisers sit, how they move and what\u2019s changing across the profession.' },
        { q: 'What\u2019s included with a subscription?', a: 'Full access to the Members Lounge and Blue Book: weekly dashboards, complete AFSL and adviser listings, benchmarking data, and historical movement trends. Plus the option to request tailored reports.' },
        { q: 'Can I see WealthData before subscribing?', a: 'Yes. Several dashboards are free and publicly available, including the Adviser Weekly Dashboard, Client Segmentation Tool, Super Fund Stats and SMSF Statistics. The blog publishes a free weekly market insight every Thursday.' },
        { q: 'Do you do custom reports and consulting?', a: 'Yes. Colin Williams works directly with clients on tailored research, board reports, strategic planning sessions and conference speaking. Book a 45-minute introductory call to scope what you need.' },
        { q: 'Is WealthData part of Padua?', a: 'Yes. WealthData is a trading name of Padua Financial Group, and powers the data layer behind several Padua products including adviser targeting, market sizing and competitive benchmarking.' },
      ],
    },
  },

  wealthai: {
    key: 'wealthai',
    accent: 'gold',
    accentName: 'WealthAI',
    productName: 'WealthAI',
    productTagline: 'Personalised video for every client.',
    eyebrow: 'Software · Inside the Padua Portal & standalone',
    intro: 'Autonomous AI video and voice-over for advice documents, member statements and investment fund information. A market-first in client engagement that turns every SOA into something clients actually watch.',
    cta_demo: 'Book a WealthAI demo',
    cta_portal: 'See WealthAI inside the Portal',

    what: {
      eyebrow: 'What it does',
      lead: 'WealthAI takes the advice document and turns it into a personalised video and PowerPoint pack. Every client sees a version made for them, in language they understand.',
      cols: [
        { stat: 'Video', label: 'Personalised SOAs & member statements', p: 'AI-generated video for every advice document. Same advice, infinitely more engaging.' },
        { stat: 'Slides', label: 'Personalised presentations', p: 'Branded PowerPoint packs that go with the SOA and the conversation, generated automatically.' },
        { stat: 'Reach', label: 'Maximised understanding', p: 'Clients can replay the advice in their own time. Better comprehension, better engagement, better outcomes.' },
      ],
    },

    flow: {
      eyebrow: 'How it works',
      title: 'From advice document to personalised video.',
      sub: 'Same source data. Different delivery.',
      steps: [
        { n: '01', h: 'Source from the advice file', p: 'WealthAI reads the SOA, member statement or fund report directly from the Padua Portal or your existing system.' },
        { n: '02', h: 'Personalise per client', p: 'Names, goals, numbers and recommendations all dynamically inserted into the video and PowerPoint pack.' },
        { n: '03', h: 'AI voice & visuals', p: 'A consistent on-brand voice walks the client through the advice, with charts and visuals timed to the narration.' },
        { n: '04', h: 'Delivered ready to share', p: 'Output lands back in your workflow, ready to send to the client via WealthReview, email or your portal.' },
      ],
    },

    features: {
      eyebrow: 'Why it matters',
      title: 'A market-first in client engagement.',
      items: [
        { h: 'Personalised video SOAs', p: 'Every Statement of Advice gets a personalised video that walks the client through the strategy.' },
        { h: 'Personalised member statements', p: 'For super funds and platforms: annual or quarterly statements as a personalised video, not a PDF nobody opens.' },
        { h: 'Personalised PowerPoint packs', p: 'Branded slide decks that mirror the video, ready for in-person presentations.' },
        { h: 'Market-first engagement', p: 'No other Australian advice platform delivers personalised video at this scale. A differentiator for licensees, platforms and super funds.' },
        { h: 'Client accessibility', p: 'Clients can replay, share and revisit the advice at their own pace. Especially valuable for elderly clients and EAL audiences.' },
        { h: 'White-label brand', p: 'Configured to your firm or platform brand across voice, visuals, intro and outro.' },
      ],
    },

    faq: {
      eyebrow: 'Frequently asked',
      title: 'Questions about WealthAI.',
      items: [
        { q: 'What kind of documents does WealthAI work with?', a: 'Statements of Advice, member statements (for super funds and platforms), investment fund reports and any other client-facing advice or product document. We read the source, personalise per client, and output a video plus matching PowerPoint pack.' },
        { q: 'How is the video personalised?', a: 'Client names, goals, balances, recommendations and projected outcomes are dynamically inserted into the script, the visuals and the on-screen text. Every client sees a version made for them.' },
        { q: 'Whose voice is in the video?', a: 'A consistent on-brand AI voice configured to your firm or platform. We can also support specific voice profiles for licensees who want a recognisable narrator.' },
        { q: 'Can we white-label it?', a: 'Yes. Branding, colours, intro/outro, music and voice are all configurable to your firm or platform. WealthAI sits inside your client experience, not Padua\u2019s.' },
        { q: 'Can it run without the rest of the Padua Portal?', a: 'Yes. WealthAI runs standalone alongside your existing advice workflow, or as a fully integrated component of the Padua Portal.' },
        { q: 'Is it secure?', a: 'Yes. Onshore Australian infrastructure, ISO 27001 certified, with the same compliance posture as the rest of the Padua platform.' },
      ],
    },
  },

  careers: {
    key: 'careers',
    accent: 'forest',
    accentName: 'Careers',
    productName: 'Careers at Padua',
    productTagline: 'Help redefine Australian financial advice.',
    eyebrow: 'Join the team',
    intro: 'We\u2019re building the platform behind better advice for more Australians. A 100% onshore team of paraplanners, advice guides, engineers and operations specialists across Sydney and Kiama.',
    panelImage: 'assets/kiama-landscape.jpg',
    cta_demo: '',
    cta_portal: '',
    person: {
      name: 'Padua people and culture',
      role: 'We read every email',
      initials: 'PC',
      email: 'peopleandculture@paduasolutions.com',
      cta: 'Email people and culture',
    },

    what: {
      eyebrow: 'Why Padua',
      lead: 'A team that takes its work seriously. Onshore, deliberate about advice quality, with more than 13 years shipping real product into a regulated profession.',
      cols: [
        { stat: 'On a mission', label: 'Better advice for more Australians', p: 'Every product we build, every Advice Guide we hire, every line of code we ship is in service of advisers helping more clients well.' },
        { stat: '13 years', label: 'Shipping real product', p: 'More than 13 years building and refining the technology that sits behind better advice for Australians.' },
        { stat: 'EARS', label: 'Values that anchor the work', p: 'Empathy, Agility, Reliability and Simplicity. Our values shape who we hire, how we work and the standard we hold ourselves to.' },
      ],
    },

    flow: {
      eyebrow: 'How we work',
      title: 'A place to do your best work.',
      sub: 'How we think about the everyday at Padua.',
      steps: [
        { n: '01', h: 'Hybrid by default', p: 'Sydney and Kiama offices with flexibility around how and where you work. We come together for the moments that matter.' },
        { n: '02', h: 'Craft over speed', p: 'We hire for judgement and care. We move fast, but never at the expense of advice quality or client trust.' },
        { n: '03', h: 'Continuous improvement', p: 'Quarterly cycles, structured retros, time set aside to deepen craft. People grow careers here, not just job titles.' },
        { n: '04', h: 'Long-term partners', p: 'Many of our team have been at Padua for 5+ years. We invest in people for the long haul.' },
      ],
    },

    features: {
      eyebrow: 'What we offer',
      title: 'The package.',
      items: [
        { h: 'Competitive remuneration', p: 'Market-rate salary, employee participation programme and performance bonuses tied to company outcomes.' },
        { h: 'Hybrid working', p: 'Sydney or Kiama base, flexible hours, work-from-home days, family-friendly arrangements.' },
        { h: 'Professional development', p: 'Funded study, conference attendance, certifications and dedicated learning time each quarter.' },
        { h: 'Wellbeing support', p: 'Employee Assistance Programme, mental-health days, generous paid leave and parental leave provisions.' },
        { h: 'Onshore career path', p: 'Promotion tracks across advice guidance, paraplanning, engineering, product, operations and leadership.' },
        { h: 'A real mission', p: 'Work that makes Australian financial advice more accessible, scalable and quality-assured.' },
      ],
    },

    roles: {
      eyebrow: 'Working at Padua',
      title: 'Don\u2019t see a role for you?',
      sub: 'We don\u2019t list every opportunity here. Some live roles get posted on our <a href="https://www.linkedin.com/company/3641071/" target="_blank" rel="noopener">LinkedIn</a>, and we\u2019re always keen to hear from Paraplanners, Software Engineers and anyone else who thinks there might be a fit we haven\u2019t spotted yet. Reach out to us below.',
      empty: '',
      items: [],
    },

    faq: {
      eyebrow: 'Frequently asked',
      title: 'Questions candidates ask us.',
      items: [
        { q: 'Where are you based?', a: 'We have offices in Sydney and Kiama. We work hybrid; the in-office mix depends on the role. We\u2019re 100% Australian-based; no offshoring.' },
        { q: 'I don\u2019t see a role for me, should I still reach out?', a: 'Absolutely. We hire for talent first. If you\u2019ve done extraordinary work and our mission resonates, email Annmaree directly even when there\u2019s nothing live.' },
      ],
    },
  },
};

const MODULE = MODULE_COPY_BY_KEY[window.__PADUA_MODULE || 'steveai'] || MODULE_COPY_BY_KEY.steveai;

// =====================================================
// HERO, editorial top, full-bleed accent panel below
// =====================================================
function ModuleHero({ tweaks }) {
  const c = MODULE;
  const [scrollY, setScrollY] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY || 0);
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const sScroll = Math.min(scrollY, 1500);
  const panelOffset = sScroll * 0.10;
  const panelScale = 1 + sScroll * 0.00012;
  const artworkOffset = sScroll * -0.18;

  return (
    <section
      className={`module-hero module-hero-${c.accent}`}
      data-screen-label="module-hero"
    >
      <div className="container module-hero-inner">
        <div className="module-eyebrow">{c.eyebrow}</div>
        <h1 className="module-h1">
          {c.productName}
          <em>{c.productTagline}</em>
        </h1>
        <p className="module-hero-intro">{c.intro}</p>
        <div className="module-hero-cta-row">
          {c.cta_demo && <a className="btn btn-spectrum" href="#book">{c.cta_demo}</a>}
          {!c.press && c.cta_portal && (
            <a className="hero-link" href="#in-context">{c.cta_portal}</a>
          )}
          {c.press && (
            <div className="module-hero-press" aria-label={`${c.press.label} ${c.press.detail}`}>
              <span className="module-hero-press-label">{c.press.label}</span>
              <span className="module-hero-press-badge">
                <span className="module-hero-press-9">9</span>
                <span className="module-hero-press-news">News</span>
                <span className="module-hero-press-sep" aria-hidden="true">·</span>
                <span className="module-hero-press-detail">{c.press.detail}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Full-bleed coloured panel with the abstract artwork */}
      <div
        className="module-hero-panel"
        style={{ transform: `translate3d(0, ${panelOffset}px, 0) scale(${panelScale})` }}
      >
        <ModuleArtwork accent={c.accent} offset={artworkOffset} tweaks={tweaks} />
      </div>
    </section>
  );
}

// Abstract motion piece per module, distinct visual identity
function ModuleArtwork({ accent, offset, tweaks }) {
  // Photo panel, when a module supplies its own hero image, render that
  // with a brand-tinted overlay instead of the abstract motion artwork.
  if (MODULE.panelImage) {
    return (
      <div className="module-art module-art-photo" aria-hidden="true" style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
        <img src={MODULE.panelImage} alt="" loading="lazy" />
      </div>
    );
  }
  if (accent === 'discover') {
    return (
      <div className="module-art module-art-steveai" aria-hidden="true" style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="orb orb-c" />
        <span className="orb orb-d" />
        <span className="orb orb-e" />
        <span className="orb orb-f" />
        <svg className="orb-lines" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M 100 250 Q 300 100 500 250 T 900 250" />
          <path d="M 100 320 Q 300 200 500 320 T 900 320" />
          <path d="M 100 180 Q 300 40 500 180 T 900 180" />
        </svg>
      </div>
    );
  }
  if (accent === 'teal') {
    return (
      <div className="module-art module-art-wealthx" aria-hidden="true" style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="wxGradA" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="rgba(255,255,255,0.7)" />
              <stop offset="1" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <radialGradient id="wxBankGlow" cx="0.5" cy="0.5" r="0.6">
              <stop offset="0" stopColor="rgba(255,255,255,0.18)"/>
              <stop offset="1" stopColor="rgba(255,255,255,0)"/>
            </radialGradient>
          </defs>

          {/* Soft halo behind the bank */}
          <circle cx="130" cy="250" r="140" fill="url(#wxBankGlow)" className="wx-bank-glow"/>

          {/* Bank, classical building silhouette on the left, source of the data streams */}
          <g className="wx-bank" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Pediment */}
            <path d="M 70 200 L 130 170 L 190 200 Z" fill="rgba(255,255,255,0.08)"/>
            {/* Architrave */}
            <line x1="62" y1="200" x2="198" y2="200"/>
            {/* Columns */}
            <line x1="82" y1="210" x2="82" y2="288"/>
            <line x1="110" y1="210" x2="110" y2="288"/>
            <line x1="150" y1="210" x2="150" y2="288"/>
            <line x1="178" y1="210" x2="178" y2="288"/>
            {/* Base */}
            <line x1="62" y1="295" x2="198" y2="295"/>
            <line x1="56" y1="305" x2="204" y2="305"/>
            {/* Dollar mark on pediment */}
            <text x="130" y="194" textAnchor="middle" fill="rgba(255,255,255,0.95)" stroke="none" fontFamily="var(--font-display)" fontWeight="600" fontSize="14">$</text>
          </g>

          {/* Padua endpoint on the right, where the data lands */}
          <g className="wx-endpoint">
            <circle cx="720" cy="250" r="34" fill="rgba(245,213,52,0.18)" stroke="rgba(245,213,52,0.5)" strokeWidth="1.5" className="wx-endpoint-halo"/>
            <circle cx="720" cy="250" r="14" fill="rgba(245,213,52,0.95)" className="wx-endpoint-core"/>
            <text x="720" y="306" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="2">PADUA</text>
          </g>

          {/* Streams, anchored to the bank, fanning out to the endpoint */}
          <path className="wx-stream wx-s1" d="M 205 240 Q 380 150 540 230 T 720 250" />
          <path className="wx-stream wx-s2" d="M 205 260 Q 380 320 540 270 T 720 250" />
          <path className="wx-stream wx-s3" d="M 205 220 Q 380 80  540 200 T 720 250" />
          <path className="wx-stream wx-s4" d="M 205 280 Q 380 380 540 310 T 720 250" />

          {/* Data packets travelling along the streams */}
          <g className="wx-nodes">
            {Array.from({ length: 8 }).map((_, i) => (
              <circle key={i} className={`wx-node wx-node-${i}`} cx={250 + i * 60} cy={250 + (i % 4 - 2) * 20} r="3.5" />
            ))}
          </g>
        </svg>
      </div>
    );
  }
  // WealthReview, real product on an Apple-style monitor (replaces the
  // earlier abstract dashboard tiles for a more confident hero treatment)
  if (accent === 'review') {
    return (
      <div className="module-art module-art-wealthreview-monitor" aria-hidden="true" style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
        <img src="assets/wealthreview-monitor.png" alt="" />
      </div>
    );
  }
  if (accent === 'amber') {
    return (
      <div className="module-art module-art-bulb" aria-hidden="true" style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="bulb-glow" cx="0.5" cy="0.45" r="0.55">
              <stop offset="0" stopColor="rgba(245,213,52,0.55)"/>
              <stop offset="0.5" stopColor="rgba(245,148,54,0.18)"/>
              <stop offset="1" stopColor="rgba(245,148,54,0)"/>
            </radialGradient>
            <linearGradient id="bulb-glass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="rgba(255,255,255,0.85)"/>
              <stop offset="1" stopColor="rgba(255,255,255,0.25)"/>
            </linearGradient>
          </defs>
          <circle cx="400" cy="230" r="220" fill="url(#bulb-glow)" className="bulb-halo"/>
          <g className="bulb-rays" stroke="rgba(255,228,140,0.55)" strokeWidth="2.4" strokeLinecap="round">
            <line x1="400" y1="35" x2="400" y2="70"/>
            <line x1="555" y1="80" x2="535" y2="105"/>
            <line x1="620" y1="220" x2="585" y2="220"/>
            <line x1="555" y1="360" x2="535" y2="340"/>
            <line x1="245" y1="80" x2="265" y2="105"/>
            <line x1="180" y1="220" x2="215" y2="220"/>
            <line x1="245" y1="360" x2="265" y2="340"/>
          </g>
          <path
            d="M 400 105 C 462 105 510 152 510 215 C 510 258 488 295 462 322 L 462 360 L 338 360 L 338 322 C 312 295 290 258 290 215 C 290 152 338 105 400 105 Z"
            fill="url(#bulb-glass)"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="2.2"
          />
          <path
            d="M 360 250 Q 380 215 400 250 Q 420 285 440 250"
            fill="none"
            stroke="rgba(255,221,90,0.95)"
            strokeWidth="3"
            strokeLinecap="round"
            className="bulb-filament"
          />
          <path
            d="M 360 250 L 350 280 M 440 250 L 450 280"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <rect x="346" y="360" width="108" height="12" fill="rgba(255,255,255,0.55)" rx="2"/>
          <rect x="352" y="376" width="96" height="9" fill="rgba(255,255,255,0.42)" rx="2"/>
          <rect x="358" y="389" width="84" height="9" fill="rgba(255,255,255,0.32)" rx="2"/>
          <path d="M 372 405 Q 400 420 428 405" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
    );
  }
  // WealthData (navy), clean upward-trending chart suggesting weekly data,
  // refreshed insight. Calm and confident, not the busy dashboard screenshot.
  if (accent === 'navy') {
    return (
      <div className="module-art module-art-chart" aria-hidden="true" style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
          {/* Grid */}
          <g stroke="rgba(255,255,255,0.06)" strokeWidth="1">
            <line x1="0" y1="120" x2="800" y2="120"/>
            <line x1="0" y1="220" x2="800" y2="220"/>
            <line x1="0" y1="320" x2="800" y2="320"/>
            <line x1="0" y1="420" x2="800" y2="420"/>
          </g>
          {/* Soft area fill */}
          <path
            d="M 50 400 L 150 360 L 250 340 L 350 280 L 450 230 L 550 200 L 650 140 L 750 90 L 750 500 L 50 500 Z"
            fill="rgba(0,138,147,0.14)"
            className="nv-area"
          />
          {/* Main growing line */}
          <path
            d="M 50 400 L 150 360 L 250 340 L 350 280 L 450 230 L 550 200 L 650 140 L 750 90"
            fill="none"
            stroke="rgba(150,220,225,0.95)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="nv-line"
          />
          {/* Data points */}
          <g className="nv-points">
            <circle cx="150" cy="360" r="4"/>
            <circle cx="250" cy="340" r="4"/>
            <circle cx="350" cy="280" r="4"/>
            <circle cx="450" cy="230" r="4"/>
            <circle cx="550" cy="200" r="4"/>
            <circle cx="650" cy="140" r="4"/>
            <circle cx="750" cy="90" r="6" className="nv-current"/>
          </g>
        </svg>
      </div>
    );
  }
  // Fallback (any future module without a specific artwork): abstract
  // migration streams converging from left to right.
  return (
    <div className="module-art module-art-amber" aria-hidden="true" style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
        <path className="am-stream am-s1" d="M -40 120 Q 200 100 400 200 T 850 260" />
        <path className="am-stream am-s2" d="M -40 250 Q 200 240 400 280 T 850 300" />
        <path className="am-stream am-s3" d="M -40 380 Q 200 380 400 340 T 850 320" />
        <g className="am-nodes">
          <circle cx="120" cy="116" r="4"/>
          <circle cx="120" cy="252" r="4"/>
          <circle cx="120" cy="378" r="4"/>
          <circle cx="430" cy="226" r="5"/>
          <circle cx="430" cy="282" r="5"/>
          <circle cx="430" cy="338" r="5"/>
          <circle cx="760" cy="284" r="6" className="am-merge"/>
        </g>
      </svg>
    </div>
  );
}

// =====================================================
// VIDEO, module-specific launch / explainer clip
// =====================================================
function ModuleVideo() {
  const v = MODULE.video;
  const ref = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [revealRef, seen] = useModuleReveal(0.2);

  const togglePlay = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  if (!v) return null;
  return (
    <section
      ref={revealRef}
      className={`module-section module-video${seen ? ' is-in-view' : ''}`}
      data-screen-label="video"
    >
      <div className="container module-video-container">
        <div
          className={`module-video-frame${playing ? ' is-playing' : ''}${ready ? ' is-ready' : ''}`}
          onClick={togglePlay}
          role="button"
          tabIndex={0}
          aria-label={playing ? 'Pause video' : `Play video: ${v.caption}`}
        >
          <video
            ref={ref}
            src={v.src}
            playsInline
            preload="metadata"
            onLoadedMetadata={() => setReady(true)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />
          <div className="module-video-tint" aria-hidden="true" />
          {v.length && (
            <div className="module-video-meta">
              <span className="module-video-length">{v.length}</span>
            </div>
          )}
          <button type="button" className="module-video-play" aria-label="Play / pause" onClick={(e) => { e.stopPropagation(); togglePlay(); }}>
            {playing ? (
              <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
                <circle cx="32" cy="32" r="31" fill="rgba(255,255,255,0.96)" />
                <rect x="22" y="20" width="6" height="24" fill="#1a1525" rx="1.2"/>
                <rect x="36" y="20" width="6" height="24" fill="#1a1525" rx="1.2"/>
              </svg>
            ) : (
              <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
                <circle cx="32" cy="32" r="31" fill="rgba(255,255,255,0.96)" />
                <path d="M26 20 L46 32 L26 44 Z" fill="#1a1525" />
              </svg>
            )}
          </button>
          {v.caption && <div className="module-video-caption">{v.caption}</div>}
        </div>
      </div>
    </section>
  );
}

// =====================================================
// WHAT IT DOES
// =====================================================
function ModuleWhat() {
  const c = MODULE.what;
  const [ref, seen] = useModuleReveal(0.22);
  return (
    <section
      ref={ref}
      className={`module-section module-what${seen ? ' is-in-view' : ''}`}
      data-screen-label="what"
    >
      <div className="container">
        <div className="module-section-head">
          <div className="eyebrow">{c.eyebrow}</div>
          <p className="module-lead-copy">{c.lead}</p>
        </div>
        {MODULE.triangle && <PaduaTriangle />}
        {/* Chart options: Flourish embed (preferred — interactive) takes
            precedence; falls back to a static PNG for modules that don't
            yet have a Flourish viz set up. */}
        {MODULE.chartFlourishId && (
          <div className="module-what-chart module-what-chart-flourish">
            <FlourishEmbed id={MODULE.chartFlourishId} />
            <div className="module-what-chart-caption">{MODULE.chartCaption || 'Interactive chart'}</div>
          </div>
        )}
        {MODULE.chartImage && !MODULE.chartFlourishId && (
          <div className="module-what-chart">
            <img src={MODULE.chartImage} alt="Sample platform fee comparison across nine platforms" />
            <div className="module-what-chart-caption">{MODULE.chartCaption || 'Sample · Fee comparison across in-scope platforms'}</div>
          </div>
        )}
        <div className="module-stat-grid">
          {c.cols.map((col, i) => (
            <div className="module-stat" key={col.label} style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="module-stat-figure">{col.stat}</div>
              <div className="module-stat-label">{col.label}</div>
              <p className="module-stat-p">{col.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Flourish embed loader. Injects the official Flourish embed script once
// on first mount, then lets the library wire up the iframe inside the
// data-src container. Subsequent <FlourishEmbed/> instances re-trigger
// loadEmbed() so dashes added later still hydrate. Used today for the
// Transition Management book-analysis chart.
function FlourishEmbed({ id }) {
  React.useEffect(() => {
    const src = 'https://public.flourish.studio/resources/embed.js';
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
    } else if (window.Flourish && window.Flourish.loadEmbed) {
      window.Flourish.loadEmbed();
    }
  }, [id]);
  return (
    <div
      className="flourish-embed flourish-chart"
      data-src={`visualisation/${id}`}
    />
  );
}

// Padua triangle, equal-area inline build. Three kite-shaped regions meeting
// at the centroid, each one-third of the area. Hovering any face dims the
// others and swaps the caption.
function PaduaTriangle() {
  const [hovered, setHovered] = React.useState(null);
  const regions = {
    quality: { label: 'Quality', desc: 'Experienced advice guides and paraplanners applying Australian best practice on every file.' },
    value: { label: 'Value', desc: 'Lower total cost per advice than in-house teams, traditional outsourcers or tech-only platforms.' },
    turnaround: { label: 'Turnaround', desc: 'Average turnaround of 5 business days, with unparalleled visibility on every file in production.' },
  };
  const enter = (k) => () => setHovered(k);
  const leave = () => setHovered(null);
  return (
    <div className={`padua-triangle-wrap${hovered ? ' has-hover' : ''}`}>
      <svg viewBox="0 0 520 460" className="padua-triangle" role="img" aria-label="The Padua advantage triangle">
        <defs>
          <linearGradient id="pt-quality" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a308c"/>
            <stop offset="1" stopColor="#2a1a52"/>
          </linearGradient>
          <linearGradient id="pt-value" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#d97d20"/>
            <stop offset="1" stopColor="#f59436"/>
          </linearGradient>
          <linearGradient id="pt-turnaround" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#ab2178"/>
            <stop offset="1" stopColor="#c1255b"/>
          </linearGradient>
        </defs>

        {/* Three equal-area kites meeting at the centroid (260, 300).
            Outer triangle: apex (260,20) · bottom-left (40,440) · bottom-right (480,440)
            Midpoints: midL (150,230), midR (370,230), midB (260,440). */}
        <polygon
          className={`pt-region${hovered === 'quality' ? ' is-hovered' : ''}`}
          points="260,20 150,230 260,300 370,230"
          fill="url(#pt-quality)"
          onMouseEnter={enter('quality')} onMouseLeave={leave}
        />
        <polygon
          className={`pt-region${hovered === 'value' ? ' is-hovered' : ''}`}
          points="150,230 40,440 260,440 260,300"
          fill="url(#pt-value)"
          onMouseEnter={enter('value')} onMouseLeave={leave}
        />
        <polygon
          className={`pt-region${hovered === 'turnaround' ? ' is-hovered' : ''}`}
          points="370,230 260,300 260,440 480,440"
          fill="url(#pt-turnaround)"
          onMouseEnter={enter('turnaround')} onMouseLeave={leave}
        />

        {/* Top kite, Better Quality (label centered around y=170) */}
        <g className="pt-text pt-text-top" pointerEvents="none">
          <g transform="translate(260, 95)">
            <circle r="20" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
            <path d="M -8 0 L -2 7 L 9 -7" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <text x="260" y="158" textAnchor="middle" className="pt-pre">Better</text>
          <text x="260" y="195" textAnchor="middle" className="pt-name">Quality</text>
        </g>

        {/* Bottom-left kite, Better Value */}
        <g className="pt-text pt-text-left" pointerEvents="none">
          <g transform="translate(127, 310)">
            <circle r="16" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
            <text textAnchor="middle" y="6" fill="white" fontSize="17" fontFamily="var(--font-display)" fontWeight="700">$</text>
          </g>
          <text x="127" y="360" textAnchor="middle" className="pt-pre-sm">Better</text>
          <text x="127" y="392" textAnchor="middle" className="pt-name-sm">Value</text>
        </g>

        {/* Bottom-right kite, Better Turnaround */}
        <g className="pt-text pt-text-right" pointerEvents="none">
          <g transform="translate(393, 310)">
            <circle r="16" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
            <circle r="9" fill="none" stroke="white" strokeWidth="2"/>
            <path d="M 0 -5 L 0 0 L 4 4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </g>
          <text x="393" y="360" textAnchor="middle" className="pt-pre-sm">Better</text>
          <text x="393" y="392" textAnchor="middle" className="pt-name-sm">Turnaround</text>
        </g>
      </svg>
      <p className="padua-triangle-caption">
        {hovered
          ? <><strong>Better {regions[hovered].label}.</strong> {regions[hovered].desc}</>
          : <em>Hover any face. The unattainable triangle is attainable with Padua.</em>}
      </p>
    </div>
  );
}

// =====================================================
// HOW IT WORKS, numbered horizontal flow
// =====================================================
function ModuleFlow() {
  const c = MODULE.flow;
  const [ref, seen] = useModuleReveal(0.15);
  return (
    <section
      ref={ref}
      id="in-context"
      className={`module-section module-flow${seen ? ' is-in-view' : ''}`}
      data-screen-label="flow"
    >
      <div className="container">
        <div className="module-section-head">
          <div className="eyebrow">{c.eyebrow}</div>
          <h2 className="section-title">{c.title}</h2>
          <p className="section-lede">{c.sub}</p>
        </div>
        <div className="module-flow-grid">
          {c.steps.map((s, i) => (
            <div className="module-flow-step" key={s.n} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="module-flow-n">{s.n}</div>
              <div className="module-flow-h">{s.h}</div>
              <p className="module-flow-p">{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================
// KEY FEATURES, feature blocks
// =====================================================
function ModuleFeatures() {
  const c = MODULE.features;
  const [ref, seen] = useModuleReveal(0.12);
  return (
    <section
      ref={ref}
      className={`module-section module-features${seen ? ' is-in-view' : ''}`}
      data-screen-label="features"
    >
      <div className="container">
        <div className="module-section-head">
          <div className="eyebrow">{c.eyebrow}</div>
          <h2 className="section-title">{c.title}</h2>
        </div>
        <div className="module-features-grid">
          {c.items.map((it, i) => (
            <div className="module-feature" key={it.h} style={{ transitionDelay: `${i * 60}ms` }}>
              <h3 className="module-feature-h">{it.h}</h3>
              <p className="module-feature-p">{it.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================
// EVEREST, animated SVG illustration + support analogy
// Only renders for modules with an `everest` field (paraplanning today).
// =====================================================
function ModuleEverest() {
  const c = MODULE.everest;
  const [ref, seen] = useModuleReveal(0.15);
  if (!c) return null;
  return (
    <section
      ref={ref}
      className={`module-section module-everest${seen ? ' is-in-view' : ''}`}
      data-screen-label="everest"
    >
      <div className="container module-everest-grid">
        <div className="module-everest-text">
          <div className="eyebrow">{c.eyebrow}</div>
          <h2 className="section-title">{c.title}</h2>
          <p className="module-everest-lead">{c.lead}</p>
          {c.support && (
            <ul className="module-everest-support">
              {c.support.map((item) => (
                <li key={item}><span className="module-everest-bullet" aria-hidden="true">/</span>{item}</li>
              ))}
            </ul>
          )}
          {c.outro && <p className="module-everest-outro">{c.outro}</p>}
        </div>
        <div className="module-everest-visual" aria-hidden="true">
          <EverestSVG />
        </div>
      </div>
    </section>
  );
}

function EverestSVG() {
  return (
    <svg viewBox="0 0 640 540" preserveAspectRatio="xMidYMid meet" className="everest-svg">
      <defs>
        <linearGradient id="ev-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a0820"/>
          <stop offset="0.55" stopColor="#3a1538"/>
          <stop offset="1" stopColor="#7a1f3a"/>
        </linearGradient>
        <linearGradient id="ev-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a1a4a"/>
          <stop offset="1" stopColor="#2a1233"/>
        </linearGradient>
        <linearGradient id="ev-main" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a2068"/>
          <stop offset="1" stopColor="#2a1233"/>
        </linearGradient>
        <linearGradient id="ev-snow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.95"/>
          <stop offset="1" stopColor="#fff" stopOpacity="0.3"/>
        </linearGradient>
      </defs>

      <rect width="640" height="540" fill="url(#ev-sky)"/>

      <g className="everest-stars">
        <circle cx="50" cy="60" r="0.9" fill="#fff"/>
        <circle cx="120" cy="40" r="1.2" fill="#fff"/>
        <circle cx="220" cy="55" r="1" fill="#fff"/>
        <circle cx="340" cy="35" r="1.3" fill="#fff"/>
        <circle cx="430" cy="70" r="0.9" fill="#fff"/>
        <circle cx="520" cy="50" r="1.1" fill="#fff"/>
        <circle cx="580" cy="100" r="0.9" fill="#fff"/>
        <circle cx="80" cy="140" r="0.8" fill="#fff"/>
        <circle cx="480" cy="120" r="1" fill="#fff"/>
      </g>

      <polygon points="0,540 70,330 180,420 280,210 380,360 480,260 600,360 640,540" fill="url(#ev-back)" opacity="0.55"/>
      <polygon points="0,540 50,420 140,340 250,230 340,90 420,210 510,310 580,400 640,540" fill="url(#ev-main)"/>
      <path d="M 305 140 L 340 90 L 380 160 L 360 220 L 310 220 Z" fill="url(#ev-snow)"/>

      <path id="ev-route" d="M 40 510 L 90 470 Q 140 440 165 400 T 230 330 Q 270 290 290 240 T 340 130"
            fill="none" stroke="rgba(245,213,52,0.55)" strokeWidth="2" strokeDasharray="5 5" className="everest-route"/>

      <g className="everest-camps">
        <circle cx="40" cy="510" r="5" fill="#f5d534"/>
        <text x="52" y="514" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="ui-monospace,monospace">Base camp</text>
        <circle cx="90" cy="470" r="4" fill="#f5d534" opacity="0.9"/>
        <text x="102" y="474" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="ui-monospace,monospace">Camp I</text>
        <circle cx="165" cy="400" r="4" fill="#f5d534" opacity="0.9"/>
        <text x="176" y="404" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="ui-monospace,monospace">Camp II</text>
        <circle cx="230" cy="330" r="4" fill="#f5d534" opacity="0.9"/>
        <text x="241" y="334" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="ui-monospace,monospace">Camp III</text>
        <circle cx="290" cy="240" r="4" fill="#f5d534" opacity="0.9"/>
        <text x="301" y="244" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="ui-monospace,monospace">Camp IV</text>
        <circle cx="340" cy="130" r="5" fill="#fff"/>
        <text x="352" y="134" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="ui-monospace,monospace">Summit</text>
      </g>

      <g className="everest-climber-group">
        <circle r="7" fill="#fff" stroke="#f5d534" strokeWidth="2.5" className="everest-climber">
          <animateMotion dur="22s" repeatCount="indefinite" rotate="auto" path="M 40 510 L 90 470 Q 140 440 165 400 T 230 330 Q 270 290 290 240 T 340 130"/>
        </circle>
      </g>
    </svg>
  );
}

// =====================================================
// QUOTES, partner / executive testimonials (dark band)
// =====================================================
function ModuleQuotes() {
  const c = MODULE.quotes;
  const [ref, seen] = useModuleReveal(0.12);
  if (!c) return null;
  return (
    <section
      ref={ref}
      className={`module-section module-quotes${seen ? ' is-in-view' : ''}`}
      data-screen-label="quotes"
    >
      <div className="container">
        <div className="module-section-head module-quotes-head">
          <div className="eyebrow">{c.eyebrow}</div>
          <h2 className="section-title">{c.title}</h2>
        </div>
        <div className="module-quotes-list">
          {c.items.map((q, i) => (
            <figure className="module-quote" key={q.name} style={{ transitionDelay: `${i * 120}ms` }}>
              <blockquote>
                <p className="module-quote-lead">&ldquo;{q.lead}&rdquo;</p>
                {q.body && <p className="module-quote-body">&ldquo;{q.body}&rdquo;</p>}
              </blockquote>
              <figcaption className="module-quote-cite">
                <span className="module-quote-em"></span>
                <span className="module-quote-name">{q.name}</span>
                <span className="module-quote-role">{q.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================
// FAQ, accordion (same pattern as Portal page)
// =====================================================
function ModuleFaq() {
  const c = MODULE.faq;
  const [open, setOpen] = React.useState(0);
  const [ref, seen] = useModuleReveal(0.15);
  return (
    <section
      ref={ref}
      className={`module-section module-faq${seen ? ' is-in-view' : ''}`}
      data-screen-label="faq"
    >
      <div className="container">
        <div className="module-faq-container">
          <div className="module-faq-head">
            <div className="eyebrow">{c.eyebrow}</div>
            <h2 className="section-title">{c.title}</h2>
          </div>
          <ul className="module-faq-list">
            {c.items.map((it, i) => (
              <ModuleFaqRow
                key={it.q}
                item={it}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ModuleFaqRow({ item, isOpen, onToggle }) {
  const bodyRef = React.useRef(null);
  const [maxHeight, setMaxHeight] = React.useState(0);
  React.useEffect(() => {
    if (!bodyRef.current) return;
    setMaxHeight(isOpen ? bodyRef.current.scrollHeight : 0);
  }, [isOpen]);
  return (
    <li className={`module-faq-row${isOpen ? ' is-open' : ''}`}>
      <button type="button" className="module-faq-q" onClick={onToggle} aria-expanded={isOpen}>
        <span>{item.q}</span>
        <span className="module-faq-icon" aria-hidden="true">
          <span /><span />
        </span>
      </button>
      <div className="module-faq-a-wrap" style={{ maxHeight }}>
        <div className="module-faq-a" ref={bodyRef}>
          <p>{item.a}</p>
        </div>
      </div>
    </li>
  );
}

// =====================================================
// CTA, clean cream + spectrum hairline (consistent with Portal page)
// =====================================================
function ModuleCta() {
  const c = MODULE;
  const [ref, seen] = useModuleReveal(0.3);
  const isCareers = c.key === 'careers';
  return (
    <section
      ref={ref}
      id="book"
      className={`module-cta${seen ? ' is-in-view' : ''}`}
      data-screen-label="cta"
    >
      <div className="container">
        <div className="module-cta-inner">
          {isCareers ? (
            <>
              <h2 className="module-cta-title">
                Get in touch with
                <em> us.</em>
              </h2>
              <p className="module-cta-sub">We&rsquo;re always open to a conversation with extraordinary people.</p>
            </>
          ) : (
            <>
              <h2 className="module-cta-title">
                See {c.productName} in
                <em> your own workflow.</em>
              </h2>
              <p className="module-cta-sub">A 30-minute demo, tailored to how your practice or platform runs.</p>
              <div className="module-cta-row">
                <a className="btn btn-cta-dark" href="Contact.html">{c.cta_demo} →</a>
                <a className="hero-link" href="padua-portal.html">Back to the Portal overview</a>
              </div>
            </>
          )}
          {c.person && (
            <div className="module-cta-person">
              <a href={`mailto:${c.person.email}`} className="module-cta-person-card">
                <span className="module-cta-person-photo-wrap">
                  {c.person.photo ? (
                    <img src={c.person.photo} alt={c.person.name} className="module-cta-person-photo"/>
                  ) : (
                    <span className="module-cta-person-photo module-cta-person-photo-initials" aria-hidden="true">{c.person.initials}</span>
                  )}
                  <span className="module-cta-person-status" aria-label="Available"></span>
                </span>
                <div className="module-cta-person-text">
                  <div className="module-cta-person-name">{c.person.cta || `Talk to ${c.person.name.split(' ')[0]}`}</div>
                  <div className="module-cta-person-role">{c.person.name} · {c.person.role}</div>
                  <div className="module-cta-person-email">{c.person.email} <span aria-hidden="true">↗</span></div>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// =====================================================
// PAGE root
// =====================================================
function ModulePage({ values }) {
  return (
    <main className={`module-page module-${MODULE.accent}`}>
      {values.showHero && <ModuleHero tweaks={values} />}
      {values.showVideo && MODULE.video && <ModuleVideo />}
      {values.showWhat && <ModuleWhat />}
      {values.showFlow && <ModuleFlow />}
      {values.showFeatures && <ModuleFeatures />}
      {MODULE.roles && <ModuleRoles />}
      {MODULE.everest && <ModuleEverest />}
      {values.showQuotes && MODULE.quotes && <ModuleQuotes />}
      {values.showFaq && <ModuleFaq />}
      {values.showCta && <ModuleCta />}
    </main>
  );
}

// =====================================================
// ROLES, live job openings list (Careers page)
// =====================================================
function ModuleRoles() {
  const c = MODULE.roles;
  const [ref, seen] = useModuleReveal(0.15);
  const email = MODULE.person?.email;
  if (!c) return null;
  return (
    <section
      ref={ref}
      id="roles"
      className={`module-section module-roles${seen ? ' is-in-view' : ''}`}
      data-screen-label="roles"
    >
      <div className="container">
        <div className="module-section-head">
          <div className="eyebrow">{c.eyebrow}</div>
          <h2 className="section-title">{c.title}</h2>
          {c.sub && <p className="section-lede" dangerouslySetInnerHTML={{ __html: c.sub }} />}
        </div>
        {c.items && c.items.length > 0 ? (
          <ul className="module-roles-list">
            {c.items.map((r, i) => (
              <li className="module-role" key={r.title} style={{ transitionDelay: `${i * 80}ms` }}>
                <a className="module-role-link" href={email ? `mailto:${email}?subject=${encodeURIComponent('Application: ' + r.title)}` : 'mailto:peopleandculture@paduasolutions.com'}>
                  <div className="module-role-main">
                    <div className="module-role-meta">
                      <span className="module-role-team">{r.team}</span>
                      <span className="module-role-sep" aria-hidden="true">·</span>
                      <span className="module-role-type">{r.type}</span>
                    </div>
                    <div className="module-role-title">{r.title}</div>
                    {r.summary && <p className="module-role-summary">{r.summary}</p>}
                  </div>
                  <div className="module-role-side">
                    <div className="module-role-location">{r.location}</div>
                    <span className="module-role-cta">
                      Apply
                      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                        <path d="M2 7 L12 7 M7 2 L12 7 L7 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="module-roles-empty">{c.empty}</p>
        )}
      </div>
    </section>
  );
}

Object.assign(window, { ModulePage });
