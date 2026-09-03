import * as model from './model.js';
import { DEFAULT_SEARCH_QUERY } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

const renderCurrentSearch = function () {
  resultsView.render(model.getSearchResultsPage());
  paginationView.render(model.state.search);
};

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError('We could not load that recipe. Please try another one.');
  }
};

const controlSearchResults = async function (forcedQuery, showSpinner = true) {
  try {
    const query =
      typeof forcedQuery === 'string' ? forcedQuery : searchView.getQuery();

    if (!query || !query.trim()) return;

    if (showSpinner) resultsView.renderSpinner();
    await model.loadSearchResults(query.trim());
    renderCurrentSearch();

    if (model.state.search.results.length > 0) {
      window.location.hash = model.state.search.results[0].id;
    }
  } catch (err) {
    console.error(err);
    resultsView.renderError('Recipes could not be loaded. Please try again.');
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlInitialLoad = function () {
  // Show working recipes immediately, even if the remote API is slow or unavailable.
  model.loadFallbackSearchResults(DEFAULT_SEARCH_QUERY);
  renderCurrentSearch();

  if (model.state.search.results.length > 0 && !window.location.hash) {
    window.location.hash = model.state.search.results[0].id;
  }

  // Refresh the initial list from the real Forkify API in the background.
  controlSearchResults(DEFAULT_SEARCH_QUERY, false);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  controlInitialLoad();
};

init();
