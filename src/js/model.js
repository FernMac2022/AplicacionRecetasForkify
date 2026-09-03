import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

const makePlaceholder = function (label) {
  const safe = encodeURIComponent(label);
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f9b16e"/>
          <stop offset="1" stop-color="#f48982"/>
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#g)"/>
      <circle cx="300" cy="175" r="90" fill="#fff" opacity="0.9"/>
      <text x="300" y="190" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#615551">${label}</text>
      <text x="300" y="300" text-anchor="middle" font-family="Arial" font-size="22" fill="#fff">Forkify example</text>
    </svg>
  `)}`;
};

const FALLBACK_RECIPES = [
  {
    id: 'local-pizza-1',
    title: 'Homemade Pizza',
    publisher: 'Forkify Local Example',
    sourceUrl: 'https://forkify-api.jonas.io/',
    image: makePlaceholder('Pizza'),
    servings: 4,
    cookTime: 35,
    ingredients: [
      { quantity: 2, unit: 'cups', description: 'all-purpose flour' },
      { quantity: 1, unit: 'tsp', description: 'yeast' },
      { quantity: 0.75, unit: 'cup', description: 'warm water' },
      { quantity: 0.5, unit: 'cup', description: 'tomato sauce' },
      { quantity: 1.5, unit: 'cups', description: 'mozzarella cheese' },
    ],
  },
  {
    id: 'local-pasta-1',
    title: 'Pasta with Tomato Cream Sauce',
    publisher: 'Forkify Local Example',
    sourceUrl: 'https://forkify-api.jonas.io/',
    image: makePlaceholder('Pasta'),
    servings: 4,
    cookTime: 45,
    ingredients: [
      { quantity: 1, unit: 'lb', description: 'pasta' },
      { quantity: 2, unit: 'cups', description: 'tomato sauce' },
      { quantity: 0.5, unit: 'cup', description: 'cream' },
      { quantity: 0.25, unit: 'cup', description: 'parmesan cheese' },
    ],
  },
  {
    id: 'local-chicken-1',
    title: 'Chicken and Herb Bowl',
    publisher: 'Forkify Local Example',
    sourceUrl: 'https://forkify-api.jonas.io/',
    image: makePlaceholder('Chicken'),
    servings: 2,
    cookTime: 30,
    ingredients: [
      { quantity: 2, unit: '', description: 'chicken breasts' },
      { quantity: 1, unit: 'tbsp', description: 'olive oil' },
      { quantity: 0.5, unit: 'tsp', description: 'mixed herbs' },
      { quantity: 2, unit: 'cups', description: 'fresh vegetables' },
    ],
  },
  {
    id: 'local-salad-1',
    title: 'Avocado Tomato Salad',
    publisher: 'Forkify Local Example',
    sourceUrl: 'https://forkify-api.jonas.io/',
    image: makePlaceholder('Salad'),
    servings: 2,
    cookTime: 15,
    ingredients: [
      { quantity: 1, unit: '', description: 'avocado' },
      { quantity: 2, unit: '', description: 'tomatoes' },
      { quantity: 0.25, unit: 'cup', description: 'red onion' },
      { quantity: 1, unit: 'tbsp', description: 'lime juice' },
    ],
  },
];

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
    usingFallback: false,
  },
};

const normalizeImageUrl = function (url) {
  if (!url) return makePlaceholder('Recipe');
  return url.replace(/^http:\/\//i, 'https://');
};

const toPreview = recipe => ({
  id: recipe.id,
  title: recipe.title,
  publisher: recipe.publisher,
  image: recipe.image,
});

const findFallbackRecipe = id => FALLBACK_RECIPES.find(recipe => recipe.id === id);

export const loadFallbackSearchResults = function (query = '') {
  const q = query.trim().toLowerCase();
  const matches = !q
    ? FALLBACK_RECIPES
    : FALLBACK_RECIPES.filter(recipe => {
        const haystack = [
          recipe.title,
          recipe.publisher,
          ...recipe.ingredients.map(ing => ing.description),
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      });

  state.search.query = query;
  state.search.results = matches.map(toPreview);
  state.search.page = 1;
  state.search.usingFallback = true;
  return state.search.results;
};

export const loadRecipe = async function (id) {
  const fallback = findFallbackRecipe(id);
  if (fallback) {
    state.recipe = { ...fallback };
    return;
  }

  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: normalizeImageUrl(recipe.image_url),
      servings: recipe.servings,
      cookTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  state.search.query = query;

  try {
    const data = await getJSON(`${API_URL}?search=${encodeURIComponent(query)}`);

    state.search.results = data.data.recipes.map(rec => ({
      id: rec.id,
      title: rec.title,
      publisher: rec.publisher,
      image: normalizeImageUrl(rec.image_url),
    }));

    state.search.page = 1;
    state.search.usingFallback = false;
    return state.search.results;
  } catch (err) {
    console.warn('Forkify API unavailable. Showing local fallback recipes.', err);
    return loadFallbackSearchResults(query);
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};
