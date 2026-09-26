(() => {
  const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[character]));

  const searchableContent = [
    { title: 'Kabylie', category: 'Région', excerpt: 'Région historique, géographique et culturelle du nord-est de l’Algérie.', href: 'article.html' },
    { title: 'Langue kabyle', category: 'Langue', excerpt: 'Présentation de la langue kabyle, de ses usages et de ses systèmes d’écriture.', href: 'category.html' },
    { title: 'Tajmaɛt', category: 'Institutions', excerpt: 'Structure traditionnelle de solidarité et d’organisation locale.', href: 'category.html' },
    { title: 'Histoire de la Kabylie', category: 'Catégorie', excerpt: 'Articles consacrés à la mémoire, aux événements et aux territoires kabyles.', href: 'category.html' }
  ];

  const params = new URLSearchParams(window.location.search);
  const query = params.get('q')?.trim();
  const input = document.querySelector('.wiki-search-area input[name="q"]');

  if (!query) return;
  if (input) input.value = query;

  const main = document.querySelector('#main-content');
  if (!main) return;

  const status = document.createElement('section');
  status.className = 'wiki-search-status';
  status.setAttribute('aria-live', 'polite');
  const results = searchableContent.filter((item) =>
    `${item.title} ${item.category} ${item.excerpt}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );
  status.innerHTML = `<div><span class="wiki-kicker">Recherche</span><h2>Résultats pour « ${escapeHtml(query)} »</h2><p>${results.length} résultat${results.length > 1 ? 's' : ''} éditorial${results.length > 1 ? 'aux' : ''} trouvé${results.length > 1 ? 's' : ''}.</p></div><a class="wiki-button wiki-button-secondary" href="index.html">Réinitialiser</a>`;
  main.prepend(status);

  if (document.body.classList.contains('wikikab-home')) {
    const resultList = document.createElement('section');
    resultList.className = 'search-results';
    resultList.setAttribute('aria-labelledby', 'search-results-title');
    resultList.innerHTML = `<div class="panel-header"><h2 id="search-results-title">Pages correspondantes</h2><div class="search-filters" aria-label="Filtrer les résultats"><button class="is-active" data-filter="Tous" type="button">Tous</button><button data-filter="Région" type="button">Régions</button><button data-filter="Langue" type="button">Langue</button><button data-filter="Institutions" type="button">Institutions</button><button data-filter="Catégorie" type="button">Catégories</button></div></div>`;
    const list = document.createElement('div');
    list.className = 'search-result-list';
    const renderResults = (filter = 'Tous') => {
      const filteredResults = filter === 'Tous' ? results : results.filter((item) => item.category === filter);
      list.innerHTML = filteredResults.length
        ? filteredResults.map((item) => `<article class="search-result"><span>${escapeHtml(item.category)}</span><h3><a href="${item.href}">${escapeHtml(item.title)}</a></h3><p>${escapeHtml(item.excerpt)}</p></article>`).join('')
        : '<p class="search-empty">Aucun résultat dans cette catégorie. Essayez un autre filtre.</p>';
    };
    renderResults();
    resultList.append(list);
    status.after(resultList);
    resultList.querySelectorAll('[data-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        resultList.querySelectorAll('[data-filter]').forEach((filterButton) => filterButton.classList.remove('is-active'));
        button.classList.add('is-active');
        renderResults(button.dataset.filter);
      });
    });
  }

  document.querySelectorAll('.account-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const feedback = document.createElement('p');
      feedback.className = 'form-feedback';
      feedback.textContent = 'Cette fonction sera disponible lors de l’ouverture du service WikiKab.';
      form.replaceWith(feedback);
    });
  });
})();
