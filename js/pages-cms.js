(function () {
  const CONTENT_PATHS = {
    site: 'content/site.json',
    home: 'content/home.json',
    programs: 'content/programs.json',
    training: 'content/training-times.json'
  };

  const ALLOWED_TAGS = new Set(['A', 'BR', 'STRONG', 'B', 'EM', 'I', 'P', 'UL', 'OL', 'LI', 'H2', 'H3', 'BLOCKQUOTE']);
  const ALLOWED_ATTRS = { A: new Set(['href', 'target', 'rel']) };
  const SAFE_LINK_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function safeUrl(value, fallback = '#') {
    const raw = String(value ?? '').trim();
    if (!raw) return fallback;

    // Same-page anchors and normal relative site paths are valid for this static site.
    if (raw.startsWith('#')) return raw;
    if (/^(\.\/|\.\.\/|\/)?[A-Za-z0-9._~!$&'()*+,;=:@%/-]+(?:\?[A-Za-z0-9._~!$&'()*+,;=:@%/?-]*)?(?:#[A-Za-z0-9._~!$&'()*+,;=:@%/?-]*)?$/.test(raw) && !/^[A-Za-z][A-Za-z0-9+.-]*:/.test(raw)) {
      return raw;
    }

    try {
      const url = new URL(raw, window.location.origin);
      if (SAFE_LINK_PROTOCOLS.has(url.protocol)) return raw;
    } catch (_) {
      // Fall through to fallback.
    }
    return fallback;
  }

  function isExternalUrl(value) {
    try {
      const url = new URL(String(value || ''), window.location.origin);
      return (url.protocol === 'http:' || url.protocol === 'https:') && url.origin !== window.location.origin;
    } catch (_) {
      return false;
    }
  }

  function sanitizeHtml(value) {
    const template = document.createElement('template');
    template.innerHTML = String(value ?? '');

    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType !== Node.ELEMENT_NODE) return;

        const tag = child.tagName;
        if (!ALLOWED_TAGS.has(tag)) {
          child.replaceWith(document.createTextNode(child.textContent || ''));
          return;
        }

        Array.from(child.attributes).forEach((attr) => {
          const allowed = ALLOWED_ATTRS[tag] && ALLOWED_ATTRS[tag].has(attr.name);
          if (!allowed) {
            child.removeAttribute(attr.name);
            return;
          }
          if (attr.name === 'href') {
            const safe = safeUrl(attr.value, '');
            if (!safe) child.removeAttribute('href');
            else child.setAttribute('href', safe);
          }
        });

        if (tag === 'A' && isExternalUrl(child.getAttribute('href'))) {
          child.setAttribute('target', '_blank');
          child.setAttribute('rel', 'noopener noreferrer');
        }
        walk(child);
      });
    };

    walk(template.content);
    return template.innerHTML;
  }

  async function fetchJson(path) {
    const response = await fetch(path, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`);
    return response.json();
  }

  function setText(selector, value, root = document) {
    if (value == null) return;
    const el = root.querySelector(selector);
    if (el) el.textContent = value;
  }

  function setHtml(selector, value, root = document) {
    if (value == null) return;
    const el = root.querySelector(selector);
    if (el) el.innerHTML = sanitizeHtml(value);
  }

  function setLinkElement(el, href, label, fallback = '#') {
    if (!el) return;
    const safe = safeUrl(href, fallback);
    el.setAttribute('href', safe);
    if (label) el.textContent = label;
    if (isExternalUrl(safe)) {
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    } else {
      el.removeAttribute('target');
      el.removeAttribute('rel');
    }
  }

  function setLink(selector, href, label, root = document) {
    setLinkElement(root.querySelector(selector), href, label);
  }

  function setHeadHref(selector, href) {
    const el = document.querySelector(selector);
    const safe = safeUrl(href, '');
    if (el && safe) el.setAttribute('href', safe);
  }

  function setMetaContent(selector, value) {
    const el = document.querySelector(selector);
    if (el && value) el.setAttribute('content', value);
  }

  function updateMeta(site) {
    const title = site.siteTitle;
    const description = site.defaultDescription;
    const ogImage = safeUrl(site.media?.ogImage, '');

    if (title) document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[name="title"]', title);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:image"]', ogImage);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
    setMetaContent('meta[name="twitter:image"]', ogImage);
    setHeadHref('link[rel="icon"]', site.media?.favicon);
    setHeadHref('link[rel="apple-touch-icon"]', site.media?.appleTouchIcon);
  }

  function updateHero(site, home) {
    const hero = home.hero || {};
    const heroImage = document.querySelector('.hero-bg img');
    if (heroImage) {
      const image = safeUrl(hero.image || site.media?.heroImage, '');
      if (image) heroImage.src = image;
      if (hero.imageAlt || site.media?.heroImageAlt) heroImage.alt = hero.imageAlt || site.media.heroImageAlt;
    }
    setText('.hero-badge', hero.badge);
    setText('.hero-title', hero.title);
    setText('.hero-subtitle', hero.subtitle);
    setLink('.hero-cta-group .btn-primary', hero.primaryCta?.anchor, hero.primaryCta?.label);
    setLink('.hero-cta-group .btn-outline', hero.secondaryCta?.anchor, hero.secondaryCta?.label);
  }

  function updateNavigation(site) {
    const links = site.navigation || [];
    document.querySelectorAll('.nav-links a').forEach((link, index) => {
      const item = links[index];
      if (item) setLinkElement(link, item.href, item.label);
    });
  }

  function updateWelcome(home) {
    const data = home.willkommen || {};
    setText('#willkommen .section-badge', data.badge);
    setText('#willkommen .section-title', data.title);
    setText('#willkommen .section-description', data.description);
    setText('#willkommen .welcome-grid h3', data.introTitle);

    const listWrap = document.querySelector('#willkommen .welcome-grid > div:first-child');
    if (listWrap && Array.isArray(data.introPoints)) {
      const title = listWrap.querySelector('h3')?.outerHTML || '';
      listWrap.innerHTML = title + data.introPoints.map((point) => `<div class="checklist-item"><div class="check-icon">✓</div><p style="font-size: 1.125rem;">${escapeHtml(point)}</p></div>`).join('');
    }

    const feature = document.querySelector('#willkommen .feature-box');
    if (feature && Array.isArray(data.featureBoxParagraphsHtml)) {
      const title = `<h3>${escapeHtml(data.featureBoxTitle || '')}</h3>`;
      feature.innerHTML = title + data.featureBoxParagraphsHtml.map((paragraph, index) => `<p style="${index === 0 ? 'font-size: 1.125rem; margin-bottom: 1.25rem; opacity: 0.95;' : 'opacity: 0.9;'}">${sanitizeHtml(paragraph)}</p>`).join('');
    }
  }

  function renderComparison(home) {
    const data = home.vergleich || {};
    setText('#vergleich .section-badge', data.badge);
    setText('#vergleich .section-title', data.title);
    setText('#vergleich .section-description', data.description);
    const grid = document.querySelector('#vergleich .comparison-grid');
    if (!grid || !Array.isArray(data.items)) return;
    grid.innerHTML = data.items.map((item) => {
      const anchor = safeUrl(item.anchor, '#');
      return `<div class="comparison-card"><div class="card-header"><div class="card-icon">${escapeHtml(item.icon)}</div><h3 class="card-title"><a href="${escapeHtml(anchor)}" style="color: inherit; text-decoration: none;">${escapeHtml(item.name)}</a></h3><p class="card-subtitle">${escapeHtml(item.subtitle)}</p></div><div class="card-body">${(item.highlights || []).map((highlight) => `<div class="card-feature"><div class="feature-bullet"></div><p>${sanitizeHtml(highlight)}</p></div>`).join('')}</div></div>`;
    }).join('');
  }

  function renderPrograms(programs) {
    (programs.items || []).forEach((program) => {
      const section = document.getElementById(program.anchorId || program.slug);
      if (!section) return;
      setText('.section-badge', program.badge, section);
      setText('.section-title', program.title, section);
      setHtml('.content-section', program.html, section);
    });
  }

  function updateAboutAndCta(home) {
    const about = home.ueberMich || {};
    setText('#ueber-mich .section-badge', about.badge);
    setText('#ueber-mich .section-title', about.title);
    setHtml('#ueber-mich .content-section', about.html);
    setText('.cta-section h2', home.cta?.title);
    setText('.cta-section p', home.cta?.text);
    setLink('.cta-section a', home.cta?.buttonHref, home.cta?.buttonLabel);
  }

  function renderContact(site, home) {
    const intro = home.kontakt || {};
    const contact = site.contact || {};
    setText('#kontakt .section-badge', intro.badge);
    setText('#kontakt .section-title', intro.title);
    setText('#kontakt .section-description', intro.description);

    const body = document.querySelector('#kontakt .container > div[style*="max-width"]');
    if (!body) return;
    const emailHref = safeUrl(contact.emailHref || `mailto:${contact.emailAddress || ''}`, '#');
    const mapsUrl = safeUrl(contact.mapsUrl, '#');
    body.innerHTML = `<p style="margin-bottom: 2rem; font-size: 1.125rem;"><strong>${escapeHtml(contact.emailLabel || 'E-Mail:')}</strong><br><a href="${escapeHtml(emailHref)}" style="color: var(--primary); text-decoration: none; font-size: 1.25rem;">${escapeHtml(contact.emailAddress || '')}</a></p><p style="margin-bottom: 2rem;"><strong>${escapeHtml(contact.addressTitle || 'Adresse')}</strong><br>${(contact.addressLines || []).map(escapeHtml).join('<br>')}<br><a href="${escapeHtml(mapsUrl)}" target="_blank" rel="noopener noreferrer" style="color: var(--primary); font-size: 0.9rem;">${escapeHtml(contact.mapsLabel || 'Auf Google Maps anzeigen')}</a></p><a href="${escapeHtml(emailHref)}" class="btn btn-primary" style="font-size: 1.125rem; padding: 1.25rem 2.5rem;">${escapeHtml(contact.ctaLabel || 'Jetzt anfragen')}</a>`;
  }

  function formatScheduleSession(session) {
    const legacyTime = session.time?.trim();
    const legacyLabel = session.label?.trim();
    const start = session.timeStart?.trim();
    const end = session.timeEnd?.trim();
    const time = legacyTime || (start && end ? `${start} – ${end}` : start || end || '');
    const label = legacyLabel || session.sessionLabel?.trim() || [session.discipline, session.audience].filter(Boolean).join(' ');
    return [time, label].filter(Boolean).join(' — ');
  }

  function normalizeAvailabilityStatus(session) {
    const status = String(session.spotsStatus || '').trim().toLowerCase();
    const available = Number(session.spotsAvailable);

    if (status === 'warteliste' || status === 'ausgebucht' || status === 'voll') {
      return status === 'ausgebucht' ? 'ausgebucht' : 'warteliste';
    }

    if (Number.isFinite(available) && available <= 0) return 'warteliste';
    return 'frei';
  }

  function formatAvailabilityLabel(session) {
    const status = normalizeAvailabilityStatus(session);
    if (status === 'ausgebucht') return 'Ausgebucht';
    if (status === 'warteliste') return 'Ausgebucht / Warteliste';

    const available = Number(session.spotsAvailable);
    if (Number.isFinite(available) && available > 0) {
      return `${available} ${available === 1 ? 'Platz' : 'Plätze'} frei`;
    }

    return session.spotsText?.trim() || 'Plätze frei';
  }

  function availabilityClass(session) {
    return normalizeAvailabilityStatus(session) === 'frei' ? 'spot-free' : 'spot-full';
  }

  function renderTraining(training) {
    setText('#trainingszeiten .section-badge', training.badge);
    setText('#trainingszeiten .section-title', training.title);
    const grid = document.querySelector('#trainingszeiten .schedule-grid');
    if (grid && Array.isArray(training.days)) {
      grid.innerHTML = training.days.map((day) => `<div class="schedule-day" style="background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);"><h3 style="color: var(--primary); font-family: 'Oswald', sans-serif; font-size: 1.5rem; margin-bottom: 1rem; border-bottom: 2px solid var(--gray-light); padding-bottom: 0.5rem;">${escapeHtml(day.day)}</h3>${(day.sessions || []).map((session, index, sessions) => `<div class="schedule-item" style="${index < sessions.length - 1 ? 'margin-bottom: 1rem; ' : ''}display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;"><div><strong>${escapeHtml(formatScheduleSession(session))}</strong></div><span class="spot-badge ${availabilityClass(session)}">${escapeHtml(formatAvailabilityLabel(session))}</span></div>`).join('')}</div>`).join('');
    }

    const footer = document.querySelector('#trainingszeiten .container > div[style*="text-align: center"]');
    if (footer) {
      const ctaHref = safeUrl(training.ctaHref, '#kontakt');
      footer.innerHTML = `<p style="margin-bottom: 0.5rem; font-size: 1.1rem;">${escapeHtml(training.leadText || '')}</p><p style="margin-bottom: 1.5rem; color: var(--gray); font-style: italic; font-size: 0.9rem;">${escapeHtml(training.availabilityNote || '')}</p><a href="${escapeHtml(ctaHref)}" class="btn btn-primary">${escapeHtml(training.ctaLabel || 'Probetraining vereinbaren')}</a>`;
    }
  }

  function updateFooter(site) {
    const footer = site.footer || {};
    setText('.footer-logo', footer.logoText || 'KAMPFKUNST DORTMUND');
    setText('.footer-text', footer.tagline || site.siteTagline);
    setText('.footer-bottom p', `© ${site.copyrightYear || new Date().getFullYear()} Kampfkunstcentrum Dortmund. Alle Rechte vorbehalten.`);
    const links = document.querySelectorAll('.footer-bottom a');
    if (links[0]) setLinkElement(links[0], footer.impressumUrl || 'impressum.html', 'Impressum');
    if (links[1]) setLinkElement(links[1], footer.datenschutzUrl || 'datenschutz.html', 'Datenschutz');
  }

  async function loadCmsContent() {
    const [site, home, programs, training] = await Promise.all([
      fetchJson(CONTENT_PATHS.site),
      fetchJson(CONTENT_PATHS.home),
      fetchJson(CONTENT_PATHS.programs),
      fetchJson(CONTENT_PATHS.training)
    ]);
    updateMeta(site);
    updateNavigation(site);
    updateHero(site, home);
    updateWelcome(home);
    renderComparison(home);
    renderPrograms(programs);
    updateAboutAndCta(home);
    renderContact(site, home);
    renderTraining(training);
    updateFooter(site);
    window.cmsContentDidRender = true;
    document.dispatchEvent(new CustomEvent('cms:content-rendered', { detail: { page: 'home' } }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.cmsContentReady = loadCmsContent().catch((error) => {
      console.warn('CMS content failed to load; static HTML fallback remains active.', error);
    });
  });
})();
