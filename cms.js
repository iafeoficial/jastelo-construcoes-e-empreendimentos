(function () {
  const projectId = '99xajzxf';
  const dataset = 'production';
  const apiVersion = '2026-09-03';
  const query = `*[_type == "property" && published == true] | order(order asc) {
    _id, title, "slug": slug.current, code, status, statusLabel, description, price,
    area, rooms, bathrooms, garage, year, highlights, location, mapQuery, featured, order,
    "images": gallery[]{area, label, "src": image.asset->url}
  }`;

  const statusMeta = {
    pronto: {filter: 'pronto', className: '', fallbackLabel: 'Pronta para morar'},
    lancamento: {filter: 'construcao', className: 'construction', fallbackLabel: 'Lançamento'},
    planta: {filter: 'planta', className: 'plan', fallbackLabel: 'Venda na planta'},
    vendido: {filter: 'vendido', className: 'sold', fallbackLabel: 'Vendido'},
  };

  function normalizeProperty(item, position) {
    const meta = statusMeta[item.status] || statusMeta.pronto;
    return {
      index: String(position + 1).padStart(2, '0'),
      slug: item.slug,
      code: item.code || '',
      title: item.title || 'Imóvel Jastelo',
      status: item.statusLabel || meta.fallbackLabel,
      statusKey: item.status,
      filterStatus: meta.filter,
      statusClass: meta.className,
      area: item.area || 'Consulte',
      rooms: item.rooms || 'Consulte',
      bathrooms: item.bathrooms || 'Consulte',
      garage: item.garage || 'Consulte',
      year: item.year || 'Consulte',
      price: item.price || 'Consulte',
      location: item.location || 'São Luís e região',
      mapQuery: item.mapQuery || item.location || 'São Luís, MA',
      description: item.description || '',
      highlights: Array.isArray(item.highlights) ? item.highlights : [],
      featured: Boolean(item.featured),
      order: item.order ?? position + 1,
      images: Array.isArray(item.images) ? item.images.filter((image) => image && image.src) : [],
    };
  }

  function appendTextElement(parent, tag, text, className) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = text;
    parent.appendChild(element);
    return element;
  }

  function createCard(property) {
    const article = document.createElement('article');
    article.className = 'property-card reveal visible';
    article.dataset.status = property.filterStatus;
    article.dataset.search = `${property.title} ${property.code} ${property.location} ${property.status}`.toLocaleLowerCase('pt-BR');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'property-open';
    button.dataset.property = property.slug;
    button.setAttribute('aria-label', `Ver ${property.title}`);

    const media = document.createElement('div');
    media.className = 'card-media';
    const image = document.createElement('img');
    image.src = property.images[0]?.src || 'assets/jastelo-40.png';
    image.alt = property.images[0]?.label || property.title;
    image.loading = 'lazy';
    const status = appendTextElement(media, 'span', property.status, `status ${property.statusClass}`.trim());
    status.title = property.status;
    appendTextElement(media, 'span', '↗', 'card-arrow');
    media.prepend(image);

    const body = document.createElement('div');
    body.className = 'card-body';
    appendTextElement(body, 'p', property.code, 'property-code');
    appendTextElement(body, 'h3', property.title);
    const facts = document.createElement('div');
    facts.className = 'facts';
    [property.area, property.rooms, property.garage].forEach((fact) => appendTextElement(facts, 'span', fact));
    body.appendChild(facts);
    const price = document.createElement('div');
    price.className = 'price';
    appendTextElement(price, 'small', property.statusKey === 'vendido' ? 'Preço comercializado' : 'Preço');
    appendTextElement(price, 'strong', property.price);
    body.appendChild(price);
    button.append(media, body);
    article.appendChild(button);
    return article;
  }

  function updateFilterCounts(properties) {
    const counts = properties.reduce((result, property) => {
      result[property.filterStatus] = (result[property.filterStatus] || 0) + 1;
      return result;
    }, {});
    document.querySelectorAll('[data-filter]').forEach((button) => {
      const count = button.dataset.filter === 'todos' ? properties.length : counts[button.dataset.filter] || 0;
      const sup = button.querySelector('sup');
      if (sup) sup.textContent = String(count).padStart(2, '0');
    });
  }

  function renderCatalog(properties) {
    const grid = document.getElementById('property-grid');
    if (!grid) return;
    grid.replaceChildren(...properties.map(createCard));
    updateFilterCounts(properties);
  }

  window.JASTELO_CMS_READY = (async () => {
    try {
      const endpoint = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
      const response = await fetch(endpoint, {headers: {Accept: 'application/json'}});
      if (!response.ok) throw new Error(`Sanity respondeu com ${response.status}.`);
      const payload = await response.json();
      if (!Array.isArray(payload.result) || payload.result.length === 0) return window.JASTELO_PROPERTIES || {};

      const properties = payload.result.map(normalizeProperty).filter((property) => property.slug);
      window.JASTELO_PROPERTIES = Object.fromEntries(properties.map((property) => [property.slug, property]));
      renderCatalog(properties);
      document.dispatchEvent(new CustomEvent('jastelo:properties-ready', {detail: properties}));
      return window.JASTELO_PROPERTIES;
    } catch (error) {
      console.warn('Conteúdo administrativo indisponível; usando os imóveis locais.', error);
      return window.JASTELO_PROPERTIES || {};
    }
  })();
})();
